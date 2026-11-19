# Boas práticas para o spec — Lunar Pass

## Estrutura

- Arquivo em `playwright/e2e/mission-control/` ou `playwright/e2e/storefront/`.
- Import: `import { test, expect } from '../../support'`.
- Massa: `import { cleanMission, cleanAndInsertMission } from '../../support/db'` e `import { Mission } from '../../support/types'` quando o cenário precisa de missão.
- **Contexto** do Gherkin em `test.beforeEach`.
- Dentro do teste, as três partes com os comentários já usados no projeto:
  - `// Arrange - preparação do cenário`
  - `// Act - ações do usuário`
  - `// Assert - validações do resultado`
- Um teste por cenário. Em Esquema do Cenário, um `test` por linha.
- Consumo: `app.mission.*`, `app.store.*`, `app.toast`. Sem `new` de Page Object.

## Asserções

- Asserções que esperam sozinhas: `toBeVisible`, `toHaveText`, `toContainText`, `toHaveURL`, `toHaveTitle`, `toBeDisabled`, `toHaveCount` (só para elementos do próprio teste).
- Uma asserção para cada **Então** e cada **E**. Nenhuma a mais, nenhuma a menos.
- Valor exato: o texto que a tela mostra.
- Toast de sucesso de missão (texto já observado nos testes): `app.toast.message` com `toContainText`.
- Alertas de formulário/login: locators `getByRole('alert')` já expostos nos Page Objects.
- Para verificar que algo **não** acontece: o estado observável (mensagem, etapa que permanece, botão desabilitado).

## Esperas

- Nada de `waitForTimeout`.
- O Playwright espera em ações e asserções. Operação lenta: espere o resultado visível (toast, heading, logout).
- Evite timeout por teste. O `toBeVisible({ timeout: 10000 })` após login em `register.spec.ts` é pontual; não generalize.

## Isolamento

- Nenhum teste depende de outro nem da ordem de execução (`fullyParallel: true` no config).
- Nenhum teste depende de dados que ele não criou, salvo o usuário de demonstração do Mission Control, sem alterá-lo.
- IDs de missão exclusivos entre Mission Control e Storefront.

## Nomes

- Variáveis, funções e Page Objects em inglês.
- Títulos, dados de teste e textos esperados como na tela e na especificação.
