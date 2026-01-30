import { test, expect } from '@playwright/test';

test.describe('Keyboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Tab moves focus between elements', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    const nowButton = page.getByTestId('now-button');

    // Input should be focused initially
    await expect(input).toBeFocused();

    // Tab to Now button
    await page.keyboard.press('Tab');
    await expect(nowButton).toBeFocused();

    // Shift+Tab back to input
    await page.keyboard.press('Shift+Tab');
    await expect(input).toBeFocused();
  });

  test('Tab cycles through result elements when displayed', async ({ page }) => {
    const input = page.getByTestId('calc-input');

    // Enter an expression to show results
    await input.fill('255');
    await page.waitForSelector('[data-testid="calc-results"]');

    // Tab through: input -> clear button -> Now button -> DEC -> HEX -> BIN -> OCT
    await page.keyboard.press('Tab'); // to clear button
    await expect(page.getByTestId('clear-button')).toBeFocused();

    await page.keyboard.press('Tab'); // to Now button
    await expect(page.getByTestId('now-button')).toBeFocused();

    await page.keyboard.press('Tab'); // to DEC result
    const decResult = page.getByRole('button', { name: /Copy DEC value/ });
    await expect(decResult).toBeFocused();

    await page.keyboard.press('Tab'); // to HEX result
    const hexResult = page.getByRole('button', { name: /Copy HEX value/ });
    await expect(hexResult).toBeFocused();

    await page.keyboard.press('Tab'); // to BIN result
    const binResult = page.getByRole('button', { name: /Copy BIN value/ });
    await expect(binResult).toBeFocused();

    await page.keyboard.press('Tab'); // to OCT result
    const octResult = page.getByRole('button', { name: /Copy OCT value/ });
    await expect(octResult).toBeFocused();
  });

  test('Escape clears input and refocuses it', async ({ page }) => {
    const input = page.getByTestId('calc-input');

    // Type something in the input
    await input.fill('123+456');
    await expect(input).toHaveValue('123+456');

    // Tab away from input
    await page.keyboard.press('Tab');
    await expect(input).not.toBeFocused();

    // Press Escape
    await page.keyboard.press('Escape');

    // Input should be cleared and focused
    await expect(input).toHaveValue('');
    await expect(input).toBeFocused();
  });

  test('Escape works when input is already focused', async ({ page }) => {
    const input = page.getByTestId('calc-input');

    // Type something
    await input.fill('999');
    await expect(input).toHaveValue('999');

    // Press Escape while input is focused
    await page.keyboard.press('Escape');

    // Should clear and remain focused
    await expect(input).toHaveValue('');
    await expect(input).toBeFocused();
  });

  test('Focus indicators are visible on input', async ({ page }) => {
    const input = page.getByTestId('calc-input');

    // Input is focused by default
    await expect(input).toBeFocused();

    // Check that ring styles are applied (focus:ring-2 class)
    const boxShadow = await input.evaluate((el) => {
      return window.getComputedStyle(el).boxShadow;
    });

    // Focus ring should create a box-shadow (Tailwind ring utility)
    expect(boxShadow).not.toBe('none');
  });

  test('Focus indicators are visible on buttons', async ({ page }) => {
    const nowButton = page.getByTestId('now-button');

    // Tab to Now button
    await page.keyboard.press('Tab');
    await expect(nowButton).toBeFocused();

    // Check that ring styles are applied
    const boxShadow = await nowButton.evaluate((el) => {
      return window.getComputedStyle(el).boxShadow;
    });

    // Focus ring should create a box-shadow
    expect(boxShadow).not.toBe('none');
  });

  test('Focus indicators are visible on result cards', async ({ page }) => {
    const input = page.getByTestId('calc-input');

    // Enter expression to show results
    await input.fill('42');
    await page.waitForSelector('[data-testid="calc-results"]');

    // Tab to a result card (skip clear button and now button)
    await page.keyboard.press('Tab'); // clear button
    await page.keyboard.press('Tab'); // now button
    await page.keyboard.press('Tab'); // DEC result

    const decResult = page.getByRole('button', { name: /Copy DEC value/ });
    await expect(decResult).toBeFocused();

    // Check focus ring
    const boxShadow = await decResult.evaluate((el) => {
      return window.getComputedStyle(el).boxShadow;
    });

    expect(boxShadow).not.toBe('none');
  });

  test('Arrow Up/Down navigates through history', async ({ page }) => {
    const input = page.getByTestId('calc-input');

    // Enter first expression and press Enter to save to history
    await input.fill('100');
    await page.keyboard.press('Enter');

    // Enter second expression and press Enter
    await input.fill('200');
    await page.keyboard.press('Enter');

    // Enter third expression and press Enter
    await input.fill('300');
    await page.keyboard.press('Enter');

    // Clear and type something new
    await input.fill('current');

    // Press Arrow Up to go back in history
    await page.keyboard.press('ArrowUp');
    await expect(input).toHaveValue('300');

    await page.keyboard.press('ArrowUp');
    await expect(input).toHaveValue('200');

    await page.keyboard.press('ArrowUp');
    await expect(input).toHaveValue('100');

    // Press Arrow Down to go forward
    await page.keyboard.press('ArrowDown');
    await expect(input).toHaveValue('200');

    await page.keyboard.press('ArrowDown');
    await expect(input).toHaveValue('300');

    // Go back to current expression
    await page.keyboard.press('ArrowDown');
    await expect(input).toHaveValue('current');
  });

  test('Enter key copies result to history', async ({ page }) => {
    const input = page.getByTestId('calc-input');

    // Enter expression
    await input.fill('42+8');
    await page.keyboard.press('Enter');

    // Clear and verify we can retrieve it from history
    await input.fill('');
    await page.keyboard.press('ArrowUp');
    await expect(input).toHaveValue('42+8');
  });
});
