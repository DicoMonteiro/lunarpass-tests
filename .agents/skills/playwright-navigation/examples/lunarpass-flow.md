# Exemplo Prático: Fluxo de Navegação no Lunar Pass com Playwright MCP

Este exemplo demonstra a jornada completa do viajante no Storefront do Lunar Pass utilizando o fluxo de ferramentas do Playwright MCP.

---

## Cenário: Reserva Completa de Passagem Lunar

### 1. Inicializar e Navegar
```json
// Tool: browser_navigate
{
  "url": "http://localhost:3000"
}
```

### 2. Capturar a Árvore da Página (Snapshot)
```json
// Tool: browser_snapshot
{}
```
*O retorno trará os elementos estruturados com seus `ref` (ex: `ref_alpha_btn`, `ref_search_input`).*

### 3. Filtrar Missão por Base Lunar
1. Localizar o botão de filtro correspondente à base desejada (ex: "Base Lunar Alpha").
2. Clicar no elemento:
```json
// Tool: browser_click
{
  "element": "ref_filtro_alpha"
}
```
3. Atualizar o snapshot para inspecionar os resultados:
```json
// Tool: browser_snapshot
{}
```

### 4. Selecionar Missão com Assentos Disponíveis
1. Verificar os cards de missões disponíveis (ignorando as que contêm "Esgotado").
2. Clicar no botão "Reservar" ou "Selecionar Assentos" da missão desejada:
```json
// Tool: browser_click
{
  "element": "ref_btn_reservar"
}
```

### 5. Escolher Assentos no Mapa da Cabine
1. Capturar o snapshot do mapa de assentos:
```json
// Tool: browser_snapshot
{}
```
2. Clicar em um assento disponível (ex: A1 ou B1):
```json
// Tool: browser_click
{
  "element": "ref_seat_a1"
}
```
3. Clicar em "Avançar para Passageiros":
```json
// Tool: browser_click
{
  "element": "ref_btn_avancar_passageiros"
}
```

### 6. Preenchimento de Dados do Passageiro
1. Capturar snapshot do formulário:
```json
// Tool: browser_snapshot
{}
```
2. Preencher Nome Completo e Passaporte:
```json
// Tool: browser_type
{
  "element": "ref_input_nome",
  "text": "Neil Armstrong"
}
```
```json
// Tool: browser_type
{
  "element": "ref_input_passaporte",
  "text": "BR123456"
}
```
3. Clicar em "Prosseguir para Pagamento":
```json
// Tool: browser_click
{
  "element": "ref_btn_ir_pagamento"
}
```

### 7. Checkout e Pagamento (Sandbox Stripe)
Preencher os dados do cartão de teste conforme regras de negócio do Lunar Pass:
- **E-mail**: `viajante@lunarpass.com`
- **Nome no Cartão**: `Neil Armstrong`
- **Cartão Aprovado (Visa)**: `4242 4242 4242 4242`
- **Validade**: `12/28`
- **CVV**: `123`

```json
// Tool: browser_fill_form
{
  "fields": [
    { "element": "ref_input_email", "value": "viajante@lunarpass.com" },
    { "element": "ref_input_card_name", "value": "Neil Armstrong" },
    { "element": "ref_input_card_number", "value": "4242 4242 4242 4242" },
    { "element": "ref_input_expiry", "value": "12/28" },
    { "element": "ref_input_cvv", "value": "123" }
  ]
}
```

Confirmar o pagamento:
```json
// Tool: browser_click
{
  "element": "ref_btn_pagar"
}
```

### 8. Validação do Ticket Emitido e Captura de Evidência
1. Aguardar a confirmação:
```json
// Tool: browser_wait_for
{
  "text": "Reserva Confirmada"
}
```
2. Capturar evidência visual:
```json
// Tool: browser_take_screenshot
{
  "fullPage": true
}
```
3. Verificar a presença do código alfanumérico de 6 dígitos e dos dados da passagem.
