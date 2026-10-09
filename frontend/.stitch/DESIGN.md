---
name: "Aurelle Stays Design System"
colors:
  primary: "#18352f"
  secondary: "#b89a68"
  background: "#f7f3eb"
  surface: "#fdfaf4"
  text: "#292c29"
  border: "#e6dfd3"
---

# Design System: Aurelle Stays

## 1. Visual Theme & Atmosphere
Aurelle Stays employs an "Editorial Luxury" aesthetic. The interface feels like a high-end travel magazine, balancing airy whitespace with deep, sophisticated tones. It eschews modern minimalist sterility in favor of warm, tactile elegance. 

The baseline atmosphere is established by the ivory background (`var(--color-ivory)`), providing a soft, natural canvas. High-contrast typography in a deep forest green (`var(--color-forest)`) creates grounded stability, while champagne gold accents (`var(--color-champagne)`) introduce premium interactive moments without being ostentatious. 

## 2. Color Palette & Roles

### Primary Foundation
- **Ivory Canvas (`#f7f3eb`)**: The core background. It avoids stark `#fff` to reduce eye strain and feel more like premium paper stock.
- **Deep Forest (`#18352f`)**: The anchor color. Used for prominent headings, major structural elements, and primary solid buttons. It conveys heritage and calm.
- **Charcoal Text (`#292c29`)**: The primary body text color. Softened from pure black for better reading contrast against the ivory background.

### Accent & Interactive
- **Champagne Gold (`#b89a68`)**: The primary interactive accent. Used for primary CTAs (`.btn-gold`), highlights, borders on focus states, and star ratings. It brings the "luxury" feel.
- **Champagne Hover (`#a38555`)**: A slightly darkened gold for hover states to provide tactile feedback.

## 3. Typography Rules

### Hierarchy & Weights
- **Display/Headings**: Playfair Display (Serif). Used for all major section titles, hotel names, and hero text. It should feel elegant, high-contrast, and editorial.
- **Body/Functional**: Inter (Sans-serif). Clean, legible, and modern. Used for descriptions, UI labels, button text, and metadata.

### Spacing Principles
- **Button Typography**: Buttons use uppercase sans-serif with slight letter-spacing (`0.04em` to `0.05em`) and font-weight 500, creating a structured, premium badge-like feel.

## 4. Component Stylings

### Buttons
- **Gold CTA (`.btn-gold`)**: Solid champagne background, white text. Small border radius (`3px`), uppercase, slight letter spacing. On hover, it elevates (`translateY(-2px)`) with a warm, colored shadow (`rgba(184, 154, 104, 0.35)`).
- **Forest CTA (`.btn-forest`)**: Solid forest green background, ivory text. Similar metrics to gold CTA but with a dark shadow on hover.
- **Outline Luxe (`.btn-outline-luxe`)**: Transparent background with a champagne border. Used for secondary actions.

### Cards & Containers
- **Luxe Card (`.luxe-card`)**: White background (`#ffffff`) placed over the ivory canvas to create subtle elevation. Very light hairline border (`#e6dfd3`), small corner radius (`6px`).
- **Hover State**: Cards lift gently (`-5px`) and reveal a soft, dark shadow (`var(--shadow-md)`), while the border transitions to champagne gold.

## 5. Layout Principles

### Grid & Structure
- **Container (`.container-luxe`)**: Centered max-width of 1280px with generous side padding (24px mobile, 48px desktop).

### Whitespace Strategy
- The design relies heavily on padding and margins to separate content rather than harsh dividers. The use of whitespace is intentional to create a sense of calm and unhurried luxury.

## 6. Design System Notes for Stitch Generation

### Language to Use
When generating interfaces, describe them as "editorial", "luxury", "warm minimal", and "magazine-like". Avoid terms like "tech", "SaaS", or "playful".

### Color References
- Canvas: `#f7f3eb`
- Primary text/headings: `#18352f`
- Accents/CTAs: `#b89a68`

### Component Prompts
- "Create a luxury hotel booking card with a white background, a hairline border, and a Playfair Display heading. Include a champagne gold primary button that is uppercase with slight letter spacing."
- "Design a hero section using the Deep Forest color as a background, featuring a large elegant serif heading and an Outline Luxe button for secondary action."
