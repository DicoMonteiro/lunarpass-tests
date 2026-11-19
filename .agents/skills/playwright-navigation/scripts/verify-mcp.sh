#!/usr/bin/env bash
set -e

echo "=== Verificando ambiente Playwright MCP ==="

# Verifica Node.js
if ! command -v node >/dev/null 2>&1; then
  echo "❌ Node.js não encontrado no PATH."
  exit 1
fi
echo "✅ Node.js: $(node --version)"

# Verifica NPX
if ! command -v npx >/dev/null 2>&1; then
  echo "❌ npx não encontrado no PATH."
  exit 1
fi
echo "✅ npx: $(npx --version)"

# Testa disponibilidade do pacote @playwright/mcp
echo "🔍 Verificando pacote @playwright/mcp..."
if npx -y @playwright/mcp@latest --help >/dev/null 2>&1; then
  echo "✅ @playwright/mcp está disponível e pronto para uso."
else
  echo "⚠️ Aviso: Houve um problema ao executar @playwright/mcp via npx."
  exit 1
fi

echo "=== Playwright MCP configurado com sucesso! ==="
