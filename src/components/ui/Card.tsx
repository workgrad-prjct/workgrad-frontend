import { forwardRef, HTMLAttributes } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils'

interface CardProps extends HTMLMotionProps<"div"> {
    variant?: 'default' | 'glass' | 'elevated' | 'bordered' | 'gradient'
    hover?: boolean
    padding?: 'none' | 'sm' | 'md' | 'lg'
    animate?: boolean
}

const variantStyles = {
    default: 'bg-white border border-neutral-200',
    glass: 'bg-white/80 backdrop-blur-xl border border-white/20 shadow-glass',
    elevated: 'bg-white shadow-card',
    bordered: 'bg-white border-2 border-neutral-200',
    gradient: 'bg-gradient-to-br from-white to-neutral-50 border border-neutral-200',
}

const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            variant = 'default',
            hover = false,
            padding = 'md',
            animate = true,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const animationProps = animate ? {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, ease: 'easeOut' },
            whileHover: hover ? { y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' } : undefined,
        } : {}

        return (
            <motion.div
                ref={ref}
                className={cn(
                    'rounded-2xl transition-all duration-300',
                    variantStyles[variant],
                    paddingStyles[padding],
                    hover && 'hover:shadow-card-hover hover:-translate-y-1 cursor-pointer',
                    className
                )}
                {...animationProps}
                {...props}
            >
                {children}
            </motion.div>
        )
    }
)

Card.displayName = 'Card'

// Card Header
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> { }

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex flex-col space-y-1.5', className)}
            {...props}
        />
    )
)
CardHeader.displayName = 'CardHeader'

// Card Title
interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> { }

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn('font-display text-xl font-semibold text-neutral-900', className)}
            {...props}
        />
    )
)
CardTitle.displayName = 'CardTitle'

// Card Description
interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> { }

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
    ({ className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn('text-sm text-neutral-500', className)}
            {...props}
        />
    )
)
CardDescription.displayName = 'CardDescription'

// Card Content
interface CardContentProps extends HTMLAttributes<HTMLDivElement> { }

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('', className)} {...props} />
    )
)
CardContent.displayName = 'CardContent'

// Card Footer
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> { }

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex items-center pt-4', className)}
            {...props}
        />
    )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
export type { CardProps }
