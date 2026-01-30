# Dark/Light Theme

Add theme toggle with system preference detection.

## Requirements
- Detect system preference (prefers-color-scheme)
- Manual toggle button in corner
- Save preference to localStorage
- Use CSS variables for theme colors
- Smooth transition between themes

## E2E Test
Write test in `e2e/theme.spec.ts` that verifies:
- Theme toggle switches colors
- Theme preference persists after reload

## Done when
- [ ] Build passes
- [ ] System preference detected
- [ ] Manual toggle works
- [ ] Preference saved in localStorage
