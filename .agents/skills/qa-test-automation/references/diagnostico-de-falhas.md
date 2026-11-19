# Diagnóstico de falhas — Lunar Pass

Usado ao rodar um teste recém-criado (passo 7) e no modo `corrigir`.

## Onde olhar

1. A mensagem de erro no terminal: linha, locator, esperado e recebido.
2. O `error-context.md` em `test-results/` do teste.
3. O screenshot da falha, na mesma pasta.
4. O relatório HTML (`npx playwright show-report`).
5. Se ainda houver dúvida, reproduza o caminho com o Playwright MCP em `http://localhost:3000`.

## Classifique a causa antes de mexer

| Causa | Sinais típicos | O que fazer |
|---|---|---|
| **Locator** | Elemento não encontrado; strict mode; texto ou papel mudou | Corrija o locator no Page Object, na ordem da arquitetura |
| **Sincronização** | Passa às vezes; age antes da tela terminar | Espere o estado visível (toast, heading, logout). Nunca `waitForTimeout` |
| **Dados** | ID de missão repetido, missão inexistente, sobra de execução, lista do Storefront com dado de outro teste | Corrija preparação e limpeza (`massa-de-teste.md`) |
| **Ambiente** | Aplicação fora do ar em `localhost:3000`; banco inacessível (`getaddrinfo ENOTFOUND`); navegador ausente (`Executable doesn't exist`) | Não altere teste, config nem `db.ts`. Entregue como "não executado". Navegador ausente: `npx playwright install chromium`, com autorização do usuário |
| **Produto** | A tela diverge do **Então** de forma consistente | Não altere a asserção. Reporte esperado e observado |

## Regras da correção

- Corrija só a causa identificada. Uma correção por vez, rode de novo depois.
- **Nunca** altere asserção, valor esperado ou título para o teste passar.
- **Nunca** use `test.skip`, `retries` no spec ou comentários para esconder a falha. `retries` no config valem só em CI; não os reproduza no teste.
- Instabilidade: rode o arquivo em série (`--repeat-each=5 --workers=1 --project=<modulo>`). Em paralelo, o mesmo id de missão colide; isso não é flake de UI.
- Causa pouco clara: entregue diagnóstico e evidências, sem alterar código.
