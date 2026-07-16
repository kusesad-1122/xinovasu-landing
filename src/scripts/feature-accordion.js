export function activateFeature(rows, activeId) {
  let activeRow;
  rows.forEach((row) => {
    const active = row.dataset.feature === activeId;
    row.classList.toggle('is-active', active);
    row.setAttribute('aria-expanded', String(active));
    if (active) activeRow = row;
  });
  return activeRow;
}

export function bindFeatureAccordion(rows) {
  rows.forEach((row) => {
    const activate = () => activateFeature(rows, row.dataset.feature);
    row.addEventListener('click', activate);
    row.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activate();
      }
    });
  });
}
