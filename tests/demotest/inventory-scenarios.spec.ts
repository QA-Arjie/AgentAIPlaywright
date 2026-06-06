import { test, expect } from '@playwright/test';

test.describe('Inventory Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('1.1 View All Products', async ({ page }) => {
    // Verify all 6 products are displayed
    const products = page.locator('.inventory_item');
    await expect(products).toHaveCount(6);
    
    // Verify specific products are visible
    await expect(page.locator('text=Sauce Labs Backpack')).toBeVisible();
    await expect(page.locator('text=Sauce Labs Bike Light')).toBeVisible();
    await expect(page.locator('text=Sauce Labs Bolt T-Shirt')).toBeVisible();
    await expect(page.locator('text=Sauce Labs Fleece Jacket')).toBeVisible();
    await expect(page.locator('text=Sauce Labs Onesie')).toBeVisible();
    await expect(page.locator('text=Test.allTheThings() T-Shirt')).toBeVisible();
  });

  test('1.2 Sort Products - Name (A to Z)', async ({ page }) => {
    // Select sort option
    await page.selectOption('[data-test="product_sort_container"] select', 'az');
    
    // Get product names
    const productNames = await page.locator('.inventory_item_name').allTextContents();
    
    // Verify they are sorted A to Z
    const sorted = [...productNames].sort();
    expect(productNames).toEqual(sorted);
  });

  test('1.3 Sort Products - Name (Z to A)', async ({ page }) => {
    // Select sort option
    await page.selectOption('[data-test="product_sort_container"] select', 'za');
    
    // Get product names
    const productNames = await page.locator('.inventory_item_name').allTextContents();
    
    // Verify they are sorted Z to A
    const sorted = [...productNames].sort().reverse();
    expect(productNames).toEqual(sorted);
  });

  test('1.4 Sort Products - Price (Low to High)', async ({ page }) => {
    // Select sort option
    await page.selectOption('[data-test="product_sort_container"] select', 'lohi');
    
    // Get product prices
    const priceTexts = await page.locator('.inventory_item_price').allTextContents();
    const prices = priceTexts.map(p => parseFloat(p.replace('$', '')));
    
    // Verify prices are sorted low to high
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('1.5 Sort Products - Price (High to Low)', async ({ page }) => {
    // Select sort option
    await page.selectOption('[data-test="product_sort_container"] select', 'hilo');
    
    // Get product prices
    const priceTexts = await page.locator('.inventory_item_price').allTextContents();
    const prices = priceTexts.map(p => parseFloat(p.replace('$', '')));
    
    // Verify prices are sorted high to low
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test('1.6 View Product Details', async ({ page }) => {
    // Click on first product
    await page.click('[data-test="item-4-title-link"]');
    
    // Verify product detail page
    await expect(page).toHaveURL(/.*inventory-item.html/);
    
    // Verify product details are displayed
    await expect(page.locator('.inventory_details_name')).toBeVisible();
    await expect(page.locator('.inventory_details_price')).toBeVisible();
    await expect(page.locator('.inventory_details_desc')).toBeVisible();
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  });

  test('1.7 Back to Inventory', async ({ page }) => {
    // Click on first product
    await page.click('[data-test="item-4-title-link"]');
    
    // Verify on product detail page
    await expect(page).toHaveURL(/.*inventory-item.html/);
    
    // Click back button
    await page.click('[data-test="back-to-products"]');
    
    // Verify back to inventory
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('3.1 View with No Login Session', async ({ page, context }) => {
    // Create new context without login
    const newPage = await context.newPage();
    
    // Navigate directly to inventory
    await newPage.goto('https://www.saucedemo.com/inventory.html');
    
    // Verify redirected to login
    await expect(newPage).toHaveURL('https://www.saucedemo.com/');
    
    await newPage.close();
  });

  test('3.2 Performance Glitch User', async ({ page }) => {
    // Navigate back to login
    await page.goto('https://www.saucedemo.com/');
    
    // Login with performance_glitch_user
    await page.fill('[data-test="username"]', 'performance_glitch_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    
    // Wait for inventory to load
    await expect(page.locator('.inventory_list')).toBeVisible({ timeout: 10000 });
    
    // Verify products are displayed
    const products = page.locator('.inventory_item');
    await expect(products).toHaveCount(6);
  });

  test('3.3 Problem User - Visual Issues', async ({ page }) => {
    // Navigate back to login
    await page.goto('https://www.saucedemo.com/');
    
    // Login with problem_user
    await page.fill('[data-test="username"]', 'problem_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    
    // Verify inventory is displayed (even with visual issues)
    await expect(page.locator('.inventory_list')).toBeVisible();
  });
});
