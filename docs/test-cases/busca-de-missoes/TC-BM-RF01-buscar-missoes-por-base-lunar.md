# Test Cases — RF-01: Buscar Missões por Base Lunar

**Módulo:** Storefront Lunar Pass — Busca de Missões  
**Requisito:** RF-01 — Buscar missões por base lunar  
**Documento base:** `storefront-rfs.md`  
**Ambiente:** http://localhost:3000  
**Elaborado em:** 2026-09-25  

---

## Critérios de Aceite Cobertos

> Com base no RF-01 e nas regras de negócio mapeadas durante a exploração da aplicação:

| # | Critério de Aceite |
|---|---|
| CA-01 | Deve ser possível selecionar uma ou mais bases lunares como filtro da busca |
| CA-02 | A busca pode ser iniciada pelo formulário da página inicial (seleção de pills + botão "BUSCAR MISSÕES") |
| CA-03 | A busca pode ser iniciada pelo destaque de uma base lunar específica na seção "Bases Lunares" da homepage |
| CA-04 | As missões que atendem às bases selecionadas devem ser apresentadas junto com a **quantidade de resultados** encontrados |
| CA-05 | Os resultados devem **indicar quais bases** estão sendo usadas como filtro |
| CA-06 | Quando nenhuma base for selecionada, a busca deve considerar **todas as bases** |
| CA-07 | Quando todas as bases forem selecionadas, o comportamento deve ser equivalente a nenhuma selecionada |

---

## Estrutura da Interface Mapeada

### Página Inicial (`/`)

**Formulário de Busca (Seção Hero):**
- Campo de filtro: fieldset com legend `BASES LUNARES`
- Pills/checkboxes: `Base Lunar Alpha` · `Base Lunar Orion` · `Base Lunar Aurora` · `Base Lunar Selene`
- Select de ordenação: label `ORDENAR POR`, opção padrão `Missão mais próxima`
- Botão de ação: `BUSCAR MISSÕES →`

**Seção de Destaque de Bases (`#bases`):**
- Título: *"Quatro bases. Um mesmo horizonte."*
- Cards individuais por base, cada um com link `"Ver missões →"` navegando para `/missions?base=<id>`

### Página de Resultados (`/missions`)

- Contador de resultados: ex. `"6 missões disponíveis"`
- Subtítulo de filtro ativo: ex. `"Base Base Lunar Alpha"` ou `"Bases Base Lunar Alpha e Base Lunar Orion"`
- Barra de refinamento: dropdown `BASES LUNARES` e `ORDENAR POR` + botão `REFINAR`
- Cards de missão contendo: código + foguete, nome da base, localização, datas, estadia, assentos, preço, botão `RESERVAR →`

---

## Test Cases

---

### TC-BM-RF01-01 — Buscar missões sem selecionar nenhuma base

| Campo | Valor |
|---|---|
| **ID** | TC-BM-RF01-01 |
| **Objetivo** | Verificar que, ao realizar uma busca sem selecionar nenhuma base, todas as missões do catálogo são exibidas |
| **Pré-condições** | A aplicação está disponível em http://localhost:3000 e o catálogo possui ao menos 1 missão cadastrada por base |
| **Dados de Entrada** | Nenhuma base selecionada (todas as pills sem marcação) |

**Passos:**

1. Acessar `http://localhost:3000`
2. Verificar que nenhuma das quatro pills de base lunar está selecionada
3. Clicar no botão `BUSCAR MISSÕES →`
4. Aguardar o carregamento da página de resultados

**Resultado Esperado:**

- A URL deve ser `http://localhost:3000/missions` (sem parâmetro `base`)
- O contador de resultados deve exibir **todas** as missões do catálogo (ex.: `"6 missões disponíveis"`)
- O dropdown `BASES LUNARES` na barra de refinamento deve exibir `"Todas as bases"`
- Não deve haver nenhum subtítulo de filtro ativo específico por base

| Campo | Valor |
|---|---|
| **Resultado Obtido** | *(preencher na execução)* |
| **Status** | ⬜ Não executado |
| **Evidência** | *(anexar screenshot)* |

---

### TC-BM-RF01-02 — Buscar missões selecionando uma única base lunar

| Campo | Valor |
|---|---|
| **ID** | TC-BM-RF01-02 |
| **Objetivo** | Verificar que, ao selecionar uma única base lunar, somente as missões dessa base são exibidas, com indicação do filtro ativo |
| **Pré-condições** | A aplicação está disponível em http://localhost:3000 e há ao menos 1 missão cadastrada para a Base Lunar Alpha |
| **Dados de Entrada** | Base selecionada: `Base Lunar Alpha` |

**Passos:**

1. Acessar `http://localhost:3000`
2. Clicar na pill `Base Lunar Alpha` para selecioná-la
3. Confirmar que apenas a pill `Base Lunar Alpha` está marcada (as demais sem marcação)
4. Clicar no botão `BUSCAR MISSÕES →`
5. Aguardar o carregamento da página de resultados

**Resultado Esperado:**

- A URL deve ser `http://localhost:3000/missions?base=alpha`
- O contador de resultados deve exibir apenas as missões da Base Lunar Alpha (ex.: `"1 missão disponível"`)
- O subtítulo da página deve indicar o filtro ativo: `"Base Base Lunar Alpha"`
- O dropdown `BASES LUNARES` na barra de refinamento deve exibir `"Base Lunar Alpha"`
- Todos os cards exibidos devem pertencer à `Base Lunar Alpha` (localização: *Mar da Tranquilidade*)

| Campo | Valor |
|---|---|
| **Resultado Obtido** | *(preencher na execução)* |
| **Status** | ⬜ Não executado |
| **Evidência** | *(anexar screenshot)* |

---

### TC-BM-RF01-03 — Buscar missões selecionando duas bases lunares simultaneamente

| Campo | Valor |
|---|---|
| **ID** | TC-BM-RF01-03 |
| **Objetivo** | Verificar que, ao selecionar duas bases lunares, os resultados exibem missões de ambas, com a quantidade correta e indicação dos dois filtros ativos |
| **Pré-condições** | A aplicação está disponível em http://localhost:3000 e há missões cadastradas para Base Lunar Alpha e Base Lunar Orion |
| **Dados de Entrada** | Bases selecionadas: `Base Lunar Alpha` e `Base Lunar Orion` |

**Passos:**

1. Acessar `http://localhost:3000`
2. Clicar na pill `Base Lunar Alpha` para selecioná-la
3. Clicar na pill `Base Lunar Orion` para selecioná-la
4. Confirmar que as duas pills estão marcadas e as demais (Aurora, Selene) sem marcação
5. Clicar no botão `BUSCAR MISSÕES →`
6. Aguardar o carregamento da página de resultados

**Resultado Esperado:**

- A URL deve conter ambas as bases (ex.: `http://localhost:3000/missions?base=alpha%2Corion`)
- O contador de resultados deve exibir a soma das missões das duas bases selecionadas
- O subtítulo da página deve indicar ambos os filtros ativos: `"Bases Base Lunar Alpha e Base Lunar Orion"`
- O dropdown `BASES LUNARES` na barra de refinamento deve exibir `"2 bases selecionadas"`
- Os cards exibidos devem pertencer apenas às bases `Base Lunar Alpha` ou `Base Lunar Orion`; nenhuma missão de Aurora ou Selene deve aparecer

| Campo | Valor |
|---|---|
| **Resultado Obtido** | *(preencher na execução)* |
| **Status** | ⬜ Não executado |
| **Evidência** | *(anexar screenshot)* |

---

### TC-BM-RF01-04 — Iniciar busca via destaque de base na seção "Bases Lunares" da homepage

| Campo | Valor |
|---|---|
| **ID** | TC-BM-RF01-04 |
| **Objetivo** | Verificar que o clique no link "Ver missões →" de um card de destaque de base lunar na homepage navega diretamente para a página de resultados já filtrada pela base correspondente |
| **Pré-condições** | A aplicação está disponível em http://localhost:3000 e a seção de bases lunares está visível na homepage |
| **Dados de Entrada** | Base selecionada via destaque: `Base Lunar Aurora` |

**Passos:**

1. Acessar `http://localhost:3000`
2. Rolar a página para baixo até localizar a seção *"Quatro bases. Um mesmo horizonte."*
3. Localizar o card da `Base Lunar Aurora` (Polo Sul Lunar)
4. Clicar no link `Ver missões →` do card da Base Lunar Aurora
5. Aguardar o carregamento da página de resultados

**Resultado Esperado:**

- A URL deve ser `http://localhost:3000/missions?base=aurora`
- A página de resultados deve ser carregada já filtrada pela `Base Lunar Aurora`
- O contador de resultados deve exibir apenas as missões da Base Lunar Aurora
- O subtítulo ou indicador de filtro deve mencionar `"Base Lunar Aurora"`
- O dropdown `BASES LUNARES` na barra de refinamento deve exibir `"Base Lunar Aurora"`
- Todos os cards exibidos devem pertencer à `Base Lunar Aurora` (localização: *Polo Sul Lunar*)

| Campo | Valor |
|---|---|
| **Resultado Obtido** | *(preencher na execução)* |
| **Status** | ⬜ Não executado |
| **Evidência** | *(anexar screenshot)* |

---

### TC-BM-RF01-05 — Verificar consistência entre o contador de resultados e os cards exibidos

| Campo | Valor |
|---|---|
| **ID** | TC-BM-RF01-05 |
| **Objetivo** | Verificar que o contador de resultados exibido na página de missões é consistente com o número real de cards de missão apresentados |
| **Pré-condições** | A aplicação está disponível em http://localhost:3000; catálogo com missões cadastradas |
| **Dados de Entrada** | Base selecionada: `Base Lunar Orion` |

**Passos:**

1. Acessar `http://localhost:3000`
2. Selecionar a pill `Base Lunar Orion`
3. Clicar no botão `BUSCAR MISSÕES →`
4. Aguardar o carregamento da página de resultados
5. Contar os cards de missão exibidos na página
6. Comparar a contagem manual com o número exibido no contador de resultados

**Resultado Esperado:**

- O número exibido no contador (ex.: `"2 missões disponíveis"`) deve ser **igual** à quantidade de cards de missão renderizados na página
- Não deve haver discrepância entre o contador e o número real de cards exibidos

| Campo | Valor |
|---|---|
| **Resultado Obtido** | *(preencher na execução)* |
| **Status** | ⬜ Não executado |
| **Evidência** | *(anexar screenshot)* |

---

### TC-BM-RF01-06 — Verificar que os resultados indicam claramente o filtro de base ativo

| Campo | Valor |
|---|---|
| **ID** | TC-BM-RF01-06 |
| **Objetivo** | Verificar que a página de resultados indica visualmente ao usuário qual(is) base(s) lunar(es) está(ão) sendo usada(s) como filtro |
| **Pré-condições** | A aplicação está disponível em http://localhost:3000 |
| **Dados de Entrada** | Base selecionada: `Base Lunar Selene` |

**Passos:**

1. Acessar `http://localhost:3000`
2. Selecionar a pill `Base Lunar Selene`
3. Clicar no botão `BUSCAR MISSÕES →`
4. Aguardar o carregamento da página de resultados
5. Identificar todos os elementos visuais que indicam o filtro ativo (subtítulo, dropdown, labels)

**Resultado Esperado:**

- O subtítulo da seção de resultados deve exibir `"Base Base Lunar Selene"` (ou equivalente identificando a base)
- O dropdown `BASES LUNARES` na barra de refinamento deve exibir `"Base Lunar Selene"` como selecionada
- A identificação do filtro deve ser clara o suficiente para que o usuário saiba quais bases estão filtradas sem nenhuma ambiguidade

| Campo | Valor |
|---|---|
| **Resultado Obtido** | *(preencher na execução)* |
| **Status** | ⬜ Não executado |
| **Evidência** | *(anexar screenshot)* |

---

## Rastreabilidade

| Test Case | Critério de Aceite | Regra de Negócio |
|---|---|---|
| TC-BM-RF01-01 | CA-06 | Quando nenhuma base é selecionada, a busca considera todas as bases |
| TC-BM-RF01-02 | CA-01, CA-02, CA-04, CA-05 | Seleção de uma base; missões exibidas com quantidade e indicação do filtro |
| TC-BM-RF01-03 | CA-01, CA-02, CA-04, CA-05 | Seleção de múltiplas bases; resultados combinados com indicação de ambas |
| TC-BM-RF01-04 | CA-03, CA-04, CA-05 | Busca iniciada pelo destaque de base na homepage |
| TC-BM-RF01-05 | CA-04 | Quantidade de resultados exibida deve ser consistente com os cards |
| TC-BM-RF01-06 | CA-05 | Resultados indicam claramente quais bases estão sendo usadas como filtro |

---

## Legenda de Status

| Símbolo | Significado |
|---|---|
| ⬜ Não executado | O teste ainda não foi executado |
| ✅ Passou | O resultado obtido corresponde ao resultado esperado |
| ❌ Falhou | O resultado obtido não corresponde ao resultado esperado |
| ⚠️ Bloqueado | O teste não pode ser executado por dependência ou impedimento |
