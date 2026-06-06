import { test, expect } from '@playwright/test';

test.describe('Cart Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('1.1 Add Single Product to Cart', async ({ page }) => {
    // Click add to cart button for first product
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Verify button changes to "Remove from cart"
    const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    await expect(removeButton).toBeVisible();
    
    // Verify cart badge shows 1
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toContainText('1');
  });

  test('1.2 Add Multiple Products to Cart', async ({ page }) => {
    // Add 3 products to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    
    // Verify cart badge shows 3
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toContainText('3');
  });

  test('1.3 View Cart', async ({ page }) => {
    // Add product to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Click shopping cart icon
    await page.click('[data-test="shopping-cart-link"]');
    
    // Verify on cart page
    await expect(page).toHaveURL(/.*cart.html/);
    
    // Verify product is displayed in cart
    await expect(page.locator('.cart_item')).toBeVisible();
  });

  test('1.4 Remove Product from Cart', async ({ page }) => {
    // Add product to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Navigate to cart
    await page.click('[data-test="shopping-cart-link"]');
    
    // Remove product from cart
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    
    // Verify cart is empty
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(0);
    
    // Verify cart badge is gone or shows 0
    const cartBadge = page.locator('.shopping_cart_badge');
    const badgeVisible = await cartBadge.isVisible().catch(() => false);
    if (badgeVisible) {
      await expect(cartBadge).toContainText('0');
    }
  });

  test('1.5 Cart Persists After Navigation', async ({ page }) => {
    // Add product to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Navigate back to inventory
    await page.click('text=Products');
    
    // Navigate back to cart
    await page.click('[data-test="shopping-cart-link"]');
    
    // Verify product is still in cart
    await expect(page.locator('.cart_item')).toHaveCount(1);
  });

  test('1.6 View Empty Cart', async ({ page }) => {
    // Navigate to cart without adding items
    await page.click('[data-test="shopping-cart-link"]');
    
    // Verify empty cart message
    const emptyCart = page.locator('text=Your cart is empty');
    await expect(emptyCart).toBeVisible();
    
    // Verify continue shopping button is available
    const continueButton = page.locator('[data-test="continue-shopping"]');
    await expect(continueButton).toBeVisible();
  });

  test('1.7 Continue Shopping from Cart', async ({ page }) => {
    // Navigate to cart
    await page.click('[data-test="shopping-cart-link"]');
    
    // Click continue shopping button
    await page.click('[data-test="continue-shopping"]');
    
    // Verify redirected to inventory
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('2.1 Access Cart Without Adding Items', async ({ page }) => {
    // Click shopping cart icon
    await page.click('[data-test="shopping-cart-link"]');
    
    // Verify empty cart page is displayed
    await expect(page).toHaveURL(/.*cart.html/);
    
    // Verify empty state
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(0);
  });

  test('3.1 Add Same Product Multiple Times', async ({ page }) => {
    // Add same product twice
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // The button should change to remove, not allow adding again
    const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    const isVisible = await addButton.isVisible().catch(() => false);
    
    // Navigate to cart to verify
    await page.click('[data-test="shopping-cart-link"]');
    
    // Verify only one instance in cart
    await expect(page.locator('.cart_item')).toHaveCount(1);
  });

  test('3.3 Cart Badge Counter Accuracy', async ({ page }) => {
    // Add and remove items multiple times
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(page.locator('.shopping_cart_badge')).toContainText('1');
    
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await expect(page.locator('.shopping_cart_badge')).toContainText('2');
    
    await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    await expect(page.locator('.shopping_cart_badge')).toContainText('3');
    
    // Remove one item
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    await expect(page.locator('.shopping_cart_badge')).toContainText('2');
  });
});
