# Exemplo: missão com código duplicado (Lunar Pass)

Calibra a skill com um cenário alinhado a `register.spec.ts` e aos Page Objects reais. Não é um pedido para refatorar esse spec.

## 1. O cenário

**Funcionalidade:** Registrar uma nova missão

**Contexto:**
**Dado** que estou autenticado no controle de missões

**Cenário:** não deve registrar uma nova missão com o código duplicado
**Dado** que já existe uma missão com o mesmo identificador
**Quando** eu tento registrar uma nova missão com esse identificador
**Então** eu sou informado de que já existe uma missão com este ID

## 2. Leitura do cenário

| Parte | Tradução para o teste |
|---|---|
| Contexto | `beforeEach`: `app.mission.loginPage.go()`, `login` com o usuário já usado nos specs, `navbar.logoutButton` visível |
| Dado | `cleanAndInsertMission` com `Mission` de id exclusivo |
| Quando | `dashPage.addButton`, `registerPage.fillMission` + `registerMission` |
| Então | `registerPage.unsuccessMessage` com o texto que a tela mostra |

## 3. Descoberta de tela

Playwright MCP em `http://localhost:3000/mission-control/login`. Depois do login: link "Nova missão", heading "Programar missão", campos por papel/rótulo, botão "Salvar missão", alerta de erro.

## 4. Page Objects (já existentes — não recriar)

`RegisterPage.fillMission` / `registerMission`, `DashPage.addButton`, `LoginPage`, `Navbar`. Fixture: `app.mission.*`.

## 5. O teste (nível esperado para código novo)

```ts
import { test, expect } from '../../support'
import { Mission } from '../../support/types'
import { cleanAndInsertMission, cleanMission } from '../../support/db'

test.describe('Registrar uma nova missão', () => {
  test.beforeEach(async ({ app }) => {
    // Arrange - preparação do cenário
    await app.mission.loginPage.go()
    await app.mission.loginPage.login('buzz@lunarpass.dev', 'pwd123')
    await expect(app.mission.navbar.logoutButton).toBeVisible()
  })

  test('não deve registrar uma nova missão com o código duplicado', async ({ app }) => {
    // Arrange - preparação do cenário
    const newMission: Mission = {
      id: 'LP-3002B',
      rocket: 'Apolo17',
      baseId: 'orion',
      departureDate: '2030-11-20',
      returnDate: '2030-11-27',
      price: 5000,
    }

    await cleanAndInsertMission(newMission)

    try {
      // Act - ações do usuário
      await app.mission.dashPage.addButton.click()
      await expect(app.mission.registerPage.pageTitle).toBeVisible()
      await app.mission.registerPage.fillMission(newMission)
      await app.mission.registerPage.registerMission()

      // Assert - validações do resultado
      await expect(app.mission.registerPage.unsuccessMessage).toContainText(
        'Já existe uma missão com este ID'
      )
    } finally {
      await cleanMission(newMission.id)
    }
  })
})
```

O id `LP-3002B` já pertence ao spec real: em código **novo** escolha outro id.

## 6. O que observar

- Import de `../../support`, massa em `db.ts`, tipo `Mission`.
- Sem `new RegisterPage(page)`.
- Sem `waitForTimeout`.
- Uma asserção para o **Então**.
- Texto do alerta observado na tela; se o Gherkin não trazia a frase exata, isso vai no resumo.
- `try/finally` (ou `afterEach`) limpa mesmo se a asserção falhar — exigência desta skill para código novo, ainda que o spec antigo não faça isso.
