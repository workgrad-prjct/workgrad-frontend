import { HTMLAttributes, forwardRef } from 'react'
import { cn, getInitials } from '@/utils'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    src?: string
    alt?: string
    name?: string
    size?: AvatarSize
    status?: 'online' | 'offline' | 'away' | 'busy'
}

const sizeStyles: Record<AvatarSize, string> = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
    '2xl': 'w-20 h-20 text-xl',
}

const statusColors = {
    online: 'bg-success-500',
    offline: 'bg-neutral-400',
    away: 'bg-warning-500',
    busy: 'bg-error-500',
}

const statusSizes: Record<AvatarSize, string> = {
    xs: 'w-1.5 h-1.5 -right-0 -bottom-0',
    sm: 'w-2 h-2 right-0 bottom-0',
    md: 'w-2.5 h-2.5 right-0 bottom-0',
    lg: 'w-3 h-3 right-0.5 bottom-0.5',
    xl: 'w-3.5 h-3.5 right-0.5 bottom-0.5',
    '2xl': 'w-4 h-4 right-1 bottom-1',
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
    ({ src, alt, name, size = 'md', status, className, ...props }, ref) => {
        const initials = name ? getInitials(name) : '?'

        return (
            <div
                ref={ref}
                className={cn('relative inline-flex', className)}
                {...props}
            >
                {src ? (
                    <img
                        src={src}
                        alt={alt || name || 'Avatar'}
                        className={cn(
                            'rounded-full object-cover ring-2 ring-white',
                            sizeStyles[size]
                        )}
                    />
                ) : (
                    <div
                        className={cn(
                            'rounded-full flex items-center justify-center',
                            'bg-gradient-to-br from-primary-400 to-primary-600',
                            'text-white font-semibold ring-2 ring-white',
                            sizeStyles[size]
                        )}
                    >
                        {initials}
                    </div>
                )}

                {/* Status indicator */}
                {status && (
                    <span
                        className={cn(
                            'absolute rounded-full ring-2 ring-white',
                            statusColors[status],
                            statusSizes[size]
                        )}
                    />
                )}
            </div>
        )
    }
)

Avatar.displayName = 'Avatar'

// Avatar Group
interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
    max?: number
    size?: AvatarSize
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
    ({ max = 4, size = 'md', className, children, ...props }, ref) => {
        const avatars = Array.isArray(children) ? children : [children]
        const visibleAvatars = avatars.slice(0, max)
        const remainingCount = avatars.length - max

        return (
            <div
                ref={ref}
                className={cn('flex -space-x-2', className)}
                {...props}
            >
                {visibleAvatars}
                {remainingCount > 0 && (
                    <div
                        className={cn(
                            'rounded-full flex items-center justify-center',
                            'bg-neutral-200 text-neutral-600 font-medium ring-2 ring-white',
                            sizeStyles[size]
                        )}
                    >
                        +{remainingCount}
                    </div>
                )}
            </div>
        )
    }
)

AvatarGroup.displayName = 'AvatarGroup'

export { Avatar, AvatarGroup }
export type { AvatarProps, AvatarGroupProps, AvatarSize }
