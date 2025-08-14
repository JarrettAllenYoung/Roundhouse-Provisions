(function () {
  const items = [...document.querySelectorAll('.e-loop-item')];
  if (items.length < 2) return;

  // Use the real parent of the items to re-append into
  const WRAP = items[0].parentElement;
  if (!WRAP) return;

  function getSortValue(item) {
    // 1) attribute on the item itself
    let raw = item.getAttribute('data-sort');

    // 2) attribute on a child (if you attached it to an inner wrapper)
    if (!raw) {
      const n1 = item.querySelector('[data-sort]');
      if (n1) raw = n1.getAttribute('data-sort') || n1.dataset.sort;
    }

    // 3) hidden span fallback
    if (!raw) {
      const n2 = item.querySelector('.js-sort');
      if (n2) raw = n2.getAttribute('data-sort') || n2.textContent;
    }

    // Normalize → number; unknowns sink to bottom
    const num = parseFloat(String(raw || '').replace(/[^0-9.\-]/g, ''));
    return isNaN(num) ? Number.POSITIVE_INFINITY : num;
  }

  const rows = items.map(el => ({ el, ord: getSortValue(el) }));
  if (rows.every(r => !isFinite(r.ord))) return; // no usable values

  // Ascending: 1,2,3...
  rows.sort((a, b) => a.ord - b.ord);

  const frag = document.createDocumentFragment();
  rows.forEach(r => frag.appendChild(r.el));
  WRAP.appendChild(frag);
})();