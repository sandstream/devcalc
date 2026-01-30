# Project Setup

Initialize React + Vite + TypeScript project with Tailwind CSS and Playwright for E2E testing.

## Requirements
- Create Vite project with React and TypeScript template
- Install and configure Tailwind CSS with design tokens from PRD
- Install Playwright and run `npx playwright install`
- Configure `playwright.config.ts` for E2E tests
- Add JetBrains Mono font for monospace numbers
- Set up dark theme as default with CSS variables

## E2E Test
Write test in `e2e/smoke.spec.ts` that verifies:
- App loads without errors
- Main input field is visible and focusable

## Done when
- [ ] `npm run dev` starts without errors
- [ ] `npm run build` completes successfully
- [ ] `npx playwright test` runs smoke test
- [ ] Dark theme with correct colors visible
