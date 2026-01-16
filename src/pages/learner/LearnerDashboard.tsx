import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, Link, useParams } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout'
import { DashboardStats } from './components'
import { ResumeBuilder, JobPortal, PortfolioBuilder } from './'
import { Card, Button, Badge } from '@/components/ui'
import { useAuth } from '@/context'
import {
    Download, FileText, MessageSquare, Play, Star,
    ChevronLeft, ChevronRight, CheckCircle, Pause, Volume2,
    Settings, Maximize, X, Send, ArrowRight, Briefcase
} from 'lucide-react'
import { learnerService } from '@/services/learnerService'

// Course data for learner
const learnerCourses = [
    {
        id: 'react-masterclass',
        title: 'React Masterclass',
        instructor: 'John Smith',
        duration: '12 hours',
        rating: 4.8,
        students: 2500,
        progress: 45,
        lessons: [
            { id: 1, title: 'Introduction to React', duration: '10 min', completed: true, free: true },
            { id: 2, title: 'Setting Up Your Environment', duration: '20 min', completed: true, free: true },
            { id: 3, title: 'Components & JSX', duration: '25 min', completed: true, free: false },
            { id: 4, title: 'Props & State', duration: '30 min', completed: false, free: false },
            { id: 5, title: 'Hooks Deep Dive', duration: '45 min', completed: false, free: false },
            { id: 6, title: 'React Fundamentals Quiz', duration: '15 min', completed: false, type: 'quiz', free: false },
        ],
        resources: [
            { id: 1, name: 'React Cheat Sheet.pdf', size: '2.4 MB', type: 'pdf' },
            { id: 2, name: 'Project Starter Files.zip', size: '15.8 MB', type: 'zip' },
            { id: 3, name: 'Slides - Week 1.pptx', size: '8.2 MB', type: 'pptx' },
        ]
    },
    { id: 'nodejs-backend', title: 'Node.js Backend Development', instructor: 'Sarah Wilson', duration: '8 hours', rating: 4.6, students: 1800, progress: 0, lessons: [], resources: [] },
    { id: 'typescript-essentials', title: 'TypeScript Essentials', instructor: 'Mike Chen', duration: '6 hours', rating: 4.9, students: 3200, progress: 100, lessons: [], resources: [] },
    { id: 'system-design', title: 'System Design Interview', instructor: 'Alex Kumar', duration: '10 hours', rating: 4.7, students: 2100, progress: 20, lessons: [], resources: [] },
]

// Applications Component
const Applications = () => {
    const [applications, setApplications] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await learnerService.getApplications()
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

    if (loading) return <div className="p-8 text-center">Loading applications...</div>

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-neutral-900">My Applications</h2>
                <p className="text-neutral-500 mt-1">Track the status of your job applications.</p>
            </div>

            <div className="space-y-4">
                {applications.length === 0 ? (
                    <div className="text-center py-12 bg-neutral-50 rounded-lg">
                        <p className="text-neutral-500">No applications yet. Start exploring jobs!</p>
                        <Button className="mt-4" onClick={() => window.location.href = '/dashboard/jobs'}>Browse Jobs</Button>
                    </div>
                ) : (
                    applications.map((app) => (
                        <Card key={app._id} className="hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                                        <Briefcase className="w-6 h-6 text-neutral-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-neutral-900">{app.jobId?.title || 'Unknown Job'}</h3>
                                        <p className="text-sm text-neutral-500">{app.jobId?.company?.name || 'Unknown Company'} • {app.jobId?.location}</p>
                                        <div className="flex items-center gap-2 mt-2 text-xs text-neutral-400">
                                            <span>Applied: {new Date(app.appliedAt).toLocaleDateString()}</span>
                                            <span>•</span>
                                            <span>Type: {app.jobId?.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Badge
                                        className={
                                            app.status === 'offered' ? 'bg-success-100 text-success-700' :
                                                app.status === 'rejected' ? 'bg-error-100 text-error-700' :
                                                    app.status === 'interview' ? 'bg-warning-100 text-warning-700' :
                                                        'bg-blue-100 text-blue-700'
                                        }
                                    >
                                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                    </Badge>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}

// Premium Course Player Component
function CoursePlayer() {
    const { courseId, lessonId } = useParams()
    const course = learnerCourses.find(c => c.id === courseId) || learnerCourses[0]
    const currentLessonIndex = lessonId ? parseInt(lessonId) - 1 : 0
    const currentLesson = course.lessons[currentLessonIndex] || course.lessons[0]

    const [isPlaying, setIsPlaying] = useState(false)
    const [showReviewModal, setShowReviewModal] = useState(false)
    const [reviewRating, setReviewRating] = useState(0)
    const [reviewText, setReviewText] = useState('')

    // TODO: Replace with actual enrollment check from backend/auth
    const isEnrolled = false

    // If lesson is not free and user is not enrolled, show enrollment gate
    if (!currentLesson?.free && !isEnrolled) {
        return (
            <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-8">
                <div className="max-w-lg w-full bg-neutral-800 rounded-2xl p-8 text-center border border-neutral-700 shadow-2xl">
                    <div className="w-20 h-20 rounded-full bg-primary-600/20 text-primary-500 flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">🔒</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Enrollment Required</h2>
                    <p className="text-neutral-400 mb-6">
                        This lesson is only available to enrolled students. Enroll in <strong className="text-white">{course.title}</strong> to unlock all lessons.
                    </p>
                    <div className="space-y-3">
                        <a
                            href={`/courses/${course.id}`}
                            className="block w-full py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-500 transition-colors"
                        >
                            Enroll Now
                        </a>
                        <Link
                            to="/dashboard/courses"
                            className="block w-full py-3 border border-neutral-600 text-neutral-300 font-semibold rounded-xl hover:bg-neutral-700 transition-colors"
                        >
                            Browse My Courses
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-900">
            {/* Top Navigation */}
            <div className="bg-neutral-800/80 backdrop-blur-md border-b border-neutral-700 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard/courses" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2">
                            <ChevronLeft className="w-5 h-5" />
                            Back to Courses
                        </Link>
                        <span className="text-neutral-600">|</span>
                        <span className="text-white font-medium">{course.title}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-neutral-400">{course.progress}% complete</span>
                        <Button variant="outline" size="sm" onClick={() => setShowReviewModal(true)} className="border-neutral-600 text-white hover:bg-neutral-700">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Add Review
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* Main Video Area */}
                <div className="flex-1">
                    {/* Video Player or Quiz Interface */}
                    <div className="aspect-video bg-neutral-900 relative flex flex-col">
                        {currentLesson?.type === 'quiz' ? (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-neutral-900 text-white">
                                <div className="max-w-2xl w-full bg-neutral-800 rounded-2xl p-8 border border-neutral-700 shadow-2xl">
                                    <div className="w-16 h-16 rounded-full bg-primary-600/20 text-primary-500 flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2">{currentLesson.title}</h2>
                                    <p className="text-neutral-400 mb-8">Test your knowledge with 10 questions. Passing score: 80%</p>

                                    <div className="grid grid-cols-3 gap-4 mb-8 text-sm">
                                        <div className="bg-neutral-700/50 rounded-lg p-3">
                                            <p className="text-neutral-400">Questions</p>
                                            <p className="font-bold text-lg">10</p>
                                        </div>
                                        <div className="bg-neutral-700/50 rounded-lg p-3">
                                            <p className="text-neutral-400">Time Limit</p>
                                            <p className="font-bold text-lg">15 min</p>
                                        </div>
                                        <div className="bg-neutral-700/50 rounded-lg p-3">
                                            <p className="text-neutral-400">Attempts</p>
                                            <p className="font-bold text-lg">Unlimited</p>
                                        </div>
                                    </div>

                                    <Button className="w-full py-6 text-lg">
                                        Start Quiz
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="relative w-full h-full bg-gradient-to-b from-neutral-800 to-neutral-900">
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <button
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="w-24 h-24 rounded-full bg-primary-600/90 backdrop-blur-md flex items-center justify-center hover:bg-primary-500 transition-all shadow-2xl shadow-primary-600/30 hover:scale-105"
                                    >
                                        {isPlaying ? (
                                            <Pause className="w-10 h-10 text-white" />
                                        ) : (
                                            <Play className="w-10 h-10 text-white ml-2" />
                                        )}
                                    </button>
                                    <p className="text-white font-semibold text-xl mt-6">{currentLesson?.title || 'Introduction'}</p>
                                    <p className="text-neutral-400 text-sm mt-1">{currentLesson?.duration || '10 min'}</p>
                                </div>

                                {/* Video Controls */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                    {/* Progress Bar */}
                                    <div className="mb-4 group cursor-pointer">
                                        <div className="h-1 bg-neutral-600 rounded-full overflow-hidden group-hover:h-2 transition-all">
                                            <div className="h-full bg-primary-500 w-[35%]" />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-primary-400 transition-colors">
                                                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                                            </button>
                                            <button className="text-white hover:text-primary-400 transition-colors">
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <button className="text-white hover:text-primary-400 transition-colors">
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                            <div className="flex items-center gap-2">
                                                <Volume2 className="w-5 h-5 text-white" />
                                                <div className="w-20 h-1 bg-neutral-600 rounded-full">
                                                    <div className="h-full bg-white w-[80%] rounded-full" />
                                                </div>
                                            </div>
                                            <span className="text-white text-sm">0:00 / {currentLesson?.duration || '10:00'}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button className="text-white hover:text-primary-400 transition-colors">
                                                <Settings className="w-5 h-5" />
                                            </button>
                                            <button className="text-white hover:text-primary-400 transition-colors">
                                                <Maximize className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Content Below Video */}
                    <div className="bg-neutral-50 min-h-[400px]">
                        <div className="max-w-4xl mx-auto p-8 space-y-8">
                            {/* Lesson Notes */}
                            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-neutral-900">Lesson Notes</h3>
                                        <p className="text-sm text-neutral-500">Key concepts and takeaways</p>
                                    </div>
                                </div>

                                <p className="text-neutral-600 leading-relaxed mb-6">
                                    This lesson covers {currentLesson?.title || 'Introduction to the course'}. Watch the video above to learn the key concepts, then practice with the exercises below. Take notes as you go - they'll help you remember the important points.
                                </p>

                                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-amber-800 flex items-center gap-2">
                                        <span>💡</span> Key Takeaways
                                    </h4>
                                    <ul className="mt-3 space-y-2 text-amber-700">
                                        <li className="flex items-start gap-2">
                                            <span>•</span>
                                            <span>Understand the core concepts of {course.title.toLowerCase()}</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span>•</span>
                                            <span>Practice with real-world examples</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span>•</span>
                                            <span>Apply these skills in the upcoming exercises</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Resources */}
                            {course.resources.length > 0 && (
                                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                                    <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                        <Download className="w-5 h-5 text-primary-600" />
                                        Downloadable Resources
                                    </h3>
                                    <div className="space-y-3">
                                        {course.resources.map((resource) => (
                                            <div key={resource.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                                                        <FileText className="w-5 h-5 text-primary-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-neutral-900">{resource.name}</p>
                                                        <p className="text-sm text-neutral-500">{resource.size}</p>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Download
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Mark as Complete */}
                            <div className="text-center">
                                <Button size="lg" className="px-12">
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    Mark as Complete
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Course Curriculum */}
                <div className="w-80 bg-neutral-800 border-l border-neutral-700 hidden lg:block overflow-y-auto max-h-screen">
                    <div className="p-4 border-b border-neutral-700">
                        <h3 className="font-bold text-white">Course Content</h3>
                        <p className="text-sm text-neutral-400 mt-1">{course.lessons.length} lessons</p>
                    </div>
                    <div className="p-2">
                        {course.lessons.map((lesson, index) => (
                            <Link
                                key={lesson.id}
                                to={`/dashboard/courses/${courseId}/lesson/${index + 1}`}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${currentLessonIndex === index
                                    ? 'bg-primary-600/20 border border-primary-500/30'
                                    : 'hover:bg-neutral-700/50'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${lesson.completed
                                    ? 'bg-success-500/20 text-success-400'
                                    : currentLessonIndex === index
                                        ? 'bg-primary-500/20 text-primary-400'
                                        : 'bg-neutral-700 text-neutral-400'
                                    }`}>
                                    {lesson.completed ? (
                                        <CheckCircle className="w-4 h-4" />
                                    ) : (
                                        <span className="text-sm font-medium">{index + 1}</span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium truncate ${currentLessonIndex === index ? 'text-primary-300' : 'text-neutral-200'
                                        }`}>{lesson.title}</p>
                                    <p className="text-xs text-neutral-500">{lesson.duration}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Review Modal */}
            {showReviewModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-neutral-900">Write a Review</h3>
                            <button onClick={() => setShowReviewModal(false)} className="text-neutral-400 hover:text-neutral-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setReviewRating(star)}
                                            className="transition-transform hover:scale-110"
                                        >
                                            <Star className={`w-8 h-8 ${star <= reviewRating
                                                ? 'text-warning-500 fill-warning-500'
                                                : 'text-neutral-300'
                                                }`} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Your Review</label>
                                <textarea
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="Share your experience with this course..."
                                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none resize-none"
                                    rows={4}
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" className="flex-1" onClick={() => setShowReviewModal(false)}>
                                    Cancel
                                </Button>
                                <Button className="flex-1">
                                    <Send className="w-4 h-4 mr-2" />
                                    Submit Review
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

// Courses/Training Modules Component with clickable cards
function Courses() {
    const [courses, setCourses] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const colorSchemes = [
        { bg: 'from-orange-500 to-rose-500', light: 'bg-orange-100', border: 'border-l-orange-500' },
        { bg: 'from-sky-500 to-blue-600', light: 'bg-sky-100', border: 'border-l-sky-500' },
        { bg: 'from-emerald-500 to-teal-600', light: 'bg-emerald-100', border: 'border-l-emerald-500' },
        { bg: 'from-purple-500 to-violet-600', light: 'bg-purple-100', border: 'border-l-purple-500' },
    ]
    const icons = ['⚛️', '🚀', '📘', '🔧']

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await learnerService.getMyCourses()
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
            <div>
                <h1 className="text-2xl font-display font-bold text-neutral-900">Training Modules</h1>
                <p className="text-neutral-500 mt-1">Enhance your skills with industry-relevant courses.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {courses.length === 0 ? (
                    <div className="col-span-4 text-center p-12 bg-neutral-50 rounded-lg">
                        <p className="text-neutral-500">You haven't enrolled in any courses yet.</p>
                        <Button className="mt-4" onClick={() => window.location.href = '/courses'}>Explore Courses</Button>
                    </div>
                ) : (
                    courses.map((course, index) => {
                        const colors = colorSchemes[index % colorSchemes.length]
                        const icon = icons[index % icons.length]

                        return (
                            <div key={course._id} className={`group bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 ${colors.border}`}>
                                {/* Header with Icon and Title */}
                                <div className="p-5 pb-4">
                                    <div className="flex items-start gap-4 mb-3">
                                        {/* Icon Badge */}
                                        <div className={`w-12 h-12 rounded-xl ${colors.light} flex items-center justify-center text-2xl flex-shrink-0`}>
                                            {icon}
                                        </div>

                                        {/* Title */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-neutral-900 text-base leading-tight mb-1 group-hover:text-primary-600 transition-colors">
                                                {course.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-neutral-500 mb-3 line-clamp-2">
                                        {course.subtitle || 'Learn essential skills'}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
                                        <span className="flex items-center gap-1">
                                            <span>⭐</span> {course.rating || 5.0}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span>⏱️</span> {course.duration || '10h'}
                                        </span>
                                    </div>

                                    {/* Progress Bar (if in progress) */}
                                    {course.progress > 0 && course.progress < 100 && (
                                        <div className="mb-3">
                                            <div className="flex justify-between text-xs text-neutral-400 mb-1">
                                                <span>Progress</span>
                                                <span>{course.progress}%</span>
                                            </div>
                                            <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full bg-gradient-to-r ${colors.bg} rounded-full transition-all`}
                                                    style={{ width: `${course.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Status Badge */}
                                    <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${course.progress === 100 ? 'bg-emerald-100 text-emerald-700' :
                                        course.progress > 0 ? 'bg-amber-100 text-amber-700' :
                                            'bg-blue-100 text-blue-700'
                                        }`}>
                                        {course.progress === 100 ? 'Completed' : course.progress > 0 ? 'In Progress' : 'Not Started'}
                                    </span>
                                </div>

                                {/* Action Button */}
                                <div className="px-5 pb-5">
                                    <Link
                                        to={`/dashboard/courses/${course._id}/lesson/1`}
                                        className={`w-full py-2.5 bg-gradient-to-r ${colors.bg} text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity text-center flex items-center justify-center gap-2`}
                                    >
                                        {course.progress === 100 ? 'Review Course' : course.progress > 0 ? 'Continue' : 'Start Learning'}
                                        <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

function DashboardHome() {
    const { user } = useAuth()
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await learnerService.getDashboardStats()
                if (response.data.success) {
                    setStats(response.data.data)
                }
            } catch (error) {
                console.error('Failed to fetch dashboard stats', error)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) return <div className="p-8 text-center">Loading dashboard...</div>

    const profileCompleteness = stats?.profileCompleteness || 0

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-neutral-900">
                        Welcome back, {user?.profile?.firstName || 'there'}! 👋
                    </h2>
                    <p className="text-neutral-500">
                        Here's what's happening with your job search today.
                    </p>
                </div>
                <Button>Find Jobs</Button>
            </div>

            {/* Stats */}
            <DashboardStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recommended Jobs */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-neutral-900">Recommended Jobs</h3>
                        <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                            View All
                        </Button>
                    </div>

                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                                    <Briefcase className="w-6 h-6 text-neutral-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-semibold text-neutral-900">Senior React Developer</h4>
                                            <p className="text-sm text-neutral-500">TechCorp Inc. • Remote</p>
                                        </div>
                                        <Badge variant="secondary">Full Time</Badge>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2">
                                        <Badge variant="outline" size="sm">React</Badge>
                                        <Badge variant="outline" size="sm">TypeScript</Badge>
                                        <Badge variant="outline" size="sm">Node.js</Badge>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Profile Completion */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-neutral-900">Profile Strength</h3>
                    <Card className="bg-gradient-primary text-white border-0">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Intermediate</span>
                                <span className="font-bold">{profileCompleteness}%</span>
                            </div>
                            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full bg-white transition-all duration-500" style={{ width: `${profileCompleteness}%` }} />
                            </div>
                            <p className="text-sm text-white/80">
                                Complete your profile to get 3x more job invites.
                            </p>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="w-full bg-white text-primary-600 hover:bg-neutral-50"
                                onClick={() => window.location.href = '/dashboard/resume'}
                            >
                                Complete Profile
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export function LearnerDashboard() {
    const { user } = useAuth()

    return (
        <Routes>
            {/* Course Player - Full Screen */}
            <Route path="courses/:courseId/lesson/:lessonId" element={<CoursePlayer />} />

            {/* Dashboard Layout Routes */}
            <Route path="*" element={
                <DashboardLayout
                    role="learner"
                    userName={`${user?.profile?.firstName || ''} ${user?.profile?.lastName || ''}`}
                    userEmail={user?.email || ''}
                    userAvatar={user?.profile?.avatar}
                >
                    <Routes>
                        <Route index element={<DashboardHome />} />
                        <Route path="resume" element={<ResumeBuilder />} />
                        <Route path="portfolio" element={<PortfolioBuilder />} />
                        <Route path="jobs" element={<JobPortal />} />
                        <Route path="courses" element={<Courses />} />
                        <Route path="applications" element={<Applications />} />
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                </DashboardLayout>
            } />
        </Routes>
    )
}

