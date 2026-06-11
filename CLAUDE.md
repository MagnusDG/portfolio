# CLAUDE.md — Portfolio Build Brief

This file is the working brief for building Minh Tú's personal portfolio. Read it fully before writing any code. It defines positioning, voice, architecture, content models, design direction, and build order. When something here conflicts with a default habit, this file wins.

---

## 0. What we're building

Two separate sites under one personal brand:

1. **Main site (English)** — a hire-me portfolio for technical writing work, with a blog that doubles as proof of writing ability. This is the conversion destination people land on after seeing the owner on LinkedIn.
2. **Photo site (separate subdomain)** — an image-first photography showcase with its own visual language. Linked from the main site's About page, but never mixed into the professional hire-me flow.

Keep them as **two independent Astro projects** so their design languages stay clean and they deploy separately. A pnpm monorepo with two apps is acceptable if preferred, but share no UI between them.

Owner profile (for grounding, not for copy): master's in Computer Science, security background, hands-on ML research, disinformation/IR analysis. This is why the positioning leans deep-tech.

---

## 1. Positioning (the spine of the whole site)

**Do not present the owner as a list of services.** The trap is a menu ("technical writing, copywriting, marketing, social, photography"). That reads as jack-of-all-trades and clients distrust it.

**Present one person with range:** a technical writer who thinks in systems and writes for humans. Technical writing = making complex systems clear. Copy/marketing = making clear things move people. These are expressions of one skill, shown through different work.

**Lead identity:** technical writer for deep-tech products — dev tools / APIs, AI/ML, and security. Treat these three as *one territory* (technical and security-minded products), not three separate offerings. The hero implies depth of domain, not breadth of services.

Copywriting and marketing/social are **secondary range**, mentioned as "also writes in a plain human voice, not just docs" — never given equal billing with technical writing.

**Audience:** international clients who evaluate in English and are unforgiving about clarity. The site's own structure and copy are themselves a work sample. If the IA is messy or the copy is fluffy, the site fails as a credential.

**Proof strategy:** the owner has 2–3 real work samples. If they can be mapped one-per-domain (one dev-tools, one AI, one security), the three case studies *demonstrate* the three-domain claim instead of asserting it. If samples don't cover all three, lead with the strongest domain and treat the others as extended capability.

---

## 2. Voice & copy rules (apply to ALL written copy you generate)

Every word of UI copy, hero text, case-study prose, and blog scaffolding must pass these. Write like a sharp operator explaining something to a smart peer. Calm, specific, grounded.

**Never use these (buzzwords/filler):** insights, the key to, streamline, leverage, optimize, maximize, unlock, unleash, empower, enable, solutions-oriented, world-class, cutting-edge, innovative, next-gen, game-changer, best-in-class, future-proof, scalable, disruptive, holistic, robust, dynamic, agile, seamless, synergy, elevate, realm, essentially, comprehensive, foster, cultivate, facilitate, utilize.

**Avoid these clichés:** customer-centric, data-driven (as filler), actionable insights, move the needle, quick wins, thought leader, best practices, at scale (without numbers), digital transformation, value-add.

**Stylistic rules:**
- No em dashes. Use commas or periods.
- Be specific: numbers, names, concrete examples, real tradeoffs, clear cause and effect. If you can't picture it happening in real life, rewrite it.
- Vary sentence rhythm. Mix short and long. No uniform paragraph length.
- No back-to-back sentences starting with the same word.
- No generic template hooks ("In today's fast-paced world", "Let's dive in").
- No summary-closing energy ("In conclusion", "At the end of the day").
- No stacked fragments ("More clarity. More speed.").
- No moralizing or hype tone. Slightly raw but controlled is the target.

For interface microcopy specifically: name things by what the user controls, use active voice, keep one sign-off/one job per element. A button says exactly what happens ("Read the case study", not "Learn more").

---

## 3. Main site — sitemap & page specs

### Home
- **Hero is a thesis, not a template.** One clear sentence of positioning (technical writer for dev tools, AI, and security products) plus a short line on range. A primary CTA to the work, a secondary to contact. Do NOT default to the "big number + small label + gradient accent" hero unless it is genuinely the best fit here (it is not).
- A short strip naming the domains/products the owner writes for (signals depth, not a service list).
- 2–3 featured case studies as cards linking into Work.
- A compact "recent writing" row pulling latest blog posts.

### Work
- Case studies in the standard technical-writing format. Each one tells: context, who the reader was, what was unclear before, what the owner wrote, the outcome. Show *process and before/after*, not just polished final artifacts. Clients hire on process.
- Allow grouping/filtering by domain (devtools / ai / security) but keep it subtle.

### Writing (blog)
- The blog is the engine, not an afterthought. Mix technical explainers (proof of teaching complex things, the core TW skill) with analytical essays (proof of range and intellect).
- Support both English and Vietnamese posts via a `lang` field. English posts are primary and surface on the main listing; Vietnamese essays live under a filter or an "Essays (VN)" view so they add depth without confusing international clients.
- Individual post pages prioritise reading experience: measured line length (~65–75ch), strong type hierarchy, code blocks that look intentional.

### About
- The human and the credibility. The security-to-communication arc, the domains the owner knows, why they write. This is where the photography site is linked, framed as a personal facet.

### Contact / Hire
- Low friction. A direct way to reach out and one clear line on what kind of work the owner takes. One ask, no performative politeness.

---

## 4. Photo site — spec

- Separate Astro project, separate deploy, on a subdomain (e.g. `photos.<domain>`).
- Image-first and minimal: full-bleed or generous imagery, very little chrome, fast loading, a lightbox for full views.
- Its own distinct visual language. It should NOT look like a section of the main site reskinned.
- Optional grouping into series/albums. Captions, location, and date are optional metadata.
- Strong image optimization is mandatory (responsive sizes, modern formats, lazy loading). Performance on image-heavy pages is the whole game here.
- One quiet link back to the main site.

---

## 5. Tech stack & conventions

- **Framework:** Astro (latest stable), content collections for all blog/case-study/photo content.
- **Content authoring:** Markdown / MDX. This matches the owner's existing markdown workflow.
- **Styling:** a custom CSS token system (CSS variables) driven by the design plan in section 7. Tailwind is acceptable only if used with discipline and a custom theme; do not let it pull the design toward generic utility-class defaults.
- **Images:** `astro:assets` with sharp for optimization. Never ship unoptimized full-size images, especially on the photo site.
- **Deploy:** Cloudflare Pages or Vercel, free tier. Each site deploys independently.
- **Quality floor (non-negotiable):** responsive down to mobile, visible keyboard focus states, `prefers-reduced-motion` respected, semantic HTML, good Lighthouse scores. Build this in from the start, don't bolt it on.
- Keep dependencies minimal. Every added library should earn its place.

---

## 6. Content models (frontmatter schemas)

**Blog post** (`src/content/blog/`)
```
title: string
description: string
pubDate: date
updatedDate: date            # optional
category: "essay" | "technical" | "note"
tags: string[]
lang: "en" | "vi"            # default "en"
heroImage: string            # optional
draft: boolean               # default false
```

**Case study** (`src/content/work/`)
```
title: string
summary: string              # one-line, for cards
domain: "devtools" | "ai" | "security"
role: string                 # e.g. "Technical writer, API docs"
year: number
client: string               # optional, can be anonymized e.g. "Series-A dev tools startup"
problem: string              # what was unclear / broken before
deliverable: string          # what was written
outcome: string              # result, with a number if one exists
tools: string[]              # e.g. ["Docusaurus", "OpenAPI", "Mermaid"]
cover: string                # optional
featured: boolean            # default false
order: number                # for manual sorting
```

**Photo** (photo project, `src/content/photos/`)
```
src: string
alt: string                  # required, real description
caption: string              # optional
location: string             # optional
date: date
series: string               # optional album grouping
featured: boolean            # default false
```

---

## 7. Design direction

Run a real two-pass design process before coding. Do not reach for a default look.

**Avoid these three AI-default looks** (they appear regardless of subject and signal templated work):
1. Warm cream background (~#F4F1EA) + high-contrast serif + terracotta accent.
2. Near-black background + a single acid-green or vermilion accent.
3. Broadsheet layout with hairline rules, zero border-radius, dense newspaper columns.

**Ground the design in the subject.** The owner's world is documentation, code, specs, terminals, security. Distinctive choices come from that vernacular. A proposed starting direction (refine or replace it, but justify the replacement):

- **Concept:** the aesthetic of *well-made documentation and engineering tooling*, executed with editorial care. Precision as the feeling. Reading is the product, so the reading experience is the design.
- **Type:** pair a characterful but readable body face (a humanist serif or a clean grotesque) with a monospace utility face for metadata, labels, domain tags, and dates. The monospace is the nod to the owner's world; use it with restraint, not everywhere.
- **Signature element:** make the *structural labeling* the memorable thing. Case studies and posts carry precise, documentation-style metadata (domain, role, year, tools) treated as a designed system rather than decoration. Structure encodes real information here, so it earns its place.
- **Palette:** 4–6 named hex values, restrained, high legibility. Pick something that is not one of the three defaults above and state the reasoning.
- **Motion:** minimal and purposeful. A considered page-load or scroll reveal at most. Over-animation reads as AI-generated; less is more here.

Produce a compact token system (color, type, layout, signature) first, critique it against this brief, revise anything that reads as a generic default, then build to the revised plan exactly. The photo site gets its OWN separate design pass with the same rigour and a different result.

---

## 8. Build order

1. Scaffold the main Astro project, content collections, and the design token system (after the two-pass design plan).
2. Build the layout shell, type system, and Home page with placeholder-but-real-shaped copy that follows the voice rules.
3. Build Work + the case-study template. Wire in the owner's real samples (see section 9).
4. Build Writing (blog) listing + post template, with en/vi handling.
5. Build About + Contact.
6. Pass: accessibility, responsive, performance, Lighthouse.
7. Scaffold the photo site as a separate project with its own design pass; build gallery + lightbox + image optimization.
8. Set up both deploys.

---

## 9. Content the owner provides (ask for these, don't invent them)

The owner has 2–3 real work samples. Before writing case-study copy:
- Ask for the samples and, for each, the real context: who the reader was, what was unclear before, what was written, and the outcome (with a number if one exists).
- Map each sample to a domain (devtools / ai / security) if possible.
- Do NOT fabricate outcomes, clients, or metrics. Where a real detail is missing, leave a clear `[NEEDS: ...]` placeholder rather than inventing.

Also confirm with the owner before building:
- Domain name and whether the brand uses their real name or a brand name.
- Which real blog posts/essays to seed the Writing section with (the owner has existing analytical essays).
- Photos and any series groupings for the photo site.