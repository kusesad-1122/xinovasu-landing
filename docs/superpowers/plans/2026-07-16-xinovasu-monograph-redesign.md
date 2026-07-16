# XinovaSU System Monograph Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current landing-page composition with the selected System Monograph hero while retaining verified XinovaSU content, links, accessibility, and responsive behavior.

**Architecture:** Keep the Vite static-page structure. Recompose `index.html` into semantic monograph sections, add one isolated `monograph.css` stylesheet for the visual system, and reuse the existing XOS and device assets. Existing script modules retain menu and feature-row interaction behavior.

**Tech Stack:** Static HTML, CSS, ES modules, Vite, Playwright, Vitest.

## Global Constraints

- Reuse `src/assets/xos-mark.svg` and `src/assets/xinovasu-device-reference.png`; do not draw substitute assets in CSS or inline SVG.
- Preserve latest-release, GitHub, and documentation links plus the existing five product features.
- Keep desktop and 390px mobile layouts free from horizontal overflow.
- Keep the device floor grid behind the device and respect `prefers-reduced-motion`.

---

### Task 1: Lock the selected hero structure in browser tests

**Files:**
- Modify: `tests/e2e/landing.spec.js`

**Interfaces:**
- Consumes: `.monograph-hero`, `.monograph-device`, `.monograph-notes` from `index.html`.
- Produces: an executable desktop/mobile hero contract.

- [ ] **Step 1: Write the failing test**

```js
test('renders the selected monograph hero at desktop and mobile widths', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/xinovasu-landing/');
  await expect(page.locator('.monograph-hero')).toBeVisible();
  await expect(page.locator('.monograph-device .reference-device')).toBeVisible();
  await expect(page.locator('.monograph-notes article')).toHaveCount(4);

  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.locator('body').evaluate((body) => body.scrollWidth <= window.innerWidth)).toBe(true);
  await expect(page.locator('.monograph-notes article').first()).toBeVisible();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/e2e/landing.spec.js -g "selected monograph hero"`

Expected: FAIL because `.monograph-hero` does not exist.

- [ ] **Step 3: Add final link and floor assertions**

```js
await expect(page.getByRole('link', { name: '下载最新版' }).first())
  .toHaveAttribute('href', 'https://github.com/kusesad-1122/XinovaSU/releases/latest');
await expect(page.locator('.monograph-device .ground-grid')).toHaveCount(1);
await expect(page.locator('.monograph-device')).toHaveCSS('background-image', 'none');
```

- [ ] **Step 4: Run the focused test**

Run: `npx playwright test tests/e2e/landing.spec.js -g "selected monograph hero"`

Expected: FAIL until Task 2 is implemented.

- [ ] **Step 5: Commit**

```bash
git add tests/e2e/landing.spec.js
git commit -m "test: cover monograph hero layout"
```

### Task 2: Recompose the semantic landing page

**Files:**
- Modify: `index.html`
- Create: `src/styles/monograph.css`

**Interfaces:**
- Consumes: existing product copy, external URLs, `.reference-device`, `.ground-grid`, `#mobile-menu`, and `data-feature`.
- Produces: `.monograph-hero`, `.monograph-copy`, `.monograph-device`, `.monograph-notes`, and `.proof-strip`.

- [ ] **Step 1: Link the focused stylesheet**

```html
<link rel="stylesheet" href="./src/styles/device.css" />
<link rel="stylesheet" href="./src/styles/monograph.css" />
```

- [ ] **Step 2: Replace only the hero with the selected composition**

```html
<section id="top" class="monograph-hero page-shell" aria-labelledby="hero-title">
  <div class="monograph-copy"><p class="eyebrow">KERNEL SPACE / XINOVASU</p><h1 id="hero-title">XinovaSU</h1><h2>内核级 Android Root ——<br />更深、更隐蔽、更可控</h2><p class="lead">在 Linux 内核层授予与管理 root 权限，而非用户态。基于 KernelSU 深度定制，内建一套面向隐蔽与对抗检测的内核功能。</p><div class="cta-row"><a class="button button-dark" href="https://github.com/kusesad-1122/XinovaSU/releases/latest" target="_blank" rel="noreferrer">下载最新版</a><a class="button button-ghost" href="https://github.com/kusesad-1122/XinovaSU" target="_blank" rel="noreferrer">GitHub</a><a class="text-link" href="./docs.html">使用文档 →</a></div></div>
  <div class="monograph-device product-stage">
    <div class="ground-grid" aria-hidden="true"></div>
    <img class="reference-device" src="./src/assets/xinovasu-device-reference.png" alt="白色手机底座上层叠的 XinovaSU 内核模块卡片" />
    <div class="device-mark" aria-hidden="true"><b>XinovaSU</b><span>KERNEL MODULE</span></div>
  </div>
  <aside class="monograph-notes" aria-label="核心能力索引"><article><span>01</span><div><b>内核级 SU 与鉴权</b><p>root 在内核授予，支持按 App 白名单授权。</p></div></article><article><span>02</span><div><b>模块系统 + WebUI</b><p>systemless 修改，兼容主流 KernelSU 模块生态。</p></div></article><article><span>03</span><div><b>挂载控制</b><p>开机自动挂载模块，并可按 App 卸载挂载点。</p></div></article><article><span>04</span><div><b>全 KMI 覆盖</b><p>跨 7 个 GKI KMI 构建验证，LKM 形态加载。</p></div></article></aside>
</section>
```

- [ ] **Step 3: Insert a continuous engineering proof strip after the hero**

```html
<section class="proof-strip page-shell" aria-label="工程级证明">
  <p>工程级证明</p>
  <dl><div><dt>7</dt><dd>GKI KMI 构建验证</dd></div><div><dt>LKM</dt><dd>内核模块形态加载</dd></div><div><dt>GPL</dt><dd>开源许可</dd></div></dl>
</section>
```

- [ ] **Step 4: Implement desktop layout**

```css
.monograph-hero{min-height:calc(100svh - 84px);display:grid;grid-template-columns:minmax(0,1fr) minmax(360px,.85fr) minmax(210px,.52fr);align-items:center;gap:clamp(24px,4vw,72px);padding-block:clamp(56px,7vw,104px)}
.monograph-device{min-height:640px;align-self:stretch}.monograph-notes{display:grid}.monograph-notes article{border-top:1px solid var(--line);padding:26px 0}.proof-strip{border-block:1px solid var(--line);display:grid;grid-template-columns:minmax(180px,.5fr) 1fr;gap:48px;padding-block:34px}.proof-strip dl{display:grid;grid-template-columns:repeat(3,1fr);margin:0}.proof-strip dl div{border-left:1px solid var(--line);padding-left:24px}
```

- [ ] **Step 5: Run the focused test**

Run: `npx playwright test tests/e2e/landing.spec.js -g "selected monograph hero"`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add index.html src/styles/monograph.css
git commit -m "feat: build monograph landing composition"
```

### Task 3: Add mobile composition and verify visual fidelity

**Files:**
- Modify: `src/styles/monograph.css`
- Modify: `tests/e2e/landing.spec.js`
- Create: `design-qa.md`

**Interfaces:**
- Consumes: monograph class names from Task 2 and the selected third Product Design image.
- Produces: 1440px/390px responsive rendering and a passing QA report.

- [ ] **Step 1: Write the mobile failing assertion**

```js
const note = page.locator('.monograph-notes article').first();
const noteBox = await note.evaluate((element) => element.getBoundingClientRect());
expect(noteBox.width).toBeGreaterThanOrEqual(300);
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test tests/e2e/landing.spec.js -g "selected monograph hero"`

Expected: FAIL until the 390px CSS rule exists.

- [ ] **Step 3: Implement the single-column mobile composition**

```css
@media (max-width:1023px){.monograph-hero{grid-template-columns:1fr;gap:28px;padding-block:48px}.monograph-copy{order:1}.monograph-device{order:2;min-height:430px}.monograph-notes{order:3}.monograph-notes article{display:grid;grid-template-columns:52px minmax(0,1fr);column-gap:18px}.proof-strip{grid-template-columns:1fr;gap:20px}.proof-strip dl{grid-template-columns:1fr}.proof-strip dl div{border-left:0;border-top:1px solid var(--line);padding:16px 0}}
@media (prefers-reduced-motion:reduce){.monograph-device .ground-grid,.monograph-device .reference-device{animation:none;transition:none}}
```

- [ ] **Step 4: Run all automated verification**

Run: `npm.cmd test && npm.cmd run test:e2e && npm.cmd run test:e2e:production && npm.cmd run build && git diff --check`

Expected: all tests pass, production build completes, and no whitespace errors are reported.

- [ ] **Step 5: Perform visual QA**

Capture 1440px and 390px browser views; compare the 1440px hero against the selected third generated image. Check central device prominence, thin rules, whitespace, restrained blue accent, readable copy, no grid overlay, menu opening, feature expansion, and no mobile horizontal overflow.

- [ ] **Step 6: Record the passing report**

Create `design-qa.md` containing the source mock path, implementation screenshots, viewport/state, full-view and hero comparison evidence, required fidelity-surface review, tested interactions, and exactly `final result: passed`.

- [ ] **Step 7: Commit**

```bash
git add src/styles/monograph.css tests/e2e/landing.spec.js design-qa.md
git commit -m "fix: polish responsive monograph landing"
```
