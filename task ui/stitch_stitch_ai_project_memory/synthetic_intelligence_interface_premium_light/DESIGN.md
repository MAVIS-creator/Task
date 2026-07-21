---
name: Synthetic Intelligence Interface (Premium Light)
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf3'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d5e3fc'
  on-surface: '#0d1c2e'
  on-surface-variant: '#464554'
  inverse-surface: '#233144'
  inverse-on-surface: '#eaf1ff'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#595c5e'
  on-tertiary: '#ffffff'
  tertiary-container: '#727577'
  on-tertiary-container: '#fbfdff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0d1c2e'
  surface-variant: '#d5e3fc'
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
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  button-text:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.01em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  container-max: 1440px
  gutter: 24px
---

## Brand & Style
The design system for this AI Project Intelligence Platform is built on the principles of clarity, precision, and high-end utility. It targets technical leaders and high-performing teams who require a workspace that feels both futuristic and grounding. 

The aesthetic is a sophisticated blend of **Minimalism** and **Glassmorphism**, taking cues from industry leaders like Linear and Vercel. It prioritizes "negative space" to reduce cognitive load, using subtle depth markers rather than heavy decorative elements. The emotional response is one of calm authority—an "expensive" digital environment where data feels weightless and insights feel immediate.

## Colors
This design system utilizes a high-contrast, airy palette to ensure maximum legibility and a sense of "digital premium." The primary Indigo color is used sparingly as a signal for action and intelligence. 

- **Primary Action**: Indigo (#6366f1) serves as the core interactive color.
- **Surface Strategy**: A multi-tiered white/slate system. #ffffff is the base for cards and containers, while #f8fafc and #f1f5f9 provide structural contrast for backgrounds and sidebar areas.
- **Typography**: Slate 900 for high-contrast headers; Slate 600 for supporting metadata and secondary labels.

## Typography
The typographic hierarchy relies on the tension between the technical, geometric personality of **Space Grotesk** and the neutral, functional clarity of **Inter**. 

Use Space Grotesk for all major headings and display text to emphasize the "synthetic intelligence" narrative. Inter is reserved for all long-form reading and interface elements to ensure user comfort. **JetBrains Mono** is used exclusively for technical data, code snippets, and status labels to provide a precise, developer-friendly touch.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a hard preference for generous whitespace (the "Airy" aesthetic). 

- **Grid**: Use a 12-column grid for desktop with 24px gutters.
- **Margins**: Desktop margins should be at least 40px (xl) to maintain the premium, uncrowded feel.
- **Mobile**: Scale margins down to 16px (md) and switch to a 4-column layout. 
- **Rhythm**: All spacing should be multiples of the 4px base unit. Vertical rhythm is critical; use 64px (xxl) between major sections to allow the design to "breathe."

## Elevation & Depth
Depth is created through **Glassmorphism** and soft, layered shadows rather than heavy borders.

1.  **Surfaces**: Primary interactive cards use a white background at 80% opacity with a `24px` backdrop blur.
2.  **Shadows**: Use "Ambient Shadows"—multi-layered, extremely low opacity (#000000 at 0.04 and 0.02) with high blur radii (20px-40px). Shadows should feel like a soft glow beneath the element.
3.  **Stroke**: Every elevated element must have a `1px` thin border using the Slate 200 (#e2e8f0) color to define its silhouette against the airy background.

## Shapes
The shape language is defined by large, friendly radii that mimic modern hardware design (Apple VisionOS). 

The base roundedness for standard components (buttons, inputs) is **12px**. For primary containers, modals, and large cards, use the **24px** (rounded-xl) setting. This significant rounding softens the technical nature of the AI platform, making it feel more approachable and refined.

## Components

- **Buttons**: Use 12px rounded corners. The Primary Button is Indigo (#6366f1) with white text. The Secondary Button is a ghost style: 1px border (#e2e8f0) with a subtle #f8fafc hover state.
- **Cards**: 24px rounded corners. Must include the 1px border and the glassmorphic background effect when placed over tinted surfaces.
- **Inputs**: 12px rounded corners. Use a subtle Slate 50 background for the default state to distinguish from the Surface-Bright background. Focus state uses a 2px Indigo ring with 50% opacity.
- **Chips/Badges**: Use the "Pill" shape (full rounding). Use JetBrains Mono for the text inside chips to denote "Data Points."
- **Lists**: Items should be separated by whitespace and a subtle 1px divider (#e2e8f0). Interactive list items should use a 12px rounded hover state in Slate 100.
- **AI-Specific Elements**: Use a subtle gradient (Indigo to Purple) only for AI-generation indicators or "Sparkle" icons to differentiate human-input data from machine-generated insights.