# XinovaSU System Monograph Redesign

## Goal

Rebuild the existing XinovaSU public landing page around the selected System Monograph visual direction. The page must make the kernel-level Android Root proposition immediately legible, preserve the three public conversion paths (latest release, GitHub, and documentation), and remain reliable at desktop and 390 px mobile widths.

## Visual System

- White, nearly monochrome technical-journal surface; black typography, quiet gray rules, and one restrained blue kernel-status accent.
- A centered layered-phone product object is the hero's visual spine. The existing local device image remains the source asset; the grid is only a floor plane behind it and never overlays the phone.
- Desktop hero has three columns: product claim at left, device in the center, numbered capability index at right.
- The navigation is a compact single line. The download CTA remains a strong black action; GitHub and documentation remain direct, accessible links.
- Engineering proof is one continuous ruled strip rather than a set of cards.

## Content And Interaction

- Keep the existing Chinese product copy and five feature entries; do not add unverified metrics or compatibility claims.
- Keep anchors for capabilities, features, and technology. Preserve the mobile menu, feature-row expansion, and all external release/GitHub links.
- Feature rows stay keyboard reachable and expose the current expanded state through `aria-expanded`.
- The documentation page is not redesigned in this pass; its link and public route remain intact.

## Responsive Behavior

- Desktop (`>=1024px`): centered device is the dominant fixed-width hero visual, with left copy and right numbered notes aligned to it.
- Mobile (`390px`): use a single reading column: title and copy, actions, device, then numbered notes. No element may force horizontal scrolling or put prose into a narrow counter column.
- Decorative movement must be subtle and disabled for `prefers-reduced-motion`.

## Implementation Boundaries

- Update only the public landing page HTML and its style layers. Reuse the existing `xos-mark.svg` and `xinovasu-device-reference.png` assets.
- Add only a focused, testable stylesheet and necessary structure; do not replace the Vite setup, docs page, deployment workflow, or published URLs.
- Use an existing icon library only if semantic UI icons are needed; avoid hand-drawn SVG or CSS illustration replacements.

## Verification

1. Extend the Playwright checks for the monograph hero structure, primary public links, mobile menu, and 390px no-overflow layout.
2. Run unit tests, desktop/mobile E2E tests, and a production build.
3. Capture the rebuilt desktop and mobile screens in the in-app browser and compare each to the selected monograph reference at the same view.
4. Record the comparison in `design-qa.md`; all P0/P1/P2 issues must be fixed before delivery.

## Decisions

- Selected visual reference: the third image generated in the Product Design exploration on 2026-07-16.
- The source image is a visual target, not a literal text source: existing verified XinovaSU wording and links take precedence over mockup copy.
- The existing local device asset is retained instead of introducing a new unverified device rendering.
