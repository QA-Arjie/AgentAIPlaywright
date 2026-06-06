# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\demotest\cart-scenarios.spec.ts >> Cart Scenarios >> 1.6 View Empty Cart
- Location: tests\demotest\cart-scenarios.spec.ts:87:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Your cart is empty')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Your cart is empty')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e11]: Swag Labs
      - generic [ref=e15]: Your Cart
    - generic [ref=e17]:
      - generic [ref=e18]:
        - generic [ref=e19]: QTY
        - generic [ref=e20]: Description
      - generic [ref=e21]:
        - button "Go back Continue Shopping" [ref=e22] [cursor=pointer]:
          - img "Go back" [ref=e23]
          - text: Continue Shopping
        - button "Checkout" [ref=e24] [cursor=pointer]
  - contentinfo [ref=e25]:
    - list [ref=e26]:
      - listitem [ref=e27]:
        - link "Twitter" [ref=e28] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e29]:
        - link "Facebook" [ref=e30] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e31]:
        - link "LinkedIn" [ref=e32] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e33]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Cart Scenarios', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     // Login before each test
  6   |     await page.goto('https://www.saucedemo.com/');
  7   |     await page.fill('[data-test="username"]', 'standard_user');
  8   |     await page.fill('[data-test="password"]', 'secret_sauce');
  9   |     await page.click('[data-test="login-button"]');
  10  |     await expect(page).toHaveURL(/.*inventory.html/);
  11  |   });
  12  | 
  13  |   test('1.1 Add Single Product to Cart', async ({ page }) => {
  14  |     // Click add to cart button for first product
  15  |     await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  16  |     
  17  |     // Verify button changes to "Remove from cart"
  18  |     const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
  19  |     await expect(removeButton).toBeVisible();
  20  |     
  21  |     // Verify cart badge shows 1
  22  |     const cartBadge = page.locator('.shopping_cart_badge');
  23  |     await expect(cartBadge).toContainText('1');
  24  |   });
  25  | 
  26  |   test('1.2 Add Multiple Products to Cart', async ({ page }) => {
  27  |     // Add 3 products to cart
  28  |     await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  29  |     await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
  30  |     await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
  31  |     
  32  |     // Verify cart badge shows 3
  33  |     const cartBadge = page.locator('.shopping_cart_badge');
  34  |     await expect(cartBadge).toContainText('3');
  35  |   });
  36  | 
  37  |   test('1.3 View Cart', async ({ page }) => {
  38  |     // Add product to cart
  39  |     await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  40  |     
  41  |     // Click shopping cart icon
  42  |     await page.click('[data-test="shopping-cart-link"]');
  43  |     
  44  |     // Verify on cart page
  45  |     await expect(page).toHaveURL(/.*cart.html/);
  46  |     
  47  |     // Verify product is displayed in cart
  48  |     await expect(page.locator('.cart_item')).toBeVisible();
  49  |   });
  50  | 
  51  |   test('1.4 Remove Product from Cart', async ({ page }) => {
  52  |     // Add product to cart
  53  |     await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  54  |     
  55  |     // Navigate to cart
  56  |     await page.click('[data-test="shopping-cart-link"]');
  57  |     
  58  |     // Remove product from cart
  59  |     await page.click('[data-test="remove-sauce-labs-backpack"]');
  60  |     
  61  |     // Verify cart is empty
  62  |     const cartItems = page.locator('.cart_item');
  63  |     await expect(cartItems).toHaveCount(0);
  64  |     
  65  |     // Verify cart badge is gone or shows 0
  66  |     const cartBadge = page.locator('.shopping_cart_badge');
  67  |     const badgeVisible = await cartBadge.isVisible().catch(() => false);
  68  |     if (badgeVisible) {
  69  |       await expect(cartBadge).toContainText('0');
  70  |     }
  71  |   });
  72  | 
  73  |   test('1.5 Cart Persists After Navigation', async ({ page }) => {
  74  |     // Add product to cart
  75  |     await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  76  |     
  77  |     // Navigate back to inventory
  78  |     await page.click('text=Products');
  79  |     
  80  |     // Navigate back to cart
  81  |     await page.click('[data-test="shopping-cart-link"]');
  82  |     
  83  |     // Verify product is still in cart
  84  |     await expect(page.locator('.cart_item')).toHaveCount(1);
  85  |   });
  86  | 
  87  |   test('1.6 View Empty Cart', async ({ page }) => {
  88  |     // Navigate to cart without adding items
  89  |     await page.click('[data-test="shopping-cart-link"]');
  90  |     
  91  |     // Verify empty cart message
  92  |     const emptyCart = page.locator('text=Your cart is empty');
> 93  |     await expect(emptyCart).toBeVisible();
      |                             ^ Error: expect(locator).toBeVisible() failed
  94  |     
  95  |     // Verify continue shopping button is available
  96  |     const continueButton = page.locator('[data-test="continue-shopping"]');
  97  |     await expect(continueButton).toBeVisible();
  98  |   });
  99  | 
  100 |   test('1.7 Continue Shopping from Cart', async ({ page }) => {
  101 |     // Navigate to cart
  102 |     await page.click('[data-test="shopping-cart-link"]');
  103 |     
  104 |     // Click continue shopping button
  105 |     await page.click('[data-test="continue-shopping"]');
  106 |     
  107 |     // Verify redirected to inventory
  108 |     await expect(page).toHaveURL(/.*inventory.html/);
  109 |   });
  110 | 
  111 |   test('2.1 Access Cart Without Adding Items', async ({ page }) => {
  112 |     // Click shopping cart icon
  113 |     await page.click('[data-test="shopping-cart-link"]');
  114 |     
  115 |     // Verify empty cart page is displayed
  116 |     await expect(page).toHaveURL(/.*cart.html/);
  117 |     
  118 |     // Verify empty state
  119 |     const cartItems = page.locator('.cart_item');
  120 |     await expect(cartItems).toHaveCount(0);
  121 |   });
  122 | 
  123 |   test('3.1 Add Same Product Multiple Times', async ({ page }) => {
  124 |     // Add same product twice
  125 |     await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  126 |     
  127 |     // The button should change to remove, not allow adding again
  128 |     const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  129 |     const isVisible = await addButton.isVisible().catch(() => false);
  130 |     
  131 |     // Navigate to cart to verify
  132 |     await page.click('[data-test="shopping-cart-link"]');
  133 |     
  134 |     // Verify only one instance in cart
  135 |     await expect(page.locator('.cart_item')).toHaveCount(1);
  136 |   });
  137 | 
  138 |   test('3.3 Cart Badge Counter Accuracy', async ({ page }) => {
  139 |     // Add and remove items multiple times
  140 |     await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  141 |     await expect(page.locator('.shopping_cart_badge')).toContainText('1');
  142 |     
  143 |     await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
  144 |     await expect(page.locator('.shopping_cart_badge')).toContainText('2');
  145 |     
  146 |     await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
  147 |     await expect(page.locator('.shopping_cart_badge')).toContainText('3');
  148 |     
  149 |     // Remove one item
  150 |     await page.click('[data-test="remove-sauce-labs-backpack"]');
  151 |     await expect(page.locator('.shopping_cart_badge')).toContainText('2');
  152 |   });
  153 | });
  154 | 
```