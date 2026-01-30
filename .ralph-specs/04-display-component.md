# Display Component

Create the results display showing all number bases simultaneously.

## Requirements
- Show decimal, hex (0x), binary (0b), octal (0o) in grid layout
- Each base clearly labeled
- Monospace font for all numbers
- Responsive: stack vertically on narrow screens
- Subtle animation on result change

## E2E Test
Write test in `e2e/display.spec.ts` that verifies:
- All four bases visible when result exists
- Entering "255" shows: 255, 0xFF, 0b11111111, 0o377

## Done when
- [ ] Build passes
- [ ] All four bases display correctly
- [ ] Layout responsive on mobile width
