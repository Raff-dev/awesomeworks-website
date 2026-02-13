# 04 — Astro Performance Guide

Optymalizacja wydajności strony firmowej w Astro. Cel: Lighthouse Performance ≥ 95, LCP < 1.5s, zero CLS, TTI < 2s.

---

## 1. Why Astro — Fundamentals

Astro jest idealny na landing page bo:

1. **Zero JS by default** — strony statyczne, 0 kB JavaScript shipped jeśli nie dodasz interaktywności
2. **Islands architecture** — React/Vue/Svelte tylko tam gdzie potrzebna interaktywność
3. **Static Site Generation (SSG)** — pre-rendered HTML, instant load
4. **Built-in image optimization** — `<Image>` component z auto WebP/AVIF
5. **Scoped CSS** — brak global CSS conflicts

### CallWise landing — co robi dobrze

- Pure Astro components (`.astro`) — zero React islands na głównej stronie
- `@astrojs/react` only for potential interactive widgets
- IntersectionObserver w vanilla JS (nie React) — zero framework overhead
- Inter font via `@fontsource-variable` — no Google Fonts external request

---

## 2. Project Config — Optimized `astro.config.mjs`

```javascript
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import compressIntegration from "astro-compress"; // opcjonalnie

export default defineConfig({
  site: "https://awesomeworks.ai",
  output: "static",                    // SSG — domyślne, ale explicit
  compressHTML: true,                  // Minify HTML output
  build: {
    inlineStylesheets: "auto",         // Inline małe CSS, link duże
  },
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", pl: "pl" },
      },
    }),
    // Opcjonalnie: kompresja HTML/CSS/JS/SVG/images
    // compressIntegration(),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pl"],
    routing: { prefixDefaultLocale: true },
  },
  vite: {
    build: {
      cssMinify: "lightningcss",       // Szybsza minifikacja CSS
    },
  },
});
```

### Kiedy NIE dodawać React

CallWise landing ładuje `@astrojs/react` ale **nie używa żadnego React component na stronie**. To dodaje zbędny overhead.

**Reguła:** Nie dodawaj `@astrojs/react` jeśli nie masz interaktywnych widgetów. Scroll animations, hamburger menu, FAQ `<details>` — to wszystko działa w vanilla JS/Astro.

**Kiedy React jest uzasadniony:**
- Formularz kontaktowy z walidacją real-time (React Hook Form)
- Interaktywna mapa / widget kalendarza
- Live chat widget

W tych przypadkach użyj `client:visible` (lazy load):

```astro
<ContactForm client:visible />
```

---

## 3. Images — Largest Contentful Paint (LCP)

### 3.1 Use Astro's `<Image>` Component

```astro
---
import { Image } from "astro:assets";
import heroImage from "../assets/hero.png";
---

<Image
  src={heroImage}
  alt="Project screenshot"
  width={1200}
  height={630}
  format="webp"
  quality={80}
  loading="eager"     <!-- TYLKO dla above-the-fold -->
  decoding="async"
/>
```

**Reguły:**
- `loading="eager"` TYLKO dla hero image (LCP element)
- Wszystko poniżej fold: `loading="lazy"` (domyślne)
- Zawsze podaj `width` i `height` — zapobiega CLS
- Format: `webp` (lub `avif` dla 30% mniejszych plików, ale wolniejsze encode)

### 3.2 Background Images / Decorative

Dla gradient mesh i orbs — **NIE używaj obrazów**. CallWise pattern z CSS gradientami jest idealny:

```css
/* Zero HTTP requests, zero CLS, instant render */
.gradient-mesh {
  background-image:
    radial-gradient(at 20% 20%, hsl(210 70% 50% / 0.08) 0px, transparent 60%),
    radial-gradient(at 80% 40%, hsl(230 55% 55% / 0.06) 0px, transparent 60%);
}
```

### 3.3 Logo & Icons

- Logo SVG inline (nie `<img>`) — instant render, zero requests
- Ikony: inline SVG (jak CallWise) zamiast icon font library
- Favicon: `favicon.svg` (scalable) + `favicon.ico` fallback + `apple-touch-icon.png`

### 3.4 OG Images

OG images nie wpływają na page speed (nie ładowane w przeglądarce), ale:
- Optymalizuj rozmiar pliku (< 200 kB)
- Umieść w `public/` — nie przetwarzane przez Astro image pipeline

---

## 4. Fonts — Eliminating FOUT/FOIT

### 4.1 Self-hosted with @fontsource (CallWise pattern)

```bash
pnpm add @fontsource-variable/inter
```

```astro
<!-- base.astro -->
---
import "@fontsource-variable/inter";
---
```

**Dlaczego, a nie Google Fonts CDN:**
- Zero external DNS lookup (−100-200ms)
- Zero render-blocking external request
- Font served from same origin = HTTP/2 multiplexing
- Privacy (no Google tracking)

### 4.2 Font Display Strategy

Fontsource domyślnie ustawia `font-display: swap` — tekst widoczny natychmiast z system font, podmiana na Inter gdy załadowany.

### 4.3 Subset

Fontsource `@fontsource-variable/inter` generuje variable font z latin subset (~70 kB). Jeśli potrzeba polskich znaków — latin + latin-ext (domyślnie w paczce).

### 4.4 Preload (opcjonalna optymalizacja)

```html
<link rel="preload" href="/fonts/inter-variable-latin.woff2" as="font" type="font/woff2" crossorigin />
```

Używaj tylko jeśli Lighthouse raportuje font jako LCP blocker.

---

## 5. CSS — Tailwind Optimization

### 5.1 Purging

Tailwind 3 automatycznie purge'uje nieużywane klasy w production build. Upewnij się że `content` pokrywa wszystkie pliki:

```javascript
// tailwind.config.mjs
content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
```

### 5.2 Inline vs External

Astro `build.inlineStylesheets: "auto"` (domyślne):
- Inline CSS < 4 kB (eliminuje render-blocking request)
- External CSS > 4 kB (cache'owalny)

Dla landing page (~10-15 kB CSS po purge) — prawdopodobnie zostanie inlined. To idealne.

### 5.3 Avoid CSS-in-JS

Zero CSS-in-JS libraries (styled-components, emotion). Tailwind utilitites + Astro scoped styles = najszybsza opcja.

---

## 6. JavaScript — Minimizing Bundle

### 6.1 CallWise landing JS audit

CallWise używa tylko:
1. IntersectionObserver for scroll animations (~20 lines)
2. Mobile menu toggle (~15 lines)

**Total: ~35 lines vanilla JS, 0 KB framework overhead.**

### 6.2 Guidelines for Company LP

| Feature | Implementation | JS Cost |
|---|---|---|
| Scroll animations | `IntersectionObserver` in `<script>` | ~500 bytes |
| Mobile menu | Vanilla toggle (classList) | ~300 bytes |
| FAQ accordion | Native `<details>` element | **0 bytes** |
| Smooth scroll | `html { scroll-behavior: smooth }` CSS | **0 bytes** |
| Language picker | `<a>` link (no JS) | **0 bytes** |
| Contact form | **React island** `client:visible` or native `<form>` | 0–40 kB |
| Cookie consent | Vanilla JS or Astro island | ~2 kB |
| Analytics | Async script tag | External |

### 6.3 Island Architecture

Jeśli dodajesz React component (np. formularz):

```astro
<!-- Ładuj TYLKO gdy element wejdzie w viewport -->
<ContactForm client:visible />

<!-- Ładuj TYLKO na idle (po załadowaniu strony) -->
<ChatWidget client:idle />

<!-- NIE używaj client:load — blokuje rendering -->
<!-- ❌ <HeavyWidget client:load /> -->
```

**Priority:**
1. `client:visible` — najlepsza opcja, zero cost do momentu scroll
2. `client:idle` — ładuje po first paint, nie blokuje
3. `client:load` — **unikaj** — ładuje natychmiast, blokuje

### 6.4 Third-Party Scripts

```html
<!-- Analytics — ZAWSZE async + defer -->
<script async defer src="https://analytics.example.com/script.js"></script>

<!-- Albo jeszcze lepiej — ładuj po interakcji -->
<script>
  // Ładuj analytics dopiero po pierwszej interakcji użytkownika
  const loadAnalytics = () => {
    const s = document.createElement("script");
    s.src = "https://analytics.example.com/script.js";
    s.async = true;
    document.head.appendChild(s);
    // Cleanup listeners
    ["scroll", "click", "touchstart"].forEach((e) =>
      document.removeEventListener(e, loadAnalytics, { once: true })
    );
  };
  ["scroll", "click", "touchstart"].forEach((e) =>
    document.addEventListener(e, loadAnalytics, { once: true, passive: true })
  );
</script>
```

---

## 7. Caching & Deployment

### 7.1 Static Assets Cache Headers

Astro hashed assets (JS/CSS) → immutable cache:

```
# Caddy example
@hashed path_regexp hashed /_astro/.+\.[a-f0-9]{8}\..+$
header @hashed Cache-Control "public, max-age=31536000, immutable"

# HTML — short cache, revalidate
header /en/* Cache-Control "public, max-age=3600, must-revalidate"
header /pl/* Cache-Control "public, max-age=3600, must-revalidate"
```

### 7.2 Compression

Caddy automatycznie kompresuje (gzip + brotli). Astro output jest pre-minified.

Opcjonalnie dodaj `astro-compress` integration:
```bash
pnpm add astro-compress
```

Kompresuje HTML, CSS, JS, SVG w build time — mniejsze pliki na dysku = szybszy transfer nawet przed serwer-side compression.

### 7.3 CDN

Dla globalnej szybkości — postaw Caddy za Cloudflare (free plan):
- Auto brotli compression
- Global edge caching
- DDoS protection
- Free SSL

---

## 8. Performance Budget

| Metric | Target | CallWise Actual |
|---|---|---|
| Lighthouse Performance | ≥ 95 | ~98 (pure static) |
| First Contentful Paint | < 1.0s | ~0.6s |
| Largest Contentful Paint | < 1.5s | ~0.8s |
| Cumulative Layout Shift | < 0.05 | 0.00 (no images in hero) |
| Time to Interactive | < 2.0s | ~0.8s (almost no JS) |
| Total Bundle Size (JS) | < 10 kB | ~1 kB (vanilla only) |
| Total CSS | < 15 kB | ~12 kB (Tailwind purged) |
| HTML size | < 30 kB | ~20 kB per page |

### Reguły budgetowe

1. **Zero framework JS** jeśli nie ma interaktywnych widgetów
2. **Każdy nowy `client:*` island** wymaga uzasadnienia (co daje userowi?)
3. **Każdy third-party script** musi być lazy-loaded (po interakcji)
4. **Obrazy**: max 200 kB per image, WebP/AVIF, responsive sizes
5. **Fonts**: max 1 font family, variable weight, self-hosted

---

## 9. Build & Test Workflow

```bash
# Build
pnpm build

# Preview locally
pnpm preview

# Measure performance
npx lighthouse https://localhost:4321/en/ --output html --output-path ./lighthouse.html

# Check HTML size
ls -la dist/en/index.html

# Check total output
du -sh dist/
```

### CI Pipeline Check

```yaml
- name: Build landing
  run: cd landing && pnpm build

- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v12
  with:
    urls: |
      http://localhost:4321/en/
      http://localhost:4321/pl/
    budgetPath: ./budget.json
```

### budget.json

```json
[
  {
    "path": "/*",
    "timings": [
      { "metric": "first-contentful-paint", "budget": 1000 },
      { "metric": "largest-contentful-paint", "budget": 1500 },
      { "metric": "interactive", "budget": 2000 }
    ],
    "resourceSizes": [
      { "resourceType": "script", "budget": 10 },
      { "resourceType": "stylesheet", "budget": 15 },
      { "resourceType": "document", "budget": 30 },
      { "resourceType": "total", "budget": 200 }
    ]
  }
]
```

---

## 10. Anti-Patterns — Co NIE robić

| Anti-pattern | Dlaczego źle | Co zamiast |
|---|---|---|
| `@astrojs/react` bez React components | Dodaje React do bundle | Usuń jeśli nie używasz |
| `client:load` na czymkolwiek | Blokuje rendering | `client:visible` lub `client:idle` |
| Google Fonts `<link>` tag | External render-blocking request | `@fontsource-variable/inter` |
| `<img>` bez width/height | Powoduje CLS | Astro `<Image>` component |
| Duże hero image bez lazy/eager | Spowalnia LCP | `loading="eager"` na LCP image only |
| CSS-in-JS | Runtime overhead, duży bundle | Tailwind utilities |
| Wiele fontów (2+ families) | Każdy ~70-100 kB | Max 1 rodzina, variable |
| Inline huge SVGs (>5 kB) | Zwiększa HTML size | External SVG z `<img>` |
| Analytics w `<head>` bez async | Blokuje rendering | Async + lazy-load po interakcji |
| npm packages w Astro frontmatter | Included in server build, OK | Ale unikaj heavy libs |
