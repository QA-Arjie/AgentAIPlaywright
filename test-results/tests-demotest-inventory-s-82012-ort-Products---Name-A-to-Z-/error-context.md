# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\demotest\inventory-scenarios.spec.ts >> Inventory Scenarios >> 1.2 Sort Products - Name (A to Z)
- Location: tests\demotest\inventory-scenarios.spec.ts:27:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.selectOption: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-test="product_sort_container"] select')

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
      - generic [ref=e14]:
        - generic [ref=e15]: Products
        - generic [ref=e17] [cursor=pointer]:
          - generic [ref=e18]: Name (A to Z)
          - combobox [ref=e19]:
            - option "Name (A to Z)" [selected]
            - option "Name (Z to A)"
            - option "Price (low to high)"
            - option "Price (high to low)"
    - generic [ref=e23]:
      - generic [ref=e24]:
        - link "Sauce Labs Backpack" [ref=e26] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Backpack" [ref=e27]
        - generic [ref=e28]:
          - generic [ref=e29]:
            - link "Sauce Labs Backpack" [ref=e30] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e31]: Sauce Labs Backpack
            - generic [ref=e32]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
          - generic [ref=e33]:
            - generic [ref=e34]: $29.99
            - button "Add to cart" [ref=e35] [cursor=pointer]
      - generic [ref=e36]:
        - link "Sauce Labs Bike Light" [ref=e38] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bike Light" [ref=e39]
        - generic [ref=e40]:
          - generic [ref=e41]:
            - link "Sauce Labs Bike Light" [ref=e42] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e43]: Sauce Labs Bike Light
            - generic [ref=e44]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
          - generic [ref=e45]:
            - generic [ref=e46]: $9.99
            - button "Add to cart" [ref=e47] [cursor=pointer]
      - generic [ref=e48]:
        - link "Sauce Labs Bolt T-Shirt" [ref=e50] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt" [ref=e51]
        - generic [ref=e52]:
          - generic [ref=e53]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e54] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e55]: Sauce Labs Bolt T-Shirt
            - generic [ref=e56]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
          - generic [ref=e57]:
            - generic [ref=e58]: $15.99
            - button "Add to cart" [ref=e59] [cursor=pointer]
      - generic [ref=e60]:
        - link "Sauce Labs Fleece Jacket" [ref=e62] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Fleece Jacket" [ref=e63]
        - generic [ref=e64]:
          - generic [ref=e65]:
            - link "Sauce Labs Fleece Jacket" [ref=e66] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e67]: Sauce Labs Fleece Jacket
            - generic [ref=e68]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
          - generic [ref=e69]:
            - generic [ref=e70]: $49.99
            - button "Add to cart" [ref=e71] [cursor=pointer]
      - generic [ref=e72]:
        - link "Sauce Labs Onesie" [ref=e74] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Onesie" [ref=e75]
        - generic [ref=e76]:
          - generic [ref=e77]:
            - link "Sauce Labs Onesie" [ref=e78] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e79]: Sauce Labs Onesie
            - generic [ref=e80]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
          - generic [ref=e81]:
            - generic [ref=e82]: $7.99
            - button "Add to cart" [ref=e83] [cursor=pointer]
      - generic [ref=e84]:
        - link "Test.allTheThings() T-Shirt (Red)" [ref=e86] [cursor=pointer]:
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)" [ref=e87]
        - generic [ref=e88]:
          - generic [ref=e89]:
            - link "Test.allTheThings() T-Shirt (Red)" [ref=e90] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e91]: Test.allTheThings() T-Shirt (Red)
            - generic [ref=e92]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
          - generic [ref=e93]:
            - generic [ref=e94]: $15.99
            - button "Add to cart" [ref=e95] [cursor=pointer]
  - contentinfo [ref=e96]:
    - list [ref=e97]:
      - listitem [ref=e98]:
        - link "Twitter" [ref=e99] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e100]:
        - link "Facebook" [ref=e101] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e102]:
        - link "LinkedIn" [ref=e103] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e104]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
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
> 29  |     await page.selectOption('[data-test="product_sort_container"] select', 'az');
      |                ^ Error: page.selectOption: Test timeout of 30000ms exceeded.
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
  53  |     await page.selectOption('[data-test="product_sort_container"] select', 'lohi');
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
```