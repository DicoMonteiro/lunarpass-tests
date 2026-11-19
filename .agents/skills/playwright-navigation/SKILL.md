---
name: playwright-navigation
description: >-
  Use esta skill para navegar, inspecionar, interagir e validar aplicações web utilizando o Playwright MCP (Model Context Protocol). Ideal para exploração autônoma de telas, execução de jornadas de usuário ponta a ponta (E2E), preenchimento de formulários, verificação de acessibilidade e captura de evidências.
---

# Navegação e Validação Web com Playwright MCP

Esta skill instrui o agente sobre como conduzir navegações e interações confiáveis e determinísticas em páginas web utilizando as ferramentas expostas pelo servidor **Playwright MCP** (`@playwright/mcp`).

---

## 1. Princípios de Operação

1. **Acessibilidade Primeiro (Accessibility Tree)**:
   - Sempre utilize `browser_snapshot` para inspecionar o estado da página.
   - O Playwright MCP gera identificadores (`ref`) únicos baseados na árvore de acessibilidade do navegador, evitando fragilidade por coordenadas ou seletores CSS voláteis.

2. **Ciclo Padrão de Interação**:
   ```
   [browser_navigate] ➜ [browser_snapshot] ➜ [browser_click / browser_type] ➜ [browser_snapshot] ➜ [asserção/validação]
   ```
   - **Regra Fundamental**: Sempre chame `browser_snapshot` após qualquer clique ou transição que altere a tela para atualizar as referências (`ref`).

3. **Verificação de Ambiente**:
   - Para verificar se o ambiente do Playwright MCP está operacional, execute o script:
     [verify-mcp.sh](./scripts/verify-mcp.sh)

---

## 2. Passo a Passo para Navegação e Teste

### Passo 1: Acessar a Aplicação
- Chame `browser_navigate` passando a URL da aplicação alvo (ex: `http://localhost:3000`).
- Verifique se a página carregou com sucesso chamando `browser_snapshot`.

### Passo 2: Analisar a Interface e Elementos
- Inspecione a saída do `browser_snapshot`.
- Localize os nós interativos relevantes: botões (`button`), campos de texto (`textbox`), checkboxes (`checkbox`), links (`link`), opções (`combobox`/`select`).
- Identifique o atributo `ref` do elemento que você deseja interagir.

### Passo 3: Interagir com Elementos
- **Clique**: Chame `browser_click` informando o `ref` do elemento.
- **Digitação**: Chame `browser_type` ou `browser_fill_form` para preencher campos de texto ou formulários.
- **Seleção**: Chame `browser_select_option` para campos suspensos.
- **Teclado**: Use `browser_press_key` quando necessário acionar `Enter`, `Tab` ou teclas direcionais.

### Passo 4: Espera e Resolução Assíncrona
- Para ações que disparam chamadas de rede ou animações (como checkout, login ou buscas), utilize `browser_wait_for` com o texto esperado ou estado final antes de prosseguir.
- Sempre revalide com `browser_snapshot`.

### Passo 5: Registro de Evidências e Diagnóstico
- **Captura de Tela**: Chame `browser_take_screenshot` para salvar o estado visual em pontos críticos da jornada ou na confirmação de pedidos.
- **Console do Navegador**: Em caso de comportamento inesperado ou erro 4xx/5xx, chame `browser_console_messages` para diagnosticar exceções no frontend.

---

## 3. Guias e Referências Complementares

- 📖 **Referência Completa de Ferramentas**: Veja [tools-reference.md](./references/tools-reference.md) para detalhes de todas as chamadas e parâmetros suportados pelo `@playwright/mcp`.
- 🚀 **Exemplo Prático (Lunar Pass)**: Veja o passo a passo da jornada de reserva de passagens em [lunarpass-flow.md](./examples/lunarpass-flow.md).

---

## 4. Configuração do Servidor MCP

O Playwright MCP deve estar registrado no arquivo de configuração MCP (`mcp_config.json`):

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

*Nota: Se desejar rodar em segundo plano sem abrir janela visual, adicione o argumento `"--headless"` na lista `args`.*
