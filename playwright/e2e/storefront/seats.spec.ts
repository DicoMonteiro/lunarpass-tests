import { test, expect } from '../../support'
import { Mission, Reservation, Ticket } from '../../support/types'
import { cleanAndInsertMission, insertReservation, insertTickets } from '../../support/db'

test.describe('Mapa de Assentos', () => {
  test('Impedir o avanço sem seleção mínima de assentos', async ({ app }) => {
    // Arrange - preparação do cenário
    const mission: Mission = {
      id: 'LP-0830A',
      rocket: 'Starship',
      baseId: 'alpha',
      departureDate: '2030-08-10',
      returnDate: '2030-08-17',
      price: 1000.00,
    }

    await cleanAndInsertMission(mission)

    await app.store.bookingPage.go(mission.id)
    await expect(app.store.bookingPage.heading).toBeVisible()

    // Act - ações do usuário
    // O usuário tenta avançar sem escolher nenhum assento (o botão permanece desabilitado)

    // Assert - validações do resultado
    // Então o sistema não permite o avanço
    await expect(app.store.bookingPage.continueButton).toBeDisabled()
    await expect(app.store.bookingPage.passengersHeading).not.toBeVisible()

    // E eu sou instruído a selecionar pelo menos um lugar na cabine
    await expect(app.store.bookingPage.instruction).toHaveText('Nenhum assento selecionado.')
  })

  test('Avançar com seleção máxima de assentos permitida', async ({ app }) => {
    // Arrange - preparação do cenário
    const mission: Mission = {
      id: 'LP-0830B',
      rocket: 'Starship',
      baseId: 'orion',
      departureDate: '2030-08-15',
      returnDate: '2030-08-22',
      price: 1000.00,
    }

    await cleanAndInsertMission(mission)

    await app.store.bookingPage.go(mission.id)
    await expect(app.store.bookingPage.heading).toBeVisible()

    // Act - ações do usuário
    await app.store.bookingPage.selectSeat('A1')
    await app.store.bookingPage.selectSeat('A2')
    await app.store.bookingPage.selectSeat('B1')
    await app.store.bookingPage.selectSeat('B2')

    // Assert - validações do resultado
    // Então o valor total é calculado para os quatro passageiros
    await expect(app.store.bookingPage.totalPrice).toHaveText('USD 4,000.00')

    // E eu consigo avançar para a identificação dos passageiros
    await app.store.bookingPage.continue()
    await expect(app.store.bookingPage.passengersHeading).toBeVisible()
  })

  test('Tentar selecionar assento já ocupado', async ({ app }) => {
    // Arrange - preparação do cenário
    const mission: Mission = {
      id: 'LP-0830C',
      rocket: 'Starship',
      baseId: 'selene',
      departureDate: '2030-08-20',
      returnDate: '2030-08-27',
      price: 1000.00,
    }

    const reservation: Reservation = {
      id: 'e47ac10b-58cc-4372-a567-0e02b2c3d830',
      userId: null,
      missionId: mission.id,
      reservationCode: 'RES830',
      contactEmail: 'ocupado@lunarpass.dev',
      totalPrice: 1000.00,
      status: 'confirmed',
    }

    const tickets: Ticket[] = [
      {
        id: 'b9a646d3-9c61-4cb7-bfcd-ee2522c8f830',
        reservationId: reservation.id,
        missionId: mission.id,
        seat: 'A1',
        fullName: 'Passageiro Ocupado',
        document: 'DOCA1',
      },
    ]

    await cleanAndInsertMission(mission)
    await insertReservation(reservation)
    await insertTickets(tickets)

    await app.store.bookingPage.go(mission.id)
    await expect(app.store.bookingPage.heading).toBeVisible()

    // Act - ações do usuário
    // O usuário tenta selecionar o assento A1, que já está bloqueado como ocupado

    // Assert - validações do resultado
    // Então a seleção não é efetuada
    await expect(app.store.bookingPage.getSeat('A1')).toBeDisabled()
    await expect(app.store.bookingPage.getSeat('A1')).toHaveAttribute('aria-pressed', 'false')
    await expect(app.store.bookingPage.selectedSeatsSummary).toHaveText('—')

    // E eu sou avisado de que o lugar está ocupado e preciso escolher outro
    await expect(app.store.bookingPage.getSeat('A1')).toHaveAttribute('aria-label', /Ocupado/)
    await expect(app.store.bookingPage.getSeatTooltip('A1')).toContainText('Ocupado')
  })
})
