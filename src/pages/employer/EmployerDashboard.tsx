import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/layout'
import { Card, Button, Badge, Input } from '@/components/ui'
import { useAuth } from '@/context'
import { jobService } from '@/services/jobService'
import { toast } from 'react-hot-toast'
import {
    Briefcase, Users, TrendingUp, Eye, Plus, Search, Filter,
    MapPin, Clock, DollarSign, Building2, ChevronRight,
    BarChart3, PieChart, Calendar, CheckCircle2, MessageSquare
} from 'lucide-react'
import { cn } from '@/utils'



function EmployerHome() {
    const [jobs, setJobs] = useState<any[]>([])
    const [applications, setApplications] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [jobsRes, appsRes] = await Promise.all([
                    jobService.getMyJobs(),
                    jobService.getAllApplications()
                ])
                if (jobsRes.data.success) setJobs(jobsRes.data.data)
                if (appsRes.data.success) setApplications(appsRes.data.data)
            } catch (error) {
                console.error('Failed to fetch dashboard data', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    // Calculate stats
    const totalJobs = jobs.length
    const totalApplications = applications.length
    const activeJobsCount = jobs.filter(j => j.status === 'active').length
    const totalViews = jobs.reduce((acc, job) => acc + (job.views || 0), 0)

    const stats = [
        { label: 'Total Jobs Posted', value: totalJobs.toString(), change: 'Total', icon: Briefcase, color: 'text-primary-600' },
        { label: 'Total Applications', value: totalApplications.toString(), change: 'All time', icon: Users, color: 'text-success-600' },
        { label: 'Active Jobs', value: activeJobsCount.toString(), change: 'Current', icon: CheckCircle2, color: 'text-warning-600' },
        { label: 'Total Views', value: totalViews.toString(), change: 'All time', icon: Eye, color: 'text-secondary-600' },
    ]

    const recentJobs = jobs.slice(0, 3)
    const recentApps = applications.slice(0, 4)

    if (loading) return <div className="p-8 text-center">Loading dashboard...</div>

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

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Active Jobs */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-neutral-900">Recent Job Postings</h2>
                        <Button variant="outline" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
                            View All
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {recentJobs.length === 0 ? (
                            <div className="text-center p-8 text-neutral-500 bg-neutral-50 rounded-lg">No jobs posted yet.</div>
                        ) : (
                            recentJobs.map((job) => (
                                <Card key={job._id} className="hover:shadow-md transition-shadow">
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
                                                    <DollarSign className="w-4 h-4" /> {job.salary?.min ? `${job.salary.min / 1000}k - ${job.salary.max / 1000}k` : 'Not specified'}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" /> {new Date(job.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-4">
                                                <div className="text-center">
                                                    <p className="text-lg font-bold text-primary-600">{job.applicationsCount || 0}</p>
                                                    <p className="text-xs text-neutral-500">Applications</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-lg font-bold text-neutral-600">{job.views || 0}</p>
                                                    <p className="text-xs text-neutral-500">Views</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                </div>

                {/* Recent Applications */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-neutral-900">Recent Applications</h2>
                        <Button variant="ghost" size="sm">View All</Button>
                    </div>

                    <div className="space-y-3">
                        {recentApps.length === 0 ? (
                            <div className="text-center p-8 text-neutral-500 bg-neutral-50 rounded-lg">No applications yet.</div>
                        ) : (
                            recentApps.map((app) => (
                                <Card key={app._id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center font-bold text-primary-600">
                                            {app.learnerId?.profile?.firstName?.charAt(0) || 'U'}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-neutral-900">{app.learnerId?.profile?.firstName} {app.learnerId?.profile?.lastName}</p>
                                            <p className="text-xs text-neutral-500">{app.jobId?.title}</p>
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
                                            <p className="text-xs text-neutral-400 mt-1">{new Date(app.appliedAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function PostJob() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        category: '', // Changed from department for consistency with model
        location: '',
        type: 'full-time',
        salaryMin: '',
        salaryMax: '',
        description: '',
        requirements: '',
        benefits: '',
    })

    const handleSubmit = async () => {
        setLoading(true)
        try {
            // Transform data for API
            const jobData = {
                title: formData.title,
                category: formData.category, // Map department/category
                location: formData.location,
                type: formData.type,
                salary: {
                    min: parseInt(formData.salaryMin) || 0,
                    max: parseInt(formData.salaryMax) || 0,
                    showSalary: true
                },
                description: formData.description,
                requirements: formData.requirements.split('\n').filter(Boolean),
                benefits: formData.benefits.split('\n').filter(Boolean),
                status: 'active'
            }

            const response = await jobService.createJob(jobData)
            if (response.data.success) {
                toast.success('Job posted successfully!')
                // Reset form
                setFormData({
                    title: '',
                    category: '',
                    location: '',
                    type: 'full-time',
                    salaryMin: '',
                    salaryMax: '',
                    description: '',
                    requirements: '',
                    benefits: '',
                })
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to post job')
        } finally {
            setLoading(false)
        }
    }

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
                            label="Category"
                            placeholder="e.g. Engineering, Design, Marketing"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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

                    <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                            label="Min Salary"
                            placeholder="e.g. 50000"
                            type="number"
                            value={formData.salaryMin}
                            onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                        />
                        <Input
                            label="Max Salary"
                            placeholder="e.g. 80000"
                            type="number"
                            value={formData.salaryMax}
                            onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                        />
                    </div>

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
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Requirements (One per line)</label>
                        <textarea
                            className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none min-h-[100px]"
                            placeholder="List the required skills and qualifications..."
                            value={formData.requirements}
                            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Benefits (One per line)</label>
                        <textarea
                            className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none min-h-[100px]"
                            placeholder="List the benefits and perks..."
                            value={formData.benefits}
                            onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t">
                        <Button variant="outline">Save as Draft</Button>
                        <Button
                            leftIcon={<Plus className="w-4 h-4" />}
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? 'Publishing...' : 'Publish Job'}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

function Candidates() {
    const [searchQuery, setSearchQuery] = useState('')
    const [applications, setApplications] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await jobService.getAllApplications()
                if (response.data.success) {
                    setApplications(response.data.data)
                }
            } catch (error) {
                console.error('Failed to fetch applications', error)
            } finally {
                setLoading(false)
            }
        }
        fetchApplications()
    }, [])

    const filteredApplications = applications.filter(app =>
        app.learnerId?.profile?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.learnerId?.profile?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.jobId?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (loading) return <div className="p-8 text-center">Loading candidates...</div>

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
                {filteredApplications.length === 0 ? (
                    <div className="p-8 text-center text-neutral-500 bg-neutral-50 rounded-lg">
                        {searchQuery ? 'No candidates match your search.' : 'No candidates yet.'}
                    </div>
                ) : (
                    filteredApplications.map((app) => (
                        <Card key={app._id} className="hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center font-bold text-xl text-primary-600">
                                    {app.learnerId?.profile?.firstName?.charAt(0) || 'U'}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-neutral-900">{app.learnerId?.profile?.firstName} {app.learnerId?.profile?.lastName}</h3>
                                            <p className="text-sm text-neutral-500">Applied for: {app.jobId?.title}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={app.status === 'shortlisted' ? 'success' : app.status === 'interview' ? 'warning' : 'secondary'}>
                                                {app.status}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-neutral-500">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" /> Applied {new Date(app.appliedAt).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MessageSquare className="w-4 h-4" /> {app.learnerId?.email}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Button size="sm" leftIcon={<MessageSquare className="w-4 h-4" />}>Message</Button>
                                    <Button size="sm" variant="outline" onClick={() => window.open(app.resumeUrl || app.learnerId?.profile?.resume?.pdfUrl, '_blank')}>View Resume</Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
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
    const [jobs, setJobs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await jobService.getMyJobs()
                if (response.data.success) {
                    setJobs(response.data.data)
                }
            } catch (error) {
                console.error('Failed to fetch jobs', error)
            } finally {
                setLoading(false)
            }
        }
        fetchJobs()
    }, [])

    if (loading) return <div className="p-8 text-center">Loading jobs...</div>

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
                {jobs.length === 0 ? (
                    <div className="p-8 text-center text-neutral-500 bg-neutral-50 rounded-lg">No jobs found. Post your first job!</div>
                ) : (
                    jobs.map((job) => (
                        <Card key={job._id} className="hover:shadow-md transition-shadow">
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
                                            <DollarSign className="w-4 h-4" /> {job.salary?.min ? `${job.salary.min / 1000}k - ${job.salary.max / 1000}k` : 'N/A'}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" /> {new Date(job.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-primary-600">{job.applicationsCount || 0}</p>
                                        <p className="text-xs text-neutral-500">Applications</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-neutral-600">{job.views || 0}</p>
                                        <p className="text-xs text-neutral-500">Views</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm">Edit</Button>
                                        <Button variant="outline" size="sm">View</Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
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
