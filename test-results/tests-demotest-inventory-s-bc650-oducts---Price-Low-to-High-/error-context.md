# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\demotest\inventory-scenarios.spec.ts >> Inventory Scenarios >> 1.4 Sort Products - Price (Low to High)
- Location: tests\demotest\inventory-scenarios.spec.ts:51:7

# Error details

```
Error: page.selectOption: Target page, context or browser has been closed
Call log:
  - waiting for locator('[data-test="product_sort_container"] select')

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Inventory Scenarios', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     // Login before each test
  6   |     await page.goto('https://www.saucedemo.com/');
  7   |     await page.fill('[data-test="username"]', 'standard_user');
  8   |     await page.fill('[data-test="password"]', 'secret_sauce');
  9   |     await page.click('[data-test="login-button"]');
  10  |     await expect(page).toHaveURL(/.*inventory.html/);
  11  |   });
  12  | 
  13  |   test('1.1 View All Products', async ({ page }) => {
  14  |     // Verify all 6 products are displayed
  15  |     const products = page.locator('.inventory_item');
  16  |     await expect(products).toHaveCount(6);
  17  |     
  18  |     // Verify specific products are visible
  19  |     await expect(page.locator('text=Sauce Labs Backpack')).toBeVisible();
  20  |     await expect(page.locator('text=Sauce Labs Bike Light')).toBeVisible();
  21  |     await expect(page.locator('text=Sauce Labs Bolt T-Shirt')).toBeVisible();
  22  |     await expect(page.locator('text=Sauce Labs Fleece Jacket')).toBeVisible();
  23  |     await expect(page.locator('text=Sauce Labs Onesie')).toBeVisible();
  24  |     await expect(page.locator('text=Test.allTheThings() T-Shirt')).toBeVisible();
  25  |   });
  26  | 
  27  |   test('1.2 Sort Products - Name (A to Z)', async ({ page }) => {
  28  |     // Select sort option
  29  |     await page.selectOption('[data-test="product_sort_container"] select', 'az');
  30  |     
  31  |     // Get product names
  32  |     const productNames = await page.locator('.inventory_item_name').allTextContents();
  33  |     
  34  |     // Verify they are sorted A to Z
  35  |     const sorted = [...productNames].sort();
  36  |     expect(productNames).toEqual(sorted);
  37  |   });
  38  | 
  39  |   test('1.3 Sort Products - Name (Z to A)', async ({ page }) => {
  40  |     // Select sort option
  41  |     await page.selectOption('[data-test="product_sort_container"] select', 'za');
  42  |     
  43  |     // Get product names
  44  |     const productNames = await page.locator('.inventory_item_name').allTextContents();
  45  |     
  46  |     // Verify they are sorted Z to A
  47  |     const sorted = [...productNames].sort().reverse();
  48  |     expect(productNames).toEqual(sorted);
  49  |   });
  50  | 
  51  |   test('1.4 Sort Products - Price (Low to High)', async ({ page }) => {
  52  |     // Select sort option
> 53  |     await page.selectOption('[data-test="product_sort_container"] select', 'lohi');
      |                ^ Error: page.selectOption: Target page, context or browser has been closed
  54  |     
  55  |     // Get product prices
  56  |     const priceTexts = await page.locator('.inventory_item_price').allTextContents();
  57  |     const prices = priceTexts.map(p => parseFloat(p.replace('$', '')));
  58  |     
  59  |     // Verify prices are sorted low to high
  60  |     const sorted = [...prices].sort((a, b) => a - b);
  61  |     expect(prices).toEqual(sorted);
  62  |   });
  63  | 
  64  |   test('1.5 Sort Products - Price (High to Low)', async ({ page }) => {
  65  |     // Select sort option
  66  |     await page.selectOption('[data-test="product_sort_container"] select', 'hilo');
  67  |     
  68  |     // Get product prices
  69  |     const priceTexts = await page.locator('.inventory_item_price').allTextContents();
  70  |     const prices = priceTexts.map(p => parseFloat(p.replace('$', '')));
  71  |     
  72  |     // Verify prices are sorted high to low
  73  |     const sorted = [...prices].sort((a, b) => b - a);
  74  |     expect(prices).toEqual(sorted);
  75  |   });
  76  | 
  77  |   test('1.6 View Product Details', async ({ page }) => {
  78  |     // Click on first product
  79  |     await page.click('[data-test="item-4-title-link"]');
  80  |     
  81  |     // Verify product detail page
  82  |     await expect(page).toHaveURL(/.*inventory-item.html/);
  83  |     
  84  |     // Verify product details are displayed
  85  |     await expect(page.locator('.inventory_details_name')).toBeVisible();
  86  |     await expect(page.locator('.inventory_details_price')).toBeVisible();
  87  |     await expect(page.locator('.inventory_details_desc')).toBeVisible();
  88  |     await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  89  |   });
  90  | 
  91  |   test('1.7 Back to Inventory', async ({ page }) => {
  92  |     // Click on first product
  93  |     await page.click('[data-test="item-4-title-link"]');
  94  |     
  95  |     // Verify on product detail page
  96  |     await expect(page).toHaveURL(/.*inventory-item.html/);
  97  |     
  98  |     // Click back button
  99  |     await page.click('[data-test="back-to-products"]');
  100 |     
  101 |     // Verify back to inventory
  102 |     await expect(page).toHaveURL(/.*inventory.html/);
  103 |   });
  104 | 
  105 |   test('3.1 View with No Login Session', async ({ page, context }) => {
  106 |     // Create new context without login
  107 |     const newPage = await context.newPage();
  108 |     
  109 |     // Navigate directly to inventory
  110 |     await newPage.goto('https://www.saucedemo.com/inventory.html');
  111 |     
  112 |     // Verify redirected to login
  113 |     await expect(newPage).toHaveURL('https://www.saucedemo.com/');
  114 |     
  115 |     await newPage.close();
  116 |   });
  117 | 
  118 |   test('3.2 Performance Glitch User', async ({ page }) => {
  119 |     // Navigate back to login
  120 |     await page.goto('https://www.saucedemo.com/');
  121 |     
  122 |     // Login with performance_glitch_user
  123 |     await page.fill('[data-test="username"]', 'performance_glitch_user');
  124 |     await page.fill('[data-test="password"]', 'secret_sauce');
  125 |     await page.click('[data-test="login-button"]');
  126 |     
  127 |     // Wait for inventory to load
  128 |     await expect(page.locator('.inventory_list')).toBeVisible({ timeout: 10000 });
  129 |     
  130 |     // Verify products are displayed
  131 |     const products = page.locator('.inventory_item');
  132 |     await expect(products).toHaveCount(6);
  133 |   });
  134 | 
  135 |   test('3.3 Problem User - Visual Issues', async ({ page }) => {
  136 |     // Navigate back to login
  137 |     await page.goto('https://www.saucedemo.com/');
  138 |     
  139 |     // Login with problem_user
  140 |     await page.fill('[data-test="username"]', 'problem_user');
  141 |     await page.fill('[data-test="password"]', 'secret_sauce');
  142 |     await page.click('[data-test="login-button"]');
  143 |     
  144 |     // Verify inventory is displayed (even with visual issues)
  145 |     await expect(page.locator('.inventory_list')).toBeVisible();
  146 |   });
  147 | });
  148 | 
```