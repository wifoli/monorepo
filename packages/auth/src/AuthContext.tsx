import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { User, Permission } from '@workspace/models'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  hasPermission: (permissionCode: string) => boolean
  hasAnyPermission: (permissionCodes: string[]) => boolean
  hasAllPermissions: (permissionCodes: string[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verifica se tem usuário no localStorage ao iniciar
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Aqui você faria a chamada real para a API
      // const response = await authService.login(email, password)
      // const { user, access_token, refresh_token } = response.data.data
      
      // Mock para exemplo
      const mockUser: User = {
        id: 1,
        name: 'Leandro',
        email,
        role: 'admin' as any,
        permissions: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      localStorage.setItem('user', JSON.stringify(mockUser))
      // localStorage.setItem('access_token', access_token)
      // localStorage.setItem('refresh_token', refresh_token)
      
      setUser(mockUser)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
  }

  const hasPermission = (permissionCode: string): boolean => {
    if (!user) return false
    return user.permissions.some(p => p.code === permissionCode)
  }

  const hasAnyPermission = (permissionCodes: string[]): boolean => {
    if (!user) return false
    return permissionCodes.some(code => hasPermission(code))
  }

  const hasAllPermissions = (permissionCodes: string[]): boolean => {
    if (!user) return false
    return permissionCodes.every(code => hasPermission(code))
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
