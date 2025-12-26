import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Menu,
    X,
    ChevronDown,
    GraduationCap,
    Building2,
    Users,
    LogIn,
    UserPlus,
} from 'lucide-react'
import { Button } from '@/components/ui'
import { cn } from '@/utils'

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Courses', href: '/courses' },
    { name: 'For Employers', href: '/employers' },
    { name: 'For Mentors', href: '/mentors' },
]

const registerOptions = [
    {
        name: 'As a Learner',
        description: 'Find jobs, build resume, learn skills',
        href: '/register?role=learner',
        icon: GraduationCap,
    },
    {
        name: 'As an Employer',
        description: 'Hire top talent, campus recruitment',
        href: '/register?role=employer',
        icon: Building2,
    },
    {
        name: 'As a Mentor',
        description: 'Create courses, earn revenue',
        href: '/register?role=mentor',
        icon: Users,
    },
]

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isRegisterDropdownOpen, setIsRegisterDropdownOpen] = useState(false)
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
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-glow-sm">
                            <span className="text-white font-bold text-xl">W</span>
                        </div>
                        <span className="font-display font-bold text-xl text-neutral-900">
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
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/login')}
                            leftIcon={<LogIn className="w-4 h-4" />}
                        >
                            Sign In
                        </Button>

                        {/* Register Dropdown */}
                        <div className="relative">
                            <Button
                                variant="primary"
                                onClick={() => setIsRegisterDropdownOpen(!isRegisterDropdownOpen)}
                                rightIcon={
                                    <ChevronDown
                                        className={cn(
                                            'w-4 h-4 transition-transform',
                                            isRegisterDropdownOpen && 'rotate-180'
                                        )}
                                    />
                                }
                            >
                                Get Started
                            </Button>

                            <AnimatePresence>
                                {isRegisterDropdownOpen && (
                                    <>
                                        {/* Overlay */}
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setIsRegisterDropdownOpen(false)}
                                        />

                                        {/* Dropdown */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-premium border border-neutral-100 overflow-hidden z-20"
                                        >
                                            <div className="p-2">
                                                {registerOptions.map((option) => (
                                                    <Link
                                                        key={option.name}
                                                        to={option.href}
                                                        onClick={() => setIsRegisterDropdownOpen(false)}
                                                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors group"
                                                    >
                                                        <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors">
                                                            <option.icon className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-neutral-900">
                                                                {option.name}
                                                            </div>
                                                            <div className="text-sm text-neutral-500">
                                                                {option.description}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
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
                                <Button
                                    variant="secondary"
                                    fullWidth
                                    onClick={() => navigate('/login')}
                                    leftIcon={<LogIn className="w-4 h-4" />}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    variant="primary"
                                    fullWidth
                                    onClick={() => navigate('/register')}
                                    leftIcon={<UserPlus className="w-4 h-4" />}
                                >
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
