# Keyboard Navigation

Make the entire app usable without a mouse.

## Requirements
- Tab cycles through interactive elements
- Enter evaluates expression (if not live)
- Escape clears input and focuses it
- Arrow up/down cycles through history (if history exists)
- Visible focus indicators on all elements

## E2E Test
Write test in `e2e/keyboard.spec.ts` that verifies:
- Tab moves focus between elements
- Escape clears and refocuses input
- Focus indicators visible

## Done when
- [ ] Build passes
- [ ] Full keyboard navigation works
- [ ] Focus always visible
