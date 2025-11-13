// Tipos genéricos de resposta da API
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Modelo de Usuário
export interface User {
  id: number
  name: string
  email: string
  role: UserRole
  permissions: Permission[]
  createdAt: string
  updatedAt: string
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MANAGER = 'manager',
}

// Modelo de Permissões
export interface Permission {
  id: number
  name: string
  code: string
  description?: string
}

// Modelo de Cotação (exemplo baseado no seu sistema)
export interface Quote {
  id: number
  number: string
  clientId: number
  client?: Client
  items: QuoteItem[]
  status: QuoteStatus
  totalValue: number
  validUntil: string
  createdBy: number
  createdAt: string
  updatedAt: string
}

export interface QuoteItem {
  id: number
  quoteId: number
  productId: number
  product?: Product
  quantity: number
  unitPrice: number
  discount: number
  totalPrice: number
}

export enum QuoteStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
}

// Modelo de Cliente
export interface Client {
  id: number
  name: string
  document: string
  email: string
  phone: string
  address?: Address
  createdAt: string
  updatedAt: string
}

export interface Address {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
}

// Modelo de Produto
export interface Product {
  id: number
  name: string
  description?: string
  code: string
  price: number
  stock: number
  active: boolean
  createdAt: string
  updatedAt: string
}

// Tipos de formulário
export type CreateQuoteDTO = Omit<Quote, 'id' | 'createdAt' | 'updatedAt' | 'number'>
export type UpdateQuoteDTO = Partial<CreateQuoteDTO>

export type CreateUserDTO = Omit<User, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateUserDTO = Partial<CreateUserDTO>
