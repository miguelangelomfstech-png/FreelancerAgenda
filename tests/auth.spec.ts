import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  const email = `test-${Date.now()}@example.com`;
  const password = 'Password@123';

  test('should register a new user', async ({ page }) => {
    await page.goto('/register');
    await page.fill('input[placeholder="Seu Nome"]', 'Test User');
    await page.fill('input[type="email"]', email);
    await page.fill('input[placeholder="Senha"]', password);
    await page.fill('input[placeholder="Repita a Senha"]', password);
    await page.click('button:has-text("Registrar")');

    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('text=Test User')).toBeVisible();
  });

  test('should logout and login again', async ({ page }) => {
    // Register first to ensure user exists
    await page.goto('/register');
    await page.fill('input[placeholder="Seu Nome"]', 'Login User');
    const loginEmail = `login-${Date.now()}@example.com`;
    await page.fill('input[type="email"]', loginEmail);
    await page.fill('input[placeholder="Senha"]', password);
    await page.fill('input[placeholder="Repita a Senha"]', password);
    await page.click('button:has-text("Registrar")');

    // Logout
    await page.click('button[title="Sair"]');
    await expect(page).toHaveURL('/login');

    // Login
    await page.fill('input[type="email"]', loginEmail);
    await page.fill('input[type="password"]', password);
    await page.click('button:has-text("Entrar")');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should redirect to login when accessing dashboard unauthorized', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/login');
  });
});
