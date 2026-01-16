import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/layout'
import { Card, Button, Badge, Input } from '@/components/ui'
import { useAuth } from '@/context'
import {
    Users, DollarSign, BookOpen, Briefcase, TrendingUp, Search,
    CheckCircle, XCircle, Eye, BarChart3,
    PieChart, Shield, AlertTriangle, Settings, FileText,
    Plus, Edit2, Trash2, X
} from 'lucide-react'
import { cn } from '@/utils'
import { adminService } from '@/services/adminService'
import { toast } from 'react-hot-toast'
import { categoryColorPalette, getCategoryColor } from '@/utils/categoryColors'

function AdminHome() {
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await adminService.getDashboardStats()
                if (response.data.success) {
                    setStats(response.data.data)
                }
            } catch (error) {
                console.error('Failed to fetch admin stats', error)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) return <div className="p-8 text-center">Loading stats...</div>

    const platformStats = [
        { label: 'Total Users', value: stats?.users?.total || 0, change: 'Active', icon: Users, color: 'text-primary-600' },
        { label: 'Published Courses', value: stats?.courses?.published || 0, change: `${stats?.courses?.pendingReview || 0} Pending`, icon: BookOpen, color: 'text-success-600' },
        { label: 'Active Jobs', value: stats?.jobs?.active || 0, change: `Total: ${stats?.jobs?.total || 0}`, icon: Briefcase, color: 'text-warning-600' },
        { label: 'Enrollments', value: stats?.enrollments || 0, change: 'Lifetime', icon: DollarSign, color: 'text-secondary-600' },
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-display font-bold text-neutral-900">Admin Dashboard</h1>
                <p className="text-neutral-500 mt-1">Platform overview and management.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {platformStats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="relative overflow-hidden">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-neutral-500">{stat.label}</p>
                                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                                    <p className="text-sm text-success-600 mt-1">{stat.change}</p>
                                </div>
                                <div className={cn("p-3 rounded-xl bg-neutral-100", stat.color)}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>



            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-6">
                    <h3 className="font-bold mb-4">User Growth</h3>
                    <div className="aspect-[2/1] bg-neutral-50 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-16 h-16 text-neutral-300" />
                    </div>
                </Card>
                <Card className="p-6">
                    <h3 className="font-bold mb-4">Revenue Breakdown</h3>
                    <div className="aspect-[2/1] bg-neutral-50 rounded-lg flex items-center justify-center">
                        <PieChart className="w-16 h-16 text-neutral-300" />
                    </div>
                </Card>
            </div>
        </div>
    )
}

function UserManagement() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedRole, setSelectedRole] = useState('all')
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const params: any = { role: selectedRole !== 'all' ? selectedRole : undefined }
            if (searchQuery) params.search = searchQuery

            const response = await adminService.getUsers(params)
            if (response.data.success) {
                setUsers(response.data.data)
            }
        } catch (error) {
            console.error('Failed to fetch users', error)
            toast.error('Failed to load users')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // Debounce search could be added here
        const timer = setTimeout(() => {
            fetchUsers()
        }, 300)
        return () => clearTimeout(timer)
    }, [searchQuery, selectedRole])

    const handleStatusToggle = async (userId: string, currentStatus: boolean) => {
        try {
            const response = await adminService.updateUser(userId, { isActive: !currentStatus })
            if (response.data.success) {
                toast.success('User status updated')
                fetchUsers() // Refresh list
            }
        } catch (error) {
            toast.error('Failed to update user status')
        }
    }

    if (loading) return <div className="p-8 text-center">Loading users...</div>

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-neutral-900">User Management</h1>
                    <p className="text-neutral-500 mt-1">Manage all platform users.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <select
                        className="px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                    >
                        <option value="all">All Roles</option>
                        <option value="learner">Learners</option>
                        <option value="employer">Employers</option>
                        <option value="mentor">Mentors</option>
                    </select>
                </div>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-neutral-50 border-b border-neutral-200">
                            <tr>
                                <th className="text-left px-4 py-3 text-sm font-medium text-neutral-600">User</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-neutral-600">Role</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-neutral-600">Status</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-neutral-600">Joined</th>
                                <th className="text-right px-4 py-3 text-sm font-medium text-neutral-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-neutral-50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center font-bold text-primary-600">
                                                {user.profile?.firstName?.[0] || user.email[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-medium text-neutral-900">{user.profile?.firstName} {user.profile?.lastName}</p>
                                                <p className="text-sm text-neutral-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge variant="outline">{user.role}</Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge
                                            variant={user.isActive ? 'success' : 'error'}
                                        >
                                            {user.isActive ? 'active' : 'inactive'}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-neutral-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-primary-600">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleStatusToggle(user._id, user.isActive)}
                                                className={`p-2 hover:bg-neutral-100 rounded-lg ${user.isActive ? 'text-error-400 hover:text-error-600' : 'text-success-400 hover:text-success-600'}`}
                                                title={user.isActive ? 'Deactivate' : 'Activate'}
                                            >
                                                {user.isActive ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}

function CourseApproval() {
    const [courses, setCourses] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchCourses = async () => {
        try {
            const response = await adminService.getPendingCourses()
            if (response.data.success) {
                setCourses(response.data.data)
            }
        } catch (error) {
            console.error('Failed to fetch pending courses', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    const handleApprove = async (id: string) => {
        try {
            await adminService.approveCourse(id)
            toast.success('Course approved!')
            fetchCourses()
        } catch (error) {
            toast.error('Failed to approve course')
        }
    }

    const handleReject = async (id: string) => {
        // In a real app, this would open a modal to ask for a reason
        try {
            await adminService.rejectCourse(id, 'Did not meet quality standards')
            toast.success('Course rejected')
            fetchCourses()
        } catch (error) {
            toast.error('Failed to reject course')
        }
    }

    if (loading) return <div className="p-8 text-center">Loading courses...</div>

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-display font-bold text-neutral-900">Course Approval</h1>
                <p className="text-neutral-500 mt-1">Review and approve mentor courses.</p>
            </div>

            <div className="grid gap-4">
                {courses.length === 0 ? (
                    <Card className="p-8 text-center text-neutral-500">
                        No pending courses to review.
                    </Card>
                ) : (
                    courses.map((course) => (
                        <Card key={course._id} className="hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center flex-shrink-0">
                                    <BookOpen className="w-8 h-8 text-primary-300" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-neutral-900">{course.title}</h3>
                                            <p className="text-sm text-neutral-500">by {course.mentorId?.profile?.firstName} {course.mentorId?.profile?.lastName}</p>
                                        </div>
                                        <Badge variant="warning">
                                            Pending Review
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-neutral-500">
                                        <span>{course.category}</span>
                                        <span>•</span>
                                        <span>{course.chapters?.length || 0} chapters</span>
                                        <span>•</span>
                                        <span>${course.price}</span>
                                        <span>•</span>
                                        <span>Submitted {new Date(course.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" leftIcon={<Eye className="w-4 h-4" />}>Preview</Button>
                                    <Button
                                        size="sm"
                                        className="bg-success-600 hover:bg-success-700"
                                        leftIcon={<CheckCircle className="w-4 h-4" />}
                                        onClick={() => handleApprove(course._id)}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        leftIcon={<XCircle className="w-4 h-4" />}
                                        onClick={() => handleReject(course._id)}
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}

function Reports() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-display font-bold text-neutral-900">Reports & Analytics</h1>
                <p className="text-neutral-500 mt-1">Platform insights and performance metrics.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Monthly Active Users', value: '8,234', change: '+12%', icon: Users },
                    { label: 'Course Completions', value: '1,456', change: '+8%', icon: CheckCircle },
                    { label: 'Job Applications', value: '3,892', change: '+24%', icon: FileText },
                    { label: 'Platform Revenue', value: '$45,200', change: '+15%', icon: DollarSign },
                ].map((stat) => (
                    <Card key={stat.label}>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-neutral-500">{stat.label}</p>
                                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                <p className="text-sm text-success-600 mt-1">{stat.change}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-neutral-100">
                                <stat.icon className="w-5 h-5 text-neutral-600" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold">User Registration Trend</h3>
                        <select className="text-sm border border-neutral-200 rounded-lg px-3 py-1">
                            <option>Last 30 days</option>
                            <option>Last 3 months</option>
                            <option>Last year</option>
                        </select>
                    </div>
                    <div className="aspect-[2/1] bg-neutral-50 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-16 h-16 text-neutral-300" />
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold">Revenue by Category</h3>
                        <select className="text-sm border border-neutral-200 rounded-lg px-3 py-1">
                            <option>This month</option>
                            <option>Last month</option>
                            <option>This quarter</option>
                        </select>
                    </div>
                    <div className="aspect-[2/1] bg-neutral-50 rounded-lg flex items-center justify-center">
                        <PieChart className="w-16 h-16 text-neutral-300" />
                    </div>
                </Card>
            </div>

            <Card className="p-6">
                <h3 className="font-bold mb-4">Quick Actions</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Export User Data', icon: Users },
                        { label: 'Course Analytics', icon: BookOpen },
                        { label: 'Job Reports', icon: Briefcase },
                        { label: 'Financial Report', icon: DollarSign },
                    ].map((action) => (
                        <button
                            key={action.label}
                            className="flex items-center gap-3 p-4 border border-neutral-200 rounded-xl hover:border-primary-400 hover:bg-primary-50/50 transition-colors"
                        >
                            <action.icon className="w-5 h-5 text-primary-600" />
                            <span className="font-medium">{action.label}</span>
                        </button>
                    ))}
                </div>
            </Card>
        </div>
    )
}

function JobManagement() {
    const [searchQuery, setSearchQuery] = useState('')
    const jobs = [
        { id: 1, title: 'Senior React Developer', company: 'TechCorp Inc.', location: 'Remote', salary: '$120K - $150K', status: 'active', posted: 'Dec 20, 2024', applications: 45 },
        { id: 2, title: 'Product Designer', company: 'Design Co', location: 'New York, NY', salary: '$90K - $120K', status: 'pending', posted: 'Dec 22, 2024', applications: 12 },
        { id: 3, title: 'Backend Engineer', company: 'StartupXYZ', location: 'San Francisco, CA', salary: '$130K - $160K', status: 'active', posted: 'Dec 18, 2024', applications: 28 },
        { id: 4, title: 'Marketing Manager', company: 'GrowthHub', location: 'Chicago, IL', salary: '$80K - $100K', status: 'flagged', posted: 'Dec 15, 2024', applications: 35 },
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-neutral-900">Job Management</h1>
                    <p className="text-neutral-500 mt-1">Review and manage all job postings on the platform.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            className="pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid sm:grid-cols-4 gap-6">
                {[
                    { label: 'Total Jobs', value: '892', color: 'text-primary-600' },
                    { label: 'Active', value: '654', color: 'text-success-600' },
                    { label: 'Pending Review', value: '23', color: 'text-warning-600' },
                    { label: 'Flagged', value: '8', color: 'text-error-600' },
                ].map((stat) => (
                    <Card key={stat.label}>
                        <p className="text-sm text-neutral-500">{stat.label}</p>
                        <p className={cn("text-3xl font-bold mt-1", stat.color)}>{stat.value}</p>
                    </Card>
                ))}
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-neutral-50 border-b border-neutral-200">
                            <tr>
                                <th className="text-left px-4 py-3 text-sm font-medium text-neutral-600">Job</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-neutral-600">Company</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-neutral-600">Status</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-neutral-600">Applications</th>
                                <th className="text-right px-4 py-3 text-sm font-medium text-neutral-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {jobs.map((job) => (
                                <tr key={job.id} className="hover:bg-neutral-50">
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium text-neutral-900">{job.title}</p>
                                            <p className="text-sm text-neutral-500">{job.location} • {job.salary}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-neutral-600">{job.company}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant={job.status === 'active' ? 'success' : job.status === 'pending' ? 'warning' : 'error'}>
                                            {job.status}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 font-medium">{job.applications}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-primary-600">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            {job.status === 'pending' && (
                                                <button className="p-2 hover:bg-success-50 rounded-lg text-neutral-400 hover:text-success-600">
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button className="p-2 hover:bg-error-50 rounded-lg text-neutral-400 hover:text-error-600">
                                                <XCircle className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}

function AdminPlatformSettings() {
    const [platformSettings, setPlatformSettings] = useState({
        platformName: 'WorkGrad',
        supportEmail: 'support@workgrad.com',
        maxJobsPerEmployer: '50',
        courseFeePercentage: '30',
        maintenanceMode: false,
    })

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-display font-bold text-neutral-900">Platform Settings</h1>
                <p className="text-neutral-500 mt-1">Configure global platform settings and preferences.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Settings className="w-5 h-5" /> General Settings
                    </h3>
                    <div className="space-y-4">
                        <Input
                            label="Platform Name"
                            value={platformSettings.platformName}
                            onChange={(e) => setPlatformSettings({ ...platformSettings, platformName: e.target.value })}
                        />
                        <Input
                            label="Support Email"
                            type="email"
                            value={platformSettings.supportEmail}
                            onChange={(e) => setPlatformSettings({ ...platformSettings, supportEmail: e.target.value })}
                        />
                        <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                            <div>
                                <p className="font-medium">Maintenance Mode</p>
                                <p className="text-sm text-neutral-500">Temporarily disable the platform</p>
                            </div>
                            <button
                                onClick={() => setPlatformSettings({ ...platformSettings, maintenanceMode: !platformSettings.maintenanceMode })}
                                className={cn(
                                    "w-12 h-6 rounded-full transition-colors relative",
                                    platformSettings.maintenanceMode ? 'bg-primary-600' : 'bg-neutral-300'
                                )}
                            >
                                <div className={cn(
                                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                                    platformSettings.maintenanceMode ? 'left-7' : 'left-1'
                                )} />
                            </button>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <DollarSign className="w-5 h-5" /> Revenue Settings
                    </h3>
                    <div className="space-y-4">
                        <Input
                            label="Max Jobs per Employer"
                            type="number"
                            value={platformSettings.maxJobsPerEmployer}
                            onChange={(e) => setPlatformSettings({ ...platformSettings, maxJobsPerEmployer: e.target.value })}
                        />
                        <Input
                            label="Platform Fee (%)"
                            type="number"
                            value={platformSettings.courseFeePercentage}
                            onChange={(e) => setPlatformSettings({ ...platformSettings, courseFeePercentage: e.target.value })}
                        />
                        <div className="p-3 bg-primary-50 rounded-lg border border-primary-200">
                            <p className="text-sm text-primary-700">
                                <strong>Note:</strong> The platform takes {platformSettings.courseFeePercentage}% fee from each course sale.
                                Mentors receive {100 - parseInt(platformSettings.courseFeePercentage || '0')}%.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5" /> Security Settings
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                            <div>
                                <p className="font-medium">Two-Factor Authentication</p>
                                <p className="text-sm text-neutral-500">Require 2FA for admin accounts</p>
                            </div>
                            <Badge variant="success">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                            <div>
                                <p className="font-medium">Session Timeout</p>
                                <p className="text-sm text-neutral-500">Auto-logout after inactivity</p>
                            </div>
                            <span className="font-medium">30 minutes</span>
                        </div>
                        <Button variant="outline" className="w-full">View Security Logs</Button>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" /> Danger Zone
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 border border-error-200 rounded-lg bg-error-50">
                            <p className="font-medium text-error-700">Reset Platform Data</p>
                            <p className="text-sm text-error-600 mt-1">This action cannot be undone. All data will be permanently deleted.</p>
                            <Button variant="danger" size="sm" className="mt-3">Reset All Data</Button>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex items-center justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
            </div>
        </div>
    )
}

// Category Management with Color Picker
interface Category {
    id: string
    slug: string
    title: string
    description: string
    icon: string
    colorIndex: number
    courses: string[]
    tools: string[]
}

function CategoryManagement() {
    const [categories, setCategories] = useState<Category[]>([
        { id: '1', slug: 'programming-tools', title: 'Programming Tools', description: 'Master essential programming languages and development tools', colorIndex: 0, icon: '💻', courses: ['react-masterclass', 'nodejs-backend'], tools: ['JavaScript', 'React', 'Node.js', 'Git'] },
        { id: '2', slug: 'data-professional', title: 'Data Professional', description: 'Learn data analysis, visualization, and machine learning', colorIndex: 1, icon: '📊', courses: ['python-data-science'], tools: ['Python', 'SQL', 'Power BI', 'Tableau'] },
        { id: '3', slug: 'digital-marketer', title: 'Digital Marketer', description: 'Master SEO, social media, and digital advertising', colorIndex: 2, icon: '📈', courses: [], tools: ['SEO', 'Google Ads', 'Analytics', 'Social Media'] },
        { id: '4', slug: 'ui-ux-designer', title: 'UI/UX Designer', description: 'Create stunning user interfaces and experiences', colorIndex: 3, icon: '🎨', courses: ['ui-ux-design'], tools: ['Figma', 'Adobe XD', 'Photoshop', 'Sketch'] },
    ])

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: '💻',
        colorIndex: 0,
        tools: ''
    })
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

    const iconOptions = ['💻', '📊', '📈', '🎨', '🚀', '🔧', '📱', '🎯', '🤖', '☁️', '🔒', '📚']

    const openCreateModal = () => {
        setEditingCategory(null)
        setFormData({ title: '', description: '', icon: '💻', colorIndex: 0, tools: '' })
        setIsModalOpen(true)
    }

    const openEditModal = (category: Category) => {
        setEditingCategory(category)
        setFormData({
            title: category.title,
            description: category.description,
            icon: category.icon,
            colorIndex: category.colorIndex,
            tools: category.tools.join(', ')
        })
        setIsModalOpen(true)
    }

    const handleSave = () => {
        if (!formData.title.trim()) {
            toast.error('Title is required')
            return
        }

        const slug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        const toolsArray = formData.tools.split(',').map(t => t.trim()).filter(t => t)

        if (editingCategory) {
            // Update existing
            setCategories(cats => cats.map(c =>
                c.id === editingCategory.id
                    ? { ...c, title: formData.title, description: formData.description, icon: formData.icon, colorIndex: formData.colorIndex, slug, tools: toolsArray }
                    : c
            ))
            toast.success('Category updated!')
        } else {
            // Create new
            const newCategory: Category = {
                id: Date.now().toString(),
                slug,
                title: formData.title,
                description: formData.description,
                icon: formData.icon,
                colorIndex: formData.colorIndex,
                courses: [],
                tools: toolsArray
            }
            setCategories([...categories, newCategory])
            toast.success('Category created!')
        }
        setIsModalOpen(false)
    }

    const handleDelete = (id: string) => {
        setCategories(cats => cats.filter(c => c.id !== id))
        setDeleteConfirm(null)
        toast.success('Category deleted!')
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-neutral-900">Category Management</h1>
                    <p className="text-neutral-500 mt-1">Manage course categories and their colors.</p>
                </div>
                <Button leftIcon={<Plus className="w-4 h-4" />} onClick={openCreateModal}>
                    Add Category
                </Button>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-4 gap-6">
                <Card>
                    <p className="text-sm text-neutral-500">Total Categories</p>
                    <p className="text-3xl font-bold text-primary-600 mt-1">{categories.length}</p>
                </Card>
                <Card>
                    <p className="text-sm text-neutral-500">Total Courses</p>
                    <p className="text-3xl font-bold text-success-600 mt-1">{categories.reduce((acc, c) => acc + c.courses.length, 0)}</p>
                </Card>
                <Card>
                    <p className="text-sm text-neutral-500">Colors Used</p>
                    <p className="text-3xl font-bold text-warning-600 mt-1">{new Set(categories.map(c => c.colorIndex)).size}</p>
                </Card>
                <Card>
                    <p className="text-sm text-neutral-500">Available Colors</p>
                    <p className="text-3xl font-bold text-neutral-600 mt-1">{categoryColorPalette.length}</p>
                </Card>
            </div>

            {/* Category Table */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-neutral-50 border-b border-neutral-200">
                            <tr>
                                <th className="text-left px-4 py-3 text-sm font-medium text-neutral-600">Icon</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-neutral-600">Title</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-neutral-600">Color</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-neutral-600">Courses</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-neutral-600">Tools</th>
                                <th className="text-right px-4 py-3 text-sm font-medium text-neutral-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {categories.map((category) => {
                                const color = getCategoryColor(category.colorIndex)
                                return (
                                    <tr key={category.id} className="hover:bg-neutral-50">
                                        <td className="px-4 py-3">
                                            <span className="text-2xl">{category.icon}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div>
                                                <p className="font-medium text-neutral-900">{category.title}</p>
                                                <p className="text-sm text-neutral-500 truncate max-w-xs">{category.description}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${color.gradient}`} />
                                                <span className="text-sm text-neutral-600">{color.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge variant="outline">{category.courses.length}</Badge>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-sm text-neutral-500">{category.tools.slice(0, 2).join(', ')}{category.tools.length > 2 ? '...' : ''}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(category)}
                                                    className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-primary-600"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirm(category.id)}
                                                    className="p-2 hover:bg-error-50 rounded-lg text-neutral-400 hover:text-error-600"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
                        <h3 className="text-lg font-bold text-neutral-900 mb-2">Delete Category?</h3>
                        <p className="text-neutral-500 mb-4">This action cannot be undone. All courses in this category will be unassigned.</p>
                        <div className="flex gap-3 justify-end">
                            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
                            <Button variant="danger" onClick={() => handleDelete(deleteConfirm)}>Delete</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-neutral-900">
                                {editingCategory ? 'Edit Category' : 'Create New Category'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-neutral-100 rounded-lg">
                                <X className="w-5 h-5 text-neutral-500" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Title *</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                                    placeholder="e.g. Programming Tools"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                                <textarea
                                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none resize-none"
                                    rows={2}
                                    placeholder="Brief description of the category"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            {/* Icon Picker */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Icon</label>
                                <div className="flex flex-wrap gap-2">
                                    {iconOptions.map((icon) => (
                                        <button
                                            key={icon}
                                            onClick={() => setFormData({ ...formData, icon })}
                                            className={cn(
                                                "w-10 h-10 rounded-lg border-2 flex items-center justify-center text-xl transition-all",
                                                formData.icon === icon
                                                    ? "border-primary-500 bg-primary-50 scale-110"
                                                    : "border-neutral-200 hover:border-neutral-300"
                                            )}
                                        >
                                            {icon}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Picker */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Color Theme</label>
                                <div className="grid grid-cols-6 gap-2">
                                    {categoryColorPalette.map((color) => (
                                        <button
                                            key={color.index}
                                            onClick={() => setFormData({ ...formData, colorIndex: color.index })}
                                            className={cn(
                                                "relative w-full aspect-square rounded-lg bg-gradient-to-br transition-all",
                                                color.gradient,
                                                formData.colorIndex === color.index
                                                    ? "ring-2 ring-offset-2 ring-neutral-900 scale-110"
                                                    : "hover:scale-105"
                                            )}
                                            title={color.name}
                                        >
                                            {formData.colorIndex === color.index && (
                                                <CheckCircle className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-sm text-neutral-500 mt-2">
                                    Selected: <span className="font-medium">{categoryColorPalette.find(c => c.index === formData.colorIndex)?.name}</span>
                                </p>
                            </div>

                            {/* Tools */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Tools (comma separated)</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                                    placeholder="e.g. JavaScript, React, Node.js"
                                    value={formData.tools}
                                    onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end mt-6">
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button onClick={handleSave}>
                                {editingCategory ? 'Save Changes' : 'Create Category'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export function AdminDashboard() {
    const { user } = useAuth()

    return (
        <DashboardLayout
            role="admin"
            userName={`${user?.profile?.firstName || ''} ${user?.profile?.lastName || ''}`}
            userEmail={user?.email || ''}
            userAvatar={user?.profile?.avatar}
        >
            <Routes>
                <Route index element={<AdminHome />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="jobs" element={<JobManagement />} />
                <Route path="courses" element={<CourseApproval />} />
                <Route path="reports" element={<Reports />} />
                <Route path="categories" element={<CategoryManagement />} />
                <Route path="settings" element={<AdminPlatformSettings />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
        </DashboardLayout>
    )
}
