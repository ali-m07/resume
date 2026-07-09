/**
 * PDF pagination — canvas slice boundaries must never cut through content units.
 *
 * `.cv-atomic-block` — project card, bullet, degree, publication (never split)
 * `.cv-avoid-break`   — alias kept for legacy markup (same protection)
 * `.cv-keep-with-next` — heading + first sub-line orphan guard
 */

export const ATOMIC_BLOCK_SELECTOR = '.cv-atomic-block';
export const NO_SPLIT_SELECTOR = '.cv-atomic-block, .cv-avoid-break';

const PAD = 4;

function rectToCanvasY(rect, elRect, scaleY) {
  return {
    top: Math.round((rect.top - elRect.top) * scaleY),
    bottom: Math.round((rect.bottom - elRect.top) * scaleY),
  };
}

function isHidden(node) {
  if (!node?.isConnected) return true;
  const style = window.getComputedStyle(node);
  return style.display === 'none' || style.visibility === 'hidden';
}

function hasConsumedAncestor(node, root, consumed) {
  let parent = node.parentElement;
  while (parent && parent !== root) {
    if (consumed.has(parent)) return true;
    parent = parent.parentElement;
  }
  return false;
}

function isLeafNoSplit(node) {
  return (
    (node.classList.contains('cv-atomic-block') || node.classList.contains('cv-avoid-break')) &&
    !node.querySelector(NO_SPLIT_SELECTOR)
  );
}

const ORPHAN_HEADING_SELECTOR =
  '.cv-section-title, .cv-company-name, .cv-role-title, .cv-subsection-title';

/** First heading line or leaf after anchor — never a whole atomic block container. */
export function findOrphanGuardTarget(root, afterBottom) {
  const candidates = [];

  root.querySelectorAll(`${ORPHAN_HEADING_SELECTOR}, ${NO_SPLIT_SELECTOR}`).forEach((node) => {
    if (isHidden(node)) return;
    if (node.closest(ATOMIC_BLOCK_SELECTOR) && !isLeafNoSplit(node)) return;
    if ((node.classList.contains('cv-atomic-block') || node.classList.contains('cv-avoid-break')) && !isLeafNoSplit(node)) return;
    const r = node.getBoundingClientRect();
    if (r.height === 0 || r.top < afterBottom - 1) return;
    candidates.push({ node, top: r.top });
  });

  candidates.sort((a, b) => a.top - b.top);
  return candidates[0]?.node ?? null;
}

/** @deprecated use isLeafNoSplit */
export function isLeafAtomic(node) {
  return isLeafNoSplit(node);
}

function mergeZones(zones) {
  if (zones.length === 0) return zones;
  const sorted = [...zones].sort((a, b) => a[0] - b[0]);
  const merged = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const prev = merged[merged.length - 1];
    const cur = sorted[i];
    if (cur[0] <= prev[1] + PAD) {
      prev[1] = Math.max(prev[1], cur[1]);
    } else {
      merged.push(cur);
    }
  }
  return merged;
}

/**
 * No-split zones: every task card, bullet, and inner card — full bounding box.
 * Blocks taller than one page are still registered (may occupy a full page slice).
 */
export function collectAtomicZones(root, elRect, scaleY) {
  const zones = [];
  const consumed = new Set();

  root.querySelectorAll(NO_SPLIT_SELECTOR).forEach((block) => {
    if (consumed.has(block) || isHidden(block)) return;
    if (hasConsumedAncestor(block, root, consumed)) return;
    if (!isLeafNoSplit(block)) return;

    const r = block.getBoundingClientRect();
    if (r.height === 0) return;

    const { top, bottom } = rectToCanvasY(r, elRect, scaleY);
    zones.push([top, bottom]);
    consumed.add(block);
  });

  return mergeZones(zones);
}

/** Heading + first sub-line only (via cv-keep-with-next wrappers). */
export function collectNoBreakZones(root, elRect, scaleY) {
  const zones = [];

  root.querySelectorAll('.cv-keep-with-next').forEach((kwn) => {
    if (isHidden(kwn)) return;
    const kr = kwn.getBoundingClientRect();
    const zoneTop = rectToCanvasY(kr, elRect, scaleY).top;
    let zoneBottom = Math.round((kr.bottom - elRect.top) * scaleY);

    const next = findOrphanGuardTarget(root, kr.bottom);
    if (next) {
      const nr = next.getBoundingClientRect();
      zoneBottom = Math.max(zoneBottom, rectToCanvasY(nr, elRect, scaleY).bottom);
    }

    zones.push([zoneTop, zoneBottom]);
  });

  return mergeZones(zones);
}

function sliceInsideZone(y, zones) {
  return zones.some(([t, b]) => y > t + PAD && y < b - PAD);
}

function zoneStartsOnPageAndOverflows(t, b, cursor, maxTop) {
  return t >= cursor && t < maxTop && b > maxTop + PAD;
}

/**
 * Page breaks: never split a no-split zone. If a unit does not fit in the
 * remaining slice, break before it so the entire unit moves to the next page.
 */
export function computePageBoundaries(totalH, pagePx, zones) {
  const boundaries = [0];
  let cursor = 0;
  const minSlice = Math.max(32, pagePx * 0.04);

  while (cursor < totalH - 1) {
    const maxTop = Math.min(cursor + pagePx, totalH);

    let forceBreak = -1;
    for (const [t, b] of zones) {
      if (zoneStartsOnPageAndOverflows(t, b, cursor, maxTop) && t > cursor + minSlice) {
        forceBreak = forceBreak < 0 ? t : Math.min(forceBreak, t);
      }
    }

    if (forceBreak > cursor) {
      boundaries.push(forceBreak);
      cursor = forceBreak;
      continue;
    }

    let chosen = -1;
    for (let y = Math.floor(maxTop); y > cursor + minSlice; y -= 2) {
      if (!sliceInsideZone(y, zones)) {
        chosen = y;
        break;
      }
    }

    if (chosen < 0) {
      for (const [t] of zones) {
        if (t > cursor + minSlice && t < maxTop) {
          forceBreak = forceBreak < 0 ? t : Math.min(forceBreak, t);
        }
      }
      if (forceBreak > cursor) {
        boundaries.push(forceBreak);
        cursor = forceBreak;
        continue;
      }
    }

    const next = chosen > cursor ? chosen : maxTop;
    boundaries.push(Math.min(next, totalH));
    cursor = next;
  }

  if (boundaries[boundaries.length - 1] !== totalH) {
    boundaries[boundaries.length - 1] = totalH;
  }

  return boundaries;
}

export function mergeZoneLists(...lists) {
  return mergeZones(lists.flat());
}

export function collectLinkRects(root, elRect, scaleX, scaleY) {
  const rects = [];
  root.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || href === '#' || isHidden(a)) return;
    const r = a.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    rects.push({
      top: Math.round((r.top - elRect.top) * scaleY),
      bottom: Math.round((r.bottom - elRect.top) * scaleY),
      left: Math.round((r.left - elRect.left) * scaleX),
      right: Math.round((r.right - elRect.left) * scaleX),
      href,
    });
  });
  return rects;
}
