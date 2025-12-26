import { ReactNode, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, Bell, Search, ChevronDown } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { Avatar, Badge, Button } from '@/components/ui'
import { cn } from '@/utils'

type UserRole = 'learner' | 'employer' | 'mentor' | 'admin'

interface DashboardLayoutProps {
    children: ReactNode
    role: UserRole
    userName: string
    userEmail: string
    userAvatar?: string
    pageTitle?: string
    pageDescription?: string
    actions?: ReactNode
}

export function DashboardLayout({
    children,
    role,
    userName,
    userEmail,
    userAvatar,
    pageTitle,
    pageDescription,
    actions,
}: DashboardLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [notifications] = useState(3) // Example notification count

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Sidebar */}
            <Sidebar
                role={role}
                userName={userName}
                userEmail={userEmail}
                userAvatar={userAvatar}
            />

            {/* Main Content */}
            <div
                className={cn(
                    'transition-all duration-300',
                    isSidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-20'
                )}
            >
                {/* Top Header Bar */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-neutral-100">
                    <div className="flex items-center justify-between h-16 px-4 lg:px-8">
                        {/* Left Side - Mobile Menu & Search */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="lg:hidden p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                            >
                                <Menu className="w-5 h-5" />
                            </button>

                            {/* Desktop Search */}
                            <div className="hidden md:block relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                <input
                                    type="text"
                                    placeholder="Search anything..."
                                    className="w-80 pl-10 pr-4 py-2 text-sm bg-neutral-100 border-0 rounded-xl
                             placeholder:text-neutral-400 focus:bg-white focus:ring-2 focus:ring-primary-500/20 transition-all"
                                />
                            </div>
                        </div>

                        {/* Right Side - Notifications & Profile */}
                        <div className="flex items-center gap-3">
                            {/* Notifications */}
                            <button className="relative p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors">
                                <Bell className="w-5 h-5" />
                                {notifications > 0 && (
                                    <span className="absolute top-1 right-1 w-4 h-4 bg-error-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                        {notifications}
                                    </span>
                                )}
                            </button>

                            {/* User Menu */}
                            <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-neutral-200">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-neutral-900">{userName}</p>
                                    <p className="text-xs text-neutral-500 capitalize">{role}</p>
                                </div>
                                <Avatar
                                    src={userAvatar}
                                    name={userName}
                                    size="md"
                                    status="online"
                                />
                                <ChevronDown className="w-4 h-4 text-neutral-400" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Header */}
                {(pageTitle || actions) && (
                    <div className="bg-white border-b border-neutral-100">
                        <div className="px-4 lg:px-8 py-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    {pageTitle && (
                                        <h1 className="text-2xl font-display font-bold text-neutral-900">
                                            {pageTitle}
                                        </h1>
                                    )}
                                    {pageDescription && (
                                        <p className="mt-1 text-sm text-neutral-500">
                                            {pageDescription}
                                        </p>
                                    )}
                                </div>
                                {actions && <div className="flex items-center gap-3">{actions}</div>}
                            </div>
                        </div>
                    </div>
                )}

                {/* Page Content */}
                <main className="p-4 lg:p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    )
}
