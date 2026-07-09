import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useTranslation } from 'react-i18next';

/**
 * "What you see is what you get" PDF export with block-aligned pagination.
 *
 * Captures the on-screen resume EXACTLY as rendered (same 2-column layout,
 * same fonts, same colors), then slices across A4 pages at block boundaries so
 * nothing is cut through the middle. No manual tuning, no magic numbers:
 * the page dimensions come straight from jsPDF's A4 page, and break points are
 * read live from the rendered DOM.
 */
export default function ExportPDFButton({ className = '', variant = 'hero' }) {
  const { t } = useTranslation();
  const [busy, setBusy] = useState(false);

  const handleExport = async () => {
    const el = document.getElementById('resume-root');
    if (!el) return;
    setBusy(true);

    // Hide on-screen controls during capture.
    const hidden = [];
    el.querySelectorAll('.no-print').forEach((n) => {
      hidden.push({ node: n, prev: n.style.display });
      n.style.display = 'none';
    });

    try {
      // 1) Capture exactly as rendered, high resolution.
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        windowWidth: el.scrollWidth,
        scrollX: 0,
        scrollY: 0,
      });

      // 2) A4 PDF; derive the px-per-mm from the rendered canvas width vs A4 printable width.
      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
      const pageW = pdf.internal.pageSize.getWidth();   // 210
      const pageH = pdf.internal.pageSize.getHeight();  // 297
      const margin = 8;
      const contentW = pageW - margin * 2;     // 194mm
      const printableH = pageH - margin * 2;   // 281mm per page

      const pxPerMm = canvas.width / contentW;
      const pagePx = printableH * pxPerMm; // px height available per page

      // 3) Build a list of every block's [top, bottom] in canvas-px.
      //    A page break is "safe" if it does NOT fall strictly inside any block.
      const elRect = el.getBoundingClientRect();
      const scaleY = canvas.height / elRect.height;
      const blocks = [];
      el.querySelectorAll('.cv-card, .cv-avoid-break').forEach((node) => {
        const r = node.getBoundingClientRect();
        const top = Math.round((r.top - elRect.top) * scaleY);
        const bottom = Math.round((r.bottom - elRect.top) * scaleY);
        blocks.push([top, bottom]);
      });

      // A candidate break Y is safe if for every block, the break is <= top or >= bottom.
      const isSafeBreak = (y) => blocks.every(([t, b]) => y <= t + 1 || y >= b - 1);

      // 4) Greedy pagination: walk down the page; the break is the largest Y in
      //    (cursor, cursor + pagePx] that is a SAFE break. If a single block is
      //    taller than a page, allow a hard cut at pagePx (rare).
      const totalH = canvas.height;
      const pageBoundaries = [0];
      let cursor = 0;
      while (cursor < totalH - 1) {
        const maxTop = cursor + pagePx;
        // Try candidate breaks from maxTop downward to cursor+1; pick first safe one.
        let chosen = -1;
        for (let y = Math.floor(maxTop); y > cursor; y -= 4) { // 4px granularity
          if (isSafeBreak(y)) { chosen = y; break; }
        }
        const next = chosen > cursor ? chosen : Math.min(maxTop, totalH);
        pageBoundaries.push(Math.min(next, totalH));
        cursor = next;
      }
      if (pageBoundaries[pageBoundaries.length - 1] !== totalH) {
        pageBoundaries[pageBoundaries.length - 1] = totalH;
      }

      // 5) Slice each page from the full canvas and add to the PDF.
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
        // Draw at [margin, margin] with width = contentW; keeps the WYSIWYG look.
        pdf.addImage(imgData, 'JPEG', margin, margin, contentW, sliceHmm, undefined, 'FAST');
      }

      pdf.save('Ali-Mansouri-Solutions-Architect-CV.pdf');
    } finally {
      hidden.forEach(({ node, prev }) => { node.style.display = prev; });
      setBusy(false);
    }
  };

  const base =
    variant === 'hero'
      ? 'inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20 transition no-print'
      : 'fixed bottom-5 right-5 z-50 no-print inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-accent-600 transition';

  return (
    <button onClick={handleExport} disabled={busy} className={`${base} ${className}`}>
      {variant === 'floating' && <span>📄</span>}
      {busy ? t('hero.download') + '…' : t('hero.download')}
    </button>
  );
}
