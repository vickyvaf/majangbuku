# Frontend Development Rules - Majang Buku

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Standard CSS with CSS Modules support, some SCSS for Admin
- **Icons**: Lucide React
- **Animations**: CSS Transitions and native Web APIs (Intersection Observer)

## Component Guidelines

1. **Server vs Client Components**:
   - Prefer Server Components for data fetching and static layout.
   - Use Client Components (`'use client'`) only when state, effects, or event handlers are needed (e.g., `FilterBottomSheet`, `Carousel`).
2. **Responsive Design**:
   - Mobile-first approach.
   - Note the `main-wrapper` padding adjustment for mobile: `padding-bottom: 100px` at `max-width: 1024px`.
3. **Typography**:
   - Primary Font: 'Bitter', serif (as implemented in `styles.css`).
   - Line-height for headings: `1.1`.
   - Letter-spacing for headings: `-0.01em`.
4. **Scrolling**:
   - Scrollbars are hidden globally using `scrollbar-width: none` and `-webkit-scrollbar { display: none }`.

## Styling Patterns

1. **No Gradients**: Per PRD, use solid colors or subtle patterns only.
2. **Transitions**: Use the standard project transition: `0.5s cubic-bezier(0.4, 0, 0.2, 1)`.
3. **Layouts**:
   - `page-container`: Max-width `1100px`, centered.
   - `lexical-content`: Specific styles for rich text to ensure readability (line-height `1.7`, font-size `1.15rem`).

## Best Practices

- Use `next/image` for all images to ensure optimization.
- Ensure all interactive elements have hover states (e.g., `.logo-link:hover`).
- Follow the "Strips" pattern for high-impact hero sections (vertical strips horizontally aligned).
