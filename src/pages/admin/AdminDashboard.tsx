import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/layout'
import { Card, Button, Badge, Input } from '@/components/ui'
import { useAuth } from '@/context'
import {
    Users, DollarSign, BookOpen, Briefcase, TrendingUp, Search, Filter,
    CheckCircle, XCircle, Eye, Edit2, Trash2, MoreVertical, BarChart3,
    PieChart, Calendar, Shield, AlertTriangle, Settings, FileText
} from 'lucide-react'
import { cn } from '@/utils'

// Mock data
const platformStats = [
    { label: 'Total Users', value: '12,456', change: '+523', icon: Users, color: 'text-primary-600' },
    { label: 'Active Courses', value: '348', change: '+28', icon: BookOpen, color: 'text-success-600' },
    { label: 'Job Postings', value: '892', change: '+124', icon: Briefcase, color: 'text-warning-600' },
    { label: 'Revenue', value: '$156K', change: '+18%', icon: DollarSign, color: 'text-secondary-600' },
]

const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'learner', status: 'active', joined: '2 hours ago' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@company.com', role: 'employer', status: 'active', joined: '5 hours ago' },
    { id: 3, name: 'Mike Chen', email: 'mike@edu.com', role: 'mentor', status: 'pending', joined: '1 day ago' },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'learner', status: 'suspended', joined: '2 days ago' },
]

const pendingCourses = [
    { id: 1, title: 'Advanced Python Programming', author: 'Dr. James Smith', category: 'Development', submitted: '2 days ago' },
    { id: 2, title: 'UI/UX Design Fundamentals', author: 'Lisa Anderson', category: 'Design', submitted: '3 days ago' },
    { id: 3, title: 'Digital Marketing Mastery', author: 'Mark Johnson', category: 'Marketing', submitted: '5 days ago' },
]

function AdminHome() {
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
                                    <p className="text-sm text-success-600 mt-1">{stat.change} this month</p>
                                </div>
                                <div className={cn("p-3 rounded-xl bg-neutral-100", stat.color)}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Users */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">Recent Users</h2>
                        <Button variant="ghost" size="sm">View All</Button>
                    </div>
                    <div className="space-y-3">
                        {recentUsers.map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center font-bold text-primary-600">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-neutral-900">{user.name}</p>
                                        <p className="text-xs text-neutral-500">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" size="sm">{user.role}</Badge>
                                    <Badge
                                        variant={user.status === 'active' ? 'success' : user.status === 'pending' ? 'warning' : 'danger'}
                                        size="sm"
                                    >
                                        {user.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Pending Approvals */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">Pending Course Approvals</h2>
                        <Badge variant="warning">{pendingCourses.length} pending</Badge>
                    </div>
                    <div className="space-y-3">
                        {pendingCourses.map((course) => (
                            <div key={course.id} className="p-3 border border-neutral-200 rounded-lg">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="font-medium text-neutral-900">{course.title}</p>
                                        <p className="text-sm text-neutral-500">{course.author} • {course.category}</p>
                                        <p className="text-xs text-neutral-400 mt-1">Submitted {course.submitted}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-primary-600">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-success-50 rounded-lg text-neutral-400 hover:text-success-600">
                                            <CheckCircle className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-error-50 rounded-lg text-neutral-400 hover:text-error-600">
                                            <XCircle className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
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

    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'learner', status: 'active', joined: 'Dec 20, 2024', courses: 5 },
        { id: 2, name: 'Sarah Wilson', email: 'sarah@company.com', role: 'employer', status: 'active', joined: 'Dec 18, 2024', jobs: 12 },
        { id: 3, name: 'Mike Chen', email: 'mike@edu.com', role: 'mentor', status: 'active', joined: 'Dec 15, 2024', courses: 3 },
        { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'learner', status: 'suspended', joined: 'Dec 10, 2024', courses: 2 },
        { id: 5, name: 'Alex Kumar', email: 'alex@company.com', role: 'employer', status: 'pending', joined: 'Dec 8, 2024', jobs: 0 },
    ]

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
                                <tr key={user.id} className="hover:bg-neutral-50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center font-bold text-primary-600">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-neutral-900">{user.name}</p>
                                                <p className="text-sm text-neutral-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge variant="outline">{user.role}</Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge
                                            variant={user.status === 'active' ? 'success' : user.status === 'pending' ? 'warning' : 'danger'}
                                        >
                                            {user.status}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-neutral-500">{user.joined}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-primary-600">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-primary-600">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-error-50 rounded-lg text-neutral-400 hover:text-error-600">
                                                <Trash2 className="w-4 h-4" />
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
    const courses = [
        { id: 1, title: 'Advanced Python Programming', author: 'Dr. James Smith', category: 'Development', price: '$49.99', lectures: 42, submitted: 'Dec 24, 2024', status: 'pending' },
        { id: 2, title: 'UI/UX Design Fundamentals', author: 'Lisa Anderson', category: 'Design', price: '$39.99', lectures: 28, submitted: 'Dec 23, 2024', status: 'pending' },
        { id: 3, title: 'React Native Masterclass', author: 'John Developer', category: 'Development', price: '$59.99', lectures: 56, submitted: 'Dec 22, 2024', status: 'approved' },
        { id: 4, title: 'Digital Marketing Mastery', author: 'Mark Johnson', category: 'Marketing', price: '$44.99', lectures: 35, submitted: 'Dec 21, 2024', status: 'rejected' },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-display font-bold text-neutral-900">Course Approval</h1>
                <p className="text-neutral-500 mt-1">Review and approve mentor courses.</p>
            </div>

            <div className="grid gap-4">
                {courses.map((course) => (
                    <Card key={course.id} className="hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center flex-shrink-0">
                                <BookOpen className="w-8 h-8 text-primary-300" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-neutral-900">{course.title}</h3>
                                        <p className="text-sm text-neutral-500">by {course.author}</p>
                                    </div>
                                    <Badge
                                        variant={course.status === 'approved' ? 'success' : course.status === 'rejected' ? 'danger' : 'warning'}
                                    >
                                        {course.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-sm text-neutral-500">
                                    <span>{course.category}</span>
                                    <span>•</span>
                                    <span>{course.lectures} lectures</span>
                                    <span>•</span>
                                    <span>{course.price}</span>
                                    <span>•</span>
                                    <span>Submitted {course.submitted}</span>
                                </div>
                            </div>
                            {course.status === 'pending' && (
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" leftIcon={<Eye className="w-4 h-4" />}>Preview</Button>
                                    <Button size="sm" className="bg-success-600 hover:bg-success-700" leftIcon={<CheckCircle className="w-4 h-4" />}>Approve</Button>
                                    <Button variant="danger" size="sm" leftIcon={<XCircle className="w-4 h-4" />}>Reject</Button>
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
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
                                        <Badge variant={job.status === 'active' ? 'success' : job.status === 'pending' ? 'warning' : 'danger'}>
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
                <Route path="settings" element={<AdminPlatformSettings />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
        </DashboardLayout>
    )
}
