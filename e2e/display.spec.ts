import { test, expect } from '@playwright/test'

test.describe('Results Display', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('shows all four bases when result exists', async ({ page }) => {
    const input = page.getByTestId('calc-input')
    await input.fill('42')

    await expect(page.getByTestId('calc-results')).toBeVisible()
    await expect(page.getByTestId('result-dec')).toBeVisible()
    await expect(page.getByTestId('result-hex')).toBeVisible()
    await expect(page.getByTestId('result-bin')).toBeVisible()
    await expect(page.getByTestId('result-oct')).toBeVisible()
  })

  test('entering 255 shows correct values in all bases', async ({ page }) => {
    const input = page.getByTestId('calc-input')
    await input.fill('255')

    await expect(page.getByTestId('result-dec')).toHaveText('255')
    await expect(page.getByTestId('result-hex')).toHaveText('0xFF')
    await expect(page.getByTestId('result-bin')).toHaveText('0b11111111')
    await expect(page.getByTestId('result-oct')).toHaveText('0o377')
  })

  test('results are displayed in a grid layout', async ({ page }) => {
    const input = page.getByTestId('calc-input')
    await input.fill('100')

    const resultsContainer = page.getByTestId('calc-results')
    await expect(resultsContainer).toBeVisible()

    const style = await resultsContainer.evaluate((el) =>
      window.getComputedStyle(el).display
    )
    expect(style).toBe('grid')
  })

  test('displays labels for each base', async ({ page }) => {
    const input = page.getByTestId('calc-input')
    await input.fill('10')

    const resultsContainer = page.getByTestId('calc-results')
    await expect(resultsContainer).toContainText('DEC')
    await expect(resultsContainer).toContainText('HEX')
    await expect(resultsContainer).toContainText('BIN')
    await expect(resultsContainer).toContainText('OCT')
  })

  test('uses monospace font for number values', async ({ page }) => {
    const input = page.getByTestId('calc-input')
    await input.fill('123')

    const decResult = page.getByTestId('result-dec')
    const fontFamily = await decResult.evaluate((el) =>
      window.getComputedStyle(el).fontFamily
    )
    expect(fontFamily.toLowerCase()).toMatch(/mono/)
  })

  test('results update when expression changes', async ({ page }) => {
    const input = page.getByTestId('calc-input')

    await input.fill('10')
    await expect(page.getByTestId('result-dec')).toHaveText('10')
    await expect(page.getByTestId('result-hex')).toHaveText('0xA')

    await input.fill('16')
    await expect(page.getByTestId('result-dec')).toHaveText('16')
    await expect(page.getByTestId('result-hex')).toHaveText('0x10')
  })

  test('no results displayed when input is empty', async ({ page }) => {
    await expect(page.getByTestId('calc-results')).not.toBeVisible()
  })
})
