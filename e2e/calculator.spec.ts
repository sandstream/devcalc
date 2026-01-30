import { test, expect } from '@playwright/test';

test.describe('Calculator Engine', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('"2 + 2" returns 4', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    await input.fill('2 + 2');

    const decResult = page.getByTestId('result-dec');
    await expect(decResult).toHaveText('4');
  });

  test('"0xFF" shows 255 in decimal', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    await input.fill('0xFF');

    const decResult = page.getByTestId('result-dec');
    await expect(decResult).toHaveText('255');
  });

  test('"255" shows 0xFF in hex', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    await input.fill('255');

    const hexResult = page.getByTestId('result-hex');
    await expect(hexResult).toHaveText('0xFF');
  });

  test('"2 + 2 * 3" respects operator precedence and returns 8', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    await input.fill('2 + 2 * 3');

    const decResult = page.getByTestId('result-dec');
    await expect(decResult).toHaveText('8');
  });

  test('displays all base representations', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    await input.fill('255');

    await expect(page.getByTestId('result-dec')).toHaveText('255');
    await expect(page.getByTestId('result-hex')).toHaveText('0xFF');
    await expect(page.getByTestId('result-bin')).toHaveText('0b11111111');
    await expect(page.getByTestId('result-oct')).toHaveText('0o377');
  });

  test('parses binary input (0b prefix)', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    await input.fill('0b1010');

    await expect(page.getByTestId('result-dec')).toHaveText('10');
  });

  test('parses octal input (0o prefix)', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    await input.fill('0o777');

    await expect(page.getByTestId('result-dec')).toHaveText('511');
  });
});
