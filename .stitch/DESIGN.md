# AURELLE STAYS — Design System Specification

## 1. Visual Language & Brand Essence
AURELLE STAYS embodies refined editorial hospitality. Inspired by high-end architectural monographs and bespoke private resorts, every layout emphasizes spacious negative space, authoritative serif typography, harmonious organic tones, and tactile micro-interactions.

## 2. Color Palette
- **Forest (Primary Brand)**: `#18352F` (Deep evergreen, grounded elegance)
- **Ivory (Canvas Background)**: `#F7F3EB` (Warm linen, editorial luxury)
- **Champagne (Accent / Metallic)**: `#B89A68` (Warm gold, premium actions & badges)
- **Charcoal (Headings & High-contrast Text)**: `#292C29` (Deep slate, rich legibility)
- **Card Surface & Modals**: `#FFFFFF` with soft tinted borders (`#E6DFD5`)
- **Muted Gray**: `#787B76` (Captions, timestamps, secondary labels)

## 3. Typography
- **Headlines & Wordmarks**: `Playfair Display`, serif. Desktop hero: 60px / 1.1; mobile hero: 38–42px; Section titles: 36–44px.
- **Body & UI Elements**: `Inter`, sans-serif. Weights 400 (regular), 500 (medium), 600 (semibold). Sizes: 14px–16px, line height 1.6.

## 4. Spacing & Elevation
- Grid: 12-column responsive layout, 1280px max-width container, 24px–48px gutters.
- Radii: Subtle luxury rounding: 4px–8px on cards and buttons, never pill-shaped or cartoonish.
- Shadows: Soft, diffuse ambient diffusion: `0 12px 36px rgba(24, 53, 47, 0.08)`.

## 5. UI Component Guidelines
- **Header**: Sticky navigation with translucent Ivory blur (`backdrop-filter: blur(12px)`), refined serif wordmark "AURELLE STAYS", nav links (Destinations, Collections, Special Offers), and Champagne CTA "Find a Stay". Mobile drawer with staggered link reveals.
- **Hero**: Immersive resort photography with gradient overlay (`linear-gradient(rgba(24, 53, 47, 0.3), rgba(24, 53, 47, 0.6))`), 60px headline "Find Your Own Paradise.", curated subtitle, and "Explore Destinations" action.
- **Booking Search Bar**: Floating horizontally aligned search widget with Destination, Check-in, Check-out, Guests, and "Find a Stay" button. Form validation and immediate illustrative feedback.
- **Featured Stays**: 4:3 aspect ratio luxury cards with subtle zoom on hover, two-line clamped title, location tag, guest ratings, night rates, and aligned "View Details" opening modal.
- **Collections Grid**: High-aesthetic clickable cards for Beach Escapes, Mountain Retreats, Private Villas that filter stays.
- **The Stay Experience**: Editorial split layout detailing brand heritage, three curated benefit pillars, and authentic illustrative guest testimonials.
- **Footer**: Refined 4-column layout with brand narrative, links, policies, and interactive demo newsletter subscription with instant feedback.
