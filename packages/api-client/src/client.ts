import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

// Criar instância do axios
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de request - adiciona token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Interceptor de response - trata erros
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Se 401 e não foi retry ainda, tenta refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refresh_token')
        const response = await axios.post(`${apiClient.defaults.baseURL}/auth/refresh`, {
          refresh_token: refreshToken,
        })

        const { access_token } = response.data
        localStorage.setItem('access_token', access_token)

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`
        }

        return apiClient(originalRequest)
      } catch (refreshError) {
        // Se refresh falhar, limpa tokens e redireciona para login
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
