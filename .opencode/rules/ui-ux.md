# UI/UX & Design Rules - Majang Buku

## Brand Identity

- **Name**: Majang Buku
- **Vibe**: Premium, Cozy, Literary, Minimalist, Warm.
- **Mascot**: Orange Cat (iconic).
- **Style**: Classic, High-end, Professional yet welcoming.

## Color Palette

- **Primary**: `#F78750` (Orange) - Core brand color.
- **Background**: `#e8e6e1` (Beige/Sand) - Warm, paper-like feel.
- **Text**: `#2d2d2d` (Dark Grey/Charcoal) - High contrast, readable.
- **Accent**: `#c46210` (Darker Orange) - Used for hover/active states.
- **Border**: `#d1cec9` (Soft Grey).

## Typography

- **Primary Font**: **'Bitter'**, serif (Actual) / **'Clearface'** (PRD).
  - Use `serif` fonts to maintain a classic, literary feel.
  - Headings should have `font-weight: 700`, `line-height: 1.1`, and `letter-spacing: -0.01em`.
  - Body text should be readable (`1.125rem` in section text).

## Visual Patterns

- **No Gradients**: Per PRD, use solid colors or subtle patterns only. Use `#e8e6e1` for backgrounds.
- **Transitions**: Smooth, intentional animations (`0.5s cubic-bezier(0.4, 0, 0.2, 1)`).
- **Hero Sections (Strips)**:
  - Vertical strips horizontally aligned.
  - Staggered heights (e.g., 75%, 85%, 90%, 70%).
  - Smooth expansion on hover/active (`width 0.7s`).
  - Grayscale to color transition on hover.
- **Components**:
  - **FAQ**: Minimalist accordion with `+` icon that rotates.
  - **Tables**: Minimalist layout with `1px` borders (`#e0ddd8`).
  - **Cards**: Soft border-radius (`1.5rem` for highlights, `8px` for others).

## Design Philosophy

- **High-Impact Transitions**: Focus on smooth entrance animations (`transform: translateY(30px) opacity: 0` to `is-visible`).
- **Cozy Atmosphere**: Use warm-toned photography and avoid "cold" or "techy" design elements.
- **Literary Context**: Ensure layout feels like reading a well-designed book or magazine.
- **Mobile Experience**: Carousel and lists must adapt gracefully to touch interfaces.
