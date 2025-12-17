import { test, expect } from '@playwright/test';

test.describe('Dashboard Management', () => {
  test.beforeEach(async ({ page }) => {
    // Register a fresh user for each test
    await page.goto('/register');
    await page.fill('input[placeholder="Seu Nome"]', 'Manager');
    await page.fill('input[type="email"]', `manager-${Date.now()}@example.com`);
    await page.fill('input[placeholder="Senha"]', 'password123');
    await page.fill('input[placeholder="Repita a Senha"]', 'password123');
    await page.click('button:has-text("Registrar")');
  });

  test('should add and delete a service', async ({ page }) => {
    // Open modal
    await page.click('text=Novo Serviço');
    
    // Fill form
    await page.fill('#service-name', 'Test Service');
    await page.fill('#service-description', 'Test Description');
    await page.fill('#service-duration', '45');
    await page.fill('#service-price', '200');
    
    await page.click('button:has-text("Salvar Serviço")');

    // Verify addition
    await expect(page.locator('text=Test Service')).toBeVisible();
    await expect(page.locator('text=200.00')).toBeVisible();

    // Delete - need to hover or force click because of group-hover opacity
    await page.hover('text=Test Service');
    await page.click('button[title="Excluir serviço"]', { force: true });
    await expect(page.locator('text=Test Service')).not.toBeVisible();
  });
});
