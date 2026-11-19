import { Page, Locator, expect } from "@playwright/test";


export class LoginPage {

    readonly page: Page
    readonly alert: Locator

    constructor(page: Page) {
        this.page = page
        this.alert = page.getByRole('alert')
    }
    async go() {
        // Arrange - preparação do cenário
        await this.page.goto('/mission-control/login')

        // Checkpoints - validações
        const title = this.page.getByRole('heading', { name: 'Mission Control' })
        await expect(title).toBeVisible()
    }

    async login(email: string, password: string) {
        await this.page.getByPlaceholder('Informe seu email').fill(email)
        await this.page.getByPlaceholder('Sua senha secreta').fill(password)
        await this.page.getByRole('button', { name: 'Entrar' }).click()
    }

    //validateLoginSuccess() {
    // await this.page.waitForTimeout(10000)
    // const logoutButton = page.getByRole('button', { name: "Sair" })
    // const logoutButton = this.page.locator('button[title="Sair"]')
    // await expect(logoutButton).toBeVisible()
    // await this.page.waitForTimeout(10000)
    //return this.page.locator('button[title="Sair"]')
    //}

    async validateInvalidEmailOrPassword(message: string) {
        //const alert = page.locator('p[role=alert]')
        await expect(this.alert).toBeVisible()
        await expect(this.alert).toHaveText(message)
        //const errorMessage = this.page.getByText('E-mail ou senha inválidos')
        //await expect(errorMessage).toBeVisible()
    }

    async validateFieldBlank(text: string, message: string) {
        switch (text) {
            case 'email':
                await expect(this.page.getByText(message)).toBeVisible()
                break;
            case 'password':
                await expect(this.page.getByText(message)).toBeVisible()
                break;
            default:
                break;
        }
        //const errorMessage = this.page.getByText('Informe um e-mail válido')
        //wait expect(errorMessage).toBeVisible()
    }

}
