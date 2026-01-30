import { test, expect } from '@playwright/test';

test.describe('DevCalc Smoke Tests', () => {
  test('app loads without errors', async ({ page }) => {
    await page.goto('/');

    // Verify page title or heading is present
    await expect(page.locator('h1')).toContainText('DevCalc');
  });

  test('main input field is visible and focusable', async ({ page }) => {
    await page.goto('/');

    const input = page.getByTestId('calc-input');

    // Verify input is visible
    await expect(input).toBeVisible();

    // Verify input is focusable (autoFocus should make it focused)
    await expect(input).toBeFocused();

    // Verify we can type in the input
    await input.fill('123');
    await expect(input).toHaveValue('123');
  });
});
