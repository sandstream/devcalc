import { test, expect } from '@playwright/test'

test.describe('Clipboard Copy', () => {
  test.beforeEach(async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.goto('/')
  })

  test('clicking hex value copies it to clipboard without prefix', async ({ page }) => {
    const input = page.getByTestId('calc-input')
    await input.fill('255')

    // Wait for results to appear
    await expect(page.getByTestId('result-hex')).toHaveText('0xFF')

    // Click on the hex result row
    const hexRow = page.getByTestId('result-hex').locator('..')
    await hexRow.click()

    // Check clipboard content (should be without 0x prefix)
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText())
    expect(clipboardText).toBe('FF')
  })

  test('clicking decimal value copies it to clipboard', async ({ page }) => {
    const input = page.getByTestId('calc-input')
    await input.fill('42')

    await expect(page.getByTestId('result-dec')).toHaveText('42')

    const decRow = page.getByTestId('result-dec').locator('..')
    await decRow.click()

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText())
    expect(clipboardText).toBe('42')
  })

  test('clicking binary value copies it to clipboard without prefix', async ({ page }) => {
    const input = page.getByTestId('calc-input')
    await input.fill('10')

    await expect(page.getByTestId('result-bin')).toHaveText('0b1010')

    const binRow = page.getByTestId('result-bin').locator('..')
    await binRow.click()

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText())
    expect(clipboardText).toBe('1010')
  })

  test('clicking octal value copies it to clipboard without prefix', async ({ page }) => {
    const input = page.getByTestId('calc-input')
    await input.fill('64')

    await expect(page.getByTestId('result-oct')).toHaveText('0o100')

    const octRow = page.getByTestId('result-oct').locator('..')
    await octRow.click()

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText())
    expect(clipboardText).toBe('100')
  })

  test('copied feedback toast appears briefly', async ({ page }) => {
    const input = page.getByTestId('calc-input')
    await input.fill('255')

    await expect(page.getByTestId('result-hex')).toHaveText('0xFF')

    const hexRow = page.getByTestId('result-hex').locator('..')
    await hexRow.click()

    // Toast should appear
    const toast = page.getByTestId('toast')
    await expect(toast).toBeVisible()
    await expect(toast).toHaveText('Copied!')

    // Toast should disappear after a short time
    await expect(toast).not.toBeVisible({ timeout: 3000 })
  })

  test('Ctrl+C copies decimal result when no text selected', async ({ page }) => {
    const input = page.getByTestId('calc-input')
    await input.fill('123')

    await expect(page.getByTestId('result-dec')).toHaveText('123')

    // Clear any selection and press Ctrl+C
    await page.keyboard.press('Escape')
    await page.keyboard.press('Control+c')

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText())
    expect(clipboardText).toBe('123')
  })

  test('clicking timestamp UTC copies the value', async ({ page }) => {
    const input = page.getByTestId('calc-input')
    // Use a known timestamp
    await input.fill('1704067200')

    await expect(page.getByTestId('result-utc')).toBeVisible()

    const utcRow = page.getByTestId('result-utc').locator('..')
    await utcRow.click()

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText())
    // Should contain the formatted date
    expect(clipboardText).toContain('2024-01-01')
  })

  test('negative hex value copied without prefix preserves minus', async ({ page }) => {
    const input = page.getByTestId('calc-input')
    await input.fill('-16')

    await expect(page.getByTestId('result-hex')).toHaveText('-0x10')

    const hexRow = page.getByTestId('result-hex').locator('..')
    await hexRow.click()

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText())
    expect(clipboardText).toBe('-10')
  })

  test('result rows have cursor pointer for clickability', async ({ page }) => {
    const input = page.getByTestId('calc-input')
    await input.fill('50')

    await expect(page.getByTestId('result-dec')).toBeVisible()

    const decRow = page.getByTestId('result-dec').locator('..')
    const cursor = await decRow.evaluate((el) => window.getComputedStyle(el).cursor)
    expect(cursor).toBe('pointer')
  })
})
