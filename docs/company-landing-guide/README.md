# Company Landing Page — Redesign Guide

Blueprint for rebuilding the AwesomeWorks company landing page, following the same design language and patterns as CallWise (product landing).

## Key difference: Company vs Product landing

| Aspect | Product LP (CallWise) | Company LP (AwesomeWorks) |
|---|---|---|
| **Goal** | Convert visitors → trial/demo signup | Build trust → contact/inquiry |
| **Hero** | Product value prop, one clear CTA | Mission + authority, multiple entry points |
| **Proof** | Dashboard mockup, feature metrics | Portfolio, case studies, client logos |
| **Sections** | Problems → Solution → Features → Pricing | Who we are → What we do → How we work → Results |
| **Tone** | "We solve your problem X" | "We're the team that builds solutions" |
| **CTA** | "Start free trial" / "Book demo" | "Let's talk" / "See our work" |
| **Structured Data** | SoftwareApplication + FAQ | Organization + LocalBusiness + FAQ |

## Documents

| # | File | Contents |
|---|---|---|
| 1 | [01-design-system.md](01-design-system.md) | Visual design: colors, glass effects, typography, dark mode, theming for company brand |
| 2 | [02-page-structure.md](02-page-structure.md) | Section order, content architecture, component breakdown, layout patterns |
| 3 | [03-seo-and-metadata.md](03-seo-and-metadata.md) | Technical SEO, structured data (JSON-LD), meta tags, i18n hreflang, sitemap |
| 4 | [04-astro-performance.md](04-astro-performance.md) | Astro speed optimization: islands, image handling, fonts, CSS, build config |
| 5 | [05-copywriting-guide.md](05-copywriting-guide.md) | Benefit-driven language, company vs product messaging, section-by-section copy framework |

## Workflow

1. Start with **01-design-system** — decide brand color, swap CSS variables
2. Read **02-page-structure** — map out sections and components
3. Write copy using **05-copywriting-guide** framework
4. Implement in Astro following **04-astro-performance** patterns
5. Configure SEO per **03-seo-and-metadata**
6. Test: Lighthouse, PageSpeed Insights, structured data validator
