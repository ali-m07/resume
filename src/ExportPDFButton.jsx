import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useTranslation } from 'react-i18next';
import {
  collectAtomicZones,
  collectNoBreakZones,
  computePageBoundaries,
  collectLinkRects,
  mergeZoneLists,
} from './lib/pdfLayout';
import { isRtlLanguage } from './lib/rtl';
import { preparePdfBidi } from './lib/bidi';

function waitForLayout() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

async function ensureVazirmatnLoaded() {
  try {
    await document.fonts.load('400 16px "Vazirmatn"');
    await document.fonts.load('600 16px "Vazirmatn"');
    await document.fonts.load('700 16px "Vazirmatn"');
  } catch {
    /* font load optional */
  }
}

/**
 * PDF export — organic pagination driven by global CSS layout classes.
 * Works identically for EN, DE, FR, FA, TR (any text length / RTL).
 */
export default function ExportPDFButton({ className = '', variant = 'hero' }) {
  const { t, i18n } = useTranslation();
  const [busy, setBusy] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [includeProjects, setIncludeProjects] = useState(true);
  const [includeResearch, setIncludeResearch] = useState(true);
  const [includePublications, setIncludePublications] = useState(true);
  const dialogRef = useRef(null);
  const isRTL = isRtlLanguage(i18n.language);

  useEffect(() => {
    if (!showOptions) return;
    const handler = (e) => {
      if (dialogRef.current?.contains(e.target)) return;
      setShowOptions(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showOptions]);

  const runExport = async ({ withProjects, withResearch, withPublications }) => {
    const el = document.getElementById('resume-root');
    if (!el) return;
    setBusy(true);

    const hidden = [];
    el.querySelectorAll('.no-print, .pdf-compact-hide').forEach((n) => {
      hidden.push({ node: n, prev: n.style.display });
      n.style.display = 'none';
    });

    const optionalSections = [
      { id: 'projects', include: withProjects },
      { id: 'research', include: withResearch },
      { id: 'publications', include: withPublications },
    ];

    for (const { id, include } of optionalSections) {
      if (include) continue;
      const section = document.getElementById(id);
      if (section) {
        hidden.push({ node: section, prev: section.style.display });
        section.style.display = 'none';
      }
    }

    const wasDark = document.documentElement.classList.contains('dark');
    if (wasDark) document.documentElement.classList.remove('dark');

    const rtl = isRtlLanguage(i18n.language);

    document.body.classList.add('pdf-exporting');
    window.scrollTo(0, 0);
    if (rtl) await ensureVazirmatnLoaded();
    await document.fonts.ready;
    await waitForLayout();

    try {
      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const contentW = pageW - margin * 2;
      const printableH = pageH - margin * 2;
      const scale = 2;

      const canvas = await html2canvas(el, {
        scale,
        useCORS: true,
        backgroundColor: '#ffffff',
        windowWidth: el.scrollWidth,
        width: el.scrollWidth,
        height: el.scrollHeight,
        scrollX: 0,
        scrollY: -window.scrollY,
        foreignObjectRendering: false,
        onclone: (clonedDoc) => {
          const clonedRoot = clonedDoc.getElementById('resume-root');
          if (!clonedRoot) return;
          clonedDoc.body.classList.add('pdf-exporting');
          if (rtl) {
            clonedRoot.classList.add('rtl', 'fa-section');
            clonedRoot.setAttribute('dir', 'rtl');
            clonedRoot.setAttribute('lang', 'fa');
            clonedDoc.documentElement.setAttribute('dir', 'rtl');
            clonedDoc.documentElement.setAttribute('lang', 'fa');
            preparePdfBidi(clonedRoot);
          } else {
            clonedRoot.classList.add('ltr');
            clonedRoot.setAttribute('dir', 'ltr');
            clonedDoc.documentElement.setAttribute('dir', 'ltr');
            clonedDoc.documentElement.setAttribute('lang', i18n.language.split('-')[0]);
          }
        },
      });

      const captureRect = el.getBoundingClientRect();
      const scaleY = canvas.height / captureRect.height;
      const scaleX = canvas.width / captureRect.width;
      const actualPagePx = printableH * (canvas.width / contentW);

      const atomicZones = collectAtomicZones(el, captureRect, scaleY);
      const noBreakZones = collectNoBreakZones(el, captureRect, scaleY);
      const allZones = mergeZoneLists(atomicZones, noBreakZones);
      const pxPerMm = canvas.width / contentW;
      const pageBoundaries = computePageBoundaries(canvas.height, actualPagePx, allZones);
      const linkRects = collectLinkRects(el, captureRect, scaleX, scaleY);

      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      const ctx = sliceCanvas.getContext('2d');

      for (let p = 0; p < pageBoundaries.length - 1; p++) {
        const srcY = pageBoundaries[p];
        const drawH = pageBoundaries[p + 1] - srcY;
        sliceCanvas.height = drawH;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, sliceCanvas.width, drawH);
        ctx.drawImage(canvas, 0, srcY, canvas.width, drawH, 0, 0, canvas.width, drawH);

        const imgData = sliceCanvas.toDataURL('image/jpeg', 0.95);
        const sliceHmm = drawH / pxPerMm;
        if (p > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', margin, margin, contentW, sliceHmm, undefined, 'FAST');

        const pageTopPx = srcY;
        const pageBottomPx = srcY + drawH;
        linkRects.forEach((lr) => {
          if (lr.bottom < pageTopPx || lr.top > pageBottomPx) return;
          const linkTopPx = Math.max(lr.top, pageTopPx) - pageTopPx;
          const linkBottomPx = Math.min(lr.bottom, pageBottomPx) - pageTopPx;
          const xMm = margin + lr.left / pxPerMm;
          const yMm = margin + linkTopPx / pxPerMm;
          const wMm = (lr.right - lr.left) / pxPerMm;
          const hMm = (linkBottomPx - linkTopPx) / pxPerMm;
          if (wMm > 0 && hMm > 0 && lr.href) {
            try {
              pdf.link(xMm, yMm, wMm, hMm, { url: lr.href });
            } catch {
              /* skip invalid link targets */
            }
          }
        });
      }

      pdf.save('Ali-Mansouri-Solutions-Architect-CV.pdf');
    } finally {
      document.body.classList.remove('pdf-exporting');
      if (wasDark) document.documentElement.classList.add('dark');
      hidden.forEach(({ node, prev }) => { node.style.display = prev; });
      setBusy(false);
    }
  };

  const handleConfirmExport = async () => {
    setShowOptions(false);
    await runExport({
      withProjects: includeProjects,
      withResearch: includeResearch,
      withPublications: includePublications,
    });
  };

  const pdfOptions = [
    { key: 'projects', checked: includeProjects, onChange: setIncludeProjects, label: t('pdf.includeProjects') },
    { key: 'research', checked: includeResearch, onChange: setIncludeResearch, label: t('pdf.includeResearch') },
    { key: 'publications', checked: includePublications, onChange: setIncludePublications, label: t('pdf.includePublications') },
  ];

  const base =
    variant === 'hero'
      ? 'inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20 transition no-print'
      : 'fixed bottom-5 right-5 z-50 no-print inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-accent-600 transition';

  const optionsDialog = showOptions
    ? createPortal(
        <>
          <div
            className="fixed inset-0 z-[9998] bg-slate-900/40 backdrop-blur-[2px] no-print"
            aria-hidden="true"
            onClick={() => setShowOptions(false)}
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-labelledby="pdf-options-title"
            className={`fixed z-[9999] w-[min(100vw-2rem,22rem)] rounded-2xl border border-line bg-card p-4 shadow-2xl no-print ${
              isRTL ? 'text-right' : 'text-left'
            }`}
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <h2 id="pdf-options-title" className="text-sm font-semibold text-ink mb-3">
              {t('pdf.optionsTitle')}
            </h2>
            <div className="space-y-2.5 mb-4">
              {pdfOptions.map(({ key, checked, onChange, label }) => (
                <label
                  key={key}
                  className={`flex items-start gap-2.5 cursor-pointer text-sm text-ink/90 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="mt-0.5 rounded border-line text-accent focus:ring-accent/30"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
            <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : 'justify-end'}`}>
              <button
                type="button"
                onClick={() => setShowOptions(false)}
                className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                {t('pdf.cancel')}
              </button>
              <button
                type="button"
                onClick={handleConfirmExport}
                disabled={busy}
                className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accent-600 transition disabled:opacity-60"
              >
                {t('pdf.confirm')}
              </button>
            </div>
          </div>
        </>,
        document.body,
      )
    : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setShowOptions(true)}
        disabled={busy}
        className={`${base} ${className}`}
      >
        {variant === 'floating' && <span>📄</span>}
        {busy ? `${t('hero.download')}…` : t('hero.download')}
      </button>
      {optionsDialog}
    </>
  );
}
