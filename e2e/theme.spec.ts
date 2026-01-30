import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('theme toggle switches colors', async ({ page }) => {
    await page.goto('/');

    const toggle = page.getByTestId('theme-toggle');
    await expect(toggle).toBeVisible();

    // Get initial theme (should be dark by default or system preference)
    const initialTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );

    // Click toggle to switch theme
    await toggle.click();

    // Verify theme changed
    const newTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );
    expect(newTheme).not.toBe(initialTheme);

    // Verify CSS variables changed (check background color)
    const bgColor = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim()
    );

    if (newTheme === 'light') {
      expect(bgColor).toBe('#ffffff');
    } else {
      expect(bgColor).toBe('#0a0a0a');
    }

    // Toggle back
    await toggle.click();
    const restoredTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );
    expect(restoredTheme).toBe(initialTheme);
  });

  test('theme preference persists after reload', async ({ page }) => {
    await page.goto('/');

    const toggle = page.getByTestId('theme-toggle');

    // Get initial theme
    const initialTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );

    // Toggle to opposite theme
    await toggle.click();

    const newTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );
    expect(newTheme).not.toBe(initialTheme);

    // Verify localStorage was updated
    const storedTheme = await page.evaluate(() =>
      localStorage.getItem('devcalc-theme')
    );
    expect(storedTheme).toBe(newTheme);

    // Reload the page
    await page.reload();

    // Verify theme persisted
    const persistedTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );
    expect(persistedTheme).toBe(newTheme);
  });

  test('toggle button shows correct icon for current theme', async ({ page }) => {
    await page.goto('/');

    const toggle = page.getByTestId('theme-toggle');

    // In dark mode, should show sun icon (to switch to light)
    // In light mode, should show moon icon (to switch to dark)
    const initialTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );

    // Check aria-label reflects current state
    if (initialTheme === 'dark') {
      await expect(toggle).toHaveAttribute('aria-label', 'Switch to light theme');
    } else {
      await expect(toggle).toHaveAttribute('aria-label', 'Switch to dark theme');
    }

    // Toggle and check aria-label updated
    await toggle.click();

    const newTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );

    if (newTheme === 'dark') {
      await expect(toggle).toHaveAttribute('aria-label', 'Switch to light theme');
    } else {
      await expect(toggle).toHaveAttribute('aria-label', 'Switch to dark theme');
    }
  });
});
