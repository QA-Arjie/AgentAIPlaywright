import { test, expect } from '@playwright/test';

test.describe('Login Scenarios', () => {
  test('1.1 Valid Login - Standard User', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://www.saucedemo.com/');
    
    // Enter credentials
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    
    // Click login button
    await page.click('[data-test="login-button"]');
    
    // Verify redirect to inventory page
    await expect(page).toHaveURL(/.*inventory.html/);
    
    // Verify inventory list is visible with products
    await expect(page.locator('.inventory_list')).toBeVisible();
    const productCount = await page.locator('.inventory_item').count();
    expect(productCount).toBe(6);
  });

  test('1.2 Valid Login - Problem User', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://www.saucedemo.com/');
    
    // Enter problem_user credentials
    await page.fill('[data-test="username"]', 'problem_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    
    // Click login button
    await page.click('[data-test="login-button"]');
    
    // Verify redirect to inventory page
    await expect(page).toHaveURL(/.*inventory.html/);
    
    // Verify inventory is displayed
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('1.3 Valid Login - Performance Glitch User', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://www.saucedemo.com/');
    
    // Enter performance_glitch_user credentials
    await page.fill('[data-test="username"]', 'performance_glitch_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    
    // Click login button
    await page.click('[data-test="login-button"]');
    
    // Verify redirect to inventory page (with potential delay)
    await expect(page).toHaveURL(/.*inventory.html/, { timeout: 10000 });
    
    // Verify inventory loads successfully
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('2.1 Invalid Username', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://www.saucedemo.com/');
    
    // Enter invalid credentials
    await page.fill('[data-test="username"]', 'invalid_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    
    // Click login button
    await page.click('[data-test="login-button"]');
    
    // Verify error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Username and password do not match');
  });

  test('2.2 Invalid Password', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://www.saucedemo.com/');
    
    // Enter invalid password
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'wrong_password');
    
    // Click login button
    await page.click('[data-test="login-button"]');
    
    // Verify error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Username and password do not match');
  });

  test('2.3 Locked Out User', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://www.saucedemo.com/');
    
    // Enter locked_out_user credentials
    await page.fill('[data-test="username"]', 'locked_out_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    
    // Click login button
    await page.click('[data-test="login-button"]');
    
    // Verify locked out error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('user has been locked out');
  });

  test('2.4 Empty Username', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://www.saucedemo.com/');
    
    // Leave username empty and enter password
    await page.fill('[data-test="password"]', 'secret_sauce');
    
    // Click login button
    await page.click('[data-test="login-button"]');
    
    // Verify error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('required');
  });

  test('2.5 Empty Password', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://www.saucedemo.com/');
    
    // Enter username and leave password empty
    await page.fill('[data-test="username"]', 'standard_user');
    
    // Click login button
    await page.click('[data-test="login-button"]');
    
    // Verify error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('required');
  });

  test('2.6 Empty Username and Password', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://www.saucedemo.com/');
    
    // Leave both fields empty
    // Just click login button
    await page.click('[data-test="login-button"]');
    
    // Verify error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('required');
  });

  test('3.1 SQL Injection Attempt', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://www.saucedemo.com/');
    
    // Enter SQL injection payload
    await page.fill('[data-test="username"]', "' OR '1'='1");
    await page.fill('[data-test="password"]', "' OR '1'='1");
    
    // Click login button
    await page.click('[data-test="login-button"]');
    
    // Verify error message (not bypassed)
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
  });

  test('3.3 Case Sensitivity', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://www.saucedemo.com/');
    
    // Enter credentials with different case
    await page.fill('[data-test="username"]', 'STANDARD_USER');
    await page.fill('[data-test="password"]', 'SECRET_SAUCE');
    
    // Click login button
    await page.click('[data-test="login-button"]');
    
    // Verify error message (case-sensitive)
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
  });
});
