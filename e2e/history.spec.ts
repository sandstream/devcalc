import { test, expect } from '@playwright/test';

test.describe('History Panel', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('shows empty state when no history exists', async ({ page }) => {
    await expect(page.getByTestId('history-empty')).toBeVisible();
    await expect(page.getByTestId('history-empty')).toContainText('No history yet');
  });

  test('calculation added to history after pressing Enter', async ({ page }) => {
    const input = page.getByTestId('calc-input');

    // Enter expression and press Enter to save
    await input.fill('255');
    await page.keyboard.press('Enter');

    // History panel should now show the item
    await expect(page.getByTestId('history-panel')).toBeVisible();
    await expect(page.getByTestId('history-item')).toHaveText('255');
  });

  test('multiple calculations appear in history in reverse order', async ({ page }) => {
    const input = page.getByTestId('calc-input');

    // Add several calculations
    await input.fill('100');
    await page.keyboard.press('Enter');

    await input.fill('200');
    await page.keyboard.press('Enter');

    await input.fill('300');
    await page.keyboard.press('Enter');

    // Check order (most recent first)
    const items = page.getByTestId('history-item');
    await expect(items).toHaveCount(3);
    await expect(items.nth(0)).toHaveText('300');
    await expect(items.nth(1)).toHaveText('200');
    await expect(items.nth(2)).toHaveText('100');
  });

  test('history persists after page reload', async ({ page }) => {
    const input = page.getByTestId('calc-input');

    // Add to history
    await input.fill('42+8');
    await page.keyboard.press('Enter');

    await input.fill('0xFF');
    await page.keyboard.press('Enter');

    // Verify items are there
    await expect(page.getByTestId('history-item')).toHaveCount(2);

    // Reload page
    await page.reload();

    // History should persist
    await expect(page.getByTestId('history-panel')).toBeVisible();
    const items = page.getByTestId('history-item');
    await expect(items).toHaveCount(2);
    await expect(items.nth(0)).toHaveText('0xFF');
    await expect(items.nth(1)).toHaveText('42+8');
  });

  test('clicking history item loads expression into input', async ({ page }) => {
    const input = page.getByTestId('calc-input');

    // Add to history
    await input.fill('123*456');
    await page.keyboard.press('Enter');

    // Clear input
    await input.fill('');
    await expect(input).toHaveValue('');

    // Click on history item
    await page.getByTestId('history-item').click();

    // Expression should be loaded
    await expect(input).toHaveValue('123*456');
    await expect(input).toBeFocused();
  });

  test('clear history button removes all history', async ({ page }) => {
    const input = page.getByTestId('calc-input');

    // Add items to history
    await input.fill('111');
    await page.keyboard.press('Enter');

    await input.fill('222');
    await page.keyboard.press('Enter');

    // Verify history exists
    await expect(page.getByTestId('history-item')).toHaveCount(2);

    // Click clear button
    await page.getByTestId('history-clear-button').click();

    // History should be empty
    await expect(page.getByTestId('history-empty')).toBeVisible();
    await expect(page.getByTestId('history-item')).toHaveCount(0);
  });

  test('cleared history stays cleared after reload', async ({ page }) => {
    const input = page.getByTestId('calc-input');

    // Add item to history
    await input.fill('999');
    await page.keyboard.press('Enter');

    // Clear history
    await page.getByTestId('history-clear-button').click();

    // Reload page
    await page.reload();

    // History should still be empty
    await expect(page.getByTestId('history-empty')).toBeVisible();
  });

  test('duplicate consecutive expressions are not added to history', async ({ page }) => {
    const input = page.getByTestId('calc-input');

    // Add same expression twice
    await input.fill('50');
    await page.keyboard.press('Enter');

    await input.fill('50');
    await page.keyboard.press('Enter');

    // Should only have one item
    await expect(page.getByTestId('history-item')).toHaveCount(1);
  });

  test('history limited to 50 items', async ({ page }) => {
    const input = page.getByTestId('calc-input');

    // Add 55 items
    for (let i = 1; i <= 55; i++) {
      await input.fill(`${i}`);
      await page.keyboard.press('Enter');
    }

    // Should only have 50 items
    const items = page.getByTestId('history-item');
    await expect(items).toHaveCount(50);

    // Most recent (55) should be first, oldest kept (6) should be last
    await expect(items.nth(0)).toHaveText('55');
    await expect(items.nth(49)).toHaveText('6');
  });
});
