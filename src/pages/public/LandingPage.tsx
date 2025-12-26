import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    ArrowRight,
    GraduationCap,
    Building2,
    Users,
    FileText,
    Briefcase,
    BookOpen,
    Target,
    TrendingUp,
    Award,
    Trophy,
    CheckCircle,
    Star,
    Play,
    Sparkles,
    Zap,
    Globe,
    Shield,
    Code2,
    Palette,
    BarChart3,
    Megaphone,
    UserCog,
    Layers,
    Database,
    Server,
} from 'lucide-react'
import { Header, Footer } from '@/components/layout'
import { Button, Card, Badge, Avatar, AvatarGroup } from '@/components/ui'
import { cn } from '@/utils'

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
}

// Stats data
const stats = [
    { value: '50K+', label: 'Active Learners', icon: GraduationCap },
    { value: '2K+', label: 'Partner Companies', icon: Building2 },
    { value: '500+', label: 'Expert Mentors', icon: Users },
    { value: '10K+', label: 'Jobs Posted', icon: Briefcase },
]

// Features data
const learnerFeatures = [
    {
        icon: FileText,
        title: 'ATS-Friendly Resume Builder',
        description: 'Create professional resumes with optimized keywords that pass Applicant Tracking Systems.',
    },
    {
        icon: Briefcase,
        title: 'Job & Internship Listings',
        description: 'Access thousands of curated opportunities from top companies matched to your skills.',
    },
    {
        icon: BookOpen,
        title: 'Skill Development Courses',
        description: 'Learn industry-relevant tools and technologies from expert mentors.',
    },
    {
        icon: Target,
        title: 'Personalized Matching',
        description: 'AI-powered recommendations based on your profile, preferences, and career goals.',
    },
]

const employerFeatures = [
    {
        icon: Building2,
        title: 'Campus Hiring',
        description: 'Streamline your campus recruitment with AI-powered candidate assessment.',
    },
    {
        icon: Globe,
        title: 'Virtual Hiring Drives',
        description: 'Conduct seamless virtual hiring campaigns with integrated video interviews.',
    },
    {
        icon: TrendingUp,
        title: 'Analytics Dashboard',
        description: 'Get real-time insights on hiring funnel, candidate quality, and engagement.',
    },
    {
        icon: Shield,
        title: 'Verified Talent Pool',
        description: 'Access pre-screened candidates with verified skills and credentials.',
    },
]

// Courses/Tracks data with icons and descriptions
const popularTracks = [
    {
        title: 'Programming',
        slug: 'programming-tools',
        description: 'Master coding languages for software development',
        Icon: Code2,
        iconBg: 'from-blue-500 to-indigo-600',
        tools: ['Python', 'JavaScript', 'R'],
        students: 12500,
        rating: 4.8,
        color: 'from-blue-500 to-indigo-600',
    },
    {
        title: 'Design',
        slug: 'ui-ux-designer',
        description: 'Create stunning visual designs and interfaces',
        Icon: Palette,
        iconBg: 'from-pink-500 to-rose-600',
        tools: ['Figma', 'Adobe Photoshop', 'Sketch'],
        students: 6800,
        rating: 4.8,
        color: 'from-pink-500 to-rose-600',
    },
    {
        title: 'Analytics',
        slug: 'data-professional',
        description: 'Transform data into actionable insights',
        Icon: BarChart3,
        iconBg: 'from-emerald-500 to-teal-600',
        tools: ['SQL', 'Power BI', 'Tableau'],
        students: 8900,
        rating: 4.9,
        color: 'from-emerald-500 to-teal-600',
    },
    {
        title: 'Marketing',
        slug: 'digital-marketer',
        description: 'Drive growth with digital marketing strategies',
        Icon: Megaphone,
        iconBg: 'from-orange-500 to-amber-600',
        tools: ['SEO', 'Google Ads', 'Google Tag Manager'],
        students: 7200,
        rating: 4.7,
        color: 'from-orange-500 to-amber-600',
    },
    {
        title: 'HR & Operations',
        slug: 'hr-operations',
        description: 'Streamline operations and manage teams effectively',
        Icon: UserCog,
        iconBg: 'from-purple-500 to-violet-600',
        tools: ['Salesforce', 'Zoho CRM', 'BambooHR'],
        students: 5400,
        rating: 4.6,
        color: 'from-purple-500 to-violet-600',
    },
    {
        title: 'Full Stack',
        slug: 'programming-tools',
        description: 'Build complete applications from front to back',
        Icon: Layers,
        iconBg: 'from-cyan-500 to-blue-600',
        tools: ['React', 'Node.js', 'Docker'],
        students: 15000,
        rating: 4.9,
        color: 'from-cyan-500 to-blue-600',
    },
]

// Full Stack Learning Paths data
const fullStackPaths = [
    {
        slug: 'mern-stack',
        title: 'MERN Stack',
        description: 'MongoDB, Express, React & Node.js development',
        Icon: Database,
        iconBg: 'from-green-500 to-emerald-600',
        topics: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
        students: '15K+',
        color: 'from-green-500 to-emerald-600',
    },
    {
        slug: 'mean-stack',
        title: 'MEAN Stack',
        description: 'MongoDB, Express, Angular & Node.js development',
        Icon: Server,
        iconBg: 'from-red-500 to-rose-600',
        topics: ['TypeScript', 'Angular', 'Node.js', 'MongoDB'],
        students: '8.5K+',
        color: 'from-red-500 to-rose-600',
    },
    {
        slug: 'python-fullstack',
        title: 'Python Full Stack',
        description: 'Python, Django, React & PostgreSQL development',
        Icon: Code2,
        iconBg: 'from-yellow-500 to-orange-600',
        topics: ['Python', 'Django', 'React', 'PostgreSQL'],
        students: '12K+',
        color: 'from-yellow-500 to-orange-600',
    },
]

// Featured Competitions data
const featuredCompetitions = [
    {
        id: 'nest-2024',
        title: 'NEST 2.0',
        subtitle: 'National Engineering Skills Tournament',
        description: 'Register now and compete with the best engineering minds across India',
        gradient: 'from-blue-100 via-indigo-50 to-purple-100',
        accentColor: 'bg-primary-600',
        logo: 'NEST',
        logoColor: 'text-primary-400',
    },
    {
        id: 'code-fest-2024',
        title: 'CodeFest 2024',
        subtitle: 'Annual Coding Championship',
        description: 'Showcase your coding skills and win exciting prizes worth ₹10 Lakhs',
        gradient: 'from-emerald-100 via-teal-50 to-cyan-100',
        accentColor: 'bg-emerald-600',
        logo: 'CODE',
        logoColor: 'text-emerald-400',
    },
    {
        id: 'design-sprint',
        title: 'Design Sprint',
        subtitle: 'UI/UX Design Challenge',
        description: 'Create innovative designs and get featured on our platform',
        gradient: 'from-pink-100 via-rose-50 to-orange-100',
        accentColor: 'bg-pink-600',
        logo: 'DESIGN',
        logoColor: 'text-pink-400',
    },
]

// Testimonials
const testimonials = [
    {
        name: 'Priya Sharma',
        role: 'Software Engineer at Google',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        content: 'WorkGrad helped me land my dream job at Google. The resume builder and personalized job matching were game-changers!',
        rating: 5,
    },
    {
        name: 'Rahul Verma',
        role: 'Product Manager at Microsoft',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        content: 'The skill courses on WorkGrad gave me the edge I needed. Highly recommend for any aspiring tech professional.',
        rating: 5,
    },
    {
        name: 'Anita Desai',
        role: 'HR Director at Infosys',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        content: 'As an employer, WorkGrad has transformed our campus hiring. The quality of candidates is exceptional.',
        rating: 5,
    },
]

// Companies with brand colors
const companies = [
    { name: 'Google', initial: 'G', color: 'bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500' },
    { name: 'Microsoft', initial: 'M', color: 'bg-gradient-to-br from-blue-600 to-cyan-500' },
    { name: 'Amazon', initial: 'A', color: 'bg-gradient-to-br from-orange-500 to-yellow-500' },
    { name: 'Meta', initial: 'M', color: 'bg-gradient-to-br from-blue-500 to-indigo-600' },
    { name: 'Apple', initial: '', color: 'bg-gradient-to-br from-neutral-800 to-neutral-600' },
    { name: 'Flipkart', initial: 'F', color: 'bg-gradient-to-br from-yellow-400 to-blue-600' },
    { name: 'Infosys', initial: 'i', color: 'bg-gradient-to-br from-blue-600 to-blue-800' },
    { name: 'TCS', initial: 'T', color: 'bg-gradient-to-br from-red-600 to-rose-700' },
]

export function LandingPage() {
    // Carousel state and auto-scroll
    const [activeSlide, setActiveSlide] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % featuredCompetitions.length)
        }, 3000) // Change slide every 3 seconds

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-white">
                    {/* Animated blobs */}
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-[100px] animate-blob" />
                    <div className="absolute top-40 right-20 w-96 h-96 bg-secondary-500/10 rounded-full blur-[120px] animate-blob animate-blob-delay-2000" />
                    <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-accent-500/10 rounded-full blur-[100px] animate-blob animate-blob-delay-4000" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="text-center lg:text-left"
                        >
                            {/* Badge */}
                            <motion.div variants={fadeInUp}>
                                <Badge variant="primary" size="lg">
                                    <Sparkles className="w-4 h-4 mr-1" />
                                    Trusted by 50,000+ learners
                                </Badge>
                            </motion.div>

                            {/* Heading */}
                            <motion.h1
                                variants={fadeInUp}
                                className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-neutral-900 leading-tight"
                            >
                                Launch Your Career with <span className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
                                    WorkGrad
                                </span>
                            </motion.h1>

                            {/* Description */}
                            <motion.p
                                variants={fadeInUp}
                                className="mt-6 text-lg text-neutral-500 max-w-xl mx-auto lg:mx-0"
                            >
                                Connect with top employers, build job-ready skills, and get hired.
                                Your complete platform for career success — from resume building to skill training.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                variants={fadeInUp}
                                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            >
                                <Button
                                    size="xl"
                                    rightIcon={<ArrowRight className="w-5 h-5" />}
                                >
                                    Get Started Free
                                </Button>
                                <Button
                                    variant="outline"
                                    size="xl"
                                    leftIcon={<Play className="w-5 h-5" />}
                                    className="border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                                >
                                    Watch Demo
                                </Button>
                            </motion.div>

                            {/* Social Proof */}
                            <motion.div
                                variants={fadeInUp}
                                className="mt-10 flex items-center gap-4 justify-center lg:justify-start"
                            >
                                <AvatarGroup max={4} size="md">
                                    <Avatar src="https://randomuser.me/api/portraits/women/1.jpg" name="User 1" />
                                    <Avatar src="https://randomuser.me/api/portraits/men/2.jpg" name="User 2" />
                                    <Avatar src="https://randomuser.me/api/portraits/women/3.jpg" name="User 3" />
                                    <Avatar src="https://randomuser.me/api/portraits/men/4.jpg" name="User 4" />
                                    <Avatar src="https://randomuser.me/api/portraits/women/5.jpg" name="User 5" />
                                </AvatarGroup>
                                <div className="text-left">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star key={i} className="w-4 h-4 fill-accent-500 text-accent-500" />
                                        ))}
                                        <span className="ml-1 text-neutral-900 font-semibold">4.9</span>
                                    </div>
                                    <p className="text-sm text-neutral-500">from 5,000+ reviews</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Content - Hero Image/Illustration */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="hidden lg:block relative"
                        >
                            {/* Floating Cards */}
                            <div className="relative w-full h-[500px]">
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72"
                                >
                                    <Card variant="elevated" className="p-6 bg-white border-neutral-200 shadow-lg">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                                                <Briefcase className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-neutral-900 font-semibold">New Job Match!</p>
                                                <p className="text-sm text-neutral-500">Software Engineer at Google</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="success">95% Match</Badge>
                                            <Badge variant="secondary">Remote</Badge>
                                        </div>
                                    </Card>
                                </motion.div>

                                {/* Top Right Card */}
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                                    className="absolute top-10 right-0 w-56"
                                >
                                    <Card variant="elevated" className="p-4 bg-white border-neutral-200 shadow-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                                                <CheckCircle className="w-5 h-5 text-success-600" />
                                            </div>
                                            <div>
                                                <p className="text-neutral-900 font-medium text-sm">Resume Score</p>
                                                <p className="text-2xl font-bold text-success-600">92/100</p>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>

                                {/* Bottom Left Card */}
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                    className="absolute bottom-10 left-0 w-60"
                                >
                                    <Card variant="elevated" className="p-4 bg-white border-neutral-200 shadow-lg">
                                        <div className="flex items-center gap-3">
                                            <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" name="Mentor" size="lg" />
                                            <div>
                                                <p className="text-neutral-900 font-medium">Course Completed!</p>
                                                <p className="text-sm text-neutral-500">React Masterclass</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <Award className="w-4 h-4 text-accent-500" />
                                                    <span className="text-xs text-accent-600">Certificate Earned</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <div className="w-6 h-10 border-2 border-neutral-300 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-2 bg-neutral-400 rounded-full" />
                    </div>
                </motion.div>
            </section >

            {/* Stats Section */}
            < section className="py-16 bg-white border-b border-neutral-100" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                variants={fadeInUp}
                                className="text-center"
                            >
                                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 rounded-2xl mb-4">
                                    <stat.icon className="w-7 h-7 text-primary-600" />
                                </div>
                                <p className="text-3xl lg:text-4xl font-display font-bold text-neutral-900">
                                    {stat.value}
                                </p>
                                <p className="mt-1 text-neutral-500">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section >

            {/* Company Logos */}
            {/* <section className="py-16 bg-white border-y border-neutral-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center text-sm font-semibold tracking-wider text-neutral-400 mb-10"
                    >
                        TRUSTED BY <span className="text-primary-600">LEADING COMPANIES</span>
                    </motion.p>

                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 pb-4">
                        {companies.slice(0, 6).map((company, index) => (
                            <motion.div
                                key={company.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className={cn(
                                    'w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3',
                                    company.color
                                )}>
                                    {company.initial || ''}
                                </div>
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                    <span className="text-xs font-semibold text-neutral-500 bg-white px-2 py-1 rounded-md shadow-sm border border-neutral-100">
                                        {company.name}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Featured Competitions Carousel */}
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <Badge variant="secondary" size="lg">
                            <Trophy className="w-4 h-4 mr-1" />
                            Featured
                        </Badge>
                    </motion.div>

                    {/* Carousel Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="overflow-hidden rounded-2xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeSlide}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                >
                                    <Card className={cn(
                                        'p-8 md:p-12 bg-gradient-to-r overflow-hidden relative',
                                        featuredCompetitions[activeSlide].gradient
                                    )}>
                                        <div className="flex flex-col md:flex-row items-center gap-8">
                                            {/* Content */}
                                            <div className="flex-1 text-center md:text-left">
                                                <h3 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-2">
                                                    {featuredCompetitions[activeSlide].title}
                                                </h3>
                                                <p className="text-primary-600 font-medium mb-3">
                                                    {featuredCompetitions[activeSlide].subtitle}
                                                </p>
                                                <p className="text-neutral-600 mb-6 max-w-md">
                                                    {featuredCompetitions[activeSlide].description}
                                                </p>
                                                <Button
                                                    className={cn(featuredCompetitions[activeSlide].accentColor, 'hover:opacity-90')}
                                                >
                                                    Register Now
                                                </Button>
                                            </div>

                                            {/* Logo Card */}
                                            <div className="flex-shrink-0">
                                                <div className="w-48 h-32 md:w-64 md:h-40 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center border border-white/50">
                                                    <span className={cn('text-4xl md:text-5xl font-display font-bold', featuredCompetitions[activeSlide].logoColor)}>
                                                        {featuredCompetitions[activeSlide].logo}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Carousel Indicators */}
                        <div className="flex justify-center gap-2 mt-6">
                            {featuredCompetitions.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveSlide(index)}
                                    className={cn(
                                        'h-2 rounded-full transition-all duration-300',
                                        index === activeSlide ? 'w-8 bg-primary-600' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                                    )}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features for Learners */}
            < section className="py-24 bg-white" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.div variants={fadeInUp}>
                            <Badge variant="primary" size="lg">
                                <GraduationCap className="w-4 h-4 mr-1" />
                                For Learners
                            </Badge>
                        </motion.div>
                        <motion.h2
                            variants={fadeInUp}
                            className="mt-4 text-3xl lg:text-4xl font-display font-bold text-neutral-900"
                        >
                            Everything You Need to
                            <span className="text-gradient"> Launch Your Career</span>
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="mt-4 text-lg text-neutral-500 max-w-2xl mx-auto"
                        >
                            From building your resume to landing your dream job, we've got you covered
                            with powerful tools and resources.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {learnerFeatures.map((feature, index) => (
                            <motion.div key={feature.title} variants={fadeInUp}>
                                <Card hover variant="bordered" className="h-full">
                                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-neutral-500 text-sm">{feature.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 text-center"
                    >
                        <Button
                            variant="secondary"
                            size="lg"
                            rightIcon={<ArrowRight className="w-4 h-4" />}
                        >
                            Explore All Features
                        </Button>
                    </motion.div>
                </div>
            </section >

            {/* Features for Employers */}
            < section className="py-24 bg-white relative overflow-hidden" >
                {/* Background decoration */}
                < div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-[100px]" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.div variants={fadeInUp}>
                            <Badge variant="secondary" size="lg" className="bg-secondary-100 text-secondary-600 border-secondary-200">
                                <Building2 className="w-4 h-4 mr-1" />
                                For Employers
                            </Badge>
                        </motion.div>
                        <motion.h2
                            variants={fadeInUp}
                            className="mt-4 text-3xl lg:text-4xl font-display font-bold text-neutral-900"
                        >
                            Hire Top Talent
                            <span className="text-gradient-secondary"> Faster & Smarter</span>
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="mt-4 text-lg text-neutral-500 max-w-2xl mx-auto"
                        >
                            Streamline your recruitment with AI-powered hiring automation,
                            campus drives, and virtual hiring campaigns.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {employerFeatures.map((feature, index) => (
                            <motion.div key={feature.title} variants={fadeInUp}>
                                <Card variant="bordered" hover className="h-full">
                                    <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-4">
                                        <feature.icon className="w-6 h-6 text-secondary-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-neutral-500 text-sm">{feature.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 text-center"
                    >
                        <Button
                            size="lg"
                            className="bg-secondary-600 text-white hover:bg-secondary-700"
                            rightIcon={<ArrowRight className="w-4 h-4" />}
                        >
                            Start Hiring
                        </Button>
                    </motion.div>
                </div>
            </section >

            {/* Popular Courses/Tracks */}
            < section className="py-24 bg-white" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.div variants={fadeInUp}>
                            <Badge variant="primary" size="lg">
                                <BookOpen className="w-4 h-4 mr-1" />
                                Skill Development
                            </Badge>
                        </motion.div>
                        <motion.h2
                            variants={fadeInUp}
                            className="mt-4 text-3xl lg:text-4xl font-display font-bold text-neutral-900"
                        >
                            Popular
                            <span className="text-gradient"> Tools Tracks</span>
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="mt-4 text-lg text-neutral-500 max-w-2xl mx-auto"
                        >
                            Master in-demand skills with our comprehensive learning paths
                            designed by industry experts.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {popularTracks.map((track, index) => (
                            <motion.div key={track.title} variants={fadeInUp}>
                                <Link to={`/courses/category/${track.slug}`}>
                                    <Card hover variant="elevated" className="h-full p-6 cursor-pointer group">
                                        <div className="flex items-start gap-4">
                                            {/* Icon */}
                                            <div className={cn(
                                                'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform',
                                                track.iconBg
                                            )}>
                                                <track.Icon className="w-6 h-6 text-white" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-semibold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                                                    {track.title}
                                                </h3>
                                                <p className="text-sm text-neutral-500 mb-3 line-clamp-2">
                                                    {track.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Tool Tags */}
                                        <div className="flex flex-wrap gap-2 mt-4 mb-4">
                                            {track.tools.map((tool) => (
                                                <span
                                                    key={tool}
                                                    className={cn(
                                                        'px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r',
                                                        track.color
                                                    )}
                                                >
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Explore Link */}
                                        <div className="flex items-center text-primary-600 font-medium text-sm group-hover:text-primary-700">
                                            <span>Explore Courses</span>
                                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 text-center"
                    >
                        <Link to="/courses/categories">
                            <Button
                                variant="secondary"
                                size="lg"
                                rightIcon={<ArrowRight className="w-4 h-4" />}
                            >
                                Browse All Courses
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section >

            {/* Full Stack Learning Paths Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.div variants={fadeInUp}>
                            <Badge variant="primary" size="lg">
                                <Target className="w-4 h-4 mr-1" />
                                Full Stack Mastery
                            </Badge>
                        </motion.div>
                        <motion.h2
                            variants={fadeInUp}
                            className="mt-4 text-3xl lg:text-4xl font-display font-bold text-neutral-900"
                        >
                            Full Stack
                            <span className="text-gradient"> Learning Paths</span>
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="mt-4 text-lg text-neutral-500 max-w-2xl mx-auto"
                        >
                            Master complete technology stacks from frontend to backend. Choose your path and become a full-stack developer.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {fullStackPaths.map((path, index) => (
                            <motion.div key={path.slug} variants={fadeInUp}>
                                <Link to={`/fullstack/${path.slug}`}>
                                    <Card hover variant="elevated" className="h-full p-6 cursor-pointer group">
                                        <div className="flex items-start gap-4">
                                            {/* Icon */}
                                            <div className={cn(
                                                'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform',
                                                path.iconBg
                                            )}>
                                                <path.Icon className="w-6 h-6 text-white" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-semibold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                                                    {path.title}
                                                </h3>
                                                <p className="text-sm text-neutral-500 mb-3 line-clamp-2">
                                                    {path.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Topic Tags */}
                                        <div className="flex flex-wrap gap-2 mt-4 mb-4">
                                            {path.topics.map((topic) => (
                                                <span
                                                    key={topic}
                                                    className={cn(
                                                        'px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r',
                                                        path.color
                                                    )}
                                                >
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Explore Link */}
                                        <div className="flex items-center text-primary-600 font-medium text-sm group-hover:text-primary-700">
                                            <span>Explore Courses</span>
                                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 text-center"
                    >
                        <Link to="/fullstack">
                            <Button
                                variant="secondary"
                                size="lg"
                                rightIcon={<ArrowRight className="w-4 h-4" />}
                            >
                                View All Learning Paths
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            < section className="py-24 bg-neutral-50" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.div variants={fadeInUp}>
                            <Badge variant="primary" size="lg">
                                <Star className="w-4 h-4 mr-1 fill-current" />
                                Testimonials
                            </Badge>
                        </motion.div>
                        <motion.h2
                            variants={fadeInUp}
                            className="mt-4 text-3xl lg:text-4xl font-display font-bold text-neutral-900"
                        >
                            Loved by
                            <span className="text-gradient"> Thousands</span>
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div key={testimonial.name} variants={fadeInUp}>
                                <Card variant="elevated" className="h-full">
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-accent-400 text-accent-400" />
                                        ))}
                                    </div>
                                    <p className="text-neutral-600 mb-6">"{testimonial.content}"</p>
                                    <div className="flex items-center gap-3">
                                        <Avatar
                                            src={testimonial.avatar}
                                            name={testimonial.name}
                                            size="lg"
                                        />
                                        <div>
                                            <p className="font-semibold text-neutral-900">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-sm text-neutral-500">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section >

            {/* CTA Section */}
            < section className="py-24 bg-white relative overflow-hidden border-t border-neutral-100" >
                {/* Animated background */}
                < div className="absolute inset-0" >
                    <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px]" />
                    <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-secondary-500/10 rounded-full blur-[80px]" />
                </div >

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp}>
                            <Badge variant="primary" size="lg">
                                <Zap className="w-4 h-4 mr-1" />
                                Start Today
                            </Badge>
                        </motion.div>

                        <motion.h2
                            variants={fadeInUp}
                            className="mt-6 text-3xl lg:text-5xl font-display font-bold text-neutral-900"
                        >
                            Ready to Transform
                            <span className="block mt-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
                                Your Career?
                            </span>
                        </motion.h2>

                        <motion.p
                            variants={fadeInUp}
                            className="mt-6 text-lg text-neutral-500 max-w-2xl mx-auto"
                        >
                            Join 50,000+ learners who have already launched their careers
                            with WorkGrad. It's free to get started.
                        </motion.p>

                        <motion.div
                            variants={fadeInUp}
                            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Button
                                size="xl"
                                className="shadow-glow-lg"
                                rightIcon={<ArrowRight className="w-5 h-5" />}
                            >
                                Create Free Account
                            </Button>
                            <Button
                                variant="outline"
                                size="xl"
                                className="border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                            >
                                Talk to Sales
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section >

            <Footer />
        </div >
    )
}
