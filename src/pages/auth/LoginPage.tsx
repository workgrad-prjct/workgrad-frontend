import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { useAuth } from '@/context'
import { toast } from 'react-hot-toast'

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
}

export function LoginPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    })
    const [isLoading, setIsLoading] = useState(false)

    // Redirect if already logged in or after successful login
    const from = location.state?.from?.pathname || '/dashboard'

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        })
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
            toast.error(error.message || 'Failed to login')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-neutral-50 flex">
            {/* Login Form - Centered */}
            <div className="flex-1 flex items-center justify-center p-8">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="w-full max-w-md"
                >
                    {/* Mobile Logo */}
                    <motion.div variants={fadeInUp} className="lg:hidden mb-8">
                        <Link to="/" className="inline-flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-glow-sm">
                                <span className="text-white font-bold text-xl">W</span>
                            </div>
                            <span className="font-display font-bold text-xl text-neutral-900">
                                Work<span className="text-primary-600">Grad</span>
                            </span>
                        </Link>
                    </motion.div>

                    {/* Heading */}
                    <motion.div variants={fadeInUp} className="mb-8">
                        <h1 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900">
                            Sign in to your account
                        </h1>
                        <p className="mt-2 text-neutral-500">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                                Create one
                            </Link>
                        </p>
                    </motion.div>

                    {/* Form */}
                    <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <Input
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            leftIcon={<Mail className="w-5 h-5" />}
                            required
                        />

                        {/* Password */}
                        <Input
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            leftIcon={<Lock className="w-5 h-5" />}
                            showPasswordToggle
                            required
                        />

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                                />
                                <span className="text-sm text-neutral-600">Remember me</span>
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            fullWidth
                            size="lg"
                            isLoading={isLoading}
                            rightIcon={<ArrowRight className="w-5 h-5" />}
                        >
                            Sign In
                        </Button>
                    </motion.form>

                    {/* Divider */}
                    <motion.div variants={fadeInUp} className="my-6">
                        <div className="divider">or continue with</div>
                    </motion.div>

                    {/* Social Login */}
                    <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
                        <Button variant="outline" fullWidth className="gap-2">
                            <img
                                src="https://www.google.com/favicon.ico"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            Google
                        </Button>
                        <Button variant="outline" fullWidth className="gap-2">
                            <img
                                src="https://www.linkedin.com/favicon.ico"
                                alt="LinkedIn"
                                className="w-5 h-5"
                            />
                            LinkedIn
                        </Button>
                    </motion.div>

                    {/* Demo Accounts Info */}
                    <motion.div
                        variants={fadeInUp}
                        className="mt-8 p-4 bg-primary-50 border border-primary-200 rounded-xl"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-primary-600" />
                            <span className="text-sm font-medium text-primary-900">Demo Accounts</span>
                        </div>
                        <div className="text-xs text-primary-700 space-y-1">
                            <p><strong>Learner:</strong> learner@demo.com / demo123</p>
                            <p><strong>Employer:</strong> employer@demo.com / demo123</p>
                            <p><strong>Mentor:</strong> mentor@demo.com / demo123</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
