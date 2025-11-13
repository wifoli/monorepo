import { apiClient } from './client'
import type { User, Quote, ApiResponse, PaginatedResponse } from '@workspace/models'

// Serviços de usuário
export const userService = {
  getMe: () => apiClient.get<ApiResponse<User>>('/users/me'),
  
  getById: (id: number) => apiClient.get<ApiResponse<User>>(`/users/${id}`),
  
  update: (id: number, data: Partial<User>) =>
    apiClient.put<ApiResponse<User>>(`/users/${id}`, data),
}

// Serviços de cotação (exemplo baseado no seu sistema)
export const quoteService = {
  getAll: (params?: { page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<Quote>>('/quotes', { params }),
  
  getById: (id: number) =>
    apiClient.get<ApiResponse<Quote>>(`/quotes/${id}`),
  
  create: (data: Omit<Quote, 'id'>) =>
    apiClient.post<ApiResponse<Quote>>('/quotes', data),
  
  update: (id: number, data: Partial<Quote>) =>
    apiClient.put<ApiResponse<Quote>>(`/quotes/${id}`, data),
  
  delete: (id: number) =>
    apiClient.delete<ApiResponse<void>>(`/quotes/${id}`),
}

// Serviços de autenticação
export const authService = {
  login: (email: string, password: string) =>
    apiClient.post<ApiResponse<{ access_token: string; refresh_token: string; user: User }>>('/auth/login', {
      email,
      password,
    }),
  
  logout: () => apiClient.post<ApiResponse<void>>('/auth/logout'),
  
  refresh: (refreshToken: string) =>
    apiClient.post<ApiResponse<{ access_token: string }>>('/auth/refresh', {
      refresh_token: refreshToken,
    }),
}
