# 01 — Design System for Company Landing Page

Adaptacja AwesomeWorks Design System na stronę firmową. Projekt podąża tymi samymi regułami co CallWise — glassmorphism, dark-mode-first, system kolorów HSL, Inter font — ale z innym kolorem wiodącym i tonem wizualnym odpowiednim dla firmy (nie produktu).

---

## 1. Brand Color — zmiana koloru wiodącego

CallWise używa **purple** (`270 60% 52%`). Strona firmowa powinna mieć **własny kolor wiodący** — np. blue (`210 70% 50%`), teal (`175 65% 45%`), lub wariant purple.

### Procedura zmiany koloru

Zamień **wyłącznie** te zmienne w `globals.css`:

```css
:root {
  /* === ZMIEŃ TE 4 WARTOŚCI === */
  --primary: 210 70% 50%;           /* Nowy kolor wiodący */
  --ring: 210 70% 50%;              /* = primary */
  --secondary: 210 25% 95%;         /* primary hue, niska saturacja */
  --accent: 220 35% 94%;            /* primary hue ± 10° */

  /* === NIE ZMIENIAJ === */
  --background: 250 20% 97%;
  --foreground: 250 25% 10%;
  --muted: 260 15% 93%;
  --muted-foreground: 260 10% 45%;
  --border: 260 20% 92%;
  --destructive: 0 72% 51%;
  --success: 152 60% 40%;
  --warning: 38 92% 50%;
}

.dark {
  --primary: 210 70% 60%;           /* +8-10% lightness */
  --ring: 210 70% 60%;
  --secondary: 210 15% 12%;
  --accent: 220 30% 14%;
}
```

### Gradient mesh — dostosuj odcienie

```css
.gradient-mesh {
  background-image:
    radial-gradient(at 20% 20%, hsl(210 70% 50% / 0.08) 0px, transparent 60%),
    radial-gradient(at 80% 40%, hsl(230 55% 55% / 0.06) 0px, transparent 60%),
    radial-gradient(at 50% 90%, hsl(190 50% 50% / 0.05) 0px, transparent 60%);
}
.gradient-mesh-strong {
  background-image:
    radial-gradient(at 20% 20%, hsl(210 70% 50% / 0.15) 0px, transparent 50%),
    radial-gradient(at 80% 30%, hsl(230 55% 55% / 0.12) 0px, transparent 50%),
    radial-gradient(at 40% 80%, hsl(190 50% 50% / 0.08) 0px, transparent 50%);
}
```

### Gradienty na przyciskach CTA

Zamień `from-purple-600 to-violet-600` na odpowiednik nowego koloru:

```html
<!-- CallWise (purple) -->
<a class="bg-gradient-to-r from-purple-600 to-violet-600 shadow-purple-500/25">

<!-- Company (blue) -->
<a class="bg-gradient-to-r from-blue-600 to-cyan-600 shadow-blue-500/25">
```

### Text gradient (hero heading)

```css
.text-gradient {
  background-image: linear-gradient(
    135deg,
    hsl(210 70% 60%),    /* primary */
    hsl(230 60% 65%),    /* shifted +20° */
    hsl(250 55% 60%)     /* shifted +40° */
  );
}
```

---

## 2. Typography

Identyczna jak w CallWise — **Inter** (Google Fonts / `@fontsource-variable/inter`).

| Element | Klasa | Uwagi |
|---|---|---|
| H1 (hero) | `text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight` | Jedyny `extrabold` na stronie |
| H2 (sekcje) | `text-3xl sm:text-4xl font-bold tracking-tight` | Centered, z animacją scroll |
| H3 (karty) | `text-lg font-semibold` lub `text-xl font-semibold` | |
| Body | `text-base` lub `text-[0.925rem]` | `leading-relaxed` dla dłuższych paragrafów |
| Labels/meta | `text-xs font-semibold uppercase tracking-wider` | Dla badge'ów, krokowych oznaczeń |
| Muted text | `text-sm text-muted-foreground` | Opisy, subtitles |

### Reguły

- Nigdy font-weight < 400
- `leading-relaxed` na paragrafach > 2 linii
- `tracking-tight` na headingach
- Hero subtitle: `text-lg sm:text-xl text-muted-foreground leading-relaxed`

---

## 3. Glassmorphism — reguły efektów szklanych

Dark-mode-first. Wszystkie powierzchnie są przezroczyste z blur.

### Główne wzorce

| Element | Light | Dark |
|---|---|---|
| **Karta sekcji** | `border-white/20 bg-white/60 backdrop-blur-xl` | `border-white/[0.06] bg-white/[0.03] backdrop-blur-xl` |
| **Karta hover** | `hover:border-primary/20 hover:bg-white/[0.05]` | j.w. |
| **Ikona w kontenerze** | `bg-primary/10 text-primary border-primary/20` | j.w. |
| **Nav (sticky)** | `bg-background/80 backdrop-blur-xl border-b border-white/[0.06]` | j.w. |
| **Nested panel** | `border-white/15 bg-white/30 backdrop-blur-sm` | `border-white/[0.06] bg-white/[0.03]` |
| **Input** | `bg-white/60 border-white/20` | `bg-white/[0.04] border-white/[0.08]` |
| **Badge** | `bg-primary/10 text-primary border-primary/20` | j.w. |
| **Separator** | `border-white/[0.06]` | j.w. |

### CSS utility classes (do skopiowania)

```css
.glass {
  @apply border border-white/[0.06] bg-white/[0.04] shadow-lg shadow-black/20 backdrop-blur-xl;
}
.glass-subtle {
  @apply border border-white/[0.04] bg-white/[0.02] backdrop-blur-md;
}
```

### Glow effects

```css
.glow-sm {
  box-shadow:
    0 0 15px -3px hsl(var(--primary) / 0.15),
    0 0 6px -4px hsl(var(--primary) / 0.1);
}
.glow-primary {
  box-shadow:
    0 0 20px -5px hsl(var(--primary) / 0.3),
    0 4px 6px -4px hsl(var(--primary) / 0.1);
}
```

---

## 4. Spacing & Border Radius

### Spacing

| Pattern | Wartość |
|---|---|
| Page max-width | `max-w-6xl` (1152px) |
| Page padding | `px-4 sm:px-6 lg:px-8` |
| Section padding | `py-20 sm:py-28` |
| Grid gap | `gap-6` (karty), `gap-8 md:gap-12` (kroki) |
| Between sections (visual) | `border-y border-white/[0.06]` co 2-3 sekcje |
| Card inner padding | `p-6 sm:p-7` lub `p-7 sm:p-8` |
| Section heading → content | `mb-12` do `mb-16` |

### Border radius

| Token | Wartość | Użycie |
|---|---|---|
| `rounded-xl` | 12px | Karty, buttony, ikony, inputy |
| `rounded-2xl` | 16px | Hero mockup, pricing cards, modals |
| `rounded-lg` | `var(--radius)` | Generic containers |
| `rounded-full` | 50% | Badge'e, awatary, step number circles |

---

## 5. Buttons / CTA

### Primary CTA

```html
<a class="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[brand-600] to-[brand-accent-600] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[brand-500]/25 transition-all hover:shadow-xl hover:shadow-[brand-500]/30 hover:brightness-110">
  Label
  <svg class="h-4 w-4 transition-transform group-hover:translate-x-0.5">→</svg>
</a>
```

### Secondary CTA (ghost/outline)

```html
<a class="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-8 py-3.5 text-base font-semibold text-foreground transition-all hover:bg-white/[0.08]">
  Label
  <svg class="h-4 w-4">→</svg>
</a>
```

### Reguła: zawsze para CTAs

Hero i Final CTA mają **dwa przyciski** obok siebie:
1. Primary gradient (mocna akcja)
2. Secondary ghost (łagodna alternatywa)

Mobile: stack vertically (`flex-col sm:flex-row`).

---

## 6. Animacje

| Co | Implementacja |
|---|---|
| Scroll reveal | `.animate-on-scroll` + IntersectionObserver → dodaje `.visible` |
| Transition | `opacity 0.6s ease-out, transform 0.6s ease-out` |
| Start state | `opacity: 0; transform: translateY(20px)` |
| Staggered delay | `style="transition-delay: ${idx * 80}ms"` per card |
| Hover scale | `hover:brightness-110` na CTA, `hover:border-primary/20` na kartach |
| Float anim | `animate-float` (6s ease-in-out infinite, ±8px Y) — dla mockup hero |
| Interaktywne | `transition-all duration-200` — snappy, nigdy > 200ms |

### IntersectionObserver (do skopiowania)

```html
<script>
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
</script>
```

---

## 7. Responsive

| Viewport | Breakpoint | Layout |
|---|---|---|
| Mobile | < 768px (`md`) | Single column, hamburger nav, `px-4` |
| Tablet | 768px – 1024px | 2 columns grid, desktop nav |
| Desktop | > 1024px | 3 columns grid, full width |

### Nav responsive

- Desktop: `hidden md:flex` — inline links + CTA button
- Mobile: hamburger → dropdown panel z `backdrop-blur-xl`
- Sticky: `fixed top-0 z-50 bg-background/80 backdrop-blur-xl`

### Grid responsive

```html
<!-- 1 col → 2 col → 3 col -->
<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
```

---

## 8. Dark Mode

Strona firmowa — tak jak CallWise — jest **dark-mode-first**. Klasa `dark` na `<html>`.

### Kluczowe zasady

1. Wszystkie `bg-white/60` → stają się `bg-white/[0.04]` w dark
2. Borders: `border-white/20` → `border-white/[0.06]`
3. Shadows: `shadow-black/[0.03]` → `shadow-black/20`
4. Primary lightens +8-10% lightness w dark mode
5. **Zawsze definiuj dark variant** — żaden komponent nie może wyglądać źle

### Jeśli strona ma TYLKO dark mode

Uprość — ustaw zmienne dark bezpośrednio w `:root` i pomiń `.dark` block. Dodaj `class="dark"` na `<html>` jak CallWise.

---

## 9. Quick Setup Checklist

1. [ ] Skopiuj `globals.css` z CallWise landing
2. [ ] Skopiuj `tailwind.config.mjs`
3. [ ] Zamień `--primary`, `--ring`, `--secondary`, `--accent` na nowy kolor
4. [ ] Zaktualizuj gradient-mesh hues
5. [ ] Zamień gradient CTA (`from-purple-600 to-violet-600` → nowy)
6. [ ] Zamień `.text-gradient` hues
7. [ ] Zamień `shadow-purple-500/25` → `shadow-[newcolor]-500/25`
8. [ ] Zainstaluj: `@fontsource-variable/inter`, `tailwindcss`, `@astrojs/tailwind`
9. [ ] Zweryfikuj: Lighthouse contrast ratio ≥ 4.5:1 na wszystkich tekstach
