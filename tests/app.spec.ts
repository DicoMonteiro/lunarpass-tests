import { test, expect } from '@playwright/test'

test('deve ter o nome da aplicação no title', async ({ page }) => {
  await page.goto('http://localhost:3000')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Lunar Pass/)
})

test('deve exibir o slogan da aplicação', async ({ page }) => {
  await page.goto('http://localhost:3000')

  // Expect the slogan "to contain" a substring.
  const slogan = page.getByRole("heading", { name: "Sua viagem para a Lua começa aqui." })
  await expect(slogan).toBeVisible()
})
