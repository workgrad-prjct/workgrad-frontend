import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'
import { User, LoginCredentials, RegisterData, AuthState } from '@/types'

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000/api'
axios.defaults.withCredentials = true

interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>
    register: (data: RegisterData) => Promise<void>
    logout: () => void
    updateUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Initialize auth state from local storage
    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('token')
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                try {
                    const { data } = await axios.get('/auth/me')
                    if (data.success) {
                        setUser(data.data.user)
                        setIsAuthenticated(true)
                    }
                } catch (err) {
                    console.error('Failed to restore session:', err)
                    localStorage.removeItem('token')
                    delete axios.defaults.headers.common['Authorization']
                }
            }
            setIsLoading(false)
        }

        initializeAuth()
    }, [])

    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true)
        setError(null)
        try {
            const { data } = await axios.post('/auth/login', credentials)
            if (data.success) {
                const { user, token } = data.data
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                setUser(user)
                setIsAuthenticated(true)
            }
        } catch (err: any) {
            const message = err.response?.data?.message || 'Login failed'
            setError(message)
            throw new Error(message)
        } finally {
            setIsLoading(false)
        }
    }

    const register = async (registerData: RegisterData) => {
        setIsLoading(true)
        setError(null)
        try {
            const { data } = await axios.post('/auth/register', registerData)
            if (data.success) {
                const { user, token } = data.data
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                setUser(user)
                setIsAuthenticated(true)
            }
        } catch (err: any) {
            const message = err.response?.data?.message || 'Registration failed'
            setError(message)
            throw new Error(message)
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        setUser(null)
        setIsAuthenticated(false)
        // Optional: Call logout endpoint if needed
        // axios.post('/auth/logout').catch(console.error)
    }

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                error,
                login,
                register,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
