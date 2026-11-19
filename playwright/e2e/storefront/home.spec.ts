import { test, expect } from '../../support'

test.describe('Storefront - Home', () => {
  test('deve ter o nome da aplicação no title', async ({ app, page }) => {
    await app.store.homePage.go()
    await expect(page).toHaveTitle(/Lunar Pass/)
  })

  test('deve exibir o slogan da aplicação', async ({ app }) => {
    await app.store.homePage.go()
    await expect(app.store.homePage.slogan).toBeVisible()
  })
})
