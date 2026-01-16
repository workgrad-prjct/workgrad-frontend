import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Menu,
    X,
    LogIn,
} from 'lucide-react'
import { Button, Avatar } from '@/components/ui'
import { useAuth } from '@/context'
import { cn } from '@/utils'

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'For Mentors', href: '/mentors' },
]


export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { user, isAuthenticated } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [location])

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-neutral-100'
                    : 'bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <span className="font-display font-bold text-2xl text-neutral-900">
                            Work<span className="text-primary-600">Grad</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                    'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                                    location.pathname === item.href
                                        ? 'text-primary-600 bg-primary-50'
                                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-neutral-900 group-hover:text-primary-600 transition-colors">
                                        {user?.profile?.firstName} {user?.profile?.lastName}
                                    </p>
                                    <p className="text-xs text-neutral-500 capitalize">{user?.role}</p>
                                </div>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => navigate('/dashboard')}
                                    className="shadow-glow-sm"
                                >
                                    Dashboard
                                </Button>
                                <Link to="/dashboard/settings">
                                    <Avatar
                                        src={user?.profile?.avatar}
                                        name={`${user?.profile?.firstName} ${user?.profile?.lastName}`}
                                        size="md"
                                        className="border-2 border-primary-100"
                                    />
                                </Link>
                            </div>
                        ) : (
                            <Button
                                variant="primary"
                                onClick={() => navigate('/login')}
                                className="bg-gradient-to-r from-blue-500 to-indigo-500 border-none hover:opacity-90 px-6"
                            >
                                Get Started
                            </Button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden bg-white border-t border-neutral-100 overflow-hidden"
                    >
                        <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={cn(
                                        'block px-4 py-3 text-base font-medium rounded-xl transition-colors',
                                        location.pathname === item.href
                                            ? 'text-primary-600 bg-primary-50'
                                            : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <div className="pt-4 border-t border-neutral-100 space-y-2">
                                {isAuthenticated ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 px-4 py-2 bg-neutral-50 rounded-xl">
                                            <Avatar
                                                src={user?.profile?.avatar}
                                                name={`${user?.profile?.firstName} ${user?.profile?.lastName}`}
                                                size="md"
                                            />
                                            <div>
                                                <p className="text-sm font-bold text-neutral-900">
                                                    {user?.profile?.firstName} {user?.profile?.lastName}
                                                </p>
                                                <p className="text-xs text-neutral-500 capitalize">{user?.role}</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="primary"
                                            fullWidth
                                            onClick={() => navigate('/dashboard')}
                                            leftIcon={<LogIn className="w-4 h-4" />}
                                        >
                                            Go to Dashboard
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        variant="primary"
                                        fullWidth
                                        onClick={() => navigate('/login')}
                                        className="bg-gradient-to-r from-blue-500 to-indigo-500 border-none hover:opacity-90"
                                        leftIcon={<LogIn className="w-4 h-4" />}
                                    >
                                        Get Started
                                    </Button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
