import { test, expect } from '@playwright/test';

test('should login and add first product to cart', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');

  // Enter username and password
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');

  // Click the login button
  await page.click('[data-test="login-button"]');

  // Verify that the inventory list is visible
  await expect(page.locator('.inventory_list')).toBeVisible();

  // Add the first product to the cart
  await page.click('.inventory_item:first-child .btn_inventory');

  // Navigate to the cart page
  await page.click('.shopping_cart_link');

  // Verify that the product is present in the cart
  await expect(page.locator('.cart_item')).toBeVisible();

  await page.pause()

});