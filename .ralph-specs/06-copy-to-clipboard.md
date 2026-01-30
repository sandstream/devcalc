# Copy to Clipboard

Enable one-click copying of any result value.

## Requirements
- Click on any result value to copy it
- Cmd/Ctrl+C copies the primary (decimal) result
- Show brief "Copied!" feedback (toast or inline)
- Copy without prefix option (255 vs 0xFF)

## E2E Test
Write test in `e2e/clipboard.spec.ts` that verifies:
- Clicking hex value copies it to clipboard
- "Copied" feedback appears briefly

## Done when
- [ ] Build passes
- [ ] Click-to-copy works on all results
- [ ] Keyboard shortcut works
- [ ] Visual feedback shown
