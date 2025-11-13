# 🚀 Guia Rápido de Início

## Opção 1: Docker (Mais Fácil)

```bash
# 1. Subir os containers
docker-compose up

# 2. Acessar
# App 1: http://localhost:3000
# App 2: http://localhost:3001

# 3. Para parar
docker-compose down
```

## Opção 2: Local (Desenvolvimento)

```bash
# 1. Instalar pnpm (se não tiver)
npm install -g pnpm

# 2. Instalar dependências
pnpm install

# 3. Rodar em modo dev
pnpm dev

# 4. Acessar
# App 1: http://localhost:3000
# App 2: http://localhost:3001
```

## Estrutura Resumida

```
my-workspace/
├── apps/
│   ├── app1/              # Sistema de Cotações (porta 3000)
│   └── app2/              # Gestão de Produtos (porta 3001)
├── packages/
│   ├── ui/                # Componentes (PrimeReact + Tailwind)
│   ├── api-client/        # Axios configurado
│   ├── models/            # Tipos TypeScript
│   └── auth/              # Autenticação
└── docker-compose.yml
```

## Usando os Pacotes

### No seu app (app1 ou app2):

```typescript
// Importar componentes UI
import { Button, DataTable } from '@workspace/ui'
import '@workspace/ui/styles'

// Importar tipos
import type { User, Quote } from '@workspace/models'

// Importar autenticação
import { useAuth, PERMISSIONS } from '@workspace/auth'

// Importar API
import { apiClient, userService } from '@workspace/api-client'

function MeuComponente() {
  const { user, hasPermission } = useAuth()
  
  return (
    <div>
      <Button label="Clique aqui" onClick={() => {}} />
      {hasPermission(PERMISSIONS.QUOTE_CREATE) && (
        <p>Você pode criar cotações</p>
      )}
    </div>
  )
}
```

## Comandos Úteis

```bash
# Ver todos os comandos disponíveis
make help

# Desenvolvimento
pnpm dev                    # Roda todos os apps
pnpm dev --filter=app1      # Roda só app1

# Build
pnpm build

# Docker
docker-compose up           # Subir
docker-compose down         # Parar
docker-compose logs -f      # Ver logs
```

## Próximos Passos

1. ✅ Clone/baixe este projeto
2. ✅ Execute `docker-compose up` ou `pnpm install && pnpm dev`
3. ✅ Acesse http://localhost:3000 e http://localhost:3001
4. 🔧 Conecte com sua API Django REST Framework
5. 🎨 Adicione mais componentes ao pacote UI
6. 📝 Customize conforme suas necessidades

## Conectar com Django REST Framework

### 1. Configure a URL da API:

```bash
# apps/app1/.env.local
VITE_API_URL=http://seu-backend:8000/api
```

### 2. Use os serviços:

```typescript
import { quoteService } from '@workspace/api-client'

async function buscarCotacoes() {
  const response = await quoteService.getAll()
  console.log(response.data.data)
}
```

### 3. O interceptor já cuida de:
- ✅ Adicionar token Bearer automaticamente
- ✅ Refresh token em caso de 401
- ✅ Redirecionamento para login

## Precisa de Ajuda?

Leia a documentação completa:
- `README.md` - Documentação principal
- `STRUCTURE.md` - Estrutura detalhada do projeto

Comandos:
```bash
make help   # Lista todos os comandos
```
