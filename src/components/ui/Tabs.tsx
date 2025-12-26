import { createContext, useContext, useState, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils'

// Context for Tabs
interface TabsContextValue {
    value: string
    onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

const useTabsContext = () => {
    const context = useContext(TabsContext)
    if (!context) {
        throw new Error('Tabs components must be used within a Tabs provider')
    }
    return context
}

// Tabs Root
interface TabsProps {
    defaultValue: string
    value?: string
    onValueChange?: (value: string) => void
    children: ReactNode
    className?: string
}

export function Tabs({
    defaultValue,
    value: controlledValue,
    onValueChange,
    children,
    className,
}: TabsProps) {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const value = controlledValue ?? internalValue
    const handleValueChange = onValueChange ?? setInternalValue

    return (
        <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
            <div className={cn('w-full', className)}>{children}</div>
        </TabsContext.Provider>
    )
}

// Tabs List
interface TabsListProps {
    children: ReactNode
    className?: string
}

export function TabsList({ children, className }: TabsListProps) {
    return (
        <div
            className={cn(
                'inline-flex items-center gap-1 p-1 bg-neutral-100 rounded-xl',
                className
            )}
            role="tablist"
        >
            {children}
        </div>
    )
}

// Tabs Trigger
interface TabsTriggerProps {
    value: string
    children: ReactNode
    className?: string
    disabled?: boolean
}

export function TabsTrigger({
    value,
    children,
    className,
    disabled = false,
}: TabsTriggerProps) {
    const { value: selectedValue, onValueChange } = useTabsContext()
    const isSelected = selectedValue === value

    return (
        <button
            role="tab"
            aria-selected={isSelected}
            disabled={disabled}
            onClick={() => onValueChange(value)}
            className={cn(
                'relative px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                isSelected
                    ? 'text-primary-700'
                    : 'text-neutral-600 hover:text-neutral-900',
                disabled && 'opacity-50 cursor-not-allowed',
                className
            )}
        >
            {isSelected && (
                <motion.div
                    layoutId="tabs-indicator"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
            )}
            <span className="relative z-10">{children}</span>
        </button>
    )
}

// Tabs Content
interface TabsContentProps {
    value: string
    children: ReactNode
    className?: string
}

export function TabsContent({ value, children, className }: TabsContentProps) {
    const { value: selectedValue } = useTabsContext()

    if (value !== selectedValue) return null

    return (
        <motion.div
            role="tabpanel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn('mt-4', className)}
        >
            {children}
        </motion.div>
    )
}
