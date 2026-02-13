# 02 — Page Structure: Company Landing Page

Architektura sekcji, kolejność, komponenty i content slots dla strony firmowej. Bazuje na sprawdzonym flow CallWise, ale dostosowana pod firmę (nie produkt).

---

## 1. Section Order — Recommended Flow

```
Nav (sticky)
├── Hero — Kim jesteśmy + co robimy
├── Social Proof — Logo klientów / liczby
├── Services — Co oferujemy (karty usług)
├── Process — Jak pracujemy (3-4 kroki)
├── Case Studies / Portfolio — Dowody (projekty, wyniki)
├── Why Us — Differentiators (dlaczego my)
├── Team — Ludzie za firmą (opcjonalnie)
├── Testimonials — Opinie klientów
├── FAQ — Najczęstsze pytania
├── Final CTA — Domykający call-to-action
└── Footer
```

### Porównanie z CallWise

| CallWise (produkt) | Company LP | Dlaczego zmiana |
|---|---|---|
| Hero → Problems | Hero → Social Proof | Firma nie ma jednego "problemu" do rozwiązania |
| Problems → HowItWorks | Services → Process | Firma pokazuje zakres, potem metodologię |
| Benefits → DashboardPreview | Case Studies → Why Us | Portfolio > mockup dashboardu |
| Pricing → FAQ | Testimonials → FAQ | Firma rzadko ma publiczny cennik |
| CustomWork → FinalCTA | FAQ → FinalCTA | Identyczny pattern zamknięcia |

---

## 2. Section Specifications

### 2.1 Nav

Identyczny pattern jak CallWise. Sticky, glass, hamburger mobile.

```
┌─────────────────────────────────────────────────────┐
│ [Logo + Brand]     [Services] [Portfolio] [About] [Contact]   [CTA Button] │
└─────────────────────────────────────────────────────┘
```

**Elementy:**
- Logo + nazwa firmy (lewa strona)
- 3-5 anchor links do sekcji
- Language picker (jeśli i18n)
- Primary CTA button (prawa strona): "Porozmawiajmy" / "Let's Talk"

**Kod bazowy** — identyczny z `nav.astro` z CallWise. Zmień:
- Linki nawigacji (href="#services", "#portfolio", "#about", "#contact")
- CTA target (Calendly / formularz kontaktowy)
- Logo/brand name

---

### 2.2 Hero

**Cel:** W 5 sekund odpowiedzieć na: "Kim jesteście i dlaczego powinienem zostać?"

**Layout:**

```
┌──────────────────────────────────────────┐
│         gradient-mesh-strong bg          │
│                                          │
│     H1: [Linia 1 — biała]               │
│         [Linia 2 — text-gradient]        │
│     Subtitle: 1-2 zdania, muted         │
│                                          │
│     [Primary CTA]  [Secondary CTA]      │
│     micro-copy pod przyciskami           │
│                                          │
│     ┌──────────────────────────┐         │
│     │   Wizualizacja/Mockup   │         │
│     │   lub Pattern/Grafika   │         │
│     └──────────────────────────┘         │
└──────────────────────────────────────────┘
```

**Content slots:**
- `title_line1` — kontekst ("We build")
- `title_line2` — gradient highlight ("AI-powered software")
- `title_line3` — opcjonalnie ("that drives growth")
- `subtitle` — 1-2 zdania, max ~120 znaków
- `cta_primary` — "Porozmawiajmy" / "Let's Talk"
- `cta_secondary` — "Zobacz nasze realizacje" / "See Our Work"
- `cta_micro` — "Bezpłatna konsultacja • odpowiedź w 24h"

**Wizualizacja w hero (zamiast dashboard mockup):**
- Opcja A: Kolaż/grid 3-4 screenshotów zrealizowanych projektów w glass frame
- Opcja B: Abstrakcyjna grafika generatywna (np. gradient orbs + mesh)
- Opcja C: Typografia-only hero (bez grafiki, ale większy H1)

---

### 2.3 Social Proof

**Cel:** Natychmiastowa wiarygodność. Tuż pod hero.

**Layout:**

```
┌──────────────────────────────────────────┐
│  border-y border-white/[0.06]  bg tło   │
│                                          │
│  "Zaufali nam" / "Trusted by"           │
│  [Logo 1] [Logo 2] [Logo 3] [Logo 4]   │
│                                          │
│  Opcjonalnie: 3 statystyki              │
│  [12+ klientów] [50+ projektów] [5 lat] │
└──────────────────────────────────────────┘
```

**Wariant z liczbami (zalecany dla młodych firm):**

```html
<div class="grid grid-cols-2 gap-6 sm:grid-cols-4">
  <div class="text-center">
    <div class="text-3xl font-bold text-foreground">50+</div>
    <div class="mt-1 text-sm text-muted-foreground">Delivered Projects</div>
  </div>
  <!-- ... -->
</div>
```

**Reguła:** Jeśli brak rozpoznawalnych logo — użyj statystyk. Liczby > "Dołącz do 200+ firm".

---

### 2.4 Services

**Cel:** Jasna odpowiedź na "Co robicie?"

**Layout:** Grid 2×3 lub 3×2 kart.

```
┌──────────────────────────────────────────┐
│        gradient-mesh bg                  │
│                                          │
│   H2: "What We Do" (centered)           │
│   Subtitle: 1 zdanie (opcjonalne)       │
│                                          │
│   ┌──────┐  ┌──────┐  ┌──────┐          │
│   │ Icon │  │ Icon │  │ Icon │          │
│   │Title │  │Title │  │Title │          │
│   │ Desc │  │ Desc │  │ Desc │          │
│   └──────┘  └──────┘  └──────┘          │
│   ┌──────┐  ┌──────┐  ┌──────┐          │
│   │ Icon │  │ Icon │  │ Icon │          │
│   │Title │  │Title │  │Title │          │
│   │ Desc │  │ Desc │  │ Desc │          │
│   └──────┘  └──────┘  └──────┘          │
└──────────────────────────────────────────┘
```

**Karta usługi** — identyczny pattern jak `benefits.astro`:

```html
<div class="group rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 transition-all hover:border-primary/20 hover:bg-white/[0.05]">
  <div class="mb-4 inline-flex rounded-lg border border-primary/20 bg-primary/10 p-2.5 text-primary">
    <Icon />
  </div>
  <h3 class="mb-2 text-lg font-semibold text-foreground">{title}</h3>
  <p class="leading-relaxed text-muted-foreground text-[0.925rem]">{description}</p>
</div>
```

**Przykładowe usługi (AI/software house):**
1. Custom Software Development
2. AI & Machine Learning Solutions
3. Data Engineering & Analytics
4. Cloud Infrastructure & DevOps
5. UI/UX Design
6. Technical Consulting

---

### 2.5 Process — Jak pracujemy

**Cel:** Zniwelować niepewność. Pokazać przewidywalny, profesjonalny proces.

**Layout:** 3-4 kroki w linii (jak `how-it-works.astro`).

```
┌──────────────────────────────────────────┐
│  border-y bg-white/[0.02]               │
│                                          │
│  H2: "How We Work" (centered)           │
│                                          │
│  ①─────────────②─────────────③           │
│  Discovery    Build          Launch      │
│  Desc...      Desc...        Desc...     │
└──────────────────────────────────────────┘
```

**Connecting line (desktop):** dashed border jak CallWise.

**Step badge:** `"Step 1"` w `rounded-full bg-primary/10 text-primary text-xs uppercase`.

**Każdy krok:**
- Ikona w circle (gradient border)
- Step badge
- Title (H3)
- Short description (2-3 linijki)

**Typowe kroki firmy:**
1. **Discovery** — Poznajemy Twoje potrzeby i kontekst biznesowy
2. **Design & Architecture** — Projektujemy rozwiązanie i prototyp
3. **Build** — Iteracyjna implementacja z regularnymi demo
4. **Launch & Support** — Wdrażamy i wspieramy rozwój

---

### 2.6 Case Studies / Portfolio

**Cel:** Dowód kompetencji. "Zrobiliśmy to dla innych — zrobimy dla Ciebie."

**Layout:** 2-3 featured projects w dużych kartach.

```
┌──────────────────────────────────────────┐
│                                          │
│   H2: "Our Work" (centered)             │
│                                          │
│   ┌──────────────────────────────────┐   │
│   │  [Screenshot/visual]             │   │
│   │  Client name • Industry tag      │   │
│   │  "One-line result statement"     │   │
│   │  Key metric: +45% conversion     │   │
│   │  [View Case Study →]             │   │
│   └──────────────────────────────────┘   │
│                                          │
│   ┌──────────────┐ ┌──────────────┐      │
│   │  Project 2   │ │  Project 3   │      │
│   └──────────────┘ └──────────────┘      │
│                                          │
│   [See All Projects →]                   │
└──────────────────────────────────────────┘
```

**Featured project card:**

```html
<div class="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
  <!-- Screenshot area -->
  <div class="aspect-video bg-white/[0.02] p-1.5">
    <img class="rounded-xl object-cover" />
  </div>
  <!-- Content -->
  <div class="p-6">
    <div class="mb-2 flex items-center gap-2">
      <span class="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">SaaS</span>
      <span class="text-xs text-muted-foreground">Client Name</span>
    </div>
    <h3 class="mb-2 text-lg font-semibold">Result headline</h3>
    <p class="text-sm text-muted-foreground leading-relaxed">Brief description...</p>
    <div class="mt-4 flex items-center gap-4">
      <div class="text-2xl font-bold text-primary">+45%</div>
      <div class="text-xs text-muted-foreground">conversion rate</div>
    </div>
  </div>
</div>
```

**Jeśli brak case studies:** zamień na sekcję "Technologies" / "Our Expertise" z logo-gridem technologii, których używacie.

---

### 2.7 Why Us — Differentiators

**Cel:** Dlaczego my, a nie konkurencja?

**Layout:** Lewa strona — tekst, prawa — grid/lista lub odwrotnie.

```
┌──────────────────────────────────────────┐
│  ┌────────────────┐  ┌─────────────────┐ │
│  │ H2: Why Us     │  │ ✓ Differentiator│ │
│  │                │  │ ✓ Differentiator│ │
│  │ Paragraph      │  │ ✓ Differentiator│ │
│  │ describing     │  │ ✓ Differentiator│ │
│  │ approach       │  │ ✓ Differentiator│ │
│  └────────────────┘  └─────────────────┘ │
└──────────────────────────────────────────┘
```

**Alternatywny layout** (bardziej wizualny):
- 3-4 karty z icon + title + 1 zdanie (jak benefits)
- Różnica: treść o firmie, nie o features produktu

**Przykładowe differentiators:**
- "Senior-only team — brak juniorów na Twoim projekcie"
- "Fixed-price delivery — znasz koszt z góry"
- "AI-native — każde rozwiązanie optymalizowane pod ML"
- "End-to-end — od designu do DevOps"

---

### 2.8 Team (opcjonalna)

**Cel:** Humanizacja firmy. Budowanie zaufania.

**Layout:** Grid avatarów z imieniem i rolą.

```html
<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
  <div class="text-center">
    <img class="mx-auto h-24 w-24 rounded-full border-2 border-white/[0.06] object-cover" />
    <h4 class="mt-3 font-semibold text-foreground">Name</h4>
    <p class="text-sm text-muted-foreground">Role</p>
  </div>
</div>
```

**Reguła:** Max 4-8 osób. Więcej → "Meet the Team" link do podstrony.

---

### 2.9 Testimonials

**Cel:** Social proof z ludzkim głosem.

**Layout:** 2-3 karty cytatów.

```html
<div class="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
  <blockquote class="mb-4 text-base leading-relaxed text-foreground/90 italic">
    "Quote from client..."
  </blockquote>
  <div class="flex items-center gap-3">
    <img class="h-10 w-10 rounded-full" />
    <div>
      <div class="text-sm font-semibold text-foreground">Name</div>
      <div class="text-xs text-muted-foreground">Role, Company</div>
    </div>
  </div>
</div>
```

**Grid:** `grid gap-6 md:grid-cols-2 lg:grid-cols-3`

**Jeśli brak testimoniali:** pomiń sekcję lub zastąp "Trusted By" z logo klientów.

---

### 2.10 FAQ

**Identyczny pattern jak `faq.astro`** z CallWise — `<details>` z glassmorphism.

**Pytania firmowe (nie produktowe):**
1. Na jakie projekty się specjalizujecie?
2. Jak wygląda wasz proces?
3. Ile kosztuje typowy projekt?
4. Jak długo trwa realizacja?
5. Czy oferujecie wsparcie po wdrożeniu?
6. Jakie technologie używacie?

---

### 2.11 Final CTA

**Identyczny layout jak `final-cta.astro`** — gradient mesh strong, H2 + subtitle + 2 buttony.

**Content slots:**
- `title` — "Gotowy na rozmowę?" / "Ready to Build Something Great?"
- `subtitle` — "Opowiedz nam o swoim projekcie — bezpłatna konsultacja"
- `cta_primary` — "Umów konsultację" / "Book a Call"
- `cta_secondary` — "Napisz do nas" / "Send us a message"

---

### 2.12 Footer

**Identyczny pattern jak `footer.astro`** — 4-kolumnowy grid.

**Kolumny:**
1. **Brand** — Logo + tagline
2. **Services** — linki do sekcji usług
3. **Company** — About, Blog, Careers, Contact
4. **Legal** — Privacy Policy, Terms, Cookie Policy

**Bottom bar:** Copyright + "Built by [AwesomeWorks]"

---

## 3. Component Architecture

```
src/
├── components/
│   ├── nav.astro
│   ├── hero.astro
│   ├── social-proof.astro
│   ├── services.astro          # = benefits.astro pattern
│   ├── process.astro           # = how-it-works.astro pattern
│   ├── case-studies.astro      # NEW — portfolio grid
│   ├── why-us.astro            # = mini-benefits or split layout
│   ├── team.astro              # NEW (opcjonalne)
│   ├── testimonials.astro      # NEW
│   ├── faq.astro               # = identyczny pattern
│   ├── final-cta.astro         # = identyczny pattern
│   ├── footer.astro            # = identyczny pattern
│   └── language-picker.astro   # = identyczny
├── layouts/
│   ├── base.astro              # = identyczny (SEO, fonts, OG)
│   └── legal.astro             # = identyczny
├── pages/
│   ├── index.astro             # 302 → /en/
│   ├── en/
│   │   ├── index.astro
│   │   ├── privacy.astro
│   │   └── terms.astro
│   └── pl/
│       ├── index.astro
│       ├── privacy.astro
│       └── terms.astro
├── i18n/
│   ├── utils.ts
│   ├── en.json
│   └── pl.json
└── styles/
    └── globals.css
```

---

## 4. i18n JSON Structure

```json
{
  "nav": {
    "services": "Services",
    "portfolio": "Portfolio",
    "about": "About",
    "contact": "Contact",
    "cta": "Let's Talk"
  },
  "hero": {
    "title_line1": "We build",
    "title_line2": "intelligent software",
    "title_line3": "that drives results",
    "subtitle": "AI-powered applications, custom platforms, data solutions — from concept to launch.",
    "cta_primary": "Book a Free Call",
    "cta_secondary": "See Our Work",
    "cta_micro": "Free consultation • Response within 24h"
  },
  "social_proof": {
    "title": "Trusted by innovative companies",
    "stats": [
      { "value": "50+", "label": "Projects Delivered" },
      { "value": "12+", "label": "Happy Clients" },
      { "value": "5+", "label": "Years of Experience" },
      { "value": "99%", "label": "Client Retention" }
    ]
  },
  "services": {
    "title": "What We Do",
    "subtitle": "End-to-end software solutions powered by AI",
    "cards": [
      { "title": "...", "description": "..." }
    ]
  },
  "process": {
    "title": "How We Work",
    "steps": [
      { "number": "1", "title": "...", "description": "..." }
    ]
  },
  "case_studies": {
    "title": "Our Work",
    "subtitle": "Real projects, real results",
    "projects": [
      { "client": "...", "industry": "...", "headline": "...", "description": "...", "metric_value": "...", "metric_label": "..." }
    ],
    "cta": "See All Projects"
  },
  "why_us": {
    "title": "Why AwesomeWorks",
    "items": [
      { "title": "...", "description": "..." }
    ]
  },
  "testimonials": {
    "title": "What Our Clients Say",
    "items": [
      { "quote": "...", "name": "...", "role": "...", "company": "..." }
    ]
  },
  "faq": { "title": "...", "items": [{ "q": "...", "a": "..." }] },
  "final_cta": { "title": "...", "subtitle": "...", "cta_primary": "...", "cta_secondary": "..." },
  "footer": { "..." : "..." }
}
```

---

## 5. Reusability Map — Components to Copy from CallWise

| CallWise component | Reuse? | Changes needed |
|---|---|---|
| `nav.astro` | ✅ Copy | Change links, CTA text, logo |
| `hero.astro` | ✅ Copy | Replace dashboard mockup → portfolio grid or abstract visual |
| `benefits.astro` | ✅ Copy → `services.astro` | Different icons, titles, descriptions |
| `how-it-works.astro` | ✅ Copy → `process.astro` | Different steps content |
| `dashboard-preview.astro` | ❌ Skip | Replace with `case-studies.astro` |
| `pricing.astro` | ❌ Skip | Company LP rarely needs public pricing |
| `problems.astro` | ❌ Skip | Replace concept with `why-us.astro` |
| `faq.astro` | ✅ Copy | Different questions |
| `custom-work.astro` | ❌ Skip | Merge into final CTA |
| `final-cta.astro` | ✅ Copy | Different text |
| `footer.astro` | ✅ Copy | Different link columns |
| `language-picker.astro` | ✅ Copy | No changes |
| `base.astro` layout | ✅ Copy | Change JSON-LD to Organization, OG meta |
| `legal.astro` layout | ✅ Copy | No changes |
| `globals.css` | ✅ Copy | Change primary color hues |
| `tailwind.config.mjs` | ✅ Copy | No changes (maybe brand color) |
| `i18n/utils.ts` | ✅ Copy | No changes |

**Nowe komponenty:**
- `social-proof.astro` — stat grid + logo row
- `case-studies.astro` — portfolio cards
- `testimonials.astro` — quote cards
- `team.astro` (opcjonalnie)
- `why-us.astro` — differentiator cards/list
