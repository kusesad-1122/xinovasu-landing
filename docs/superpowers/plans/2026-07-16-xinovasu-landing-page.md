# XinovaSU Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a publicly deployable, white premium XinovaSU landing page with distinct desktop and mobile layouts, layered phone motion, accessible interactions, and GitHub Pages delivery.

**Architecture:** Use a Vite-powered static HTML site with semantic markup and locally bundled CSS, SVG, and JavaScript. Keep content in `src/data/site.js`, interaction modules in `src/scripts/`, and presentation split into tokens, layout, components, and motion styles. GitHub Actions builds the static output and deploys it to GitHub Pages under the project-path base URL.

**Tech Stack:** Vite, vanilla HTML/CSS/ES modules, Vitest + jsdom, Playwright, GitHub Actions Pages.

## Global Constraints

- Background is true white `#FFFFFF`; primary text is near-black; `#2563EB` is the only saturated accent.
- All content, fonts, icons, styles, and key scripts are bundled locally; no third-party CDN or analytics dependency.
- The site is static, public, login-free, and compatible with the GitHub Pages project path `/xinovasu-landing/`.
- Desktop layout begins at `1024px`; mobile is a separately composed single-column layout with 44px minimum primary touch targets.
- Phone art is independently controllable DOM/SVG layers, never a flattened concept image.
- Motion uses only `transform` and `opacity`; `prefers-reduced-motion: reduce` disables all automatic motion.
- Do not invent product metrics, version numbers, or claims outside the approved XinovaSU copy.

---

## File Structure

| File | Responsibility |
| --- | --- |
| `package.json` | Static-site, test, preview, and deployment script definitions. |
| `index.html` | Semantic page landmarks and complete approved Chinese content. |
| `src/data/site.js` | Immutable navigation, feature, and CTA data consumed by interaction modules. |
| `src/assets/xs-mark.svg` | Local monochrome XS mark. |
| `src/styles/tokens.css` | Color, typography, spacing, elevation, and easing custom properties. |
| `src/styles/base.css` | Reset, typography, focus, accessibility, and global rules. |
| `src/styles/layout.css` | Desktop and mobile section composition. |
| `src/styles/components.css` | Buttons, feature rows, icons, and layered phone illustration styling. |
| `src/styles/motion.css` | Transform/opacity-only motion and reduced-motion overrides. |
| `src/scripts/mobile-nav.js` | Accessible mobile menu state helpers. |
| `src/scripts/feature-accordion.js` | Accessible mobile feature selection/expansion helpers. |
| `src/scripts/scroll-state.js` | Navigation active-state observation and one-time reveal helpers. |
| `src/main.js` | Binds interaction modules to the static DOM. |
| `tests/unit/mobile-nav.test.js` | Menu ARIA and visibility behavior. |
| `tests/unit/feature-accordion.test.js` | Feature selection, ARIA, and keyboard behavior. |
| `tests/e2e/landing.spec.js` | Desktop/mobile layout, public CTA, accessibility, and motion regression checks. |
| `.github/workflows/deploy-pages.yml` | Builds and deploys the Vite artifact to GitHub Pages. |
| `README.md` | Local preview, test, and published URL instructions. |

### Task 1: Create the testable Vite static-site foundation

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `src/main.js`
- Create: `tests/e2e/landing.spec.js`

**Interfaces:**
- Produces the commands `npm run dev`, `npm run build`, `npm test`, and `npm run test:e2e`.
- Produces a Vite build rooted at `index.html` with `base: '/xinovasu-landing/'` supplied by `vite.config.js`.

- [ ] **Step 1: Write the failing build and page-shell test**

```js
import { test, expect } from '@playwright/test';

test('serves a named XinovaSU main landmark', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main[aria-label="XinovaSU 产品介绍"]')).toBeVisible();
  await expect(page).toHaveTitle(/XinovaSU/);
});
```

- [ ] **Step 2: Run the test to verify the expected failure**

Run: `npm run test:e2e -- tests/e2e/landing.spec.js`

Expected: command fails because `package.json`, Vite configuration, and the page shell do not exist.

- [ ] **Step 3: Add the minimum project configuration and shell**

Create `package.json` with scripts exactly equivalent to:

```json
{
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:e2e": "playwright test"
  },
  "devDependencies": {
    "@playwright/test": "latest",
    "jsdom": "latest",
    "vite": "latest",
    "vitest": "latest"
  }
}
```

Create `vite.config.js` with `defineConfig({ base: '/xinovasu-landing/' })`; create `index.html` with `<title>XinovaSU — 内核级 Android Root</title>`, `<main aria-label="XinovaSU 产品介绍"></main>`, and `<script type="module" src="/src/main.js"></script>`; make `src/main.js` a no-op module until later tasks.

- [ ] **Step 4: Install and verify the foundation**

Run: `npm.cmd install`, then `npm.cmd run build`, then `npm.cmd run test:e2e -- tests/e2e/landing.spec.js`.

Expected: the build creates `dist/`; Playwright passes the shell test.

- [ ] **Step 5: Commit the isolated foundation**

```bash
git add package.json package-lock.json vite.config.js index.html src/main.js tests/e2e/landing.spec.js
git commit -m "build: scaffold static landing page"
```

### Task 2: Add verified copy, semantic page regions, and local brand assets

**Files:**
- Create: `src/data/site.js`
- Create: `src/assets/xs-mark.svg`
- Modify: `index.html`
- Modify: `tests/e2e/landing.spec.js`

**Interfaces:**
- `src/data/site.js` exports `features`, an array of five objects with `id`, `number`, `title`, `summary`, and `detail` strings.
- `index.html` provides IDs `about`, `capabilities`, `features`, and `technology` for navigation and link tests.

- [ ] **Step 1: Write failing content and link tests**

```js
test('contains all five approved features and public CTAs', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Hide 服务' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '网络隔离' })).toBeVisible();
  await expect(page.getByRole('link', { name: '下载最新版' }))
    .toHaveAttribute('href', 'https://github.com/kusesad-1122/XinovaSU/releases/latest');
  await expect(page.getByRole('link', { name: 'GitHub' }).first())
    .toHaveAttribute('href', 'https://github.com/kusesad-1122/XinovaSU');
});
```

- [ ] **Step 2: Run the test to verify the expected failure**

Run: `npm.cmd run test:e2e -- tests/e2e/landing.spec.js`

Expected: FAIL because the headings and CTA links have not been added.

- [ ] **Step 3: Implement semantic content without image dependencies**

Populate `index.html` with `header`, `nav`, `main`, six named `section` elements, and `footer`. Use the approved Chinese copy verbatim for Hero, about, four capabilities, five features, technical highlights, and KernelSU/GPL attribution. Use external links only for the GitHub repository, latest release, and the repository documentation path; add `rel="noreferrer"` to links opened in a new tab.

Export immutable feature data from `src/data/site.js`:

```js
export const features = Object.freeze([
  Object.freeze({ id: 'hide', number: '01', title: 'Hide 服务', summary: '隐藏 Bootloader 解锁 / verified-boot 状态', detail: '把一组 ro.boot.* 属性伪装成已锁定 / green。' }),
  Object.freeze({ id: 'umount', number: '02', title: 'Umount 服务', summary: '开机自动卸载指定挂载点', detail: '复用内核 try-umount，并可按 App 生效。' }),
  Object.freeze({ id: 'kernel-mask', number: '03', title: '内核伪装', summary: '伪装内核版本与构建时间', detail: '改写 utsname，使 uname、/proc/version、osrelease 报告伪装值。' }),
  Object.freeze({ id: 'path-hide', number: '04', title: '路径隐藏', summary: '向指定 App 隐藏文件与目录', detail: '命中路径对目标 App 返回 ENOENT，并从目录枚举中抹去名字。' }),
  Object.freeze({ id: 'network-isolation', number: '05', title: '网络隔离', summary: '内核层阻止所选 App 联网', detail: '通过 LSM 钩子按 App 拦截外发连接。' })
]);
```

Use local inline SVG for the five feature icons and `src/assets/xs-mark.svg` for the brand mark. Add meaningful `aria-label`s to purely graphical device layers and `aria-hidden="true"` to decorative grids and lines.

- [ ] **Step 4: Run content checks**

Run: `npm.cmd run build` and `npm.cmd run test:e2e -- tests/e2e/landing.spec.js`.

Expected: build passes; every specified heading and CTA passes its exact assertion.

- [ ] **Step 5: Commit semantic content**

```bash
git add index.html src/data/site.js src/assets/xs-mark.svg tests/e2e/landing.spec.js
git commit -m "feat: add XinovaSU landing page content"
```

### Task 3: Implement the white desktop and mobile composition

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/base.css`
- Create: `src/styles/layout.css`
- Create: `src/styles/components.css`
- Modify: `index.html`
- Modify: `tests/e2e/landing.spec.js`

**Interfaces:**
- `index.html` imports all four style files in the order tokens, base, layout, components.
- The desktop wrapper uses `.page-shell`; the mobile navigation trigger is `#mobile-menu-button`; capability rows use `.capability`.

- [ ] **Step 1: Write failing viewport tests**

```js
test('has distinct desktop and mobile compositions without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.locator('.hero-copy')).toBeVisible();
  await expect(page.locator('.phone-stage')).toBeVisible();
  await expect(page.locator('.capability')).toHaveCount(4);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('#mobile-menu-button')).toBeVisible();
  await expect(page.locator('body')).toEvaluate(body => body.scrollWidth <= window.innerWidth);
});
```

- [ ] **Step 2: Run the test to verify the expected failure**

Run: `npm.cmd run test:e2e -- tests/e2e/landing.spec.js`

Expected: FAIL because layout classes, responsive rules, and mobile trigger do not exist.

- [ ] **Step 3: Implement locked visual tokens and responsive layout**

Define in `tokens.css` at least `--page: #fff`, `--ink: #101114`, `--muted: #62666d`, `--line: #d9dde3`, `--accent: #2563eb`, `--container: 1400px`, and spacing values. In `base.css`, add `box-sizing: border-box`, accessible focus outlines, visible skip link, `scroll-behavior: smooth`, and a high-contrast body on `#fff`.

In `layout.css`, implement desktop 12-column hero, about/diagram split, four equal capability modules, sticky feature introduction with a five-row list, technical two-column proof layout, and ruled footer. At `max-width: 1023px`, replace each with the specified single-column sequence; hide desktop nav, show the menu trigger and one primary download action, stack CTAs, turn capability modules into sections, and release sticky positioning. Ensure `.page-shell { overflow: clip; }` only when it does not hide keyboard focus.

In `components.css`, use square or nearly square borders, no gradients, no pills, no generic bento cards, and `min-height: 44px` on primary controls.

- [ ] **Step 4: Run visual and overflow verification**

Run: `npm.cmd run build` and `npm.cmd run test:e2e -- tests/e2e/landing.spec.js`.

Expected: all viewport tests pass. Capture screenshots at `1440x1000` and `390x844`; verify pure white background, no cropped Chinese text, and no mobile horizontal scrollbar.

- [ ] **Step 5: Commit responsive composition**

```bash
git add index.html src/styles tests/e2e/landing.spec.js
git commit -m "feat: add responsive white editorial layout"
```

### Task 4: Build the independently animated phone and motion system

**Files:**
- Create: `src/styles/motion.css`
- Modify: `index.html`
- Modify: `src/styles/components.css`
- Modify: `tests/e2e/landing.spec.js`

**Interfaces:**
- Phone layers have stable selectors: `.phone-stage`, `.phone-body`, `.phone-screen`, `.module-panel[data-layer="su"]`, `.module-panel[data-layer="policy"]`, `.module-panel[data-layer="hide"]`, and `.kernel-node`.
- `motion.css` owns all keyframes and all `prefers-reduced-motion` overrides.

- [ ] **Step 1: Write failing independent-layer and reduced-motion tests**

```js
test('renders independently addressable phone layers and disables automatic motion when requested', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.phone-stage .module-panel')).toHaveCount(3);
  await expect(page.locator('.kernel-node')).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.phone-stage')).toHaveCSS('animation-name', 'none');
});
```

- [ ] **Step 2: Run the test to verify the expected failure**

Run: `npm.cmd run test:e2e -- tests/e2e/landing.spec.js`

Expected: FAIL because the phone layers and reduced-motion rule do not exist.

- [ ] **Step 3: Implement DOM/SVG phone layers and transform-only motion**

Add a decorative `.phone-stage` with a `.phone-body`, `.phone-screen`, three separate `.module-panel` elements, semantic screen labels, connecting SVG paths, and a `.kernel-node`. Use CSS `translate`, `rotateX`, `rotateY`, `scale`, and `opacity` only. Add keyframes named `phone-float`, `panel-rise`, `node-pulse`, and `reveal-up`; use staggered `animation-delay` values for panels.

Implement a `@media (hover: hover) and (min-width: 1024px)` pointer handler in `src/main.js` that sets CSS custom properties `--tilt-x` and `--tilt-y` from a clamped pointer offset, and resets them on `pointerleave`. Do not attach this handler on mobile. In `motion.css`, use `@media (prefers-reduced-motion: reduce)` to set all animation and transition durations to `0.01ms`, animation iteration count to `1`, and `.phone-stage { animation-name: none; }`.

- [ ] **Step 4: Verify motion performance and accessibility mode**

Run: `npm.cmd run test:e2e -- tests/e2e/landing.spec.js`.

Expected: phone layer and reduced-motion tests pass. Inspect Chrome DevTools or Playwright trace to confirm no animated layout properties; desktop screenshot shows the layered illustration and mobile screenshot shows no 3D tilt.

- [ ] **Step 5: Commit layered motion**

```bash
git add index.html src/main.js src/styles/components.css src/styles/motion.css tests/e2e/landing.spec.js
git commit -m "feat: animate layered kernel phone"
```

### Task 5: Add accessible navigation, feature selection, and scroll state

**Files:**
- Create: `src/scripts/mobile-nav.js`
- Create: `src/scripts/feature-accordion.js`
- Create: `src/scripts/scroll-state.js`
- Create: `tests/unit/mobile-nav.test.js`
- Create: `tests/unit/feature-accordion.test.js`
- Modify: `index.html`
- Modify: `src/main.js`

**Interfaces:**
- `setMenuOpen(button, panel, isOpen)` sets `aria-expanded`, `hidden`, and panel focusability.
- `activateFeature(rows, activeId)` returns the selected row and sets exactly one row's `aria-expanded` to `true`.
- `observeSections(links, sections)` returns an `IntersectionObserver` and keeps one navigation link marked `aria-current="true"`.

- [ ] **Step 1: Write failing unit tests**

```js
import { expect, test } from 'vitest';
import { setMenuOpen } from '../../src/scripts/mobile-nav.js';

test('opens a mobile menu with matching ARIA state', () => {
  document.body.innerHTML = '<button aria-expanded="false"></button><nav hidden></nav>';
  const [button, panel] = document.body.children;
  setMenuOpen(button, panel, true);
  expect(button.getAttribute('aria-expanded')).toBe('true');
  expect(panel.hidden).toBe(false);
});
```

```js
import { expect, test } from 'vitest';
import { activateFeature } from '../../src/scripts/feature-accordion.js';

test('selects one feature row and closes its siblings', () => {
  document.body.innerHTML = '<button data-feature="hide"></button><button data-feature="umount"></button>';
  const rows = [...document.querySelectorAll('button')];
  activateFeature(rows, 'umount');
  expect(rows[0].getAttribute('aria-expanded')).toBe('false');
  expect(rows[1].getAttribute('aria-expanded')).toBe('true');
});
```

- [ ] **Step 2: Run unit tests to verify the expected failure**

Run: `npm.cmd test -- tests/unit/mobile-nav.test.js tests/unit/feature-accordion.test.js`

Expected: FAIL because both modules are missing.

- [ ] **Step 3: Implement small state modules and bind them**

Implement `setMenuOpen` with `button.setAttribute('aria-expanded', String(isOpen))`, `panel.hidden = !isOpen`, and `panel.inert = !isOpen`. Implement `activateFeature` by iterating rows, matching `row.dataset.feature`, setting `aria-expanded`, applying `.is-active`, and returning the active row. Bind click, `Enter`, and `Space` in `main.js`; close the menu after a mobile anchor click.

Implement `observeSections` with `IntersectionObserver` at a `rootMargin` that activates the visible named section. Use `reveal-up` once for sections that opt in through `data-reveal`; do not mark content hidden before JavaScript initializes.

- [ ] **Step 4: Run unit and end-to-end interaction tests**

Add Playwright assertions that the mobile menu opens/closes, keyboard Space selects “网络隔离”, exactly one feature is expanded, and navigation gets an `aria-current` value. Run: `npm.cmd test` and `npm.cmd run test:e2e`.

Expected: both test suites pass with no console errors.

- [ ] **Step 5: Commit accessible interactions**

```bash
git add index.html src/main.js src/scripts tests/unit tests/e2e/landing.spec.js
git commit -m "feat: add accessible landing page interactions"
```

### Task 6: Package public GitHub Pages deployment and verify the artifact

**Files:**
- Create: `.github/workflows/deploy-pages.yml`
- Create: `README.md`
- Modify: `tests/e2e/landing.spec.js`

**Interfaces:**
- The workflow uploads `dist/` using `actions/upload-pages-artifact@v3` and deploys with `actions/deploy-pages@v4`.
- README names `https://kusesad-1122.github.io/xinovasu-landing/` as the expected public URL.

- [ ] **Step 1: Write a failing production-base-path and no-third-party-resource test**

```js
test('build output uses project-path-safe local assets only', async ({ page }) => {
  await page.goto('/xinovasu-landing/');
  const sources = await page.locator('link[href], script[src], img[src]').evaluateAll(nodes =>
    nodes.map(node => node.getAttribute('href') || node.getAttribute('src'))
  );
  expect(sources.every(source => !source || !/^https?:\/\//.test(source))).toBe(true);
});
```

- [ ] **Step 2: Run the test to verify the expected failure**

Run: `npm.cmd run build` then `npm.cmd run test:e2e -- tests/e2e/landing.spec.js` with the preview server base path configured.

Expected: FAIL until the Playwright web server and project base path are configured consistently.

- [ ] **Step 3: Add Pages workflow, preview configuration, and public documentation**

Create `.github/workflows/deploy-pages.yml` with `on.push.branches: [main]`, `workflow_dispatch`, `permissions: { contents: read, pages: write, id-token: write }`, a build job running `npm ci` and `npm run build`, and the Pages artifact/deploy actions. Add concurrency group `pages` with `cancel-in-progress: false`.

Configure Playwright's `webServer` to run `npm run dev -- --host 127.0.0.1` and base URL `http://127.0.0.1:5173`. Update the project-path test to navigate with Vite's configured base. Write README instructions for `npm.cmd install`, `npm.cmd run dev`, `npm.cmd test`, `npm.cmd run build`, plus the expected GitHub Pages URL and the repository setting “Settings → Pages → Source: GitHub Actions”.

- [ ] **Step 4: Verify local production artifact and deployment configuration**

Run: `npm.cmd run build`, `npm.cmd test`, and `npm.cmd run test:e2e`.

Expected: `dist/` exists, all asset references resolve beneath `/xinovasu-landing/`, tests pass, and `git diff --check` returns no output. After pushing to the public repository, confirm the GitHub Actions Pages workflow succeeds and open the public URL in an unauthenticated browser session.

- [ ] **Step 5: Commit deployment readiness**

```bash
git add .github/workflows/deploy-pages.yml README.md playwright.config.js tests/e2e/landing.spec.js
git commit -m "ci: deploy landing page to GitHub Pages"
```

## Plan Self-Review

- **Spec coverage:** Tasks 2–3 cover every approved content block and both layouts; Task 4 covers independent phone layers and motion; Task 5 covers keyboard, navigation, and mobile features; Task 6 covers public GitHub Pages deployment and anonymous URL verification.
- **Placeholder scan:** The plan contains no unresolved implementation markers; every task lists exact files, commands, expected failures, and expected passes.
- **Type consistency:** Task 5 defines the exact exported names consumed by `main.js`; Task 4 uses stable selectors that its Playwright test asserts; the GitHub Pages base in Tasks 1 and 6 is consistently `/xinovasu-landing/`.
