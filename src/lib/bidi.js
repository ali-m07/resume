/**
 * Bi-directional isolation for RTL (FA). Generates <bdi>/<span> at runtime only —
 * never put markup in locale JSON. Plain text & allowed HTML (<b>, <i>) only.
 *
 * Single-pass scanner: any Latin/technical island is wrapped automatically so new
 * locale copy (P&OD, CI/CD, (System Dynamics), trailing ؛ . etc.) needs no rules.
 */

import { isRtlLanguage } from './rtl';

const HTML_TOKEN = /(<[^>]+>)/g;
const ISOLATE_BLOCK =
  /(<(?:bdi|span)\s+dir="ltr"\s+class="[^"]*"[^>]*>[\s\S]*?<\/(?:bdi|span)>)/g;
const LTR_OPEN = /<(?:bdi|span)\s+dir="ltr"/;

const ARABIC_SCRIPT = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
const LATIN_LETTER = /[A-Za-z]/;
const WESTERN_DIGIT = /[0-9]/;
const PERSIAN_DIGIT = /[۰-۹]/;
const LTR_SYMBOL = /[&+/\-_.:@#%*=|\\]/;
const NEUTRAL_PUNCT = /[.،,;:!?؟؛]/;
const WHITESPACE = /\s/;

/** Thin space — FA/EN boundary gutter (Word-like mixed-script spacing) */
const BIDI_GUTTER = '\u2009';

function isDigit(ch) {
  return WESTERN_DIGIT.test(ch) || PERSIAN_DIGIT.test(ch);
}

function isLtrCore(ch) {
  return LATIN_LETTER.test(ch) || isDigit(ch) || LTR_SYMBOL.test(ch);
}

function readLatinParenthetical(text, start) {
  if (text[start] !== '(') return null;

  let depth = 0;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (ch === '(') depth++;
    if (ch === ')') {
      depth--;
      if (depth === 0) {
        const full = text.slice(start, i + 1);
        const inner = full.slice(1, -1);
        if (ARABIC_SCRIPT.test(inner)) return null;
        if (!LATIN_LETTER.test(inner)) return null;
        return { end: i + 1, text: full };
      }
    }
  }
  return null;
}

function extendDigitRun(text, start) {
  let i = start;
  while (i < text.length && (isDigit(text[i]) || text[i] === ',' || text[i] === '.' || text[i] === '٬')) {
    i++;
  }

  const tail = text.slice(i);
  const range = tail.match(/^(\s*[–—\-−|]\s*(?:[۰-۹0-9][۰-۹0-9٬,\.]*|تاکنون))/);
  if (range) i += range[0].length;

  if (i < text.length && (text[i] === '+' || text[i] === '%' || text[i] === '٪')) i++;

  return i;
}

/** Extend a contiguous LTR island from `start` (exclusive end index). */
function extendLtrRun(text, start) {
  let i = start;

  const openParen = readLatinParenthetical(text, i);
  if (openParen) return openParen.end;

  while (i < text.length) {
    const ch = text[i];

    if (isLtrCore(ch)) {
      i++;
      continue;
    }

    if (WHITESPACE.test(ch)) {
      let j = i + 1;
      while (j < text.length && WHITESPACE.test(text[j])) j++;
      if (j < text.length) {
        const next = text[j];
        if (isLtrCore(next) || next === '(') {
          i = j;
          continue;
        }
      }
      break;
    }

    if (ch === '/' && i + 1 < text.length && isLtrCore(text[i + 1])) {
      i++;
      continue;
    }

    if (ch === '&' && i + 1 < text.length && LATIN_LETTER.test(text[i + 1])) {
      i++;
      continue;
    }

    if ((ch === ',' || ch === '،') && i + 1 < text.length) {
      let j = i + 1;
      while (j < text.length && WHITESPACE.test(text[j])) j++;
      if (j < text.length && (isLtrCore(text[j]) || text[j] === '(')) {
        i = j;
        continue;
      }
      break;
    }

    if (ch === 'و' && i + 1 < text.length) {
      let j = i + 1;
      while (j < text.length && WHITESPACE.test(text[j])) j++;
      if (j < text.length && (isLtrCore(text[j]) || text[j] === '(')) {
        i = j;
        continue;
      }
      break;
    }

    if (ch === '(') {
      const paren = readLatinParenthetical(text, i);
      if (paren) {
        i = paren.end;
        continue;
      }
    }

    break;
  }

  while (i < text.length && NEUTRAL_PUNCT.test(text[i])) i++;

  return i;
}

function ltrRunStart(text, index) {
  const ch = text[index];
  if (isLtrCore(ch)) return index;
  if (ch === '(' && readLatinParenthetical(text, index)) return index;
  return -1;
}

function needsNowrap(chunk) {
  return /[\s&/(),،]/.test(chunk) || chunk.length > 12;
}

function hardenLtrSpaces(text, { nowrap = false } = {}) {
  let out = text.replace(/\s*\/\s*/g, `${BIDI_GUTTER}/${BIDI_GUTTER}`);
  if (nowrap) out = out.replace(/ /g, '\u00A0');
  return out;
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;');
}

function wrapLtrToken(text, { nowrap = false } = {}) {
  const content = escapeHtml(hardenLtrSpaces(text, { nowrap }));
  if (nowrap) {
    return `<span dir="ltr" class="en-token bidi-ltr bidi-nowrap" translate="no">${content}</span>`;
  }
  return `<bdi dir="ltr" class="en-token bidi-ltr">${content}</bdi>`;
}

function wrapNumToken(text) {
  return `<bdi dir="ltr" class="num-token bidi-ltr">${text}</bdi>`;
}

function scanAndWrapLtr(text) {
  let out = '';
  let i = 0;

  while (i < text.length) {
    if (isDigit(text[i]) && !LATIN_LETTER.test(text[i])) {
      const end = extendDigitRun(text, i);
      out += wrapNumToken(text.slice(i, end));
      i = end;
      continue;
    }

    const start = ltrRunStart(text, i);
    if (start === -1) {
      out += text[i];
      i++;
      continue;
    }

    if (start > i) {
      out += text.slice(i, start);
      i = start;
    }

    const end = extendLtrRun(text, i);
    const chunk = text.slice(i, end).trim();
    if (chunk) {
      out += wrapLtrToken(chunk, { nowrap: needsNowrap(chunk) });
    }
    i = end;
  }

  return out;
}

function insertBidiGutters(html) {
  return html
    .replace(new RegExp(`([\\u0600-\\u06FF])\\s+(${LTR_OPEN.source})`, 'g'), `$1${BIDI_GUTTER}$2`)
    .replace(/(<\/(?:bdi|span)>)\s+(?=[\u0600-\u06FF])/g, `$1${BIDI_GUTTER}`)
    .replace(new RegExp(`([\\u0600-\\u06FF])(${LTR_OPEN.source})`, 'g'), `$1${BIDI_GUTTER}$2`)
    .replace(/(<\/(?:bdi|span)>)(?=[\u0600-\u06FF])/g, `$1${BIDI_GUTTER}`);
}

function processPlainSegment(text) {
  if (!text) return text;
  return insertBidiGutters(scanAndWrapLtr(text));
}

export function isolateLtrInText(text) {
  if (!text || typeof text !== 'string') return text;
  if (text.includes('<')) return text;
  return processPlainSegment(text);
}

export function isolateLtrInHtml(html) {
  if (!html || typeof html !== 'string') return html;
  if (html.includes('bidi-ltr')) return html;

  return html
    .split(HTML_TOKEN)
    .map((seg) => (seg.startsWith('<') ? seg : processPlainSegment(seg)))
    .join('');
}

export function localizeHtml(html, lang) {
  return isRtlLanguage(lang) ? isolateLtrInHtml(html) : html;
}

export function localizeText(text, lang) {
  return isRtlLanguage(lang) ? isolateLtrInText(text) : text;
}

export function preparePdfBidi(root) {
  if (!root) return;

  const SELECTORS =
    '.cv-text, .cv-prose, .cv-prose-inline, .cv-role-title, .cv-company-name, .cv-section-title, .cv-date';

  root.querySelectorAll(SELECTORS).forEach((el) => {
    if (el.closest('.no-print, .pdf-compact-hide')) return;
    if (el.closest('bdi')) return;

    const html = el.innerHTML;
    if (!html || html.includes('bidi-ltr')) return;
    if (!/[A-Za-z۰-۹0-9]/.test(html)) return;
    if (el.getAttribute('dir') === 'ltr') return;

    const processed = isolateLtrInHtml(html);
    if (processed !== html) el.innerHTML = processed;
  });
}
