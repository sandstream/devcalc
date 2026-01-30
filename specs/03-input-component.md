# Input Component

Create the main input field with live evaluation as user types.

## Requirements
- Large, prominent input field with monospace font
- Auto-focus on page load
- Live evaluation with debounce (150ms)
- Show error state for invalid expressions
- Clear button (X) or Escape key to clear

## E2E Test
Write test in `e2e/input.spec.ts` that verifies:
- Input is focused on page load
- Typing "123" shows results live
- Escape clears the input

## Done when
- [ ] Build passes
- [ ] Input auto-focuses
- [ ] Results update as you type
- [ ] Invalid input shows error state
