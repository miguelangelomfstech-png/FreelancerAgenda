import { test, expect } from '@playwright/test';

test.describe('Multi-user Data Isolation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should isolate data between different users', async ({ page, context }) => {
    const userA = `user-a-${Date.now()}@test.com`;
    const userB = `user-b-${Date.now()}@test.com`;

    // 1. User A creates a service
    await page.goto('/register');
    await page.fill('input[placeholder="Seu Nome"]', 'User A');
    await page.fill('input[type="email"]', userA);
    await page.fill('input[placeholder="Senha"]', 'password123');
    await page.fill('input[placeholder="Repita a Senha"]', 'password123');
    await page.click('button:has-text("Registrar")');
    
    await page.click('text=Novo Serviço');
    await page.fill('#service-name', 'Service A exclusive');
    await page.click('button:has-text("Salvar Serviço")');
    await expect(page.locator('text=Service A exclusive')).toBeVisible();

    // 2. User A logs out
    await page.click('button[title="Sair"]');
    await page.waitForURL('/login');

    // 3. User B registers
    await page.goto('/register');
    await page.fill('input[placeholder="Seu Nome"]', 'User B');
    await page.fill('input[type="email"]', userB);
    await page.fill('input[placeholder="Senha"]', 'password123');
    await page.fill('input[placeholder="Repita a Senha"]', 'password123');
    await Promise.all([
        page.waitForNavigation(),
        page.click('button:has-text("Registrar")')
    ]);

    await page.reload();
    await expect(page.locator('text=User B')).toBeVisible();

    // 4. Verify User B does NOT see User A's service
    console.log('Verifying isolation for User B...');
    const serviceVisibility = await page.locator('text=Service A exclusive').isVisible();
    console.log('Service A visible for User B?', serviceVisibility);
    
    await expect(page.locator('text=Service A exclusive')).not.toBeVisible();
    await expect(page.locator('text=Nenhum serviço cadastrado')).toBeVisible();
  });
});
