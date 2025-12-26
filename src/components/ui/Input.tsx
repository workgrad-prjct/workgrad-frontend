import { forwardRef, InputHTMLAttributes, useState } from 'react'
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react'
import { cn } from '@/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    success?: string
    hint?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    showPasswordToggle?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            success,
            hint,
            leftIcon,
            rightIcon,
            showPasswordToggle,
            type = 'text',
            className,
            disabled,
            ...props
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false)
        const inputType = showPasswordToggle && type === 'password'
            ? (showPassword ? 'text' : 'password')
            : type

        const hasError = !!error
        const hasSuccess = !!success && !hasError

        return (
            <div className="w-full">
                {/* Label */}
                {label && (
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {label}
                    </label>
                )}

                {/* Input Container */}
                <div className="relative">
                    {/* Left Icon */}
                    {leftIcon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                            {leftIcon}
                        </div>
                    )}

                    {/* Input Field */}
                    <input
                        ref={ref}
                        type={inputType}
                        disabled={disabled}
                        className={cn(
                            'w-full px-4 py-3 bg-white border rounded-xl',
                            'text-neutral-900 placeholder:text-neutral-400',
                            'transition-all duration-300',
                            'focus:outline-none focus:ring-2 focus:ring-offset-0',
                            // Normal state
                            !hasError && !hasSuccess && 'border-neutral-200 focus:border-primary-500 focus:ring-primary-500/20',
                            // Error state
                            hasError && 'border-error-500 focus:border-error-500 focus:ring-error-500/20 pr-10',
                            // Success state
                            hasSuccess && 'border-success-500 focus:border-success-500 focus:ring-success-500/20 pr-10',
                            // With icons
                            leftIcon && 'pl-11',
                            (rightIcon || showPasswordToggle) && 'pr-11',
                            // Disabled state
                            disabled && 'bg-neutral-100 cursor-not-allowed opacity-60',
                            className
                        )}
                        {...props}
                    />

                    {/* Right Icon / Password Toggle / Status Icon */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        {hasError && (
                            <AlertCircle className="w-5 h-5 text-error-500" />
                        )}
                        {hasSuccess && (
                            <Check className="w-5 h-5 text-success-500" />
                        )}
                        {showPasswordToggle && type === 'password' && (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-neutral-400 hover:text-neutral-600 transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        )}
                        {rightIcon && !hasError && !hasSuccess && rightIcon}
                    </div>
                </div>

                {/* Helper Text */}
                {(error || success || hint) && (
                    <p
                        className={cn(
                            'mt-2 text-sm',
                            hasError && 'text-error-600',
                            hasSuccess && 'text-success-600',
                            !hasError && !hasSuccess && 'text-neutral-500'
                        )}
                    >
                        {error || success || hint}
                    </p>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'

export { Input }
export type { InputProps }
