#!/bin/bash

# Script de configuração inicial do projeto

echo "🚀 Configurando projeto Turborepo..."
echo ""

# Verifica se pnpm está instalado
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm não encontrado. Instalando..."
    npm install -g pnpm
fi

echo "✅ pnpm encontrado"
echo ""

# Instala dependências
echo "📦 Instalando dependências..."
pnpm install

echo ""
echo "✅ Projeto configurado com sucesso!"
echo ""
echo "Comandos disponíveis:"
echo "  pnpm dev              - Roda todos os apps em modo dev"
echo "  docker-compose up     - Sobe com Docker"
echo "  make help             - Lista todos os comandos disponíveis"
echo ""
echo "Acesse:"
echo "  App 1: http://localhost:3000"
echo "  App 2: http://localhost:3001"
echo ""
