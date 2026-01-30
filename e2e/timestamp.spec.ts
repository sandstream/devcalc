import { test, expect } from '@playwright/test';

test.describe('Timestamp Converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('"1706612400" shows date "2024-01-30"', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    await input.fill('1706612400');

    const utcResult = page.getByTestId('result-utc');
    await expect(utcResult).toContainText('2024-01-30');
  });

  test('"now" button inserts current timestamp', async ({ page }) => {
    const nowButton = page.getByTestId('now-button');
    await nowButton.click();

    const input = page.getByTestId('calc-input');
    const inputValue = await input.inputValue();

    // Should be a 10-digit timestamp
    expect(inputValue).toMatch(/^\d{10}$/);

    // Should show timestamp results
    const timestampResults = page.getByTestId('timestamp-results');
    await expect(timestampResults).toBeVisible();
  });

  test('detects millisecond timestamps (13 digits)', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    await input.fill('1706612400000');

    const utcResult = page.getByTestId('result-utc');
    await expect(utcResult).toContainText('2024-01-30');
  });

  test('shows both UTC and local time', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    await input.fill('1706612400');

    await expect(page.getByTestId('result-utc')).toBeVisible();
    await expect(page.getByTestId('result-local')).toBeVisible();
  });

  test('timestamp display hidden for non-timestamp input', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    await input.fill('12345');

    const timestampResults = page.getByTestId('timestamp-results');
    await expect(timestampResults).not.toBeVisible();
  });

  test('timestamp display hidden for expressions', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    await input.fill('1706612400 + 1');

    const timestampResults = page.getByTestId('timestamp-results');
    await expect(timestampResults).not.toBeVisible();
  });
});
