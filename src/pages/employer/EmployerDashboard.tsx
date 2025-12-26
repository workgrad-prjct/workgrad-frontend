import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/layout'
import { Card, Button, Badge, Input } from '@/components/ui'
import { useAuth } from '@/context'
import {
    Briefcase, Users, TrendingUp, Eye, Plus, Search, Filter,
    MapPin, Clock, DollarSign, Building2, ChevronRight,
    BarChart3, PieChart, Calendar, CheckCircle2, MessageSquare
} from 'lucide-react'
import { cn } from '@/utils'

// Mock data
const stats = [
    { label: 'Total Jobs Posted', value: '12', change: '+3', icon: Briefcase, color: 'text-primary-600' },
    { label: 'Total Applications', value: '248', change: '+45', icon: Users, color: 'text-success-600' },
    { label: 'Interviews Scheduled', value: '18', change: '+8', icon: Calendar, color: 'text-warning-600' },
    { label: 'Job Views', value: '3.2K', change: '+12%', icon: Eye, color: 'text-secondary-600' },
]

const recentApplications = [
    { id: 1, name: 'John Doe', position: 'Senior React Developer', status: 'pending', avatar: '', appliedAt: '2 hours ago', match: 92 },
    { id: 2, name: 'Sarah Wilson', position: 'Product Designer', status: 'shortlisted', avatar: '', appliedAt: '5 hours ago', match: 88 },
    { id: 3, name: 'Mike Chen', position: 'Backend Engineer', status: 'rejected', avatar: '', appliedAt: '1 day ago', match: 65 },
    { id: 4, name: 'Emily Brown', position: 'Senior React Developer', status: 'interview', avatar: '', appliedAt: '2 days ago', match: 95 },
]

const activeJobs = [
    { id: 1, title: 'Senior React Developer', location: 'Remote', type: 'Full-time', salary: '$120K - $150K', applications: 45, views: 320, posted: '5 days ago', status: 'active' },
    { id: 2, title: 'Product Designer', location: 'New York, NY', type: 'Full-time', salary: '$90K - $120K', applications: 32, views: 280, posted: '1 week ago', status: 'active' },
    { id: 3, title: 'Backend Engineer', location: 'San Francisco, CA', type: 'Contract', salary: '$80/hr', applications: 28, views: 190, posted: '2 weeks ago', status: 'paused' },
]

function EmployerHome() {
    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
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
                                    <p className="text-sm text-success-600 mt-1">{stat.change} this week</p>
                                </div>
                                <div className={cn("p-3 rounded-xl bg-neutral-100", stat.color)}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Active Jobs */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-neutral-900">Active Job Postings</h2>
                        <Button variant="outline" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
                            View All
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {activeJobs.map((job) => (
                            <Card key={job.id} className="hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-semibold text-neutral-900">{job.title}</h3>
                                            <Badge variant={job.status === 'active' ? 'success' : 'secondary'}>
                                                {job.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-neutral-500">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" /> {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <DollarSign className="w-4 h-4" /> {job.salary}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" /> {job.posted}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-4">
                                            <div className="text-center">
                                                <p className="text-lg font-bold text-primary-600">{job.applications}</p>
                                                <p className="text-xs text-neutral-500">Applications</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-lg font-bold text-neutral-600">{job.views}</p>
                                                <p className="text-xs text-neutral-500">Views</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Recent Applications */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-neutral-900">Recent Applications</h2>
                        <Button variant="ghost" size="sm">View All</Button>
                    </div>

                    <div className="space-y-3">
                        {recentApplications.map((app) => (
                            <Card key={app.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center font-bold text-primary-600">
                                        {app.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-neutral-900">{app.name}</p>
                                        <p className="text-xs text-neutral-500">{app.position}</p>
                                    </div>
                                    <div className="text-right">
                                        <Badge
                                            variant={app.status === 'shortlisted' ? 'success' :
                                                app.status === 'interview' ? 'warning' :
                                                    app.status === 'rejected' ? 'error' : 'secondary'}
                                            size="sm"
                                        >
                                            {app.status}
                                        </Badge>
                                        <p className="text-xs text-neutral-400 mt-1">{app.match}% match</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function PostJob() {
    const [formData, setFormData] = useState({
        title: '',
        department: '',
        location: '',
        type: 'full-time',
        salary: '',
        description: '',
        requirements: '',
        benefits: '',
    })

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-display font-bold text-neutral-900">Post a New Job</h1>
                <p className="text-neutral-500 mt-1">Fill in the details to create a new job posting.</p>
            </div>

            <Card className="p-6">
                <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                            label="Job Title"
                            placeholder="e.g. Senior React Developer"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                        <Input
                            label="Department"
                            placeholder="e.g. Engineering"
                            value={formData.department}
                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                            label="Location"
                            placeholder="e.g. Remote, New York, NY"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Employment Type</label>
                            <select
                                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="internship">Internship</option>
                            </select>
                        </div>
                    </div>

                    <Input
                        label="Salary Range"
                        placeholder="e.g. $100K - $150K or $50/hr"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    />

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Job Description</label>
                        <textarea
                            className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none min-h-[150px]"
                            placeholder="Describe the role and responsibilities..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Requirements</label>
                        <textarea
                            className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none min-h-[100px]"
                            placeholder="List the required skills and qualifications..."
                            value={formData.requirements}
                            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Benefits</label>
                        <textarea
                            className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none min-h-[100px]"
                            placeholder="List the benefits and perks..."
                            value={formData.benefits}
                            onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t">
                        <Button variant="outline">Save as Draft</Button>
                        <Button leftIcon={<Plus className="w-4 h-4" />}>Publish Job</Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

function Candidates() {
    const [searchQuery, setSearchQuery] = useState('')

    const candidates = [
        { id: 1, name: 'John Doe', title: 'Senior React Developer', location: 'San Francisco, CA', experience: '5 years', skills: ['React', 'TypeScript', 'Node.js'], match: 92, status: 'available' },
        { id: 2, name: 'Sarah Wilson', title: 'Product Designer', location: 'New York, NY', experience: '4 years', skills: ['Figma', 'UI/UX', 'Prototyping'], match: 88, status: 'interviewing' },
        { id: 3, name: 'Mike Chen', title: 'Backend Engineer', location: 'Austin, TX', experience: '6 years', skills: ['Python', 'Django', 'AWS'], match: 85, status: 'available' },
        { id: 4, name: 'Emily Brown', title: 'Full Stack Developer', location: 'Remote', experience: '3 years', skills: ['React', 'Node.js', 'PostgreSQL'], match: 80, status: 'hired' },
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-neutral-900">Candidates</h1>
                    <p className="text-neutral-500 mt-1">Browse and manage job applicants.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search candidates..."
                            className="pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>Filters</Button>
                </div>
            </div>

            <div className="grid gap-4">
                {candidates.map((candidate) => (
                    <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center font-bold text-xl text-primary-600">
                                {candidate.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-neutral-900">{candidate.name}</h3>
                                        <p className="text-sm text-neutral-500">{candidate.title}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant={candidate.status === 'available' ? 'success' : candidate.status === 'interviewing' ? 'warning' : 'secondary'}>
                                            {candidate.status}
                                        </Badge>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-primary-600">{candidate.match}%</p>
                                            <p className="text-xs text-neutral-500">Match</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-sm text-neutral-500">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" /> {candidate.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Briefcase className="w-4 h-4" /> {candidate.experience}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {candidate.skills.map((skill) => (
                                        <Badge key={skill} variant="outline" size="sm">{skill}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Button size="sm" leftIcon={<MessageSquare className="w-4 h-4" />}>Message</Button>
                                <Button size="sm" variant="outline">View Profile</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

function Analytics() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-display font-bold text-neutral-900">Hiring Analytics</h1>
                <p className="text-neutral-500 mt-1">Track your recruitment performance and insights.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Hires', value: '24', change: '+8 this quarter', icon: CheckCircle2, color: 'bg-success-50 text-success-600' },
                    { label: 'Time to Hire', value: '18 days', change: '-3 days avg', icon: Clock, color: 'bg-primary-50 text-primary-600' },
                    { label: 'Offer Accept Rate', value: '85%', change: '+5% this month', icon: TrendingUp, color: 'bg-warning-50 text-warning-600' },
                    { label: 'Active Candidates', value: '156', change: '+23 this week', icon: Users, color: 'bg-secondary-50 text-secondary-600' },
                ].map((stat) => (
                    <Card key={stat.label}>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-neutral-500">{stat.label}</p>
                                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                <p className="text-sm text-success-600 mt-1">{stat.change}</p>
                            </div>
                            <div className={cn("p-3 rounded-xl", stat.color)}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-6">
                    <h3 className="font-bold mb-4">Applications by Source</h3>
                    <div className="aspect-[4/3] bg-neutral-50 rounded-lg flex items-center justify-center">
                        <PieChart className="w-16 h-16 text-neutral-300" />
                    </div>
                </Card>
                <Card className="p-6">
                    <h3 className="font-bold mb-4">Hiring Funnel</h3>
                    <div className="aspect-[4/3] bg-neutral-50 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-16 h-16 text-neutral-300" />
                    </div>
                </Card>
            </div>
        </div>
    )
}

function ManageJobs() {
    const jobs = [
        { id: 1, title: 'Senior React Developer', location: 'Remote', type: 'Full-time', salary: '$120K - $150K', applications: 45, views: 320, posted: '5 days ago', status: 'active' },
        { id: 2, title: 'Product Designer', location: 'New York, NY', type: 'Full-time', salary: '$90K - $120K', applications: 32, views: 280, posted: '1 week ago', status: 'active' },
        { id: 3, title: 'Backend Engineer', location: 'San Francisco, CA', type: 'Contract', salary: '$80/hr', applications: 28, views: 190, posted: '2 weeks ago', status: 'paused' },
        { id: 4, title: 'DevOps Engineer', location: 'Remote', type: 'Full-time', salary: '$130K - $160K', applications: 18, views: 150, posted: '3 weeks ago', status: 'closed' },
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-neutral-900">Manage Jobs</h1>
                    <p className="text-neutral-500 mt-1">View and manage all your job postings.</p>
                </div>
                <Button leftIcon={<Plus className="w-4 h-4" />}>Post New Job</Button>
            </div>

            <div className="grid gap-4">
                {jobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <h3 className="font-semibold text-neutral-900">{job.title}</h3>
                                    <Badge variant={job.status === 'active' ? 'success' : job.status === 'paused' ? 'warning' : 'secondary'}>
                                        {job.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-sm text-neutral-500">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" /> {job.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <DollarSign className="w-4 h-4" /> {job.salary}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" /> {job.posted}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <p className="text-lg font-bold text-primary-600">{job.applications}</p>
                                    <p className="text-xs text-neutral-500">Applications</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-bold text-neutral-600">{job.views}</p>
                                    <p className="text-xs text-neutral-500">Views</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm">Edit</Button>
                                    <Button variant="outline" size="sm">View</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

function CampusHiring() {
    const campuses = [
        { id: 1, name: 'Stanford University', location: 'Stanford, CA', students: 15000, status: 'active', nextDrive: 'Jan 15, 2025', candidates: 45 },
        { id: 2, name: 'MIT', location: 'Cambridge, MA', students: 11000, status: 'scheduled', nextDrive: 'Jan 22, 2025', candidates: 0 },
        { id: 3, name: 'UC Berkeley', location: 'Berkeley, CA', students: 42000, status: 'completed', nextDrive: 'Dec 10, 2024', candidates: 128 },
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-neutral-900">Campus Hiring</h1>
                    <p className="text-neutral-500 mt-1">Manage campus recruitment drives and university partnerships.</p>
                </div>
                <Button leftIcon={<Building2 className="w-4 h-4" />}>Schedule Drive</Button>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
                {[
                    { label: 'Active Partnerships', value: '12', icon: Building2, color: 'text-primary-600' },
                    { label: 'Total Candidates', value: '438', icon: Users, color: 'text-success-600' },
                    { label: 'Upcoming Drives', value: '5', icon: Calendar, color: 'text-warning-600' },
                ].map((stat) => (
                    <Card key={stat.label}>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-neutral-500">{stat.label}</p>
                                <p className="text-3xl font-bold mt-1">{stat.value}</p>
                            </div>
                            <div className={cn("p-3 rounded-xl bg-neutral-100", stat.color)}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-bold text-neutral-900">Campus Partners</h2>
                {campuses.map((campus) => (
                    <Card key={campus.id} className="hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                                    <Building2 className="w-7 h-7 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-neutral-900">{campus.name}</h3>
                                    <p className="text-sm text-neutral-500">{campus.location} • {campus.students.toLocaleString()} students</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <p className="text-sm text-neutral-500">Next Drive</p>
                                    <p className="font-medium">{campus.nextDrive}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-neutral-500">Candidates</p>
                                    <p className="font-medium">{campus.candidates}</p>
                                </div>
                                <Badge variant={campus.status === 'active' ? 'success' : campus.status === 'scheduled' ? 'warning' : 'secondary'}>
                                    {campus.status}
                                </Badge>
                                <Button variant="outline" size="sm">Manage</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export function EmployerDashboard() {
    const { user } = useAuth()

    return (
        <DashboardLayout
            role="employer"
            userName={`${user?.profile?.firstName || ''} ${user?.profile?.lastName || ''}`}
            userEmail={user?.email || ''}
            userAvatar={user?.profile?.avatar}
        >
            <Routes>
                <Route index element={<EmployerHome />} />
                <Route path="post-job" element={<PostJob />} />
                <Route path="jobs" element={<ManageJobs />} />
                <Route path="candidates" element={<Candidates />} />
                <Route path="campus-hiring" element={<CampusHiring />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="*" element={<Navigate to="/employer" replace />} />
            </Routes>
        </DashboardLayout>
    )
}
