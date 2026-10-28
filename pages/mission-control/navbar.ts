import { Page, Locator } from '@playwright/test'

export class Navbar {
  readonly page: Page
  readonly logoutButton: Locator

  constructor(page: Page) {
    this.page = page
    this.logoutButton = page.locator('button[title="Sair"]')
  }

  async logout() {
    await this.logoutButton.click()
  }
}
