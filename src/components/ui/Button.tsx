import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: ButtonVariant
    size?: ButtonSize
    isLoading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: `
    bg-gradient-to-r from-blue-500 to-indigo-500
    text-white shadow-glow-sm
    hover:opacity-90
    active:shadow-none
  `,
    secondary: `
    bg-white text-primary-600 border-2 border-primary-200
    hover:bg-primary-50 hover:border-primary-400
    active:bg-primary-100
  `,
    ghost: `
    bg-transparent text-neutral-600
    hover:bg-neutral-100 hover:text-neutral-900
    active:bg-neutral-200
  `,
    danger: `
    bg-gradient-to-r from-error-500 to-error-600
    text-white shadow-sm
    hover:from-error-600 hover:to-error-700
    active:shadow-none
  `,
    success: `
    bg-gradient-to-r from-success-500 to-success-600
    text-white shadow-sm
    hover:from-success-600 hover:to-success-700
    active:shadow-none
  `,
    outline: `
    bg-transparent text-neutral-700 border-2 border-neutral-300
    hover:bg-neutral-50 hover:border-neutral-400
    active:bg-neutral-100
  `,
}

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
    xl: 'px-8 py-4 text-lg gap-3',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            fullWidth = false,
            className,
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <motion.button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    'relative inline-flex items-center justify-center font-semibold',
                    'rounded-xl transition-all duration-300',
                    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                    variantStyles[variant],
                    sizeStyles[size],
                    fullWidth && 'w-full',
                    className
                )}
                whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
                whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
                {...props}
            >
                {/* Shimmer effect on hover */}
                <span className="absolute inset-0 rounded-xl overflow-hidden">
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </span>
                </span>

                {/* Content */}
                <span className="relative inline-flex items-center justify-center gap-2">
                    {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        leftIcon as any
                    )}
                    {children as any}
                    {!isLoading && (rightIcon as any)}
                </span>
            </motion.button>
        )
    }
)

Button.displayName = 'Button'

export { Button }
export type { ButtonProps, ButtonVariant, ButtonSize }
