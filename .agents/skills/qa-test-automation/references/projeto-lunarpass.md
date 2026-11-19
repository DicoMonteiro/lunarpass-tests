# Mapa do Lunar Pass (automação Playwright)

Leia este arquivo no início de cada pedido. Caminhos abaixo são os do repositório, não cópias em `assets/`.

Documento-base: `docs/arquitetura.md`.

## Onde cada coisa mora

| Peça | Caminho |
|---|---|
| Arquitetura | `docs/arquitetura.md` |
| Config Playwright | `playwright.config.ts` (raiz) |
| Fixture `{ app }` | `playwright/support/index.ts` |
| Banco (Kysely) | `playwright/support/db.ts` |
| Tipos | `playwright/support/types.ts` |
| Helpers | `playwright/support/helpers.ts` |
| Specs | `playwright/e2e/<modulo>/` |
| Page Objects | `playwright/support/pages/<modulo>/` |
| Compartilhados | `playwright/support/pages/shared/` |
| Fixture de dados | `playwright/fixture/dataMissions.ts` |

Não existem `pages/`, `support/`, `fixture/` nem `tests/` na raiz. Tudo de Playwright entra só em `playwright/`.

## Módulos e `projects`

| Módulo | `testDir` | `baseURL` no config | Namespace da fixture |
|---|---|---|---|
| Mission Control | `playwright/e2e/mission-control` | `http://localhost:3000` | `app.mission` |
| Storefront | `playwright/e2e/storefront` | `http://localhost:3000` | `app.store` |

Toast compartilhado: `app.toast`.

Rotas já usadas nos Page Objects:

- Storefront home: `/`
- Mission Control login: `/mission-control/login`

Outras rotas: só depois da descoberta de tela. Não invente caminho.

## Fixture

`playwright/support/index.ts` exporta `test` e `expect`. Specs importam:

```ts
import { test, expect } from '../../support'
```

Objetos atuais em `createApp`:

- `app.mission.loginPage`, `dashPage`, `registerPage`, `navbar`
- `app.store.homePage`
- `app.toast`

Page Object novo: importar, instanciar no grupo do módulo, não instanciar no spec.

Novo módulo só se o usuário pedir: pasta de páginas, grupo em `createApp`, pasta de specs e `project` em `playwright.config.ts`, como na seção 5 de `docs/arquitetura.md`.

## Massa (Kysely)

Funções em `playwright/support/db.ts`:

- Missões: `insertMission`, `deleteMission`, `cleanMission`, `cleanAndInsertMission`
- Reservas: `deleteReservation`
- Bilhetes: `deleteTicket`

`cleanMission` apaga ticket, reserva e missão (nessa ordem).

Tipo `Mission` em `playwright/support/types.ts`: `id`, `rocket`, `baseId`, `departureDate`, `returnDate`, `price`.

IDs de missão já usados nos specs (não repetir): `LP-2026A`, `LP-3002B`. Arquitetura exemplifica `LP-0128A`, `LP-3001A`.

`playwright/support/helpers.ts` expõe `formatDate` (entrada `AAAA-MM-DD`, saída como `29 de dez. de 2030`), usada em `register.page.ts`.

## Locators (arquitetura)

1. `getByRole`
2. `getByLabel`
3. `getByPlaceholder`
4. `getByTestId`

Evitar: XPath, `/..`, classe CSS.

## Page Objects existentes (referência, não alvo de refatoração)

| Arquivo | Papel |
|---|---|
| `pages/mission-control/login.page.ts` | `go()`, `login()`, métodos `validate*` com `expect` |
| `pages/mission-control/dash.page.ts` | `addButton` (`getByRole('link', { name: 'Nova missão' })`) |
| `pages/mission-control/register.page.ts` | `fillMission`, `registerMission`; `expect` na data de retorno via `getByTestId('mission-form-return-date')` |
| `pages/mission-control/navbar.ts` | `logoutButton` com `page.locator('button[title="Sair"]`) |
| `pages/storefront/home.page.ts` | `go()` em `/`, slogan por `getByRole('heading')` |
| `pages/shared/toast.ts` | `message` = `getByRole('listitem')` |

Imports de tipos/helpers a partir de `pages/<modulo>/`, conforme a arquitetura: `../../types` e `../../helpers`.

## Specs existentes (estilo)

- `test.describe` em português.
- Comentários: `// Arrange - preparação do cenário`, `// Act - ações do usuário`, `// Assert - validações do resultado` (capitalização varia).
- Login: `app.mission.loginPage.go()` no `beforeEach`; fluxos autenticados fazem `login` e esperam `app.mission.navbar.logoutButton`.
- Registro de missão: objeto `Mission` inline + `cleanMission` / `cleanAndInsertMission`; toast em `app.toast.message`.

## O que existe e **não** vira padrão novo

| Observado | Tratamento |
|---|---|
| `waitForTimeout(10000)` em `register.spec.ts` | Não copiar. Não remover sem pedido |
| `expect` dentro de `LoginPage` e `RegisterPage` | Completar no estilo do arquivo; Page Object **novo** sem `expect` |
| Navbar com seletor CSS | Não copiar em locators novos |
| `playwright/fixture/dataMissions.ts` (Faker, campos `missionID`/`base`) | Specs de missão usam `Mission` + `db.ts`. Não misturar os dois modelos sem pedido |
| `retries: 2` só em CI no config | Não adicionar `retries` no teste |
| README cita `tests/login.spec.ts` e `--project=chromium` | Desatualizado em relação ao config atual; ignore para executar |

## Pontos em aberto (não decidir sozinho)

1. `playwright.config.ts` marca `TODO: confirmar baseURL do storefront` (hoje igual ao Mission Control).
2. Não há `insertReservation` nem `insertTicket`; tipos de reserva/ticket só têm `missionId`.
3. Formato de ID na UI: "Use o formato LP-0000"; testes usam sufixo alfanumérico (`LP-2026A`).
4. Só um usuário de Mission Control aparece nos specs: `buzz@lunarpass.dev`.
5. Evoluções da arquitetura (`.env`, `storageState`, factories Faker, `db.destroy()`) estão documentadas como **não priorizadas**. Não implemente.
