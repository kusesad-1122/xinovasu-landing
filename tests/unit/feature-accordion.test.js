import { expect, test } from 'vitest';
import { activateFeature } from '../../src/scripts/feature-accordion.js';

test('selects one feature row and closes its siblings', () => {
  document.body.innerHTML = '<button data-feature="hide"></button><button data-feature="umount"></button>';
  const rows = [...document.querySelectorAll('button')];
  activateFeature(rows, 'umount');
  expect(rows[0].getAttribute('aria-expanded')).toBe('false');
  expect(rows[1].getAttribute('aria-expanded')).toBe('true');
});
