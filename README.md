# Lunar Pass - Sua viagem para a Lua começa aqui

Aplicação web em React para gerenciamento de missões lunares.

## Sobre o Projeto

Uma SPA (Single Page Application) que permite:
- Gerenciar missões lunares
- Acompanhar o status das missões
- Consultar histórico de missões
- Consultar status de missões

---

## Stack Tecnológica

| Categoria | Tecnologias |
|-----------|-------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| **Estado** | Zustand (global), React Hook Form (formulários) |
| **Validação** | Zod |
| **Data Fetching** | TanStack Query |
| **Backend** | Supabase (PostgreSQL + Edge Functions) |


## Test with Playwright

```bash
  yarn playwright test
    #Runs the end-to-end tests.

  VITE_VERCEL_ENV=preview yarn playwright test
    #Runs the end-to-end tests against the Preview environment (Database & Keys).

  VITE_VERCEL_ENV=production yarn playwright test
    #Runs the end-to-end tests against the Production environment (Database & Keys).

  yarn playwright test --ui
    #Starts the interactive UI mode.

  yarn playwright test --project=chromium
    #Runs the tests only on Desktop Chrome.

  yarn playwright test tests/login.spec.ts
    #Runs the tests in a specific file.

  yarn playwright codegen <url>
    #Runs the inspect elements

  yarn playwright test --debug
    #Runs the tests in debug mode.

  yarn playwright test --headed
    #Runs the tests with browser open
  
  yarn playwright show-report
    #Runs the report about tests

  yarn playwright test --workers=2
    #Runs the tests with 2 workers

  yarn playwright test --workers=2 --project=chromium
    #Runs the tests with 2 workers and only on Desktop Chrome

  yarn playwright test --workers=2 --project=chromium --headed
    #Runs the tests with 2 workers and only on Desktop Chrome with browser open

  yarn playwright test --workers=2 --project=chromium --headed --debug
    #Runs the tests with 2 workers and only on Desktop Chrome with browser open and debug mode

  yarn playwright test --workers=2 --project=chromium --headed --debug --ui
    #Runs the tests with 2 workers and only on Desktop Chrome with browser open and debug mode and interactive UI mode
  
  yarn playwright test --shards=2/3
    #Runs the tests with 2 workers and only on Desktop Chrome with browser open and debug mode and interactive UI mode and shards

  yarn playwright test --project=mission-control --headed --debug --ui
  #Runs the tests for mission-control with 2 workers and only on Desktop Chrome with browser open and debug mode and interactive UI mode

  yarn playwright test --project=storefront --headed --debug --ui
  #Runs the tests for storefront with 2 workers and only on Desktop Chrome with browser open and debug mode and interactive UI mode
    
```