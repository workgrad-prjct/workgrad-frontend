import { forwardRef, SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils'

interface SelectOption {
    value: string
    label: string
    disabled?: boolean
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
    label?: string
    error?: string
    hint?: string
    options: SelectOption[]
    placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, hint, options, placeholder, className, disabled, ...props }, ref) => {
        const hasError = !!error

        return (
            <div className="w-full">
                {/* Label */}
                {label && (
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {label}
                    </label>
                )}

                {/* Select Container */}
                <div className="relative">
                    <select
                        ref={ref}
                        disabled={disabled}
                        className={cn(
                            'w-full px-4 py-3 bg-white border rounded-xl appearance-none',
                            'text-neutral-900 cursor-pointer',
                            'transition-all duration-300',
                            'focus:outline-none focus:ring-2 focus:ring-offset-0',
                            // Normal state
                            !hasError && 'border-neutral-200 focus:border-primary-500 focus:ring-primary-500/20',
                            // Error state
                            hasError && 'border-error-500 focus:border-error-500 focus:ring-error-500/20',
                            // Disabled state
                            disabled && 'bg-neutral-100 cursor-not-allowed opacity-60',
                            className
                        )}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>

                    {/* Dropdown Icon */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-neutral-400" />
                    </div>
                </div>

                {/* Helper Text */}
                {(error || hint) && (
                    <p
                        className={cn(
                            'mt-2 text-sm',
                            hasError ? 'text-error-600' : 'text-neutral-500'
                        )}
                    >
                        {error || hint}
                    </p>
                )}
            </div>
        )
    }
)

Select.displayName = 'Select'

export { Select }
export type { SelectProps, SelectOption }
