import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, User, ArrowRight, Eye, EyeOff, GraduationCap, Users } from 'lucide-react'
import { cn } from '@/utils'
import { useAuth } from '@/context'
import { toast } from 'react-hot-toast'

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    },
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
}

type UserRole = 'learner' | 'mentor'

const roleOptions = [
    {
        id: 'learner' as UserRole,
        icon: GraduationCap,
        title: 'Learner',
        description: 'I want to learn skills',
    },
    {
        id: 'mentor' as UserRole,
        icon: Users,
        title: 'Mentor',
        description: 'I want to teach',
    },
]

export function RegisterPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { register } = useAuth()

    // Get role from URL params or default to learner
    const initialRole = (searchParams.get('role') as UserRole) || 'learner'
    const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.password.length < 8) {
            toast.error('Password must be at least 8 characters')
            return
        }

        setIsLoading(true)

        try {
            await register({
                email: formData.email,
                password: formData.password,
                role: selectedRole,
                firstName: formData.firstName,
                lastName: formData.lastName
            })

            toast.success('Account created successfully!')

            if (selectedRole === 'learner') navigate('/dashboard')
            else if (selectedRole === 'mentor') navigate('/mentor')

        } catch (error: any) {
            toast.error(error.message || 'Failed to create account')
        } finally {
            setIsLoading(false)
        }
    }

    // Password strength indicator
    const getPasswordStrength = () => {
        const password = formData.password
        if (!password) return { strength: 0, label: '', color: '' }

        let strength = 0
        if (password.length >= 8) strength++
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++
        if (password.match(/[0-9]/)) strength++
        if (password.match(/[^a-zA-Z0-9]/)) strength++

        const levels = [
            { label: 'Weak', color: 'bg-red-500' },
            { label: 'Fair', color: 'bg-orange-500' },
            { label: 'Good', color: 'bg-yellow-500' },
            { label: 'Strong', color: 'bg-green-500' },
        ]

        return { strength, ...levels[Math.min(strength - 1, 3)] || { label: '', color: '' } }
    }

    const passwordStrength = getPasswordStrength()

    return (
        <div className="h-screen bg-white flex flex-col overflow-hidden">
            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-6">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="w-full max-w-[480px] bg-white border border-neutral-100 rounded-3xl p-10 shadow-xl shadow-neutral-200/50"
                >
                    {/* Logo */}
                    <motion.div variants={fadeIn} className="text-center mb-4">
                        <Link to="/" className="inline-flex items-center">
                            <span className="font-display font-bold text-3xl text-neutral-900">
                                Work<span className="text-blue-600">Grad</span>
                            </span>
                        </Link>
                    </motion.div>

                    {/* Role Selection */}
                    <motion.div variants={fadeIn} className="mb-4">
                        <div className="grid grid-cols-2 gap-3">
                            {roleOptions.map((role) => {
                                const isSelected = selectedRole === role.id
                                return (
                                    <button
                                        key={role.id}
                                        type="button"
                                        onClick={() => setSelectedRole(role.id)}
                                        className={cn(
                                            'relative p-3 rounded-xl border-2 transition-all text-left group',
                                            isSelected
                                                ? 'border-blue-500 bg-blue-50/50'
                                                : 'border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50'
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <role.icon
                                                className={cn(
                                                    'w-5 h-5 transition-colors',
                                                    isSelected ? 'text-blue-600' : 'text-neutral-400 group-hover:text-neutral-500'
                                                )}
                                            />
                                            <p className={cn(
                                                'font-semibold text-sm transition-colors',
                                                isSelected ? 'text-blue-900' : 'text-neutral-700'
                                            )}>
                                                {role.title}
                                            </p>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.form variants={fadeIn} onSubmit={handleSubmit} className="space-y-3">
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="block text-xs font-medium text-neutral-700">
                                    First name
                                </label>
                                <div className={`relative transition-all duration-200 ${focusedField === 'firstName' ? 'scale-[1.01]' : ''}`}>
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className={`w-3.5 h-3.5 transition-colors ${focusedField === 'firstName' ? 'text-blue-500' : 'text-neutral-400'}`} />
                                    </div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('firstName')}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="John"
                                        className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-xs"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="block text-xs font-medium text-neutral-700">
                                    Last name
                                </label>
                                <div className={`relative transition-all duration-200 ${focusedField === 'lastName' ? 'scale-[1.01]' : ''}`}>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('lastName')}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="Doe"
                                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-xs"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-1">
                            <label className="block text-xs font-medium text-neutral-700">
                                Email address
                            </label>
                            <div className={`relative transition-all duration-200 ${focusedField === 'email' ? 'scale-[1.01]' : ''}`}>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className={`w-4 h-4 transition-colors ${focusedField === 'email' ? 'text-blue-500' : 'text-neutral-400'}`} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="name@example.com"
                                    className="w-full pl-10 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-xs"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1">
                            <label className="block text-xs font-medium text-neutral-700">
                                Password
                            </label>
                            <div className={`relative transition-all duration-200 ${focusedField === 'password' ? 'scale-[1.01]' : ''}`}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Create a strong password"
                                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-xs"
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Password Strength Indicator */}
                        {formData.password && (
                            <div className="flex items-center gap-2">
                                <div className="flex-1 h-1 bg-neutral-100 rounded-full overflow-hidden">
                                    <div
                                        className={cn('h-full transition-all duration-300', passwordStrength.color)}
                                        style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                                    />
                                </div>
                                <span className="text-[10px] font-medium text-neutral-500 uppercase">{passwordStrength.label}</span>
                            </div>
                        )}

                        {/* Terms Checkbox */}
                        <div className="flex items-start gap-2 pt-1">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                required
                                className="mt-0.5 w-3.5 h-3.5 text-blue-600 border-neutral-300 rounded focus:ring-blue-500 cursor-pointer"
                            />
                            <label htmlFor="terms" className="text-[11px] text-neutral-600 cursor-pointer leading-tight">
                                Agree to <Link to="/terms" className="text-blue-600 font-medium">Terms</Link> & <Link to="/privacy" className="text-blue-600 font-medium">Privacy</Link>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading || !agreedToTerms}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create account
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </motion.button>
                    </motion.form>

                    {/* Divider */}
                    <div className="my-4">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-neutral-200" />
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase tracking-wider font-semibold">
                                <span className="px-3 bg-white text-neutral-400">or continue with</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200">
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-xs font-medium text-neutral-700">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200">
                            <svg className="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            <span className="text-xs font-medium text-neutral-700">LinkedIn</span>
                        </button>
                    </div>

                    {/* Sign In Link */}
                    <div className="mt-4 text-center">
                        <p className="text-xs text-neutral-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
