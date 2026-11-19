# Page Objects — Lunar Pass (PCOM modular)

Um Page Object representa uma tela do módulo e expõe o que o usuário faz nela. O teste deve ler como o cenário, via `app.mission.*`, `app.store.*` ou `app.toast`.

Pastas:

- `playwright/support/pages/mission-control/`
- `playwright/support/pages/storefront/`
- `playwright/support/pages/shared/` — só componente usado por **dois ou mais** módulos (hoje: `toast.ts`)

Navbar fica em `mission-control/` porque só aquele módulo a usa.

## Regras para Page Objects novos

1. **Um arquivo por tela**, classe `<Tela>Page`, construtor com `page: Page`.
2. **Locators como propriedades `readonly`**, criados no construtor, na ordem de `descoberta-de-tela.md`.
3. **Elementos que dependem de dado viram método** que devolve `Locator` (ex.: card de uma missão pelo id).
4. **Métodos são ações do usuário:** `go()`, `login(email, password)`, `fillMission(mission)`, `registerMission()`. Dados entram por parâmetro.
5. **Navegação por caminho relativo**, com o `baseURL` do project. Nunca URL absoluta.
6. **Sem `expect` no Page Object novo.** Asserções ficam no spec. (Login e registro atuais concentram `expect`; isso é legado.)
7. **Sem dados de teste nem credenciais** no Page Object.
8. **Sem espera fixa.** Se a ação precisa aguardar, aguarde estado visível do próprio elemento.
9. Tipos e helpers: `import { Mission } from '../../types'` e `import { formatDate } from '../../helpers'` a partir de `pages/<modulo>/`.
10. Siga indentação e estilo dos arquivos vizinhos do **mesmo módulo**.

## Registro na fixture

Em `playwright/support/index.ts`, importe e acrescente no grupo:

```ts
const createApp = (page: Page) => ({
  mission: {
    loginPage: new LoginPage(page),
    dashPage: new DashPage(page),
    registerPage: new RegisterPage(page),
    navbar: new Navbar(page),
    // novaPage: new NovaPage(page),
  },
  store: {
    homePage: new HomePage(page),
    // novaPage: new NovaPage(page),
  },
  toast: new Toast(page),
})
```

Não instancie Page Object no spec.

## Page Objects que já existem

**Não os refatore.** Ao completar:

- Acrescente locators e métodos sem mudar o comportamento dos que existem.
- Mantenha o estilo do arquivo (incluindo `expect` se o arquivo já valida internamente).
- Se precisar mudar algo existente, pergunte antes.

## Reutilizar ou criar?

| Situação | Decisão |
|---|---|
| A tela já tem Page Object | Reutilize e complete |
| O elemento é usado por mission-control **e** storefront | `pages/shared/` |
| O elemento aparece em várias telas de um módulo (Navbar) | Componente na pasta do módulo |
| Tela nova | Page Object novo no módulo, registrado na fixture |
