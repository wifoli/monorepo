import { useState } from 'react'
import { Button, DataTable } from '@workspace/ui'
import { useAuth, PERMISSIONS } from '@workspace/auth'
import type { Product } from '@workspace/models'

function App() {
  const { user, isAuthenticated, login, logout, hasPermission } = useAuth()
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: 'Produto Exemplo',
      code: 'PROD-001',
      description: 'Descrição do produto',
      price: 99.90,
      stock: 150,
      active: true,
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01',
    },
  ])

  const handleLogin = async () => {
    try {
      await login('leandro@example.com', 'password')
    } catch (error) {
      console.error('Erro ao fazer login:', error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold text-white mb-4">App 2 - Login</h1>
          <Button label="Entrar" variant="danger" onClick={handleLogin} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">App 2 - Gestão de Produtos</h1>
            <p className="text-gray-400">Olá, {user?.name}!</p>
          </div>
          <Button label="Sair" variant="danger" onClick={logout} />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-2">Total de Produtos</h3>
            <p className="text-3xl font-bold text-white">{products.length}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-2">Produtos Ativos</h3>
            <p className="text-3xl font-bold text-green-500">
              {products.filter(p => p.active).length}
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-2">Estoque Total</h3>
            <p className="text-3xl font-bold text-blue-500">
              {products.reduce((acc, p) => acc + p.stock, 0)}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Catálogo de Produtos</h2>
            {hasPermission(PERMISSIONS.PRODUCT_CREATE) && (
              <Button label="Novo Produto" icon="pi pi-plus" variant="success" />
            )}
          </div>

          <DataTable
            value={products}
            columns={[
              { field: 'code', header: 'Código' },
              { field: 'name', header: 'Nome' },
              {
                field: 'price',
                header: 'Preço',
                body: (row: Product) => `R$ ${row.price.toFixed(2)}`
              },
              { field: 'stock', header: 'Estoque' },
              {
                field: 'active',
                header: 'Status',
                body: (row: Product) => (
                  <span className={`px-2 py-1 rounded text-sm ${row.active ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    }`}>
                    {row.active ? 'Ativo' : 'Inativo'}
                  </span>
                )
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default App
