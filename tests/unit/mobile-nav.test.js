import { expect, test } from 'vitest';
import { setMenuOpen } from '../../src/scripts/mobile-nav.js';

test('opens a mobile menu with matching ARIA state', () => {
  document.body.innerHTML = '<button aria-expanded="false"></button><nav hidden></nav>';
  const [button, panel] = document.body.children;
  setMenuOpen(button, panel, true);
  expect(button.getAttribute('aria-expanded')).toBe('true');
  expect(panel.hidden).toBe(false);
});
