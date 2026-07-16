import { bindFeatureAccordion } from './scripts/feature-accordion.js';
import { bindMobileNav } from './scripts/mobile-nav.js';

bindMobileNav(document.querySelector('#mobile-menu-button'), document.querySelector('#mobile-menu'));
bindFeatureAccordion([...document.querySelectorAll('.feature-row')]);
