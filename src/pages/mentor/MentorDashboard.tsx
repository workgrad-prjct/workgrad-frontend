import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/layout'
import { Card, Button, Badge, Input } from '@/components/ui'
import { useAuth } from '@/context'
import {
    BookOpen, Users, DollarSign, Star, TrendingUp, Plus, Edit2, Trash2,
    Play, GraduationCap, Eye, Video, ChevronRight,
    Upload, FileText, Layers, CheckCircle, Search
} from 'lucide-react'
import { cn } from '@/utils'

import { courseService } from '@/services/courseService'
import { toast } from 'react-hot-toast'

function MentorHome() {
    const [courses, setCourses] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await courseService.getMyCourses()
                if (response.data.success) {
                    setCourses(response.data.data)
                }
            } catch (error) {
                console.error('Failed to fetch courses', error)
            } finally {
                setLoading(false)
            }
        }
        fetchCourses()
    }, [])

    // Calculate stats
    const totalStudents = courses.reduce((acc, course) => acc + (course.studentsCount || 0), 0)
    // const totalEarnings = courses.reduce((acc, course) => acc + (course.earnings || 0), 0) // Backend field needed
    const publishedCourses = courses.filter(c => c.status === 'published').length
    const totalViews = courses.reduce((acc, course) => acc + (course.views || 0), 0)

    const stats = [
        { label: 'Total Students', value: totalStudents.toString(), change: 'Total', icon: Users, color: 'text-primary-600' },
        { label: 'Courses Created', value: courses.length.toString(), change: `${publishedCourses} Published`, icon: BookOpen, color: 'text-success-600' },
        { label: 'Average Rating', value: '4.8', change: 'All time', icon: Star, color: 'text-warning-600' }, // Needs backend support
        { label: 'Course Views', value: totalViews.toString(), change: 'All time', icon: Eye, color: 'text-secondary-600' },
    ]

    const recentCourses = courses.slice(0, 3)

    if (loading) return <div className="p-8 text-center">Loading dashboard...</div>

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-neutral-900">Mentor Dashboard</h1>
                    <p className="text-neutral-500 mt-1">Manage your courses and track earnings.</p>
                </div>
                <Button leftIcon={<Plus className="w-4 h-4" />}>Create New Course</Button>
            </div>

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

            {/* Courses */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-neutral-900">Recent Courses</h2>
                    <Button variant="outline" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
                        View All
                    </Button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentCourses.length === 0 ? (
                        <div className="col-span-3 text-center p-8 text-neutral-500 bg-neutral-50 rounded-lg">No courses created yet.</div>
                    ) : (
                        recentCourses.map((course) => (
                            <Card key={course._id} className="overflow-hidden hover:shadow-lg transition-all group">
                                <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 relative">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <BookOpen className="w-12 h-12 text-primary-300" />
                                    </div>
                                    <Badge
                                        className={cn(
                                            "absolute top-3 right-3",
                                            course.status === 'published' ? 'bg-success-500' : 'bg-neutral-500'
                                        )}
                                    >
                                        {course.status}
                                    </Badge>
                                </div>
                                <div className="p-4 space-y-3">
                                    <h3 className="font-bold text-neutral-900">{course.title}</h3>
                                    <div className="flex items-center gap-4 text-sm text-neutral-500">
                                        <span className="flex items-center gap-1">
                                            <Users className="w-4 h-4" /> {course.studentsCount || 0}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-warning-500" /> {course.rating || 0}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <DollarSign className="w-4 h-4" /> ${course.price}
                                        </span>
                                    </div>
                                    <Button className="w-full" variant="outline">
                                        Manage Course
                                    </Button>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

function CreateCourse() {
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [courseType, setCourseType] = useState<'single' | 'fullstack' | null>(null)
    const [courseData, setCourseData] = useState({
        title: '',
        category: '',
        level: 'beginner',
        price: '',
        description: '',
        requirements: [''],
        domain: '',
        topic: '',
    })

    const [curriculum, setCurriculum] = useState<{ title: string; lectures: { title: string; type: string; duration: number }[] }[]>([
        { title: 'Introduction', lectures: [] }
    ])

    const handleAddSection = () => {
        setCurriculum([...curriculum, { title: 'New Section', lectures: [] }])
    }

    const handleAddLecture = (sectionIndex: number) => {
        const newCurriculum = [...curriculum]
        newCurriculum[sectionIndex].lectures.push({ title: 'New Lecture', type: 'video', duration: 10 })
        setCurriculum(newCurriculum)
    }

    const handleUpdateSection = (index: number, title: string) => {
        const newCurriculum = [...curriculum]
        newCurriculum[index].title = title
        setCurriculum(newCurriculum)
    }

    const handleUpdateLecture = (sectionIndex: number, lectureIndex: number, field: string, value: any) => {
        const newCurriculum = [...curriculum]
        // @ts-ignore
        newCurriculum[sectionIndex].lectures[lectureIndex][field] = value
        setCurriculum(newCurriculum)
    }

    const handleRemoveSection = (index: number) => {
        const newCurriculum = [...curriculum]
        newCurriculum.splice(index, 1)
        setCurriculum(newCurriculum)
    }

    const handleRemoveLecture = (sectionIndex: number, lectureIndex: number) => {
        const newCurriculum = [...curriculum]
        newCurriculum[sectionIndex].lectures.splice(lectureIndex, 1)
        setCurriculum(newCurriculum)
    }

    const handlePublish = async () => {
        setLoading(true)
        try {
            const finalData = {
                ...courseData,
                type: courseType,
                price: parseFloat(courseData.price) || 0,
                requirements: courseData.requirements.filter(Boolean),
                chapters: curriculum.map(section => ({
                    title: section.title,
                    lectures: section.lectures.map(lecture => ({
                        title: lecture.title,
                        type: lecture.type,
                        duration: lecture.duration,
                        isPreview: false
                    }))
                })),
                thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', // Placeholder
                status: 'published'
            }

            const response = await courseService.createCourse(finalData)
            if (response.data.success) {
                toast.success('Course created successfully!')
                // Reset or redirect?
                // For now, reload window or reset state significantly
                window.location.reload()
            }
        } catch (error: any) {
            console.error('Create course error:', error)
            toast.error(error.response?.data?.message || 'Failed to create course')
        } finally {
            setLoading(false)
        }
    }

    const fullStackDomains = [
        { slug: 'mern-stack', title: 'MERN Stack', topics: ['HTML & CSS', 'JavaScript', 'Git & GitHub', 'React.js', 'Node.js & Express', 'MongoDB'] },
        { slug: 'mean-stack', title: 'MEAN Stack', topics: ['HTML & CSS', 'TypeScript', 'Angular', 'Node.js & Express', 'MongoDB'] },
        { slug: 'python-fullstack', title: 'Python Full Stack', topics: ['Python', 'Django', 'PostgreSQL', 'React.js', 'Docker'] },
    ]

    const steps = [
        { id: 1, title: 'Basic Info', icon: FileText },
        { id: 2, title: 'Curriculum', icon: Layers },
        { id: 3, title: 'Pricing', icon: DollarSign },
        { id: 4, title: 'Publish', icon: CheckCircle },
    ]

    // Course type selection screen
    if (!courseType) {
        return (
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-neutral-900">Create New Course</h1>
                    <p className="text-neutral-500 mt-1">Choose the type of course you want to create.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Single Course Card */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCourseType('single')}
                        className="text-left p-8 bg-white rounded-2xl border-2 border-neutral-200 hover:border-primary-400 hover:shadow-xl transition-all duration-300 group"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                            📚
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                            Single Course
                        </h3>
                        <p className="text-neutral-500 mb-4">
                            Create a standalone course on any topic. Perfect for focused, in-depth learning.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs text-neutral-600">Any Topic</span>
                            <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs text-neutral-600">Flexible Structure</span>
                        </div>
                    </motion.button>

                    {/* Full Stack Course Card */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCourseType('fullstack')}
                        className="text-left p-8 bg-white rounded-2xl border-2 border-neutral-200 hover:border-secondary-400 hover:shadow-xl transition-all duration-300 group"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                            🚀
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-secondary-600 transition-colors">
                            Full Stack Course
                        </h3>
                        <p className="text-neutral-500 mb-4">
                            Create a course as part of a full-stack learning path (MERN, MEAN, Python).
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs text-neutral-600">MERN Stack</span>
                            <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs text-neutral-600">MEAN Stack</span>
                            <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs text-neutral-600">Python</span>
                        </div>
                    </motion.button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <button
                            onClick={() => setCourseType(null)}
                            className="text-neutral-400 hover:text-neutral-600 transition-colors"
                        >
                            ← Back
                        </button>
                        <Badge variant={courseType === 'single' ? 'primary' : 'secondary'}>
                            {courseType === 'single' ? '📚 Single Course' : '🚀 Full Stack Course'}
                        </Badge>
                    </div>
                    <h1 className="text-2xl font-display font-bold text-neutral-900">Create New Course</h1>
                    <p className="text-neutral-500 mt-1">Share your knowledge and earn while teaching.</p>
                </div>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                        <button
                            onClick={() => setCurrentStep(step.id)}
                            className={cn(
                                "flex items-center gap-2 transition-colors",
                                currentStep === step.id ? "text-primary-600" :
                                    currentStep > step.id ? "text-success-600" : "text-neutral-400"
                            )}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                                currentStep === step.id ? "border-primary-600 bg-primary-50" :
                                    currentStep > step.id ? "border-success-600 bg-success-50" : "border-neutral-200"
                            )}>
                                {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                            </div>
                            <span className="hidden sm:block font-medium">{step.title}</span>
                        </button>
                        {index < steps.length - 1 && (
                            <div className={cn(
                                "hidden sm:block w-16 h-0.5 mx-2",
                                currentStep > step.id ? "bg-success-500" : "bg-neutral-200"
                            )} />
                        )}
                    </div>
                ))}
            </div>

            {/* Form Content */}
            <Card className="p-6">
                {currentStep === 1 && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold">Course Information</h3>

                        {/* Full Stack Domain/Topic Selection */}
                        {courseType === 'fullstack' && (
                            <div className="p-4 bg-secondary-50 rounded-xl border border-secondary-200 space-y-4">
                                <h4 className="font-semibold text-secondary-700">Full Stack Path Details</h4>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Select Domain</label>
                                        <select
                                            className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500 outline-none"
                                            value={courseData.domain}
                                            onChange={(e) => setCourseData({ ...courseData, domain: e.target.value, topic: '' })}
                                        >
                                            <option value="">Select domain</option>
                                            {fullStackDomains.map((d) => (
                                                <option key={d.slug} value={d.slug}>{d.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Select Topic</label>
                                        <select
                                            className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500 outline-none"
                                            value={courseData.topic}
                                            onChange={(e) => setCourseData({ ...courseData, topic: e.target.value })}
                                            disabled={!courseData.domain}
                                        >
                                            <option value="">Select topic</option>
                                            {fullStackDomains.find(d => d.slug === courseData.domain)?.topics.map((t) => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid sm:grid-cols-2 gap-4">
                            <Input
                                label="Course Title"
                                placeholder="e.g. Complete React Developer Course"
                                value={courseData.title}
                                onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                            />
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
                                <select
                                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                                    value={courseData.category}
                                    onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
                                >
                                    <option value="">Select category</option>
                                    <option value="development">Development</option>
                                    <option value="design">Design</option>
                                    <option value="business">Business</option>
                                    <option value="marketing">Marketing</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Course Level</label>
                            <div className="flex gap-3">
                                {['beginner', 'intermediate', 'advanced'].map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setCourseData({ ...courseData, level })}
                                        className={cn(
                                            "px-4 py-2 rounded-lg border transition-colors capitalize",
                                            courseData.level === level
                                                ? "border-primary-600 bg-primary-50 text-primary-600"
                                                : "border-neutral-200 hover:border-neutral-300"
                                        )}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Course Description</label>
                            <textarea
                                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none min-h-[150px]"
                                placeholder="Describe what students will learn..."
                                value={courseData.description}
                                onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                            />
                        </div>

                        {/* Course Requirements */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Course Requirements</label>
                            <p className="text-xs text-neutral-500 mb-3">List the prerequisites or tools students need before starting this course.</p>
                            <div className="space-y-3">
                                {courseData.requirements.map((req, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0 text-sm font-medium">
                                            {index + 1}
                                        </span>
                                        <Input
                                            className="flex-1"
                                            placeholder={`Requirement ${index + 1}`}
                                            value={req}
                                            onChange={(e) => {
                                                const newReqs = [...courseData.requirements]
                                                newReqs[index] = e.target.value
                                                setCourseData({ ...courseData, requirements: newReqs })
                                            }}
                                        />
                                        {courseData.requirements.length > 1 && (
                                            <button
                                                onClick={() => {
                                                    const newReqs = courseData.requirements.filter((_, i) => i !== index)
                                                    setCourseData({ ...courseData, requirements: newReqs })
                                                }}
                                                className="p-2 text-error-600 hover:bg-error-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    onClick={() => setCourseData({ ...courseData, requirements: [...courseData.requirements, ''] })}
                                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Requirement
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Course Thumbnail</label>
                            <div className="border-2 border-dashed border-neutral-200 rounded-xl p-8 text-center hover:border-primary-400 cursor-pointer transition-colors">
                                <Upload className="w-8 h-8 mx-auto text-neutral-400" />
                                <p className="mt-2 text-sm text-neutral-500">Click to upload or drag and drop</p>
                                <p className="text-xs text-neutral-400">PNG, JPG up to 2MB</p>
                            </div>
                        </div>
                    </div>
                )
                }

                {
                    currentStep === 2 && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold">Course Curriculum</h3>
                                <Button variant="outline" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={handleAddSection}>
                                    Add Section
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {curriculum.map((section, sIndex) => (
                                    <Card key={sIndex} className="p-4 border-2 border-dashed">
                                        <div className="flex items-center justify-between mb-4">
                                            <input
                                                type="text"
                                                placeholder="Section Title"
                                                className="text-lg font-semibold bg-transparent outline-none flex-1"
                                                value={section.title}
                                                onChange={(e) => handleUpdateSection(sIndex, e.target.value)}
                                            />
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => handleAddLecture(sIndex)}>
                                                    Add Lecture
                                                </Button>
                                                <button onClick={() => handleRemoveSection(sIndex)} className="text-neutral-400 hover:text-error-500">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2 ml-4">
                                            {section.lectures.map((lecture, lIndex) => (
                                                <div key={lIndex} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                                                    <Video className="w-4 h-4 text-neutral-400" />
                                                    <input
                                                        type="text"
                                                        placeholder="Lecture Title"
                                                        className="flex-1 bg-transparent outline-none text-sm"
                                                        value={lecture.title}
                                                        onChange={(e) => handleUpdateLecture(sIndex, lIndex, 'title', e.target.value)}
                                                    />
                                                    <input
                                                        type="number"
                                                        placeholder="Mins"
                                                        className="w-16 bg-transparent outline-none text-sm text-right"
                                                        value={lecture.duration}
                                                        onChange={(e) => handleUpdateLecture(sIndex, lIndex, 'duration', parseInt(e.target.value))}
                                                    />
                                                    <span className="text-xs text-neutral-400">min</span>
                                                    <button onClick={() => handleRemoveLecture(sIndex, lIndex)} className="text-neutral-400 hover:text-error-500">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            {section.lectures.length === 0 && (
                                                <p className="text-sm text-neutral-400 italic">No lectures in this section yet.</p>
                                            )}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )
                }

                {
                    currentStep === 3 && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold">Pricing</h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <Input
                                        label="Course Price (USD)"
                                        type="number"
                                        placeholder="e.g. 49.99"
                                        value={courseData.price}
                                        onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                                    />
                                    <p className="text-xs text-neutral-500 mt-1">You'll receive 70% of the course price</p>
                                </div>
                                <Card className="p-4 bg-primary-50 border-primary-200">
                                    <h4 className="font-semibold text-primary-700">Estimated Earnings</h4>
                                    <p className="text-2xl font-bold text-primary-600 mt-2">
                                        ${courseData.price ? (parseFloat(courseData.price) * 0.7).toFixed(2) : '0.00'}
                                    </p>
                                    <p className="text-sm text-primary-600/70">per sale</p>
                                </Card>
                            </div>
                        </div>
                    )
                }

                {
                    currentStep === 4 && (
                        <div className="text-center py-8 space-y-4">
                            <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mx-auto">
                                <CheckCircle className="w-8 h-8 text-success-600" />
                            </div>
                            <h3 className="text-xl font-bold">Ready to Publish!</h3>
                            <p className="text-neutral-500 max-w-md mx-auto">
                                Your course is ready. Click publish to make it available to students worldwide.
                            </p>
                            <div className="flex items-center justify-center gap-3 pt-4">
                                <Button variant="outline">Save as Draft</Button>
                                <Button
                                    leftIcon={<CheckCircle className="w-4 h-4" />}
                                    onClick={handlePublish}
                                    disabled={loading}
                                >
                                    {loading ? 'Publishing...' : 'Publish Course'}
                                </Button>
                            </div>
                        </div>
                    )
                }

                {/* Navigation */}
                {
                    currentStep < 4 && (
                        <div className="flex items-center justify-between mt-8 pt-6 border-t">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentStep(currentStep - 1)}
                                disabled={currentStep === 1}
                            >
                                Back
                            </Button>
                            <Button onClick={() => setCurrentStep(currentStep + 1)}>
                                Continue
                            </Button>
                        </div>
                    )
                }
            </Card >
        </div >
    )
}

function Earnings() {
    const earnings = [
        { month: 'December', amount: 2100, courses: 3 },
        { month: 'November', amount: 1850, courses: 3 },
        { month: 'October', amount: 1650, courses: 2 },
        { month: 'September', amount: 1400, courses: 2 },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-display font-bold text-neutral-900">Earnings</h1>
                <p className="text-neutral-500 mt-1">Track your revenue and payouts.</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
                <Card className="bg-gradient-primary text-white border-0">
                    <p className="text-white/80">Total Earnings</p>
                    <p className="text-3xl font-bold mt-1">$12,450</p>
                    <p className="text-sm text-white/60 mt-2">Lifetime</p>
                </Card>
                <Card>
                    <p className="text-neutral-500">This Month</p>
                    <p className="text-3xl font-bold text-success-600 mt-1">$2,100</p>
                    <p className="text-sm text-success-600 mt-2">+24% vs last month</p>
                </Card>
                <Card>
                    <p className="text-neutral-500">Pending Payout</p>
                    <p className="text-3xl font-bold mt-1">$850</p>
                    <p className="text-sm text-neutral-400 mt-2">Next payout: Jan 1</p>
                </Card>
            </div>

            <Card className="p-6">
                <h3 className="font-bold mb-4">Earnings History</h3>
                <div className="space-y-3">
                    {earnings.map((item) => (
                        <div key={item.month} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                            <div>
                                <p className="font-medium">{item.month} 2024</p>
                                <p className="text-sm text-neutral-500">{item.courses} courses</p>
                            </div>
                            <p className="text-lg font-bold text-success-600">${item.amount.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}

function MyCourses() {
    const [courses, setCourses] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await courseService.getMyCourses()
                if (response.data.success) {
                    setCourses(response.data.data)
                }
            } catch (error) {
                console.error('Failed to fetch courses', error)
            } finally {
                setLoading(false)
            }
        }
        fetchCourses()
    }, [])

    if (loading) return <div className="p-8 text-center">Loading courses...</div>

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-neutral-900">My Courses</h1>
                    <p className="text-neutral-500 mt-1">Manage all your published and draft courses.</p>
                </div>
                <Button leftIcon={<Plus className="w-4 h-4" />}>Create New Course</Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.length === 0 ? (
                    <div className="col-span-3 text-center p-8 text-neutral-500 bg-neutral-50 rounded-lg">No courses created yet.</div>
                ) : (
                    courses.map((course) => (
                        <Card key={course._id} className="overflow-hidden hover:shadow-lg transition-all group">
                            <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <BookOpen className="w-12 h-12 text-primary-300" />
                                </div>
                                <Badge
                                    className={cn(
                                        "absolute top-3 right-3",
                                        course.status === 'published' ? 'bg-success-500' : 'bg-neutral-500'
                                    )}
                                >
                                    {course.status}
                                </Badge>
                            </div>
                            <div className="p-4 space-y-3">
                                <h3 className="font-bold text-neutral-900">{course.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-neutral-500">
                                    <span className="flex items-center gap-1">
                                        <Users className="w-4 h-4" /> {course.studentsCount || 0}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-warning-500" /> {course.rating || 0}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Play className="w-4 h-4" /> 0
                                    </span>
                                </div>
                                <div className="flex items-center justify-between mt-2 pt-2 border-t">
                                    <span className="font-bold text-success-600">${course.price}</span>
                                    <Button size="sm" variant="outline">
                                        Manage
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

function Students() {
    const [students, setStudents] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const coursesRes = await courseService.getMyCourses()
                if (coursesRes.data.success) {
                    const courses = coursesRes.data.data
                    // For demo purposes, we might not have a getCourseStudents for all courses efficiently
                    // But let's try to fetch for each course
                    const allStudents: any[] = []

                    // Mock data for now if API is not fully ready for aggregation, or real fetch
                    // Using real fetch loop:
                    for (const course of courses) {
                        try {
                            const studentsRes = await courseService.getCourseStudents(course._id)
                            if (studentsRes.data.success) {
                                studentsRes.data.data.forEach((s: any) => {
                                    allStudents.push({
                                        ...s,
                                        coursesCount: 1, // simplified
                                        averageProgress: s.progress || 0
                                    })
                                })
                            }
                        } catch (e) {
                            console.error(`Failed to fetch students for course ${course._id}`)
                        }
                    }
                    setStudents(allStudents)
                }
            } catch (error) {
                console.error('Failed to fetch students', error)
            } finally {
                setLoading(false)
            }
        }
        fetchStudents()
    }, [])

    const filteredStudents = students.filter(student =>
        student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (loading) return <div className="p-8 text-center">Loading students...</div>
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-neutral-900">Students</h1>
                    <p className="text-neutral-500 mt-1">View and manage students enrolled in your courses.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Search students..."
                        className="pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Students', value: students.length.toString(), icon: Users, color: 'text-primary-600' },
                    { label: 'Active Learners', value: students.filter(s => s.averageProgress > 0 && s.averageProgress < 100).length.toString(), icon: TrendingUp, color: 'text-success-600' },
                    { label: 'Completions', value: students.filter(s => s.averageProgress === 100).length.toString(), icon: CheckCircle, color: 'text-warning-600' },
                    { label: 'Avg Progress', value: `${Math.round(students.reduce((acc, s) => acc + (s.averageProgress || 0), 0) / (students.length || 1))}%`, icon: GraduationCap, color: 'text-secondary-600' },
                ].map((stat) => (
                    <Card key={stat.label}>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-neutral-500">{stat.label}</p>
                                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                            </div>
                            <div className={cn("p-3 rounded-xl bg-neutral-100", stat.color)}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-neutral-50 border-b border-neutral-200">
                            <tr>
                                <th className="text-left px-4 py-3 text-sm font-medium text-neutral-600">Student</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-neutral-600">Courses</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-neutral-600">Progress</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-neutral-600">Enrolled</th>
                                <th className="text-right px-4 py-3 text-sm font-medium text-neutral-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {filteredStudents.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                                        {searchQuery ? 'No students match your search.' : 'No students enrolled yet.'}
                                    </td>
                                </tr>
                            ) : (
                                filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-neutral-50">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center font-bold text-primary-600">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-neutral-900">{student.name}</p>
                                                    <p className="text-sm text-neutral-500">{student.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge variant="outline">{student.coursesCount} courses</Badge>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-20 h-2 bg-neutral-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={cn(
                                                            "h-full rounded-full",
                                                            student.averageProgress === 100 ? 'bg-success-500' : 'bg-primary-500'
                                                        )}
                                                        style={{ width: `${student.averageProgress}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm text-neutral-600">{student.averageProgress}%</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-neutral-500">{new Date(student.enrolledAt).toLocaleDateString()}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="sm">View</Button>
                                                <Button variant="ghost" size="sm">Message</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}

function Reviews() {
    const reviews = [
        { id: 1, course: 'React Masterclass 2024', student: 'Sarah Wilson', rating: 5, comment: 'Excellent course! Very comprehensive and well-structured.', date: 'Dec 24, 2024' },
        { id: 2, course: 'Node.js Backend Development', student: 'Mike Chen', rating: 4, comment: 'Great content, would love more advanced examples.', date: 'Dec 22, 2024' },
        { id: 3, course: 'React Masterclass 2024', student: 'Emily Brown', rating: 5, comment: 'Best React course I have taken. Highly recommended!', date: 'Dec 20, 2024' },
        { id: 4, course: 'Node.js Backend Development', student: 'Alex Kumar', rating: 5, comment: 'Perfect for beginners and intermediates alike.', date: 'Dec 18, 2024' },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-display font-bold text-neutral-900">Reviews</h1>
                <p className="text-neutral-500 mt-1">View feedback from your students.</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
                <Card className="bg-gradient-primary text-white border-0">
                    <p className="text-white/80">Average Rating</p>
                    <div className="flex items-center gap-2 mt-2">
                        <Star className="w-8 h-8 text-warning-400 fill-warning-400" />
                        <span className="text-4xl font-bold">4.8</span>
                    </div>
                    <p className="text-sm text-white/60 mt-2">Based on 245 reviews</p>
                </Card>
                <Card>
                    <p className="text-neutral-500">Total Reviews</p>
                    <p className="text-3xl font-bold mt-1">245</p>
                    <p className="text-sm text-success-600 mt-2">+12 this week</p>
                </Card>
                <Card>
                    <p className="text-neutral-500">Response Rate</p>
                    <p className="text-3xl font-bold mt-1">94%</p>
                    <p className="text-sm text-neutral-400 mt-2">Avg response: 2 hours</p>
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-bold text-neutral-900">Recent Reviews</h2>
                {reviews.map((review) => (
                    <Card key={review.id} className="hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center font-bold text-primary-600">
                                {review.student.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="font-medium text-neutral-900">{review.student}</p>
                                        <p className="text-sm text-neutral-500">{review.course}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={cn(
                                                    "w-4 h-4",
                                                    i < review.rating ? 'text-warning-500 fill-warning-500' : 'text-neutral-200'
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="mt-2 text-neutral-600">{review.comment}</p>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-sm text-neutral-400">{review.date}</span>
                                    <Button variant="ghost" size="sm">Reply</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

// Create Quiz Component
function CreateQuiz() {
    const [quizTitle, setQuizTitle] = useState('')
    const [selectedCourse, setSelectedCourse] = useState('')
    const [courses, setCourses] = useState<any[]>([])

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await courseService.getMyCourses()
                if (response.data.success) {
                    setCourses(response.data.data)
                }
            } catch (error) {
                console.error('Failed to fetch courses', error)
            }
        }
        fetchCourses()
    }, [])

    const [questions, setQuestions] = useState([
        { id: 1, question: '', options: ['', '', '', ''], correctAnswer: 0 }
    ])

    const addQuestion = () => {
        setQuestions([...questions, {
            id: questions.length + 1,
            question: '',
            options: ['', '', '', ''],
            correctAnswer: 0
        }])
    }

    const updateQuestion = (id: number, field: string, value: string | number) => {
        setQuestions(questions.map(q =>
            q.id === id ? { ...q, [field]: value } : q
        ))
    }

    const updateOption = (questionId: number, optionIndex: number, value: string) => {
        setQuestions(questions.map(q =>
            q.id === questionId
                ? { ...q, options: q.options.map((opt, i) => i === optionIndex ? value : opt) }
                : q
        ))
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-display font-bold text-neutral-900">Create Quiz</h1>
                <p className="text-neutral-500 mt-1">Add quizzes to assess your students' understanding.</p>
            </div>

            <Card className="p-6 space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                        label="Quiz Title"
                        placeholder="e.g. React Fundamentals Quiz"
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                    />
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Select Course</label>
                        <select
                            className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                            <option value="">Select a course</option>
                            {courses.map(course => (
                                <option key={course.id} value={course.id}>{course.title}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </Card>

            <div className="space-y-4">
                <h2 className="text-lg font-bold text-neutral-900">Questions</h2>

                {questions.map((q, qIndex) => (
                    <Card key={q.id} className="p-6 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                                {qIndex + 1}
                            </div>
                            <Input
                                className="flex-1"
                                placeholder="Enter your question..."
                                value={q.question}
                                onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 ml-14">
                            {q.options.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center gap-3">
                                    <button
                                        onClick={() => updateQuestion(q.id, 'correctAnswer', optIndex)}
                                        className={cn(
                                            "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                                            q.correctAnswer === optIndex
                                                ? "border-success-500 bg-success-500 text-white"
                                                : "border-neutral-300 hover:border-success-500"
                                        )}
                                    >
                                        {q.correctAnswer === optIndex && <CheckCircle className="w-4 h-4" />}
                                    </button>
                                    <Input
                                        placeholder={`Option ${optIndex + 1}`}
                                        value={option}
                                        onChange={(e) => updateOption(q.id, optIndex, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}

                <Button variant="outline" onClick={addQuestion} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                </Button>
            </div>

            <div className="flex gap-4">
                <Button variant="outline" className="flex-1">Save as Draft</Button>
                <Button className="flex-1">Publish Quiz</Button>
            </div>
        </div>
    )
}

function ManageResources() {
    const [selectedCourse, setSelectedCourse] = useState('')
    const [courses, setCourses] = useState<any[]>([])

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await courseService.getMyCourses()
                if (response.data.success) {
                    setCourses(response.data.data)
                }
            } catch (error) {
                console.error('Failed to fetch courses', error)
            }
        }
        fetchCourses()
    }, [])

    const [resources] = useState([
        { id: 1, name: 'React Cheat Sheet.pdf', size: '2.4 MB', type: 'pdf', downloads: 234, course: 'React Masterclass 2024' },
        { id: 2, name: 'Node.js Best Practices.pdf', size: '1.8 MB', type: 'pdf', downloads: 189, course: 'Node.js Backend Development' },
        { id: 3, name: 'Project Starter Files.zip', size: '15.2 MB', type: 'zip', downloads: 445, course: 'React Masterclass 2024' },
    ])
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-neutral-900">Manage Resources</h1>
                    <p className="text-neutral-500 mt-1">Upload and manage downloadable resources for your courses.</p>
                </div>
                <Button leftIcon={<Upload className="w-4 h-4" />}>Upload Resource</Button>
            </div>

            {/* Upload Section */}
            <Card className="p-6">
                <h2 className="font-bold text-neutral-900 mb-4">Upload New Resource</h2>
                <div className="border-2 border-dashed border-neutral-200 rounded-xl p-8 text-center hover:border-primary-400 hover:bg-primary-50/50 transition-colors cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-8 h-8 text-primary-600" />
                    </div>
                    <p className="font-medium text-neutral-900">Drag and drop files here</p>
                    <p className="text-sm text-neutral-500 mt-1">or click to browse</p>
                    <p className="text-xs text-neutral-400 mt-4">Supports: PDF, ZIP, MP4, PPT (Max 100MB)</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Select Course</label>
                        <select
                            className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                            <option value="">Select a course</option>
                            {courses.map(course => (
                                <option key={course.id} value={course.id}>{course.title}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Resource Type</label>
                        <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none">
                            <option value="document">Document (PDF, PPT)</option>
                            <option value="video">Video (MP4)</option>
                            <option value="archive">Archive (ZIP)</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
            </Card>

            {/* Existing Resources */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-neutral-900">Your Resources</h2>

                {resources.map((resource) => (
                    <Card key={resource.id} className="hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                                <FileText className="w-6 h-6 text-primary-600" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-neutral-900">{resource.name}</p>
                                <p className="text-sm text-neutral-500">{resource.course} • {resource.size}</p>
                            </div>
                            <div className="text-right mr-4">
                                <p className="font-semibold text-neutral-900">{resource.downloads}</p>
                                <p className="text-sm text-neutral-500">downloads</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                    <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-error-600 hover:bg-error-50">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export function MentorDashboard() {
    const { user } = useAuth()

    return (
        <DashboardLayout
            role="mentor"
            userName={`${user?.profile?.firstName || ''} ${user?.profile?.lastName || ''}`}
            userEmail={user?.email || ''}
            userAvatar={user?.profile?.avatar}
        >
            <Routes>
                <Route index element={<MentorHome />} />
                <Route path="create-course" element={<CreateCourse />} />
                <Route path="courses" element={<MyCourses />} />
                <Route path="students" element={<Students />} />
                <Route path="earnings" element={<Earnings />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="create-quiz" element={<CreateQuiz />} />
                <Route path="resources" element={<ManageResources />} />
                <Route path="*" element={<Navigate to="/mentor" replace />} />
            </Routes>
        </DashboardLayout>
    )
}
