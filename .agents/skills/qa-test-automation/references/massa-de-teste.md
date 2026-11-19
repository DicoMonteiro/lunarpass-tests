# Massa de teste — Lunar Pass

Cada teste cria os próprios dados, verifica só os próprios dados e limpa o que criou. O mecanismo do projeto é **Kysely em PostgreSQL**, em `playwright/support/db.ts`.

Não altere a conexão, SSL, plugins nem credenciais desse arquivo.

## Funções disponíveis

| Função | Uso |
|---|---|
| `cleanMission(id)` | Apaga ticket, reserva e missão daquele id |
| `cleanAndInsertMission(mission)` | Limpa e insere uma `Mission` |
| `insertMission(mission)` | Só insere |
| `deleteMission(id)` | Só apaga a missão |
| `deleteReservation(missionId)` | Apaga reservas da missão |
| `deleteTicket(missionId)` | Apaga tickets da missão |

Tipo obrigatório para missão: `Mission` em `playwright/support/types.ts`.

Valores de `baseId` já usados nos testes: `aurora`, `alpha`, `orion`. A documentação de negócio também cita Selene; não invente id de base sem aparecer na tela ou nos testes.

## Regras

1. **Identificador exclusivo por cenário.** Formato alinhado aos testes: `LP-` + quatro dígitos e um sufixo (ex.: `LP-0128A`). Antes de escolher, busque no repositório e não repita (`LP-2026A` e `LP-3002B` já existem).
2. **Estado conhecido antes do teste:** `cleanMission` ou `cleanAndInsertMission` no Arrange / `beforeEach`.
3. **Limpeza depois do teste:** remova o que o teste criou, inclusive em falha (`test.afterEach` ou equivalente). Os specs atuais de registro nem sempre têm `afterEach`; código **novo** deve limpar.
4. **Dados válidos para regras que não estão em teste:** datas futuras, preço positivo, `baseId` que a tela oferece, id no formato que a UI aceita quando o cenário não testa o formato.
5. **No Storefront, nunca verifique contagem total nem posição** da lista pública. Localize a missão do teste pelo id e verifique dentro dela.
6. **Não altere dados que o teste não criou.**

## Quando falta uma função de massa

1. Confirme em `db.ts` e `types.ts` o que existe. Não invente tabela nem coluna.
2. Hoje **não há insert de reserva nem de ticket**. Se o **Dado** exigir esse estado, pergunte. Não invente schema.
3. Se for só mais um uso de missão, reutilize `cleanAndInsertMission` com um `Mission` completo.
4. Não use `playwright/fixture/dataMissions.ts` como modelo padrão: o shape (`missionID`, `base`) não é o tipo `Mission`, e os specs de registro não o importam.
5. Não introduza `@faker-js/faker` em spec novo só porque a dependência existe. Factories estão na lista de evolução não priorizada da arquitetura.

Nunca altere a connection string.
