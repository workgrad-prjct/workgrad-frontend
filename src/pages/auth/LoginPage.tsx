import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'
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

export function LoginPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const from = location.state?.from?.pathname || '/dashboard'

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await login({
                email: formData.email,
                password: formData.password
            })
            toast.success('Welcome back!')
            navigate(from, { replace: true })
        } catch (error: any) {
            toast.error(error.message || 'Invalid email or password')
        } finally {
            setIsLoading(false)
        }
    }

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
                    <motion.div variants={fadeIn} className="text-center mb-6">
                        <Link to="/" className="inline-flex items-center">
                            <span className="font-display font-bold text-3xl text-neutral-900">
                                Work<span className="text-blue-600">Grad</span>
                            </span>
                        </Link>
                    </motion.div>

                    {/* Subheading */}
                    <motion.p variants={fadeIn} className="text-center text-neutral-500 mb-6">
                        Sign in to continue to your account
                    </motion.p>

                    {/* Form */}
                    <motion.form variants={fadeIn} onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-neutral-700">
                                Email address
                            </label>
                            <div className={`relative transition-all duration-200 ${focusedField === 'email' ? 'scale-[1.01]' : ''}`}>
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className={`w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-blue-500' : 'text-neutral-400'}`} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="name@example.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-neutral-700">
                                    Password
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className={`relative transition-all duration-200 ${focusedField === 'password' ? 'scale-[1.01]' : ''}`}>
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className={`w-5 h-5 transition-colors ${focusedField === 'password' ? 'text-blue-500' : 'text-neutral-400'}`} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Enter your password"
                                    className="w-full pl-12 pr-12 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </motion.button>
                    </motion.form>

                    {/* Divider */}
                    <motion.div variants={fadeIn} className="my-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-neutral-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-neutral-500">or continue with</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Social Login */}
                    <motion.div variants={fadeIn} className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2.5 py-3 px-4 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-sm font-medium text-neutral-700">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2.5 py-3 px-4 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200">
                            <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            <span className="text-sm font-medium text-neutral-700">LinkedIn</span>
                        </button>
                    </motion.div>

                    {/* Sign Up Link */}
                    <motion.p variants={fadeIn} className="mt-8 text-center text-neutral-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                            Create one
                        </Link>
                    </motion.p>
                </motion.div>
            </div>
        </div>
    )
}
