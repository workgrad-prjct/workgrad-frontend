import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils'

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
    value: number
    max?: number
    size?: 'sm' | 'md' | 'lg'
    variant?: 'default' | 'success' | 'warning' | 'error' | 'gradient'
    showValue?: boolean
    animated?: boolean
}

const sizeStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
}

const variantStyles = {
    default: 'bg-primary-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
    gradient: 'bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500',
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
    (
        {
            value,
            max = 100,
            size = 'md',
            variant = 'default',
            showValue = false,
            animated = true,
            className,
            ...props
        },
        ref
    ) => {
        const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

        return (
            <div ref={ref} className={cn('w-full', className)} {...props}>
                {showValue && (
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-neutral-700">Progress</span>
                        <span className="text-sm font-semibold text-primary-600">
                            {Math.round(percentage)}%
                        </span>
                    </div>
                )}
                <div
                    className={cn(
                        'w-full bg-neutral-200 rounded-full overflow-hidden',
                        sizeStyles[size]
                    )}
                >
                    <div
                        className={cn(
                            'h-full rounded-full transition-all duration-500 ease-out',
                            variantStyles[variant],
                            animated && 'relative overflow-hidden'
                        )}
                        style={{ width: `${percentage}%` }}
                    >
                        {animated && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        )}
                    </div>
                </div>
            </div>
        )
    }
)

Progress.displayName = 'Progress'

export { Progress }
export type { ProgressProps }
