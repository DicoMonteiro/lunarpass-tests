import { test, expect } from '../../support'


test.describe('Login - Controle de Missões', () => {

    test.beforeEach(async ({ app }) => {
        // Arrange - preparação do cenário
        await app.mission.loginPage.go()
    })

    test('deve autenticar no controle de missões', async ({ app }) => {

        // Act - ações do usuário
        await app.mission.loginPage.login('buzz@lunarpass.dev', 'pwd123')

        // Assert - validações do resultado
        await expect(app.mission.navbar.logoutButton).toBeVisible()
    })

    test('não deve autenticar no controle de missões com senha incorreta', async ({ app }) => {

        // Act - ações do usuário
        await app.mission.loginPage.login('buzz@lunarpass.dev', 'teste123')

        // Assert - validações do resultado
        await app.mission.loginPage.validateInvalidEmailOrPassword('E-mail ou senha inválidos.')
    })

    test('não deve autenticar no controle de missões com email incorreto', async ({ app }) => {

        // Act - ações do usuário
        await app.mission.loginPage.login('test@lunarpass.dev', 'pwd123')

        // Assert - validações do resultado
        await app.mission.loginPage.validateInvalidEmailOrPassword('E-mail ou senha inválidos.')
    })

    test('não deve autenticar no controle de missões sem o email informado', async ({ app }) => {

        // Act - ações do usuário
        await app.mission.loginPage.login('', 'pwd123')

        // Assert - validações do resultado
        await app.mission.loginPage.validateFieldBlank('email', 'Informe um e-mail válido')
    })

    test('não deve autenticar no controle de missões sem a senha informada', async ({ app }) => {

        // Act - ações do usuário
        await app.mission.loginPage.login('buzz@lunarpass.dev', '')

        // Assert - validações do resultado
        await app.mission.loginPage.validateFieldBlank('password', 'Informe a senha')
    })

    test('não deve autenticar no controle de missões sem o email e senha informados', async ({ app }) => {

        // Act - ações do usuário
        await app.mission.loginPage.login('', '')

        // Assert - validações do resultado
        await app.mission.loginPage.validateFieldBlank('email', 'Informe um e-mail válido')
    })
})