# Revisão antes de entregar — Lunar Pass

Passe por todos os itens. Corrija o que falhar e só então entregue.

## Fidelidade ao cenário

- [ ] O título de cada teste novo é o nome do cenário (ou cenário + linha de Exemplos).
- [ ] Existe uma asserção para cada **Então** e cada **E**, e nenhuma além delas.
- [ ] Nenhum passo, regra ou resultado foi inventado.
- [ ] Textos observados na tela e não definidos na especificação estão no resumo.

## Arquitetura Lunar Pass

- [ ] Spec em `playwright/e2e/<modulo>/` e import de `{ test, expect }` a partir de `../../support`.
- [ ] Page Objects novos em `playwright/support/pages/<modulo>/` (ou `shared/` só se dois módulos usam) e registrados em `playwright/support/index.ts` no grupo `mission`, `store` ou `toast`.
- [ ] O spec usa `app.mission.*` / `app.store.*` / `app.toast`, sem `new` de Page Object.
- [ ] Page Objects novos não têm `expect`, dados de teste nem URL absoluta.
- [ ] Nenhum teste ou Page Object existente foi refatorado sem pedido.
- [ ] `playwright.config.ts` e `playwright/support/db.ts` não foram alterados (salvo pedido explícito de novo módulo).

## Locators e esperas

- [ ] Locators novos seguem `getByRole` → `getByLabel` → `getByPlaceholder` → `getByTestId`.
- [ ] Não há XPath, subida no DOM nem classe CSS em código novo.
- [ ] Não há `waitForTimeout`.
- [ ] Cada asserção de estado teve contraprova na tela.

## Dados

- [ ] ID de missão exclusivo, inexistente nos outros testes.
- [ ] Cada teste prepara o próprio estado via funções já existentes de `db.ts` e limpa o que criou, inclusive em falha.
- [ ] No Storefront, nenhuma asserção depende de contagem total ou posição.
- [ ] Não foi inventada função de insert de reserva/ticket.

## Execução

- [ ] Rodou só o spec novo, com `--project=mission-control` ou `--project=storefront`.
- [ ] O resultado no resumo é o que realmente aconteceu.
- [ ] Rodou mais de uma vez em série (`--repeat-each=3 --workers=1 --project=<modulo>`), sem variar o resultado.
- [ ] Falhas de produto estão reportadas com esperado e observado, sem asserção alterada.
- [ ] Nenhum `test.only`, `test.skip` ou asserção comentada ficou no código.
