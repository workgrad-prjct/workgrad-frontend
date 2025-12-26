// User Types
export interface User {
    _id: string
    email: string
    role: 'learner' | 'employer' | 'mentor' | 'admin'
    profile: {
        firstName: string
        lastName: string
        avatar?: string
        phone?: string
        bio?: string
    }
    isVerified: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
}

// Learner Types
export interface Education {
    _id?: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate?: string
    grade?: string
}

export interface Experience {
    _id?: string
    company: string
    title: string
    description: string
    startDate: string
    endDate?: string
    isCurrent?: boolean
}

export interface PortfolioItem {
    _id?: string
    title: string
    description: string
    imageUrl?: string
    projectUrl?: string
    tags?: string[]
}

export interface Certification {
    _id?: string
    name: string
    issuer: string
    date: string
    credentialUrl?: string
}

export interface LearnerProfile {
    _id: string
    userId: string
    education: Education[]
    skills: string[]
    experience: Experience[]
    resume: {
        content: Record<string, unknown>
        pdfUrl?: string
        lastUpdated?: string
    }
    portfolio: PortfolioItem[]
    certifications: Certification[]
}

// Employer Types
export interface Company {
    name: string
    logo?: string
    website?: string
    industry: string
    size: string
    description: string
    location: string
}

export interface EmployerProfile {
    _id: string
    userId: string
    company: Company
    subscription: {
        plan: 'free' | 'business' | 'enterprise'
        expiresAt?: string
    }
}

// Job Types
export interface Job {
    _id: string
    employerId: string
    employer?: EmployerProfile
    title: string
    description: string
    type: 'full-time' | 'part-time' | 'internship' | 'contract'
    location: string
    isRemote: boolean
    salary: {
        min: number
        max: number
        currency: string
    }
    requirements: string[]
    skills: string[]
    deadline: string
    status: 'draft' | 'active' | 'closed'
    applicationsCount?: number
    createdAt: string
    updatedAt: string
}

// Application Types
export interface Interview {
    _id?: string
    scheduledAt: string
    type: 'phone' | 'video' | 'onsite'
    notes?: string
    feedback?: string
    score?: number
}

export interface Application {
    _id: string
    jobId: string
    job?: Job
    learnerId: string
    learner?: LearnerProfile & { user?: User }
    resumeUrl?: string
    coverLetter?: string
    status: 'pending' | 'reviewed' | 'shortlisted' | 'interview' | 'offered' | 'rejected' | 'accepted'
    interviews: Interview[]
    appliedAt: string
}

// Course Types
export interface Lecture {
    _id?: string
    title: string
    type: 'video' | 'article' | 'quiz' | 'assignment'
    content: Record<string, unknown>
    duration?: number
    resources?: string[]
}

export interface CourseSection {
    _id?: string
    sectionTitle: string
    lectures: Lecture[]
}

export interface Course {
    _id: string
    mentorId: string
    mentor?: User
    title: string
    subtitle?: string
    description: string
    thumbnail?: string
    promoVideo?: string
    category: string
    level: 'beginner' | 'intermediate' | 'advanced'
    language: string
    price: number
    currency: string
    objectives: string[]
    requirements: string[]
    targetAudience?: string
    curriculum: CourseSection[]
    status: 'draft' | 'pending_review' | 'published' | 'rejected'
    rating: {
        average: number
        count: number
    }
    enrollments: number
    createdAt: string
    updatedAt: string
}

// Enrollment Types
export interface Enrollment {
    _id: string
    courseId: string
    course?: Course
    learnerId: string
    progress: {
        completedLectures: string[]
        currentLecture?: string
        percentage: number
    }
    enrolledAt: string
    completedAt?: string
}

// API Response Types
export interface ApiResponse<T> {
    success: boolean
    data?: T
    message?: string
    error?: string
}

export interface PaginatedResponse<T> {
    success: boolean
    data: T[]
    pagination: {
        page: number
        limit: number
        total: number
        pages: number
    }
}

// Auth Types
export interface LoginCredentials {
    email: string
    password: string
}

export interface RegisterData {
    email: string
    password: string
    role: 'learner' | 'employer' | 'mentor'
    firstName: string
    lastName: string
}

export interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean
}
