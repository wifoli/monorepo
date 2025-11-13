import { useState } from 'react'
import { Button, DataTable } from '@workspace/ui'
import { useAuth, PERMISSIONS } from '@workspace/auth'
import type { Quote } from '@workspace/models'

function App() {
  const { user, isAuthenticated, login, logout, hasPermission } = useAuth()
  const [quotes] = useState<Quote[]>([
    {
      id: 1,
      number: 'COT-2025-001',
      clientId: 1,
      items: [],
      status: 'pending' as any,
      totalValue: 1500.00,
      validUntil: '2025-12-31',
      createdBy: 1,
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
          <h1 className="text-2xl font-bold text-white mb-4">App 1 - Login</h1>
          <Button label="Entrar" onClick={handleLogin} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">App 1 - Sistema de Cotações</h1>
            <p className="text-gray-400">Bem-vindo, {user?.name}!</p>
          </div>
          <Button label="Sair" variant="danger" onClick={logout} />
        </div>

        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Suas Permissões</h2>
          <div className="flex gap-2 flex-wrap">
            {hasPermission(PERMISSIONS.QUOTE_VIEW) && (
              <span className="px-3 py-1 bg-blue-600 text-white rounded">Ver Cotações</span>
            )}
            {hasPermission(PERMISSIONS.QUOTE_CREATE) && (
              <span className="px-3 py-1 bg-green-600 text-white rounded">Criar Cotações</span>
            )}
            {hasPermission(PERMISSIONS.QUOTE_APPROVE) && (
              <span className="px-3 py-1 bg-purple-600 text-white rounded">Aprovar Cotações</span>
            )}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Cotações Recentes</h2>
            {hasPermission(PERMISSIONS.QUOTE_CREATE) && (
              <Button label="Nova Cotação" icon="pi pi-plus" variant="success" />
            )}
          </div>
          
          <DataTable
            value={quotes}
            columns={[
              { field: 'number', header: 'Número' },
              { field: 'status', header: 'Status' },
              { 
                field: 'totalValue', 
                header: 'Valor Total',
                body: (row: Quote) => `R$ ${row.totalValue.toFixed(2)}`
              },
              { field: 'validUntil', header: 'Válido até' },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default App
