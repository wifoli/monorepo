# Estrutura Completa do Projeto

```
my-workspace/
│
├── apps/                                    # Aplicações
│   ├── app1/                               # Aplicação 1 - Sistema de Cotações
│   │   ├── src/
│   │   │   ├── App.tsx                    # Componente principal
│   │   │   └── main.tsx                   # Entry point
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tsconfig.node.json
│   │   └── vite.config.ts                 # Configuração Vite (porta 3000)
│   │
│   └── app2/                               # Aplicação 2 - Gestão de Produtos
│       ├── src/
│       │   ├── App.tsx                    # Componente principal
│       │   └── main.tsx                   # Entry point
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       ├── tsconfig.node.json
│       └── vite.config.ts                 # Configuração Vite (porta 3001)
│
├── packages/                               # Bibliotecas compartilhadas
│   ├── ui/                                # Componentes UI
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Button.tsx            # Botão customizado
│   │   │   │   └── DataTable.tsx         # Tabela de dados
│   │   │   ├── styles.css                # Estilos (Tailwind + PrimeReact)
│   │   │   └── index.ts                  # Exports
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts                # Build da lib
│   │   ├── tailwind.config.js
│   │   └── postcss.config.js
│   │
│   ├── api-client/                        # Cliente HTTP
│   │   ├── src/
│   │   │   ├── client.ts                 # Instância Axios + interceptors
│   │   │   ├── services.ts               # Serviços tipados (user, quote, auth)
│   │   │   └── index.ts                  # Exports
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── models/                            # Tipos TypeScript
│   │   ├── src/
│   │   │   └── index.ts                  # User, Quote, Product, Client, etc
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── auth/                              # Autenticação
│       ├── src/
│       │   ├── AuthContext.tsx           # Context + Provider + useAuth hook
│       │   ├── permissions.ts            # Constantes de permissões
│       │   └── index.ts                  # Exports
│       ├── package.json
│       └── tsconfig.json
│
├── docker-compose.yml                     # Configuração Docker Compose
├── Dockerfile                             # Imagem Docker (Node 20 Alpine)
├── .dockerignore                          # Arquivos ignorados no Docker
├── package.json                           # Root package.json
├── pnpm-workspace.yaml                    # Configuração workspace pnpm
├── turbo.json                             # Configuração Turborepo
├── .gitignore                             # Git ignore
├── .env.example                           # Exemplo de variáveis de ambiente
├── Makefile                               # Comandos úteis
├── setup.sh                               # Script de setup inicial
├── README.md                              # Documentação principal
└── STRUCTURE.md                           # Este arquivo
```

## 🔗 Dependências entre Pacotes

```
app1 & app2
    ├── @workspace/ui
    ├── @workspace/api-client
    │   └── @workspace/models
    ├── @workspace/models
    └── @workspace/auth
        └── @workspace/models
```

## 📦 Exports dos Pacotes

### @workspace/ui
```typescript
// Componentes customizados
export { Button } from './components/Button'
export { DataTable } from './components/DataTable'

// Re-exports do PrimeReact
export * from 'primereact/dialog'
export * from 'primereact/inputtext'
// ... etc
```

### @workspace/api-client
```typescript
export { apiClient } from './client'
export { userService, quoteService, authService } from './services'
```

### @workspace/models
```typescript
export interface User { ... }
export interface Quote { ... }
export interface Product { ... }
export interface Client { ... }
export type ApiResponse<T> = { ... }
export type PaginatedResponse<T> = { ... }
```

### @workspace/auth
```typescript
export { AuthProvider, useAuth } from './AuthContext'
export { PERMISSIONS } from './permissions'
```

## 🚀 Como Adicionar Novos Componentes

### 1. Adicionar componente ao @workspace/ui

```bash
# Criar arquivo
touch packages/ui/src/components/NovoComponente.tsx
```

```typescript
// packages/ui/src/components/NovoComponente.tsx
import { Card } from 'primereact/card'

export interface NovoComponenteProps {
  title: string
}

export function NovoComponente({ title }: NovoComponenteProps) {
  return (
    <Card title={title} className="shadow-md">
      Conteúdo
    </Card>
  )
}
```

```typescript
// packages/ui/src/index.ts
export { NovoComponente } from './components/NovoComponente'
export type { NovoComponenteProps } from './components/NovoComponente'
```

### 2. Usar nos apps

```typescript
// apps/app1/src/App.tsx
import { NovoComponente } from '@workspace/ui'

function App() {
  return <NovoComponente title="Teste" />
}
```

## 🔧 Como Adicionar Novos Serviços API

```typescript
// packages/api-client/src/services.ts
export const productService = {
  getAll: () => apiClient.get<PaginatedResponse<Product>>('/products'),
  getById: (id: number) => apiClient.get<ApiResponse<Product>>(`/products/${id}`),
  create: (data: CreateProductDTO) => apiClient.post<ApiResponse<Product>>('/products', data),
}
```

## 🎯 Features Implementadas

✅ Monorepo com Turborepo  
✅ React + TypeScript + Vite  
✅ PrimeReact + Tailwind CSS  
✅ Sistema de autenticação compartilhado  
✅ Cliente API com interceptors e refresh token  
✅ Tipos TypeScript compartilhados  
✅ Componentes UI reutilizáveis  
✅ Docker + Docker Compose  
✅ Hot reload em desenvolvimento  
✅ Sistema de permissões  

## 📋 Próximas Melhorias Sugeridas

- [ ] Adicionar Storybook para documentação de componentes
- [ ] Configurar testes com Vitest
- [ ] Adicionar ESLint e Prettier configurados
- [ ] Configurar Husky para pre-commit hooks
- [ ] Adicionar CI/CD com GitHub Actions
- [ ] Implementar tema claro/escuro
- [ ] Adicionar mais componentes (Form, Modal, etc)
- [ ] Documentação de API com TypeDoc
