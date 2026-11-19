import { Page, Locator, expect } from "@playwright/test";
import { Mission } from '../../types'
import { formatDate } from "../../helpers";

export class RegisterPage {

    readonly page: Page
    readonly pageTitle: Locator
    readonly unsuccessMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.pageTitle = page.getByRole('heading', { name: 'Programar missão' })
        this.unsuccessMessage = page.getByRole("alert")
    }

    async fillMission(newMission: Mission) {
        await this.page.getByRole('textbox', { name: 'ID da missão' }).fill(newMission.id)
        await this.page.getByRole('textbox', { name: 'Foguete' }).fill(newMission.rocket)
        await this.page.getByLabel('Base lunar').selectOption(newMission.baseId)
        await this.page.getByRole('textbox', { name: 'Data de partida' }).fill(newMission.departureDate)
        await expect(this.page.getByTestId('mission-form-return-date')).toContainText(formatDate(newMission.returnDate))
        await this.page.getByRole('spinbutton', { name: 'Preço por passagem (USD)' }).fill(newMission.price.toString())
    }

    async registerMission() {
        await this.page.getByRole('button', { name: 'Salvar missão' }).click()
    }

}