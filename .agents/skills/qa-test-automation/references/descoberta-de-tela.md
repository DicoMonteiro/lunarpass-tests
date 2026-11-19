# Descoberta de tela com o Playwright MCP

O cenário diz **o que** acontece; a tela diz **como**. Antes de escrever o Page Object, percorra o caminho do cenário na aplicação Lunar Pass e anote os elementos reais.

Use o Playwright MCP (a mesma família de ferramentas descrita na skill `playwright-navigation`). Não invente locators. Não use outro meio de automação para "adivinhar" a tela.

## Procedimento

1. Confirme que a aplicação responde em `http://localhost:3000` (`baseURL` de `playwright.config.ts`). Se não responder, não invente a tela: siga só com Page Objects já existentes e entregue como "não executado".
2. Abra a página inicial do caminho:
   - Mission Control: `http://localhost:3000/mission-control/login`
   - Storefront: `http://localhost:3000/`
   - Outra rota: só a que a descoberta ou um Page Object existente mostrar.
3. Leia o **snapshot de acessibilidade** de cada tela (`browser_snapshot`). Anote papel, nome acessível e estado.
4. Execute as ações do **Quando** para ver as telas seguintes e o resultado do **Então**.
5. Anote, por tela: caminho da URL, cada elemento usado e o locator segundo a ordem da arquitetura.
6. Feche a aba ao terminar.

Credenciais de Mission Control: as já usadas em `playwright/e2e/mission-control/` (`buzz@lunarpass.dev`). Não invente usuário.

## Cuidados

- A descoberta pode precisar de dados. Use a massa que o teste vai criar (`massa-de-teste.md`) e limpe ao final, ou dados de demonstração **sem alterá-los**.
- Não conclua reservas ou pagamentos com dados reais só para explorar.
- Não altere a connection string nem URLs de ambiente para "fazer a tela aparecer".

## Escolha do locator

Ordem de `docs/arquitetura.md`:

| Prioridade | Locator | Quando |
|---|---|---|
| 1 | `getByRole(papel, { name })` | Botões, links, títulos, campos com nome acessível, alertas |
| 2 | `getByLabel(rótulo)` | Campos associados a um rótulo (ex.: `getByLabel('Base lunar')`) |
| 3 | `getByPlaceholder(texto)` | Campos identificados pelo texto de ajuda (ex.: login) |
| 4 | `getByTestId(id)` | Quando a semântica de acessibilidade não basta (ex.: `mission-form-return-date`) |

Evite XPath, subidas no DOM (`/..`) e classes CSS. O seletor `button[title="Sair"]` da Navbar é legado: não replique.

`getByText` aparece em `login.page.ts` para mensagem de campo em branco. Não está na ordem da arquitetura; não use em código novo se `getByRole` / `getByLabel` / `getByPlaceholder` / `getByTestId` resolver.

Elemento sem papel nem identificador estável vira sugestão de testabilidade no resumo.

## Estados que a descoberta precisa revelar

- **Botões desabilitados:** o snapshot nem sempre mostra `disabled`. Verifique o estado antes de planejar um clique.
- **Mensagens dinâmicas:** toast (`app.toast.message`, `listitem`) e `role="alert"` (login e formulário de missão). Anote o texto de cada estado do cenário.
- **Contraprova:** se a asserção verifica um estado (vazio, desabilitado, "Esgotado"), confirme na tela que o estado oposto existe.
