---
name: Synthetic Intelligence Interface
colors:
  surface: '#13131b'
  surface-dim: '#13131b'
  surface-bright: '#393841'
  surface-container-lowest: '#0d0d15'
  surface-container-low: '#1b1b23'
  surface-container: '#1f1f27'
  surface-container-high: '#292932'
  surface-container-highest: '#34343d'
  on-surface: '#e4e1ed'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e4e1ed'
  inverse-on-surface: '#303038'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#c6c6cf'
  on-tertiary: '#2f3037'
  tertiary-container: '#909099'
  on-tertiary-container: '#282930'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#e2e1eb'
  tertiary-fixed-dim: '#c6c6cf'
  on-tertiary-fixed: '#1a1b22'
  on-tertiary-fixed-variant: '#45464e'
  background: '#13131b'
  on-background: '#e4e1ed'
  surface-variant: '#34343d'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  container-max: 1440px
  gutter: 24px
---

## Brand & Style

This design system is engineered for the high-end AI developer landscape, blending the clinical precision of a professional IDE with the immersive, spatial qualities of next-generation operating systems. The visual direction is rooted in **Glassmorphism** and **Modern Minimalism**, emphasizing depth through transparency and light rather than traditional shadows.

The target audience consists of senior engineers and AI researchers who value speed, clarity, and aesthetic sophistication. The UI should feel like a high-performance instrument: quiet when idle, but powerful and reactive during interaction. Key visual hallmarks include ultra-thin borders, expansive whitespace, and "intelligent" accents that signify system activity.

## Colors

The palette is anchored in a deep obsidian environment to maximize contrast and reduce eye strain during long coding sessions.

- **Primary (Electric Indigo):** Used for primary actions, focus states, and active AI processing indicators.
- **Secondary (Cyber Cyan):** Reserved for data visualization, success states, and secondary technical highlights.
- **Neutrals:** A range of Slate Grays provides structural hierarchy without introducing warmth, maintaining a cool, futuristic temperature.
- **Glass Effects:** Backgrounds utilize semi-transparent layers with a `24px` backdrop blur to create a sense of physical layering.

## Typography

The typography strategy employs a high-contrast pairing to distinguish between intent and execution.

- **Headlines (Space Grotesk):** Geometric and expressive. Use bold weights for page titles to establish a strong "tech-forward" presence.
- **Body (Inter):** Highly legible and utilitarian. Used for all descriptive text, documentation, and settings.
- **Technical (JetBrains Mono):** Monospaced precision for code blocks, terminal outputs, and variable names.

Maintain generous line heights to ensure readability in data-heavy environments. All uppercase labels should have slight letter spacing for a refined, professional look.

## Layout & Spacing

This design system utilizes a **Fluid Grid** model with an emphasis on "negative space as a feature." 

- **Desktop:** 12-column grid with 24px gutters. Use wide 64px margins to allow the UI to breathe.
- **Tablet:** 8-column grid with 24px gutters and 32px margins.
- **Mobile:** 4-column grid with 16px gutters and 16px margins.

Spacing follows a linear 8pt scale (4, 8, 16, 24, 32, 40, 48, 64). Components should favor large internal padding to support the "floating" glass aesthetic. Use the `xl` (64px) spacing unit to separate major functional sections.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layering** and **Backdrop Blurs**.

1.  **Level 0 (Base):** Deep obsidian (#09090B).
2.  **Level 1 (Surface):** Obsidian with 1px border (rgba(255,255,255,0.1)).
3.  **Level 2 (Floating):** Semi-transparent obsidian (rgba(24, 24, 27, 0.8)) with 24px backdrop-blur and a subtle top-down 1px highlight border.
4.  **Overlays:** High-transparency layers with a "shimmer" effect—a moving linear gradient (transparent to white to transparent at 10% opacity) that triggers on hover or system processing.

Avoid traditional drop shadows. Use "glow" shadows for active elements, where the primary indigo color is used at 15% opacity with a large (40px) blur radius.

## Shapes

The shape language is dominated by large, organic curves that contrast with the sharp, technical nature of AI.

- **Standard Elements:** 0.5rem (8px) for inputs and small buttons.
- **Cards & Containers:** 1.5rem (24px) to create a soft, friendly silhouette for complex technical panels.
- **Interactive States:** Use a transition from the base radius to a slightly more rounded state (or "squircle" influence) during active interactions to simulate a tactile response.

## Components

### Buttons
- **Primary:** Solid Indigo background with white text. High-gloss finish with a subtle 1px inner stroke for depth.
- **Secondary:** Ghost style with 1px border (rgba(255,255,255,0.1)) and backdrop blur.

### Input Fields
- Dark backgrounds (#0A0A0A) with a bottom-only or subtle 1px border. Focus state triggers a Cyber Cyan glow and a transition of the border opacity from 10% to 40%.

### Cards
- Large 24px rounded corners.
- Background: `rgba(24, 24, 27, 0.6)`.
- Backdrop Blur: `24px`.
- Border: `1px solid rgba(255, 255, 255, 0.08)`.

### Code Blocks
- Integrated JetBrains Mono.
- Syntax highlighting uses a "Cyber" palette (Neon Purples, Cyans, and Pinks).
- Distinct "Copy" and "Expand" actions appear on hover with glass backgrounds.

### AI Activity Indicators
- Subtle "shimmer" or "pulse" animations on the borders of active cards.
- Use Cyber Cyan for "Ready" and Electric Indigo for "Processing."