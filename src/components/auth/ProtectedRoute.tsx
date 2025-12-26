import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '@/context'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
    allowedRoles?: string[]
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const { isAuthenticated, user, isLoading } = useAuth()
    const location = useLocation()

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
                    <p className="text-neutral-500 font-medium">Loading session...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        // Redirect to login page but save the attempted location
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // User authorized but role not allowed
        // Redirect to their appropriate dashboard
        const role = user.role
        if (role === 'admin') return <Navigate to="/admin" replace />
        if (role === 'employer') return <Navigate to="/employer" replace />
        if (role === 'mentor') return <Navigate to="/mentor" replace />
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}
