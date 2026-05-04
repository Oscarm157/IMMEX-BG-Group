# Design System Specification: High-End Enterprise Editorial

## 1. Overview & Creative North Star
### Creative North Star: "The Architectural Authority"
This design system is built for an environment where expertise is non-negotiable. It moves away from the "friendly SaaS" aesthetic toward a "High-End Editorial" experience—think top-tier management consulting reports meets precision software engineering. 

We break the standard grid-bound "template" look through **intentional asymmetry** and **tonal layering**. By utilizing the deep, authoritative blues of the primary palette and the high-contrast "Neon Yellow" accent, we create an experience that feels curated, not generated. The visual identity relies on wide-open white space, sophisticated typography scales, and a refusal to use traditional containment lines, opting instead for architectural depth.

---

## 2. Colors
Our palette is anchored in deep "Midnight" tones to project stability, balanced by high-energy accents that signal digital innovation.

### The Foundation
*   **Primary (`#000616` / `primary-container: #0B1F3B`):** These are our "Ink" tones. Use them for deep backgrounds and high-authority headers.
*   **Tertiary/Accent (`tertiary-fixed: #E6FF00`):** Our signature "Neon Yellow." It must be used sparingly—only for critical calls to action, framework milestones, or data highlights to ensure it retains its "electric" impact.
*   **Surface System:** Use the `surface-container` tokens to build depth. 
    *   `surface`: The canvas.
    *   `surface-container-low`: Secondary layout sections.
    *   `surface-container-highest`: Modal overlays or elevated data cards.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section content. Boundaries must be defined solely through background color shifts or subtle tonal transitions. A card is not a box with an outline; it is a `surface-container-lowest` object sitting on a `surface-container-low` background.

### Signature Textures & Glassmorphism
*   **The Glass Rule:** For floating navigation or top-level overlays, use semi-transparent `primary-container` with a `backdrop-blur` (12px–20px). This ensures the "corporate" density feels modern and breathable.
*   **Linear Depth:** Use subtle gradients transitioning from `primary` to `primary-container` for Hero backgrounds. This adds "soul" and prevents the flat, "cheap" feel of single-hex backgrounds.

---

## 3. Typography
We use **Inter** as our single, authoritative typeface. The strength of the system comes from extreme weight contrast and massive scale shifts.

*   **Display (`display-lg` / `display-md`):** Used for "Big Truth" statements. Letter spacing should be tightened (-2%) to feel like a high-end publication.
*   **Headline (`headline-lg` to `headline-sm`):** Bold, direct, and uncompromising. Used for section headers.
*   **Body (`body-lg` / `body-md`):** High readability. Use `body-lg` for introductory paragraphs to maintain the "Editorial" feel.
*   **Labels (`label-md`):** All-caps with increased letter spacing (+5%) when used for category tags or small metadata.

The hierarchy communicates that the most important information is always the most visible, removing any cognitive load for the executive user.

---

## 4. Elevation & Depth
In this system, depth is a matter of **Tonal Layering**, not structural scaffolding.

*   **The Layering Principle:** Stack surfaces like sheets of fine paper. For example, a dashboard might sit on `surface-container-low`, with individual data modules using `surface-container-lowest`. This creates a soft, natural lift.
*   **Ambient Shadows:** If an element must "float" (like a primary modal), use a shadow with a 32px-64px blur at 6% opacity. Use a tint of `on-surface` for the shadow color to ensure it looks like natural ambient light rather than a "drop shadow" effect.
*   **The Ghost Border Fallback:** If accessibility requires a stroke (e.g., in high-contrast mode), use the `outline-variant` token at **15% opacity**. Never use 100% opaque, high-contrast borders.

---

## 5. Components

### Buttons
*   **Primary:** Background `tertiary-fixed` (#E6FF00), Text `on-tertiary-fixed` (#1A1E00). Corner radius: `sm` (0.125rem). The sharp corners project "precision."
*   **Secondary:** Background `primary-container`, Text `on-primary`. Sharp corners.
*   **Tertiary/Ghost:** No background. Underline only on hover.

### Framework Elements (The "Chevron" Indicator)
Inspired by the BMS Framework, use the **Pointed Indicator** pattern for process steps. A dark `primary-container` pill with a `tertiary-fixed` (#E6FF00) diamond or chevron intersection. This creates a visual "arrow" of progress without using standard arrows.

### Input Fields
*   **Style:** Minimalist. No bottom border. Instead, use a subtle `surface-container-high` background.
*   **State:** On focus, the background shifts to `surface-container-highest` with a 2px vertical accent bar of `tertiary-fixed` on the left edge.

### Cards & Lists
*   **Strict Prohibiton:** No divider lines. Separate list items using 16px–24px of vertical white space or a subtle shift from `surface-container-lowest` to `surface-container-low`.
*   **Interaction:** On hover, a card should not move; it should subtly change color (e.g., `surface-container-low` to `surface-container-high`) to signal interactivity.

---

## 6. Do’s and Don'ts

### Do
*   **Use Asymmetry:** Place high-contrast accents (Neon Yellow) off-center to guide the eye through complex data.
*   **Embrace White Space:** Let the "Light Gray" (`F5F7FA`) breathe. High-end consulting is about clarity; clutter is the enemy of expertise.
*   **Use Micro-Rounding:** Stick to the `sm` (0.125rem) or `md` (0.375rem) radius. Rounded "pills" are reserved only for specific framework indicators or chips; main containers must stay sharp.

### Don't
*   **Don't use "Blue on Blue" for Text:** Ensure `on-primary` is only used on the darkest containers. For light surfaces, use `on-surface`.
*   **Don't use 1px dividers:** It breaks the "Architectural" feel. If you think you need a line, you actually need more padding.
*   **Don't over-saturate:** Neon Yellow is a laser, not a paint bucket. If more than 5% of your screen is yellow, the professional credibility of the system is compromised.