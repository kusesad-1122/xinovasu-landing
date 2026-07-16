export function setMenuOpen(button, panel, isOpen) {
  button.setAttribute('aria-expanded', String(isOpen));
  panel.hidden = !isOpen;
  panel.inert = !isOpen;
}

export function bindMobileNav(button, panel) {
  if (!button || !panel) return;
  setMenuOpen(button, panel, false);
  button.addEventListener('click', () => setMenuOpen(button, panel, button.getAttribute('aria-expanded') !== 'true'));
  panel.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuOpen(button, panel, false)));
}
