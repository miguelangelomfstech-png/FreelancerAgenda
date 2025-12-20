import { test, expect } from '@playwright/test';

test.describe('Enterprise CRM Functional Tests', () => {
  
  test('Dashboard should render key metrics and charts', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Check for title
    await expect(page.getByText('Dashboard Overview', { exact: true })).toBeVisible();
    
    // Check for KPI cards
    await expect(page.getByText('Total Customers', { exact: true })).toBeVisible();
    await expect(page.getByText('Active Leads', { exact: true })).toBeVisible();
    await expect(page.getByText('Open Opportunities', { exact: true })).toBeVisible();
    
    // Check for charts (Recharts renders SVG)
    const charts = page.locator('.recharts-responsive-container');
    await expect(charts).toHaveCount(2);
  });

  test('Leads page should list contacts and support searching', async ({ page }) => {
    await page.goto('/dashboard/leads');
    await page.waitForLoadState('networkidle');
    
    await expect(page.getByText('All Leads', { exact: true })).toBeVisible();
    
    // Initial lead count (based on mock data)
    const rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(5);
    
    // Test search
    const searchInput = page.getByPlaceholder('Search leads...');
    await searchInput.fill('Alice');
    
    await expect(page.getByText('Alice Johnson')).toBeVisible();
    await expect(page.getByText('Bob Smith')).not.toBeVisible();
  });

  test('Opportunities page should display the sales pipeline', async ({ page }) => {
    await page.goto('/dashboard/opportunities');
    
    await expect(page.getByText('Sales Pipeline')).toBeVisible();
    
    // Check for stages
    await expect(page.getByText('Lead', { exact: true })).toBeVisible();
    await expect(page.getByText('Qualified', { exact: true })).toBeVisible();
    await expect(page.getByText('Negotiation', { exact: true })).toBeVisible();
    await expect(page.getByText('Closed Won', { exact: true })).toBeVisible();
    
    // Check for an opportunity card
    await expect(page.getByText('Acme Corp')).toBeVisible();
    await expect(page.getByText('Enterprise Software License')).toBeVisible();
  });

  test('Audit Logs should be accessible to admin', async ({ page }) => {
    await page.goto('/dashboard/admin/logs');
    await page.waitForLoadState('networkidle');
    
    await expect(page.getByRole('heading', { name: 'Security Audit Logs' })).toBeVisible();
    await expect(page.getByText('System Activity', { exact: true })).toBeVisible();
    
    // Check for specific log entries
    await expect(page.getByText('john.doe@mfstech.com')).toHaveCount(2);
    await expect(page.getByText('Failed Login Attempt')).toBeVisible();
  });

  test('Sidebar should navigate correctly', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Navigate to Leads
    await page.getByRole('link', { name: 'Leads' }).click();
    await expect(page).toHaveURL(/\/dashboard\/leads/);
    
    // Navigate to Opportunities
    await page.getByRole('link', { name: 'Opportunities' }).click();
    await expect(page).toHaveURL(/\/dashboard\/opportunities/);
    
    // Navigate back to Dashboard
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL(/\/dashboard/);
  });
});
