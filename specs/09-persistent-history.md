# Persistent History

Save calculation history in localStorage for return visits.

## Requirements
- Store last 50 calculations in localStorage
- Show history panel (sidebar or dropdown)
- Click history item to load it into input
- Clear history button
- History persists across browser sessions

## E2E Test
Write test in `e2e/history.spec.ts` that verifies:
- Calculation added to history after evaluation
- History persists after page reload
- Clicking history item loads expression

## Done when
- [ ] Build passes
- [ ] History saves to localStorage
- [ ] History survives page reload
- [ ] Can clear history
