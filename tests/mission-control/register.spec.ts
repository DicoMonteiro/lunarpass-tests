import { test, expect } from '../../support'
import { Mission } from '../../support/types'
import { cleanMission, cleanAndInsertMission } from '../../support/db'

test.describe('Registrar uma nova missão', () => {
  test.beforeEach(async ({ app }) => {
    // Arrange - preparação do cenário
    await app.mission.loginPage.go()
    await app.mission.loginPage.login('buzz@lunarpass.dev', 'pwd123')
    await expect(app.mission.navbar.logoutButton).toBeVisible({ timeout: 10000 })
  })

  test('deve registrar uma nova missão', async ({ app, page }) => {
    // Massa de Dados - Mock
    const newMission: Mission = {
      id: 'LP-2026A',
      rocket: 'Apolo21',
      baseId: 'aurora',
      departureDate: '2030-12-22',
      returnDate: '2030-12-29',
      price: 1000,
    }

    await cleanMission(newMission.id)

    // ACT - ações do usuário
    await app.mission.dashPage.addButton.click()
    await expect(app.mission.registerPage.pageTitle).toBeVisible()

    await app.mission.registerPage.fillMission(newMission)
    await app.mission.registerPage.registerMission()

    // ASSERT - validações do resultado
    await expect(app.toast.message).toContainText(
      'A nova missão foi adicionada ao catálogo e já está disponível para reservas.'
    )
    await page.waitForTimeout(10000)
  })

  test('não deve registrar uma nova missão com o formato de ID da Missão incorreto', async ({
    app,
  }) => {
    // Massa de Dados - Mock
    const newMission: Mission = {
      id: 'XPTO123',
      rocket: 'Apolo07',
      baseId: 'alpha',
      departureDate: '2030-12-22',
      returnDate: '2030-12-29',
      price: 1000,
    }

    // ACT - ações do usuário
    await app.mission.dashPage.addButton.click()
    await expect(app.mission.registerPage.pageTitle).toBeVisible()

    await app.mission.registerPage.fillMission(newMission)
    await app.mission.registerPage.registerMission()

    // ASSERT - validações do resultado
    await expect(app.mission.registerPage.unsuccessMessage).toContainText(
      'Use o formato LP-0000'
    )
  })

  test('não deve registrar uma nova missão com o código duplicado', async ({
    app,
  }) => {
    // Arrange - Massa de Dados
    const newMission: Mission = {
      id: 'LP-3002B',
      rocket: 'Apolo17',
      baseId: 'orion',
      departureDate: '2030-11-20',
      returnDate: '2030-11-27',
      price: 5000,
    }

    await cleanAndInsertMission(newMission)

    // ACT - ações do usuário
    await app.mission.dashPage.addButton.click()
    await expect(app.mission.registerPage.pageTitle).toBeVisible()

    await app.mission.registerPage.fillMission(newMission)
    await app.mission.registerPage.registerMission()

    // ASSERT - validações do resultado
    await expect(app.mission.registerPage.unsuccessMessage).toContainText(
      'Já existe uma missão com este ID'
    )
  })
})
