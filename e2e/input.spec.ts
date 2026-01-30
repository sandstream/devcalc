import { test, expect } from '@playwright/test';

test.describe('Input Component', () => {
  test('input is focused on page load', async ({ page }) => {
    await page.goto('/');

    const input = page.getByTestId('calc-input');
    await expect(input).toBeFocused();
  });

  test('typing "123" shows results live', async ({ page }) => {
    await page.goto('/');

    const input = page.getByTestId('calc-input');
    await input.fill('123');

    // Wait for debounce (150ms) and results to appear
    const results = page.getByTestId('calc-results');
    await expect(results).toBeVisible();

    // Verify decimal result shows 123
    const decResult = page.getByTestId('result-dec');
    await expect(decResult).toHaveText('123');

    // Verify other bases are displayed
    const hexResult = page.getByTestId('result-hex');
    await expect(hexResult).toHaveText('0x7B');

    const binResult = page.getByTestId('result-bin');
    await expect(binResult).toHaveText('0b1111011');

    const octResult = page.getByTestId('result-oct');
    await expect(octResult).toHaveText('0o173');
  });

  test('Escape clears the input', async ({ page }) => {
    await page.goto('/');

    const input = page.getByTestId('calc-input');
    await input.fill('456');
    await expect(input).toHaveValue('456');

    // Press Escape to clear
    await input.press('Escape');

    // Input should be cleared
    await expect(input).toHaveValue('');

    // Input should remain focused
    await expect(input).toBeFocused();

    // Results should no longer be visible
    const results = page.getByTestId('calc-results');
    await expect(results).not.toBeVisible();
  });

  test('clear button clears the input', async ({ page }) => {
    await page.goto('/');

    const input = page.getByTestId('calc-input');
    await input.fill('789');
    await expect(input).toHaveValue('789');

    // Click clear button
    const clearButton = page.getByTestId('clear-button');
    await expect(clearButton).toBeVisible();
    await clearButton.click();

    // Input should be cleared
    await expect(input).toHaveValue('');

    // Input should remain focused
    await expect(input).toBeFocused();
  });

  test('invalid expression shows error state', async ({ page }) => {
    await page.goto('/');

    const input = page.getByTestId('calc-input');
    await input.fill('1 +');

    // Wait for debounce
    await page.waitForTimeout(200);

    // Error message should be visible
    const errorMessage = page.getByTestId('error-message');
    await expect(errorMessage).toBeVisible();

    // Input should have error styling (red border)
    await expect(input).toHaveClass(/border-red-500/);

    // Results should not be visible
    const results = page.getByTestId('calc-results');
    await expect(results).not.toBeVisible();
  });

  test('error state clears when expression becomes valid', async ({ page }) => {
    await page.goto('/');

    const input = page.getByTestId('calc-input');

    // First enter invalid expression
    await input.fill('1 +');
    await page.waitForTimeout(200);

    const errorMessage = page.getByTestId('error-message');
    await expect(errorMessage).toBeVisible();

    // Now make it valid
    await input.fill('1 + 2');
    await page.waitForTimeout(200);

    // Error should be gone
    await expect(errorMessage).not.toBeVisible();

    // Results should show
    const results = page.getByTestId('calc-results');
    await expect(results).toBeVisible();

    const decResult = page.getByTestId('result-dec');
    await expect(decResult).toHaveText('3');
  });
});
