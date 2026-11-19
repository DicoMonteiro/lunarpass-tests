import { test, expect } from '../../support'
import { Mission } from '../../support/types'
import { cleanAndInsertMission } from '../../support/db'

test.describe('Passageiros', () => {
  test('Aceitar nome com 3 caracteres e passaporte com 5 caracteres (mínimos válidos)', async ({ app }) => {
    // Arrange - preparação do cenário
    const mission: Mission = {
      id: 'LP-0931A',
      rocket: 'Starship',
      baseId: 'alpha',
      departureDate: '2030-09-10',
      returnDate: '2030-09-17',
      price: 1000.00,
    }

    await cleanAndInsertMission(mission)

    await app.store.bookingPage.go(mission.id)
    await app.store.bookingPage.selectSeat('A1')
    await app.store.bookingPage.continue()
    await expect(app.store.bookingPage.passengersHeading).toBeVisible()

    // Act - ações do usuário
    await app.store.bookingPage.fillPassengerForm('Ana', 'XP123')
    await app.store.bookingPage.submitPassengers()

    // Assert - validações do resultado
    // Então a validação retorna sucesso
    await expect(app.store.bookingPage.paymentHeading).toBeVisible()
  })

  test('Aceitar nome com 120 caracteres e passaporte com 30 caracteres (máximos válidos)', async ({ app }) => {
    // Arrange - preparação do cenário
    const mission: Mission = {
      id: 'LP-0932B',
      rocket: 'Starship',
      baseId: 'orion',
      departureDate: '2030-09-12',
      returnDate: '2030-09-19',
      price: 1000.00,
    }

    await cleanAndInsertMission(mission)

    await app.store.bookingPage.go(mission.id)
    await app.store.bookingPage.selectSeat('A1')
    await app.store.bookingPage.continue()
    await expect(app.store.bookingPage.passengersHeading).toBeVisible()

    // Act - ações do usuário
    const validName120 = 'A'.repeat(120)
    const validPassport30 = 'B'.repeat(30)
    await app.store.bookingPage.fillPassengerForm(validName120, validPassport30)
    await app.store.bookingPage.submitPassengers()

    // Assert - validações do resultado
    // Então a validação retorna sucesso
    await expect(app.store.bookingPage.paymentHeading).toBeVisible()
  })

  test('Recusar nome com 2 caracteres (abaixo do limite mínimo)', async ({ app }) => {
    // Arrange - preparação do cenário
    const mission: Mission = {
      id: 'LP-0933C',
      rocket: 'Starship',
      baseId: 'aurora',
      departureDate: '2030-09-14',
      returnDate: '2030-09-21',
      price: 1000.00,
    }

    await cleanAndInsertMission(mission)

    await app.store.bookingPage.go(mission.id)
    await app.store.bookingPage.selectSeat('A1')
    await app.store.bookingPage.continue()
    await expect(app.store.bookingPage.passengersHeading).toBeVisible()

    // Act - ações do usuário
    await app.store.bookingPage.fillPassengerForm('Ed', 'XP1234567890123')
    await app.store.bookingPage.submitPassengers()

    // Assert - validações do resultado
    // Então a validação retorna erro
    await expect(app.store.bookingPage.paymentHeading).not.toBeVisible()

    // E a mensagem indica que o campo Nome é inválido e este ganha foco
    await expect(app.store.bookingPage.passengerAlert).toHaveText('O nome deve ter pelo menos 3 caracteres')
    await expect(app.store.bookingPage.passengerNameInput).toBeFocused()
  })

  test('Recusar nome com 121 caracteres (acima do limite máximo)', async ({ app }) => {
    // Arrange - preparação do cenário
    const mission: Mission = {
      id: 'LP-0934D',
      rocket: 'Starship',
      baseId: 'selene',
      departureDate: '2030-09-16',
      returnDate: '2030-09-23',
      price: 1000.00,
    }

    await cleanAndInsertMission(mission)

    await app.store.bookingPage.go(mission.id)
    await app.store.bookingPage.selectSeat('A1')
    await app.store.bookingPage.continue()
    await expect(app.store.bookingPage.passengersHeading).toBeVisible()

    // Act - ações do usuário
    const invalidName121 = 'A'.repeat(121)
    await app.store.bookingPage.fillPassengerForm(invalidName121, 'XP1234567890123')
    await app.store.bookingPage.submitPassengers()

    // Assert - validações do resultado
    // Então a validação retorna erro
    await expect(app.store.bookingPage.paymentHeading).not.toBeVisible()

    // E a mensagem indica que o campo Nome é inválido e este ganha foco
    await expect(app.store.bookingPage.passengerAlert).toHaveText('O nome deve ter no máximo 120 caracteres')
    await expect(app.store.bookingPage.passengerNameInput).toBeFocused()
  })

  test('Recusar passaporte com 4 caracteres (abaixo do limite mínimo)', async ({ app }) => {
    // Arrange - preparação do cenário
    const mission: Mission = {
      id: 'LP-0935E',
      rocket: 'Starship',
      baseId: 'alpha',
      departureDate: '2030-09-18',
      returnDate: '2030-09-25',
      price: 1000.00,
    }

    await cleanAndInsertMission(mission)

    await app.store.bookingPage.go(mission.id)
    await app.store.bookingPage.selectSeat('A1')
    await app.store.bookingPage.continue()
    await expect(app.store.bookingPage.passengersHeading).toBeVisible()

    // Act - ações do usuário
    const validName30 = 'Carlos Eduardo da Silva Souza'
    await app.store.bookingPage.fillPassengerForm(validName30, 'XP12')
    await app.store.bookingPage.submitPassengers()

    // Assert - validações do resultado
    // Então a validação retorna erro
    await expect(app.store.bookingPage.paymentHeading).not.toBeVisible()

    // E a mensagem indica que o campo Passaporte é inválido e este ganha foco
    await expect(app.store.bookingPage.passengerAlert).toHaveText('O passaporte deve ter pelo menos 5 caracteres')
    await expect(app.store.bookingPage.passengerPassportInput).toBeFocused()
  })

  test('Recusar passaporte com 31 caracteres (acima do limite máximo)', async ({ app }) => {
    // Arrange - preparação do cenário
    const mission: Mission = {
      id: 'LP-0936F',
      rocket: 'Starship',
      baseId: 'orion',
      departureDate: '2030-09-20',
      returnDate: '2030-09-27',
      price: 1000.00,
    }

    await cleanAndInsertMission(mission)

    await app.store.bookingPage.go(mission.id)
    await app.store.bookingPage.selectSeat('A1')
    await app.store.bookingPage.continue()
    await expect(app.store.bookingPage.passengersHeading).toBeVisible()

    // Act - ações do usuário
    const validName30 = 'Carlos Eduardo da Silva Souza'
    const invalidPassport31 = 'A'.repeat(31)
    await app.store.bookingPage.fillPassengerForm(validName30, invalidPassport31)
    await app.store.bookingPage.submitPassengers()

    // Assert - validações do resultado
    // Então a validação retorna erro
    await expect(app.store.bookingPage.paymentHeading).not.toBeVisible()

    // E a mensagem indica que o campo Passaporte é inválido e este ganha foco
    await expect(app.store.bookingPage.passengerAlert).toHaveText('O passaporte deve ter no máximo 30 caracteres')
    await expect(app.store.bookingPage.passengerPassportInput).toBeFocused()
  })
})
