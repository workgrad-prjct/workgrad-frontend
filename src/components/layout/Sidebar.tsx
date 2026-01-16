import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/context'
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    GraduationCap,
    BookOpen,
    Users,
    Building2,
    Settings,
    HelpCircle,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Search,
    FileQuestion,
    FolderOpen,
    Layers,
} from 'lucide-react'
import { cn } from '@/utils'
import { Avatar, Badge } from '@/components/ui'

type UserRole = 'learner' | 'employer' | 'mentor' | 'admin'

interface SidebarProps {
    role: UserRole
    userName: string
    userEmail: string
    userAvatar?: string
}

interface NavigationItem {
    name: string
    href: string
    icon: any
    badge?: string
}

// Navigation items per role
const navigationByRole: Record<UserRole, NavigationItem[]> = {
    learner: [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Resume Builder', href: '/dashboard/resume', icon: FileText },
        { name: 'Portfolio', href: '/dashboard/portfolio', icon: GraduationCap },
        { name: 'Jobs', href: '/dashboard/jobs', icon: Briefcase, badge: '12 New' },
        { name: 'My Applications', href: '/dashboard/applications', icon: GraduationCap },
        { name: 'Courses', href: '/dashboard/courses', icon: BookOpen },
    ],
    employer: [
        { name: 'Dashboard', href: '/employer', icon: LayoutDashboard },
        { name: 'Post Job', href: '/employer/post-job', icon: Briefcase },
        { name: 'Manage Jobs', href: '/employer/jobs', icon: FileText },
        { name: 'Candidates', href: '/employer/candidates', icon: Users, badge: '5 New' },
        { name: 'Campus Hiring', href: '/employer/campus-hiring', icon: Building2 },
        { name: 'Analytics', href: '/employer/analytics', icon: LayoutDashboard },
    ],
    mentor: [
        { name: 'Dashboard', href: '/mentor', icon: LayoutDashboard },
        { name: 'Create Course', href: '/mentor/create-course', icon: BookOpen },
        { name: 'My Courses', href: '/mentor/courses', icon: FileText },
        { name: 'Create Quiz', href: '/mentor/create-quiz', icon: FileQuestion },
        { name: 'Resources', href: '/mentor/resources', icon: FolderOpen },
        { name: 'Students', href: '/mentor/students', icon: Users },
        { name: 'Earnings', href: '/mentor/earnings', icon: LayoutDashboard },
        { name: 'Reviews', href: '/mentor/reviews', icon: GraduationCap },
    ],
    admin: [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Jobs', href: '/admin/jobs', icon: Briefcase },
        { name: 'Courses', href: '/admin/courses', icon: BookOpen, badge: '3 Pending' },
        { name: 'Categories', href: '/admin/categories', icon: Layers },
        { name: 'Reports', href: '/admin/reports', icon: FileText },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ],
}

const bottomNavigation = [
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Help & Support', href: '/support', icon: HelpCircle },
]

export function Sidebar({ role, userName, userEmail, userAvatar }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const navigate = useNavigate()
    const { logout } = useAuth()
    const navigation = navigationByRole[role]

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <motion.aside
            animate={{ width: isCollapsed ? 80 : 280 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={cn(
                'fixed left-0 top-0 bottom-0 z-40',
                'bg-white border-r border-neutral-200',
                'flex flex-col'
            )}
        >
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-100">
                <AnimatePresence mode="wait">
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                        >
                            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">W</span>
                            </div>
                            <span className="font-display font-bold text-lg text-neutral-900">
                                Work<span className="text-primary-600">Grad</span>
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {isCollapsed && (
                    <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center mx-auto">
                        <span className="text-white font-bold text-lg">W</span>
                    </div>
                )}

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={cn(
                        'p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors',
                        isCollapsed && 'hidden lg:flex'
                    )}
                >
                    {isCollapsed ? (
                        <ChevronRight className="w-4 h-4" />
                    ) : (
                        <ChevronLeft className="w-4 h-4" />
                    )}
                </button>
            </div>

            {/* Search (when expanded) */}
            {!isCollapsed && (
                <div className="px-4 py-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-100 border-0 rounded-lg 
                         placeholder:text-neutral-400 focus:bg-white focus:ring-2 focus:ring-primary-500/20 transition-all"
                        />
                    </div>
                </div>
            )}

            {/* Main Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                            cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group',
                                isActive
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
                                isCollapsed && 'justify-center px-2'
                            )
                        }
                    >
                        <item.icon
                            className={cn('w-5 h-5 flex-shrink-0', isCollapsed && 'w-6 h-6')}
                        />
                        {!isCollapsed && (
                            <>
                                <span className="flex-1 font-medium text-sm">{item.name}</span>
                                {item.badge && (
                                    <Badge variant="primary" size="sm">
                                        {item.badge}
                                    </Badge>
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Navigation */}
            <div className="px-3 py-2 border-t border-neutral-100">
                {bottomNavigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                            cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all',
                                isActive
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900',
                                isCollapsed && 'justify-center px-2'
                            )
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        {!isCollapsed && (
                            <span className="font-medium text-sm">{item.name}</span>
                        )}
                    </NavLink>
                ))}
            </div>

            {/* User Profile */}
            <div className="p-3 border-t border-neutral-100">
                <div
                    className={cn(
                        'flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-50 cursor-pointer transition-all',
                        isCollapsed && 'justify-center'
                    )}
                >
                    <Avatar src={userAvatar} name={userName} size="md" status="online" />
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-neutral-900 truncate">
                                {userName}
                            </p>
                            <p className="text-xs text-neutral-500 truncate">{userEmail}</p>
                        </div>
                    )}
                    {!isCollapsed && (
                        <button
                            onClick={handleLogout}
                            className="p-2 text-neutral-400 hover:text-error-600 hover:bg-error-50 rounded-lg transition-colors"
                            title="Logout"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </motion.aside>
    )
}
