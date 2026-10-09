# 🎯 AI Landing Generator

**Describe your business in 1–2 sentences → get a complete, professional landing page in seconds.**

🌐 **Live demo:** https://ai-landing-generator-p7htz5x3h-carlosreyesafks-projects.vercel.app

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)

## What it does

Type your business name, a short description, pick an industry and a tone — the intelligent template engine generates a full landing page instantly:

- **Hero** — headline + subheadline + dual CTAs, tailored to your industry
- **Stats bar** — social proof numbers
- **Features** — 4 benefit-driven cards with icons
- **Testimonials** — realistic customer stories
- **Pricing** — 3 tiers with a highlighted plan
- **Final CTA + footer** — conversion-focused closing

Every industry (10 included: restaurant, fitness, dental, legal, real estate, salon, SaaS, e-commerce, photography, consulting) has its own copy bank, color palette and typography. Three tones — Professional, Fun & Bold, Luxury — reshape the voice. Hit **Regenerate** for fresh variations.

Export your page with **Copy HTML** or **Download HTML** — a standalone file with inline styles, ready to host anywhere.

## How it works

No AI API keys needed. A seeded template engine (`lib/generator.ts`) combines:

1. **Industry content banks** — headlines, features, testimonials, pricing per vertical
2. **Tone modifiers** — adjectives, CTAs and trust signals per voice
3. **Seeded randomization** — every regeneration produces new, coherent variations
4. **Dynamic theming** — each industry gets its own palette and display font

## Stack

`Next.js 14` (App Router) · `TypeScript` · `Tailwind CSS` · Static export → Vercel

## Run it locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Project structure

```
app/page.tsx        — input form + live landing preview
lib/generator.ts    — template engine, content banks, HTML exporter
```

---

Built by [Carlos Reyes](https://github.com/carlosreyesafk) — Software Developer · React · TypeScript · Supabase
