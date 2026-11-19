import { Page, Locator } from '@playwright/test'

export class BookingPage {
  readonly page: Page
  readonly heading: Locator
  readonly instruction: Locator
  readonly continueButton: Locator
  readonly passengersHeading: Locator
  readonly totalPrice: Locator
  readonly selectedSeatsSummary: Locator

  // Etapa: Passageiros
  readonly passengerNameInput: Locator
  readonly passengerPassportInput: Locator
  readonly passengerSubmitButton: Locator
  readonly passengerBackButton: Locator
  readonly passengerAlert: Locator
  readonly paymentHeading: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole('heading', { level: 2, name: 'Escolha seus assentos' })
    this.instruction = page.getByText('Nenhum assento selecionado.')
    this.continueButton = page.getByRole('button', { name: 'Continuar' })
    this.passengersHeading = page.getByRole('heading', { level: 2, name: 'Cadastre os passageiros' })
    this.totalPrice = page.getByTestId('summary-total-price')
    this.selectedSeatsSummary = page.getByTestId('summary-selected-seats')

    // Etapa: Passageiros
    this.passengerNameInput = page.getByRole('textbox', { name: 'Nome completo' })
    this.passengerPassportInput = page.getByRole('textbox', { name: 'Passaporte' })
    this.passengerSubmitButton = page.getByRole('button', { name: 'Ir para pagamento' })
    this.passengerBackButton = page.getByRole('button', { name: 'Voltar' })
    this.passengerAlert = page.getByRole('alert')
    this.paymentHeading = page.getByRole('heading', { level: 2, name: 'Pagamento' })
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

  async fillPassengerForm(name: string, passport: string) {
    await this.passengerNameInput.fill(name)
    await this.passengerPassportInput.fill(passport)
  }

  async submitPassengers() {
    await this.passengerSubmitButton.click()
  }
}
