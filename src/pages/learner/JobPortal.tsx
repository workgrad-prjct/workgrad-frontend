import { useState } from 'react'
import { Search, MapPin, Briefcase, DollarSign, Clock, Filter, SlidersHorizontal } from 'lucide-react'
import { Card, Button, Input, Badge, Select } from '@/components/ui'

// Mock Job Data
const jobs = [
    {
        id: 1,
        title: 'Senior Frontend Engineer',
        company: 'TechCorp Inc.',
        location: 'Remote',
        type: 'Full-time',
        salary: '$120k - $150k',
        posted: '2 days ago',
        skills: ['React', 'TypeScript', 'Tailwind'],
        logo: 'https://randomuser.me/api/portraits/lego/1.jpg'
    },
    {
        id: 2,
        title: 'Product Designer',
        company: 'DesignStudio',
        location: 'New York, NY',
        type: 'Full-time',
        salary: '$100k - $130k',
        posted: '4 hours ago',
        skills: ['Figma', 'UI/UX', 'Prototyping'],
        logo: 'https://randomuser.me/api/portraits/lego/2.jpg'
    },
    {
        id: 3,
        title: 'Backend Developer',
        company: 'DataSystems',
        location: 'Austin, TX',
        type: 'Contract',
        salary: '$80/hr',
        posted: '1 day ago',
        skills: ['Node.js', 'PostgreSQL', 'AWS'],
        logo: 'https://randomuser.me/api/portraits/lego/3.jpg'
    },
    {
        id: 4,
        title: 'Marketing Manager',
        company: 'GrowthMasters',
        location: 'Remote',
        type: 'Part-time',
        salary: '$60k - $80k',
        posted: '3 days ago',
        skills: ['SEO', 'Content Strategy', 'Analytics'],
        logo: 'https://randomuser.me/api/portraits/lego/4.jpg'
    },
    {
        id: 5,
        title: 'Data Scientist',
        company: 'AI Solutions',
        location: 'San Francisco, CA',
        type: 'Full-time',
        salary: '$140k - $180k',
        posted: '1 week ago',
        skills: ['Python', 'Machine Learning', 'SQL'],
        logo: 'https://randomuser.me/api/portraits/lego/5.jpg'
    }
]

export function JobPortal() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedType, setSelectedType] = useState('All')

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-neutral-900">
                        Find Your Next Role
                    </h1>
                    <p className="text-neutral-500 mt-1">
                        Browse thousands of job openings from top companies.
                    </p>
                </div>
                <Button leftIcon={<Upload className="w-4 h-4" />}>
                    Upload Resume
                </Button>
            </div>

            {/* Search & Filters */}
            <Card className="p-4">
                <div className="grid md:grid-cols-12 gap-4">
                    <div className="md:col-span-5 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <Input
                            placeholder="Search by job title, skill, or company..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="md:col-span-3 relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <Input placeholder="Location" className="pl-9" />
                    </div>
                    <div className="md:col-span-2">
                        <select className="w-full h-10 px-3 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all">
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                            <option>Internship</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <Button className="w-full">Search</Button>
                    </div>
                </div>
            </Card>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className="hidden lg:block space-y-6">
                    <Card className="p-5 space-y-6 sticky top-24">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-neutral-900">Filters</h3>
                            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">Clear All</button>
                        </div>

                        {/* Job Type */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-neutral-700">Job Type</label>
                            <div className="space-y-2">
                                {['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'].map(type => (
                                    <label key={type} className="flex items-center gap-2 cursor-pointer group">
                                        <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                                        <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Salary Range */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-neutral-700">Salary Range</label>
                            <div className="space-y-2">
                                {['$0 - $50k', '$50k - $100k', '$100k - $150k', '$150k+'].map(range => (
                                    <label key={range} className="flex items-center gap-2 cursor-pointer group">
                                        <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                                        <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">{range}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Experience Level */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-neutral-700">Experience Level</label>
                            <div className="space-y-2">
                                {['Entry Level', 'Mid Level', 'Senior Level', 'Director'].map(level => (
                                    <label key={level} className="flex items-center gap-2 cursor-pointer group">
                                        <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                                        <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">{level}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Job List */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="flex items-center justify-between lg:hidden mb-4">
                        <Button variant="outline" size="sm" leftIcon={<Filter className="w-4 h-4" />}>Filters</Button>
                        <div className="text-sm text-neutral-500">
                            Showing <strong>{jobs.length}</strong> jobs
                        </div>
                    </div>

                    {jobs.map(job => (
                        <Card key={job.id} className="p-6 hover:shadow-md transition-shadow group cursor-pointer border border-neutral-100/50">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-16 h-16 bg-neutral-100 rounded-xl flex items-center justify-center overflow-hidden">
                                    <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                        <div>
                                            <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                                                {job.title}
                                            </h3>
                                            <p className="text-neutral-500 font-medium">{job.company}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={(job.type === 'Full-time' ? 'primary' : 'secondary') as any}>{job.type}</Badge>
                                            <span className="text-xs text-neutral-400">{job.posted}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {job.location}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <DollarSign className="w-4 h-4" />
                                            {job.salary}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            Avg. response: 2 days
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                                        <div className="flex gap-2">
                                            {job.skills.map(skill => (
                                                <Badge key={skill} variant="outline" size="sm" className="bg-neutral-50">{skill}</Badge>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Button variant="ghost" size="sm">Save</Button>
                                            <Button size="sm">Apply Now</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

function Upload(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
    )
}
