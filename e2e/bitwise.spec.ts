import { test, expect } from '@playwright/test';

test.describe('Bitwise Operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('"42 ^ 15" equals 37', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    await input.fill('42 ^ 15');

    const decResult = page.getByTestId('result-dec');
    await expect(decResult).toHaveText('37');
  });

  test('"0xFF & 0x0F" equals 15', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    await input.fill('0xFF & 0x0F');

    const decResult = page.getByTestId('result-dec');
    await expect(decResult).toHaveText('15');
  });

  test('"1 << 4" equals 16', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    await input.fill('1 << 4');

    const decResult = page.getByTestId('result-dec');
    await expect(decResult).toHaveText('16');
  });

  test('word syntax "42 XOR 15" equals 37', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    await input.fill('42 XOR 15');

    const decResult = page.getByTestId('result-dec');
    await expect(decResult).toHaveText('37');
  });

  test('word syntax "42 AND 15" equals 10', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    await input.fill('42 AND 15');

    const decResult = page.getByTestId('result-dec');
    await expect(decResult).toHaveText('10');
  });

  test('bitwise OR "8 | 4" equals 12', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    await input.fill('8 | 4');

    const decResult = page.getByTestId('result-dec');
    await expect(decResult).toHaveText('12');
  });

  test('right shift "16 >> 2" equals 4', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    await input.fill('16 >> 2');

    const decResult = page.getByTestId('result-dec');
    await expect(decResult).toHaveText('4');
  });

  test('bitwise NOT "~0" equals -1', async ({ page }) => {
    const input = page.getByTestId('calc-input');
    await input.fill('~0');

    const decResult = page.getByTestId('result-dec');
    await expect(decResult).toHaveText('-1');
  });
});
