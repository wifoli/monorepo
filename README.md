# Monorepo Turborepo com React + Vite + PrimeReact + Tailwind

Este é um monorepo configurado com Turborepo, contendo 2 aplicações React e 4 bibliotecas compartilhadas.

## 📦 Estrutura do Projeto

```
.
├── apps/
│   ├── app1/              # App 1 - Sistema de Cotações
│   └── app2/              # App 2 - Gestão de Produtos
├── packages/
│   ├── ui/                # Componentes UI (PrimeReact + Tailwind)
│   ├── api-client/        # Cliente Axios configurado
│   ├── models/            # Tipos TypeScript compartilhados
│   └── auth/              # Sistema de autenticação
├── docker-compose.yml
├── Dockerfile
└── package.json
```

## 🚀 Como Usar

### Usando Docker (Recomendado)

1. **Build e start dos containers:**
```bash
docker-compose up
```

2. **Acessar os apps:**
- App 1: http://localhost:3000
- App 2: http://localhost:3001

3. **Parar os containers:**
```bash
docker-compose down
```

### Sem Docker

1. **Instalar dependências:**
```bash
pnpm install
```

2. **Rodar em modo dev:**
```bash
pnpm dev
```

3. **Build de produção:**
```bash
pnpm build
```

## 📚 Pacotes Disponíveis

### @workspace/ui
Componentes React baseados em PrimeReact com estilização Tailwind.

```typescript
import { Button, DataTable } from '@workspace/ui'
import '@workspace/ui/styles'
```

**Componentes disponíveis:**
- `Button` - Botão customizado com variantes
- `DataTable` - Tabela de dados com paginação
- Todos os componentes do PrimeReact re-exportados

### @workspace/api-client
Cliente Axios pré-configurado com interceptors.

```typescript
import { apiClient, userService, quoteService } from '@workspace/api-client'

// Usar serviços tipados
const response = await userService.getMe()
const user = response.data.data
```

**Features:**
- Interceptors para adicionar tokens automaticamente
- Refresh token automático em caso de 401
- Serviços tipados para: usuários, cotações, autenticação

### @workspace/models
Tipos TypeScript compartilhados.

```typescript
import type { User, Quote, Product, Client } from '@workspace/models'
```

**Tipos disponíveis:**
- `User`, `Quote`, `Product`, `Client`
- `ApiResponse<T>`, `PaginatedResponse<T>`
- Enums: `UserRole`, `QuoteStatus`
- DTOs para create/update

### @workspace/auth
Sistema de autenticação com Context API.

```typescript
import { AuthProvider, useAuth, PERMISSIONS } from '@workspace/auth'

function App() {
  const { user, login, logout, hasPermission } = useAuth()
  
  if (hasPermission(PERMISSIONS.QUOTE_CREATE)) {
    // usuário pode criar cotações
  }
}
```

**Features:**
- Context de autenticação
- Hooks: `useAuth()`
- Verificação de permissões
- Constantes de permissões pré-definidas

## 🎨 Tecnologias

- **Turborepo** - Monorepo build system
- **React 18** - Library UI
- **TypeScript** - Type safety
- **Vite** - Build tool
- **PrimeReact** - Component library
- **Tailwind CSS** - Utility-first CSS
- **Axios** - HTTP client
- **pnpm** - Package manager

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
pnpm dev                  # Roda todos os apps em modo dev
pnpm dev --filter=app1    # Roda apenas app1

# Build
pnpm build                # Build de todos os pacotes e apps
pnpm build --filter=app2  # Build apenas app2

# Lint
pnpm lint                 # Lint em todos os pacotes

# Limpar builds
pnpm clean
```

## 📝 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz de cada app:

```bash
# apps/app1/.env.local
VITE_API_URL=http://localhost:8000/api
```

## 🐳 Docker

O Dockerfile usa Node 20 Alpine e instala pnpm e turbo globalmente.

**Volumes montados:**
- Código fonte (hot reload)
- node_modules isolados para performance

**Portas expostas:**
- 3000 - App 1
- 3001 - App 2
- 3002 - Reservado (Storybook, etc)

## 📖 Próximos Passos

1. **Conectar com sua API Django REST Framework**
2. **Adicionar mais componentes ao pacote UI**
3. **Configurar Storybook para documentação de componentes**
4. **Adicionar testes com Vitest**
5. **Configurar CI/CD**

## 🤝 Contribuindo

Este é um projeto base. Customize conforme suas necessidades!

## 📄 Licença

MIT
