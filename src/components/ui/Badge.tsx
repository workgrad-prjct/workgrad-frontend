import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils'

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'
type BadgeSize = 'sm' | 'md' | 'lg'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant
    size?: BadgeSize
    dot?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-neutral-100 text-neutral-700',
    primary: 'bg-primary-100 text-primary-700',
    secondary: 'bg-secondary-100 text-secondary-700',
    success: 'bg-success-100 text-success-700',
    warning: 'bg-warning-100 text-warning-700',
    error: 'bg-error-100 text-error-700',
    outline: 'bg-transparent border border-neutral-300 text-neutral-600',
}

const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1 text-sm',
}

const dotColors: Record<BadgeVariant, string> = {
    default: 'bg-neutral-500',
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
    outline: 'bg-neutral-500',
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ variant = 'default', size = 'md', dot = false, className, children, ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={cn(
                    'inline-flex items-center gap-1.5 font-medium rounded-full',
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                {...props}
            >
                {dot && (
                    <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />
                )}
                {children}
            </span>
        )
    }
)

Badge.displayName = 'Badge'

export { Badge }
export type { BadgeProps, BadgeVariant, BadgeSize }
