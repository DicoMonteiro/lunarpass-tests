import { Page, Locator } from '@playwright/test'

export class BookingPage {
  readonly page: Page
  readonly heading: Locator
  readonly instruction: Locator
  readonly continueButton: Locator
  readonly passengersHeading: Locator
  readonly totalPrice: Locator
  readonly selectedSeatsSummary: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole('heading', { level: 2, name: 'Escolha seus assentos' })
    this.instruction = page.getByText('Nenhum assento selecionado.')
    this.continueButton = page.getByRole('button', { name: 'Continuar' })
    this.passengersHeading = page.getByRole('heading', { level: 2, name: 'Cadastre os passageiros' })
    this.totalPrice = page.getByTestId('summary-total-price')
    this.selectedSeatsSummary = page.getByTestId('summary-selected-seats')
  }

  async go(missionId: string) {
    await this.page.goto(`/booking/${missionId}`)
  }

  getSeat(seatId: string): Locator {
    return this.page.getByRole('button', { name: new RegExp(`^Assento ${seatId}\\b`) })
  }

  getSeatTooltip(seatId: string): Locator {
    return this.page.getByTestId('seat-tooltip').filter({ hasText: `Assento ${seatId}` })
  }

  async selectSeat(seatId: string) {
    await this.getSeat(seatId).click()
  }

  async continue() {
    await this.continueButton.click()
  }
}
