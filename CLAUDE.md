# DevCalc - Project Instructions

## Overview
DevCalc is a modern, keyboard-first web calculator for developers. It provides instant hex/dec/bin/oct conversion, unix timestamp handling, and bitwise operations.

## Tech Stack
- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Vitest (unit) + Playwright (E2E)
- **Storage:** localStorage (no backend)

## Design Principles
- Keyboard-first: Everything accessible without mouse
- Live results: No "=" button needed, evaluate as you type
- Clean UI: Dark theme default, monospace numbers, generous spacing
- Developer-focused: Hex, binary, timestamps, bitwise ops

## Color Tokens (Dark Theme)
```css
--bg-primary: #0a0a0a;
--bg-secondary: #1a1a1a;
--text-primary: #fafafa;
--text-secondary: #a0a0a0;
--accent: #3b82f6;
```

## Key Technical Decisions
1. **NO eval()** - Use safe expression parser
2. **BigInt** for 64-bit integer precision
3. **Debounced input** - Calculate live but not every keystroke
4. **localStorage** for history persistence

## File Structure
```
src/
  components/     # React components
  hooks/          # Custom hooks
  utils/          # Calculator engine, parsers
  App.tsx         # Main app
e2e/              # Playwright tests
```

## Commands
```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run test      # Run Vitest
npx playwright test  # Run E2E tests
```

## Specs Location
Implementation specs are in `.ralph-specs/` - execute them in order.
