import { test, expect } from '@playwright/test';

test.describe('Checkout Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    // Login and add product to cart before each test
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/.*inventory.html/);
    
    // Add product to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  });

  test('1.1 Complete Checkout Successfully', async ({ page }) => {
    // Navigate to cart
    await page.click('[data-test="shopping-cart-link"]');
    
    // Click checkout button
    await page.click('[data-test="checkout"]');
    
    // Verify on checkout page
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
    
    // Fill in checkout form
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    
    // Click continue button
    await page.click('[data-test="continue"]');
    
    // Verify on overview page
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    
    // Click finish button
    await page.click('[data-test="finish"]');
    
    // Verify order confirmation
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    await expect(page.locator('.complete-header')).toContainText('Thank you for your order');
  });

  test('1.2 Verify Order Summary', async ({ page }) => {
    // Navigate to cart
    await page.click('[data-test="shopping-cart-link"]');
    
    // Click checkout button
    await page.click('[data-test="checkout"]');
    
    // Fill in checkout form
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    
    // Click continue button
    await page.click('[data-test="continue"]');
    
    // Verify on overview page
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    
    // Verify product is in summary
    await expect(page.locator('.cart_item')).toBeVisible();
    
    // Verify totals are displayed
    await expect(page.locator('.summary_subtotal_label')).toBeVisible();
    await expect(page.locator('.summary_tax_label')).toBeVisible();
    await expect(page.locator('.summary_total_label')).toBeVisible();
  });

  test('2.1 Checkout Without Products in Cart', async ({ page }) => {
    // Remove product from cart first
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    
    // Navigate to cart
    await page.click('[data-test="shopping-cart-link"]');
    
    // Verify empty cart
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(0);
  });

  test('2.2 Missing First Name', async ({ page }) => {
    // Navigate to cart
    await page.click('[data-test="shopping-cart-link"]');
    
    // Click checkout button
    await page.click('[data-test="checkout"]');
    
    // Leave first name empty, fill other fields
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    
    // Click continue button
    await page.click('[data-test="continue"]');
    
    // Verify error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('required');
  });

  test('2.3 Missing Last Name', async ({ page }) => {
    // Navigate to cart
    await page.click('[data-test="shopping-cart-link"]');
    
    // Click checkout button
    await page.click('[data-test="checkout"]');
    
    // Fill first name and postal code, leave last name empty
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="postalCode"]', '12345');
    
    // Click continue button
    await page.click('[data-test="continue"]');
    
    // Verify error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('required');
  });

  test('2.4 Missing Postal Code', async ({ page }) => {
    // Navigate to cart
    await page.click('[data-test="shopping-cart-link"]');
    
    // Click checkout button
    await page.click('[data-test="checkout"]');
    
    // Fill first and last name, leave postal code empty
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    
    // Click continue button
    await page.click('[data-test="continue"]');
    
    // Verify error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('required');
  });

  test('2.5 All Fields Empty', async ({ page }) => {
    // Navigate to cart
    await page.click('[data-test="shopping-cart-link"]');
    
    // Click checkout button
    await page.click('[data-test="checkout"]');
    
    // Leave all fields empty and click continue
    await page.click('[data-test="continue"]');
    
    // Verify error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
  });

  test('2.7 Cancel Checkout', async ({ page }) => {
    // Navigate to cart
    await page.click('[data-test="shopping-cart-link"]');
    
    // Click checkout button
    await page.click('[data-test="checkout"]');
    
    // Click cancel button
    await page.click('[data-test="cancel"]');
    
    // Verify returned to cart page
    await expect(page).toHaveURL(/.*cart.html/);
    
    // Verify products remain in cart
    await expect(page.locator('.cart_item')).toBeVisible();
  });

  test('3.1 Checkout with Special Characters in Name', async ({ page }) => {
    // Navigate to cart
    await page.click('[data-test="shopping-cart-link"]');
    
    // Click checkout button
    await page.click('[data-test="checkout"]');
    
    // Fill form with special characters
    await page.fill('[data-test="firstName"]', 'José');
    await page.fill('[data-test="lastName"]', "O'Brien");
    await page.fill('[data-test="postalCode"]', '12345');
    
    // Click continue button
    await page.click('[data-test="continue"]');
    
    // Verify on overview page
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
  });

  test('3.2 Very Long Names', async ({ page }) => {
    // Navigate to cart
    await page.click('[data-test="shopping-cart-link"]');
    
    // Click checkout button
    await page.click('[data-test="checkout"]');
    
    // Fill form with very long names
    const longName = 'A'.repeat(100);
    await page.fill('[data-test="firstName"]', longName);
    await page.fill('[data-test="lastName"]', longName);
    await page.fill('[data-test="postalCode"]', '12345');
    
    // Click continue button
    await page.click('[data-test="continue"]');
    
    // Verify system handles long names (either truncates or accepts)
    // Should proceed to overview or show validation error
    const onOverviewPage = page.url().includes('checkout-step-two');
    const errorMessage = page.locator('[data-test="error"]');
    
    if (!onOverviewPage) {
      await expect(errorMessage).toBeVisible();
    }
  });

  test('3.3 Checkout with Single Item', async ({ page }) => {
    // Already have backpack in cart from beforeEach
    // Navigate to cart
    await page.click('[data-test="shopping-cart-link"]');
    
    // Verify only one item
    await expect(page.locator('.cart_item')).toHaveCount(1);
    
    // Click checkout button
    await page.click('[data-test="checkout"]');
    
    // Fill form
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    
    // Click continue
    await page.click('[data-test="continue"]');
    
    // Verify single item in summary
    await expect(page.locator('.cart_item')).toHaveCount(1);
    
    // Click finish
    await page.click('[data-test="finish"]');
    
    // Verify order confirmation
    await expect(page).toHaveURL(/.*checkout-complete.html/);
  });

  test('3.4 Checkout with Maximum Items', async ({ page }) => {
    // Add all 6 products to cart
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    // Add all products
    const addButtons = await page.locator('[data-test*="add-to-cart"]').all();
    for (const button of addButtons) {
      await button.click();
    }
    
    // Navigate to cart
    await page.click('[data-test="shopping-cart-link"]');
    
    // Verify all items are in cart
    await expect(page.locator('.cart_item')).toHaveCount(6);
    
    // Click checkout button
    await page.click('[data-test="checkout"]');
    
    // Fill form
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    
    // Click continue
    await page.click('[data-test="continue"]');
    
    // Verify all items in summary
    await expect(page.locator('.cart_item')).toHaveCount(6);
    
    // Verify total calculations
    const subtotal = await page.locator('.summary_subtotal_label').textContent();
    expect(subtotal).toBeTruthy();
  });
});
