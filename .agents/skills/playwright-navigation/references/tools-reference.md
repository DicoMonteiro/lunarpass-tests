# Referência de Ferramentas - Playwright MCP

O Playwright MCP (`@playwright/mcp`) expõe ferramentas estruturadas para automação e inspeção de navegadores através do Model Context Protocol.

Ele prioriza o uso de **árvores de acessibilidade (Accessibility Tree)** em vez de cliques cegos por coordenadas ou OCR visual, garantindo interações determinísticas, rápidas e com baixo consumo de tokens.

---

## 1. Ferramentas Principais de Navegação e Inspeção

### `browser_navigate`
Abre uma URL no navegador ativo.
- **Parâmetros**:
  - `url` (string, obrigatório): A URL de destino (ex: `http://localhost:3000`).

### `browser_navigate_back`
Retorna à página anterior no histórico de navegação.

### `browser_snapshot`
Captura o estado estruturado da página via árvore de acessibilidade. Retorna elementos com identificadores únicos (`ref`).
- **Uso ideal**: Execute sempre após qualquer navegação ou ação que altere o DOM para atualizar os `refs` dos elementos interativos.
- **Vantagem**: Identifica botões, inputs, links, headings e seus estados (ex: `disabled`, `checked`, `focused`).

### `browser_find`
Pesquisa por textos ou expressões regulares na página atual.
- **Parâmetros**:
  - `query` (string): Termo ou regex a localizar.

---

## 2. Ferramentas de Interação com Elementos

### `browser_click`
Clica em um elemento específico da página.
- **Parâmetros**:
  - `element` ou `ref` (string): Identificador do elemento obtido via `browser_snapshot`.

### `browser_type`
Digita texto em um campo de entrada focado ou especificado.
- **Parâmetros**:
  - `element` ou `ref` (string): Identificador do campo.
  - `text` (string): Conteúdo a ser digitado.
  - `clear` (boolean, opcional): Se deve limpar o campo antes de digitar.

### `browser_fill_form`
Preenche múltiplos campos de formulário de uma única vez.
- **Parâmetros**:
  - `fields` (array de objetos com `element`/`ref` e `value`).

### `browser_select_option`
Seleciona uma opção dentro de um elemento `<select>`.
- **Parâmetros**:
  - `element` ou `ref` (string): Elemento dropdown.
  - `values` (array de strings): Valores ou textos da opção.

### `browser_press_key`
Envia o acionamento de uma tecla do teclado (ex: `Enter`, `Tab`, `Escape`, `ArrowDown`).
- **Parâmetros**:
  - `key` (string): Tecla a ser pressionada.

### `browser_hover`
Posiciona o cursor do mouse sobre o elemento (útil para menus suspensos, tooltips).

---

## 3. Validação, Execução e Evidências

### `browser_wait_for`
Aguarda até que uma condição na página seja atendida (ex: aparecimento de texto ou elemento).
- **Parâmetros**:
  - `text` ou `selector`: Condição de espera.
  - `timeout` (número, ms, opcional): Tempo limite de espera.

### `browser_take_screenshot`
Captura uma imagem visual do estado atual da página para evidência de teste ou auditoria.
- **Parâmetros**:
  - `fullPage` (boolean, opcional): Se deve capturar a página inteira com scroll.
  - `path` (string, opcional): Caminho de saída da imagem.

### `browser_console_messages`
Obtém os logs do console do navegador (mensagens `console.log`, avisos e erros de JavaScript/rede).

### `browser_evaluate`
Executa código JavaScript diretamente no contexto da página.
- **Parâmetros**:
  - `script` (string): Expressão ou função JavaScript a avaliar.

### `browser_tabs`
Lista ou alterna entre abas abertas no navegador.

### `browser_close`
Encerra a sessão atual do navegador.
