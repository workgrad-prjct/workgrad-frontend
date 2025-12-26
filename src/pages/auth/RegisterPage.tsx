import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Mail,
    Lock,
    ArrowRight,
    GraduationCap,
    Building2,
    Users,
    CheckCircle,
} from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { cn } from '@/utils'
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

// Features by role
const roleFeatures = {
    learner: [
        'Build ATS-friendly resumes',
        'Apply to 10,000+ job opportunities',
        'Access skill development courses',
        'Get personalized job recommendations',
    ],
    employer: [
        'Post unlimited job listings',
        'Access verified talent pool',
        'Conduct campus hiring drives',
        'Advanced analytics & reporting',
    ],
    mentor: [
        'Create and sell courses',
        'Earn up to 97% revenue share',
        'Access teaching tools & resources',
        'Build your mentor profile',
    ],
}

const roleInfo = {
    learner: {
        icon: GraduationCap,
        title: 'Learner',
        description: 'Students, graduates, job seekers',
        color: 'primary',
    },
    employer: {
        icon: Building2,
        title: 'Employer',
        description: 'Companies, recruiters, HR teams',
        color: 'secondary',
    },
    mentor: {
        icon: Users,
        title: 'Mentor',
        description: 'Educators, trainers, experts',
        color: 'accent',
    },
}

type UserRole = 'learner' | 'employer' | 'mentor'

export function RegisterPage() {
    const navigate = useNavigate()
    const { register } = useAuth()

    // Default to learner, can be changed
    const [selectedRole, setSelectedRole] = useState<UserRole>('learner')

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match')
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

            // Navigate to dashboard based on role
            if (selectedRole === 'learner') navigate('/dashboard')
            else if (selectedRole === 'employer') navigate('/employer')
            else if (selectedRole === 'mentor') navigate('/mentor')

        } catch (error: any) {
            toast.error(error.message || 'Failed to create account')
        } finally {
            setIsLoading(false)
        }
    }

    const currentRoleInfo = roleInfo[selectedRole]
    const currentFeatures = roleFeatures[selectedRole]

    return (
        <div className="min-h-screen bg-neutral-50 flex">
            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="w-full max-w-md"
                >
                    {/* Logo */}
                    <motion.div variants={fadeInUp} className="mb-8">
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
                            Create your account
                        </h1>
                        <p className="mt-2 text-neutral-500">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                                Sign in
                            </Link>
                        </p>
                    </motion.div>

                    {/* Role Selection */}
                    <motion.div variants={fadeInUp} className="mb-6">
                        <label className="block text-sm font-medium text-neutral-700 mb-3">
                            I want to join as
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {(Object.keys(roleInfo) as UserRole[]).map((role) => {
                                const info = roleInfo[role]
                                const isSelected = selectedRole === role
                                return (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => setSelectedRole(role)}
                                        className={cn(
                                            'relative p-4 rounded-xl border-2 transition-all text-center',
                                            isSelected
                                                ? 'border-primary-500 bg-primary-50'
                                                : 'border-neutral-200 hover:border-neutral-300 bg-white'
                                        )}
                                    >
                                        {isSelected && (
                                            <div className="absolute top-2 right-2">
                                                <CheckCircle className="w-4 h-4 text-primary-600" />
                                            </div>
                                        )}
                                        <info.icon
                                            className={cn(
                                                'w-6 h-6 mx-auto mb-2',
                                                isSelected ? 'text-primary-600' : 'text-neutral-400'
                                            )}
                                        />
                                        <p
                                            className={cn(
                                                'text-sm font-medium',
                                                isSelected ? 'text-primary-900' : 'text-neutral-700'
                                            )}
                                        >
                                            {info.title}
                                        </p>
                                    </button>
                                )
                            })}
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                name="firstName"
                                label="First Name"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name="lastName"
                                label="Last Name"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

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
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={handleChange}
                            leftIcon={<Lock className="w-5 h-5" />}
                            showPasswordToggle
                            hint="Must be at least 8 characters"
                            required
                        />

                        {/* Confirm Password */}
                        <Input
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            leftIcon={<Lock className="w-5 h-5" />}
                            showPasswordToggle
                            error={
                                formData.confirmPassword &&
                                    formData.password !== formData.confirmPassword
                                    ? 'Passwords do not match'
                                    : undefined
                            }
                            required
                        />

                        {/* Terms */}
                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="terms"
                                required
                                className="mt-1 w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                            />
                            <label htmlFor="terms" className="text-sm text-neutral-600">
                                I agree to the{' '}
                                <Link to="/terms" className="text-primary-600 hover:underline">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link to="/privacy" className="text-primary-600 hover:underline">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            fullWidth
                            size="lg"
                            isLoading={isLoading}
                            rightIcon={<ArrowRight className="w-5 h-5" />}
                        >
                            Create Account
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
                </motion.div>
            </div>

            {/* Right Side - Features (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-dark relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-20 right-20 w-64 h-64 bg-primary-500/20 rounded-full blur-[80px]" />
                <div className="absolute bottom-20 left-20 w-64 h-64 bg-secondary-500/20 rounded-full blur-[80px]" />

                <div className="relative flex items-center justify-center p-12 w-full">
                    <div className="max-w-md">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-6">
                                <currentRoleInfo.icon className="w-5 h-5 text-primary-400" />
                                <span className="text-white font-medium">{currentRoleInfo.title}</span>
                            </div>

                            <h2 className="text-3xl font-display font-bold text-white mb-4">
                                {selectedRole === 'learner' && 'Launch Your Dream Career'}
                                {selectedRole === 'employer' && 'Hire Top Talent Fast'}
                                {selectedRole === 'mentor' && 'Share Your Expertise'}
                            </h2>

                            <p className="text-neutral-300 mb-8">
                                {currentRoleInfo.description}
                            </p>

                            <ul className="space-y-4">
                                {currentFeatures.map((feature, index) => (
                                    <motion.li
                                        key={feature}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        className="flex items-center gap-3 text-white"
                                    >
                                        <div className="w-6 h-6 bg-success-500/20 rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-success-400" />
                                        </div>
                                        {feature}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
