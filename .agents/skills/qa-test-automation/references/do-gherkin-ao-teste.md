# Do Gherkin ao teste (Lunar Pass)

O Gherkin declarativo descreve o comportamento de negócio, sem telas, cliques ou campos. A automação traduz cada parte para o código sem mudar o que foi especificado.

A especificação pode estar num arquivo do projeto, em `docs/`, ou colada na conversa. Palavras-chave podem aparecer em texto puro, em **negrito** (Markdown) ou num arquivo `.feature`.

## Como cada parte vira código

| Gherkin | No teste | Como no Lunar Pass |
|---|---|---|
| **Contexto** | `test.beforeEach` do arquivo | Estado comum: no Mission Control autenticado, `loginPage.go()` + `login` + visibilidade de `navbar.logoutButton`. Navegação de tela só quando o próprio cenário pede |
| **Dado** | Arrange | Missão (e limpeza) via `playwright/support/db.ts`. Pela tela só quando o cenário pede a navegação |
| **Quando** | Act | Ações do usuário por métodos ou locators do Page Object (`app.mission.*` / `app.store.*`) |
| **Então** / **E** | Assert | Uma asserção para cada resultado esperado, sobre locators do Page Object ou `app.toast` |
| **Esquema do Cenário** + **Exemplos** | Um `test` por linha | Lista de dados com um `test` por item |
| Anotações de rastreabilidade | Nada | Não viram código |

## Título do teste

- Cenário: o nome exato. `Cenário: não deve registrar uma nova missão com o código duplicado` vira `test('não deve registrar uma nova missão com o código duplicado', ...)`.
- Esquema do Cenário: o nome seguido da identificação da linha.
- Um arquivo `*.spec.ts` por funcionalidade, em `playwright/e2e/<modulo>/`.
- `test.describe` pode repetir o nome da funcionalidade, como nos specs atuais. Não renomeie testes antigos.

## Módulo

| Sinal no cenário | Pasta e project |
|---|---|
| Controle de missões, login de operador, programar missão | `mission-control` |
| Vitrine, busca de missões, reserva, viajante | `storefront` |

Se o cenário mistura módulos, registre a dúvida. Não coloque o spec na pasta errada.

## Quando o cenário não é suficiente

| Situação | O que fazer |
|---|---|
| O **Então** não diz o que verificar | Pergunte antes de escrever |
| O **Então** descreve uma mensagem sem o texto exato | Use o texto que a tela mostra e registre no resumo: "texto observado, não definido na especificação" |
| O **Quando** é uma ação que a tela impede | Não force o clique. Verifique o estado que impede (`toBeDisabled`) e explique em comentário no Act |
| O **Então** não tem correspondência clara na tela | Automatize o que é verificável, use o elemento mais próximo e registre a divergência no resumo |
| O **Dado** exige reserva ou ticket criado e não existe função de insert | Pergunte. Não simule o estado de outro jeito sem combinar |
| O cenário depende de decisão de negócio em aberto | Não automatize. Registre como pendente |
| A tela se comporta diferente do **Então** | O teste fica falhando. Reporte como possível defeito do produto |
