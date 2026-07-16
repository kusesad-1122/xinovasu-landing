# XinovaSU System Monograph — Design QA

## Comparison Target

- Source visual truth: `C:\Users\Administrator\.codex\generated_images\019f687d-a3fa-7e83-a591-fc1bb765e76b\exec-9d21dc72-4294-4ada-b1c8-e66b55b03434.png`
- Desktop implementation capture: `test-results/design-qa/monograph-desktop-final.png`
- Mobile implementation capture: `test-results/design-qa/monograph-mobile-final.png`
- Primary comparison viewport/state: desktop landing hero, no menu open.
- Browser evidence: in-app browser at its available 1280px desktop viewport; the selected visual is a desktop target. Automated Playwright coverage verifies the explicit 390px layout and no horizontal overflow.

## Full-View Comparison

The implementation matches the selected System Monograph direction: a white technical-journal canvas, compact top navigation, oversized black title at left, a dominant centered layered device, right-side numbered capability index, hairline separators, and a restrained blue accent. The product and copy remain real XinovaSU content rather than mockup-only claims.

Focused hero comparison was required because the source depends on the device’s scale and placement. The final capture shows the device centered between copy and notes, visibly larger than the initial implementation, with the floor grid behind it only.

## Required Fidelity Surfaces

- **Fonts and typography:** Uses the existing Inter/system fallback stack. The black display title has a strong scale and negative tracking; navigation, labels, and capability notes remain visually lighter and readable. Chinese copy wraps without clipping.
- **Spacing and layout rhythm:** Three-column desktop rhythm and a ruled note stack mirror the source. Generous upper whitespace is intentional. At 390px, the automated browser test confirms a single column with at least 300px note width and no horizontal overflow.
- **Colors and visual tokens:** White page, near-black ink, muted gray rules, and the existing blue accent token are consistently used. No dark theme or unnecessary color blocks were introduced.
- **Image quality and asset fidelity:** The existing local XinovaSU layered-device raster asset is used directly, with no SVG/CSS substitute. The grid remains behind the image; screenshot evidence and E2E assert `background-image: none` on the device stage.
- **Copy and content:** Existing verified product positioning, five feature rows, release/GitHub/documentation links, and GPL/LKM/KMI facts are preserved. No mockup metrics were copied into the site.

## Comparison History

- **Iteration 1 — P2 device prominence:** The first desktop capture showed the device materially smaller than the selected reference and reduced the central visual spine.
  - Fix: increased the desktop image layer from 178% to 195% of the device stage width and recentered it with a matching negative margin; adjusted the mobile layer proportionally.
  - Post-fix evidence: `test-results/design-qa/monograph-desktop-final.png` shows the device spanning the central column with the grid still behind it.
- **Iteration 2 — pass:** No actionable P0/P1/P2 mismatch remains in the selected desktop target comparison.

## Interaction And Responsive Checks

- Desktop and mobile hero structure, public release link, four capability notes, grid placement, and no overflow: Playwright pass.
- Mobile menu open/closed state: Playwright pass.
- Feature row activation and `aria-expanded` state: Playwright pass.
- Reduced-motion device behavior: Playwright pass.
- Production bundle: Vite build pass.

## Follow-up Polish

- [P3] If a future in-app browser runtime exposes a true 390px viewport override, capture a second visual mobile screenshot for archival comparison. Current 390px behavior is already covered by automated browser tests.

final result: passed
