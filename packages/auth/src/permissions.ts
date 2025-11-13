// Códigos de permissão padrão
export const PERMISSIONS = {
  // Usuários
  USER_VIEW: 'user.view',
  USER_CREATE: 'user.create',
  USER_UPDATE: 'user.update',
  USER_DELETE: 'user.delete',

  // Cotações
  QUOTE_VIEW: 'quote.view',
  QUOTE_CREATE: 'quote.create',
  QUOTE_UPDATE: 'quote.update',
  QUOTE_DELETE: 'quote.delete',
  QUOTE_APPROVE: 'quote.approve',

  // Produtos
  PRODUCT_VIEW: 'product.view',
  PRODUCT_CREATE: 'product.create',
  PRODUCT_UPDATE: 'product.update',
  PRODUCT_DELETE: 'product.delete',

  // Clientes
  CLIENT_VIEW: 'client.view',
  CLIENT_CREATE: 'client.create',
  CLIENT_UPDATE: 'client.update',
  CLIENT_DELETE: 'client.delete',

  // Relatórios
  REPORT_VIEW: 'report.view',
  REPORT_EXPORT: 'report.export',

  // Configurações
  SETTINGS_VIEW: 'settings.view',
  SETTINGS_UPDATE: 'settings.update',
} as const

export type PermissionCode = typeof PERMISSIONS[keyof typeof PERMISSIONS]

// Helper para verificar se usuário é admin
export const isAdmin = (userRole: string) => userRole === 'admin'

// Helper para verificar se usuário é manager
export const isManager = (userRole: string) => userRole === 'manager'
