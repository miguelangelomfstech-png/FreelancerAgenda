import { test, expect } from '@playwright/test';

test.describe('Booking Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should complete a booking through the public link', async ({ page }) => {
    // 1. Setup a user and service
    await page.goto('/register');
    const professionalName = 'Professional-' + Date.now();
    await page.fill('input[placeholder="Seu Nome"]', professionalName);
    await page.fill('input[type="email"]', `pro-${Date.now()}@example.com`);
    await page.fill('input[placeholder="Senha"]', 'password123');
    await page.fill('input[placeholder="Repita a Senha"]', 'password123');
    await Promise.all([
        page.waitForNavigation(),
        page.click('button:has-text("Registrar")')
    ]);

    // Get UID from URL or just wait for dashboard
    await expect(page).toHaveURL('/dashboard');
    
    // Create a service
    await page.click('text=Novo Serviço');
    await page.fill('#service-name', 'Consultoria VIP');
    await page.click('button:has-text("Salvar Serviço")');
    await expect(page.locator('text=Consultoria VIP')).toBeVisible();

    // Get the shared link info (uid)
    await page.waitForFunction(() => localStorage.getItem('app_session'));
    const uid = await page.evaluate(() => {
        return localStorage.getItem('app_session');
    });
    
    if (!uid) throw new Error("UID not found in localStorage");

    // 2. Go to booking page
    await page.goto(`/book?uid=${uid}`);
    await expect(page.locator('text=Agende seu Horário')).toBeVisible();
    await expect(page.locator('text=' + professionalName)).toBeVisible();

    // Step 1: Select Service
    await page.click('text=Consultoria VIP');
    // Step 1 automatically goes to step 2 on click.

    // Step 2: Select Date (Next available)
    // Click on the first available date button
    await page.locator('button.flex-shrink-0.w-24').first().click();

    // Step 2.5: Select Time
    // Click on the first available time slot
    await page.locator('button:not([disabled]).py-2').first().click();
    
    // Wait for button to be enabled before clicking
    const continueBtn = page.locator('button:has-text("Continuar")');
    await expect(continueBtn).toBeEnabled();
    await continueBtn.click();

    // Step 3: Fill Client Data
    await page.fill('input[placeholder="Seu nome completo"]', 'Cliente Teste');
    await page.fill('input[placeholder="Telefone (WhatsApp)"]', '11999999999');
    await page.click('button:has-text("Confirmar Agendamento")');

    // Verify Success
    await expect(page.locator('text=Agendamento Confirmado!')).toBeVisible({ timeout: 10000 });
  });
});
