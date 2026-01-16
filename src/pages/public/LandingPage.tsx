import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    ArrowRight,
    FileText,
    Briefcase,
    BookOpen,
    Target,
    Trophy,
    Zap,
    Code2,
    Palette,
    BarChart3,
    Megaphone,
    UserCog,
    Layers,
    Database,
    Server,
} from 'lucide-react'

import { Button, Card, Badge } from '@/components/ui'
import { cn } from '@/utils'

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}



const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
}

// Stats data

// Features data

// Courses/Tracks data with icons and descriptions
const popularTracks = [
    {
        title: 'Programming',
        slug: 'programming-tools',
        description: 'Master coding languages for software development',
        Icon: Code2,
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-600',
        tools: ['Python', 'JavaScript', 'R'],
        students: 12500,
        rating: 4.8,
        color: 'bg-blue-50 text-blue-700 border border-blue-100',
    },
    {
        title: 'Design',
        slug: 'ui-ux-designer',
        description: 'Create stunning visual designs and interfaces',
        Icon: Palette,
        iconBg: 'bg-pink-50',
        iconColor: 'text-pink-600',
        tools: ['Figma', 'Adobe Photoshop', 'Sketch'],
        students: 6800,
        rating: 4.8,
        color: 'bg-pink-50 text-pink-700 border border-pink-100',
    },
    {
        title: 'Analytics',
        slug: 'data-professional',
        description: 'Transform data into actionable insights',
        Icon: BarChart3,
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
        tools: ['SQL', 'Power BI', 'Tableau'],
        students: 8900,
        rating: 4.9,
        color: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    },
    {
        title: 'Marketing',
        slug: 'digital-marketer',
        description: 'Drive growth with digital marketing strategies',
        Icon: Megaphone,
        iconBg: 'bg-orange-50',
        iconColor: 'text-orange-600',
        tools: ['SEO', 'Google Ads', 'Google Tag Manager'],
        students: 7200,
        rating: 4.7,
        color: 'bg-orange-50 text-orange-700 border border-orange-100',
    },
    {
        title: 'HR & Operations',
        slug: 'hr-operations',
        description: 'Streamline operations and manage teams effectively',
        Icon: UserCog,
        iconBg: 'bg-purple-50',
        iconColor: 'text-purple-600',
        tools: ['Salesforce', 'Zoho CRM', 'BambooHR'],
        students: 5400,
        rating: 4.6,
        color: 'bg-purple-50 text-purple-700 border border-purple-100',
    },
    {
        title: 'Full Stack',
        slug: 'programming-tools',
        description: 'Build complete applications from front to back',
        Icon: Layers,
        iconBg: 'bg-cyan-50',
        iconColor: 'text-cyan-600',
        tools: ['React', 'Node.js', 'Docker'],
        students: 15000,
        rating: 4.9,
        color: 'bg-cyan-50 text-cyan-700 border border-cyan-100',
    },
]

// Full Stack Learning Paths data
const fullStackPaths = [
    {
        slug: 'mern-stack',
        title: 'MERN Stack',
        description: 'MongoDB, Express, React & Node.js development',
        Icon: Database,
        iconBg: 'bg-green-50',
        iconColor: 'text-green-600',
        topics: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
        students: '15K+',
        color: 'bg-green-50 text-green-700 border border-green-100',
    },
    {
        slug: 'mean-stack',
        title: 'MEAN Stack',
        description: 'MongoDB, Express, Angular & Node.js development',
        Icon: Server,
        iconBg: 'bg-red-50',
        iconColor: 'text-red-600',
        topics: ['TypeScript', 'Angular', 'Node.js', 'MongoDB'],
        students: '8.5K+',
        color: 'bg-red-50 text-red-700 border border-red-100',
    },
    {
        slug: 'python-fullstack',
        title: 'Python Full Stack',
        description: 'Python, Django, React & PostgreSQL development',
        Icon: Code2,
        iconBg: 'bg-yellow-50',
        iconColor: 'text-yellow-600',
        topics: ['Python', 'Django', 'React', 'PostgreSQL'],
        students: '12K+',
        color: 'bg-yellow-50 text-yellow-700 border border-yellow-100',
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

// Companies with brand colors


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
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-white">

                <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="space-y-8"
                    >

                        {/* Headline */}
                        <motion.div variants={fadeInUp}>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-black text-neutral-700 tracking-tight leading-[0.95]">
                                Learn skills that move
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                                    you forward
                                </span>
                            </h1>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            variants={fadeInUp}
                            className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed"
                        >
                            Practical, industry-focused courses designed to help you gain real skills, build confidence, and grow professionally at your own pace.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
                        >
                            <Link to="/register">
                                <button className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 text-white text-lg font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all">
                                    Start Learning Today
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </Link>
                            <Link to="/courses/categories">
                                <button className="flex items-center gap-2 px-8 py-4 bg-white hover:bg-neutral-50 text-neutral-700 text-lg font-semibold rounded-xl border border-neutral-200 shadow-sm transition-all focus:ring-2 focus:ring-blue-500/20">
                                    Explore Courses
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom fade to next section */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
            </section>


            {/* Quick Access Navigation - Premium Design */}
            <section className="py-8 lg:py-12 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/5 rounded-full blur-[120px]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <p className="text-sm font-semibold tracking-wider text-primary-600 uppercase mb-2">
                            Explore Platform
                        </p>
                        <h2 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900">
                            The Architecture of Success
                        </h2>
                    </motion.div>

                    {/* Navigation Cards Grid */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={staggerContainer}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
                    >
                        {/* Tool Tracks Card */}
                        <motion.div variants={fadeInUp}>
                            <Link to="/courses/categories">
                                <div className="group h-full">
                                    <div className="h-full bg-white rounded-2xl p-6 border border-neutral-100 group-hover:border-neutral-200 transition-all duration-300 group-hover:shadow-lg">
                                        {/* Icon */}
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <Code2 className="w-7 h-7 text-blue-600" />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-lg font-bold text-neutral-900 mb-1 group-hover:text-blue-600 transition-colors">
                                            Tool Tracks
                                        </h3>
                                        <p className="text-sm text-neutral-500 mb-4 line-clamp-2">
                                            Master in-demand tools & technologies
                                        </p>

                                        {/* Arrow indicator */}
                                        <div className="flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
                                            <span>Explore</span>
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Domain Tracks Card */}
                        <motion.div variants={fadeInUp}>
                            <Link to="/fullstack">
                                <div className="group h-full">
                                    <div className="h-full bg-white rounded-2xl p-6 border border-neutral-100 group-hover:border-neutral-200 transition-all duration-300 group-hover:shadow-lg">
                                        {/* Icon */}
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <Layers className="w-7 h-7 text-emerald-600" />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-lg font-bold text-neutral-900 mb-1 group-hover:text-emerald-600 transition-colors">
                                            Domain Tracks
                                        </h3>
                                        <p className="text-sm text-neutral-500 mb-4 line-clamp-2">
                                            Full stack learning paths
                                        </p>

                                        {/* Arrow indicator */}
                                        <div className="flex items-center text-emerald-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
                                            <span>Explore</span>
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Resume Builder Card */}
                        <motion.div variants={fadeInUp}>
                            <Link to="/login?redirect=/learner/resume">
                                <div className="group h-full">
                                    <div className="h-full bg-white rounded-2xl p-6 border border-neutral-100 group-hover:border-neutral-200 transition-all duration-300 group-hover:shadow-lg">
                                        {/* Icon */}
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <FileText className="w-7 h-7 text-violet-600" />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-lg font-bold text-neutral-900 mb-1 group-hover:text-violet-600 transition-colors">
                                            Resume Builder
                                        </h3>
                                        <p className="text-sm text-neutral-500 mb-4 line-clamp-2">
                                            ATS-optimized professional resumes
                                        </p>

                                        {/* Arrow indicator */}
                                        <div className="flex items-center text-violet-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
                                            <span>Create</span>
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Portfolio Card */}
                        <motion.div variants={fadeInUp}>
                            <Link to="/login?redirect=/learner/portfolio">
                                <div className="group h-full">
                                    <div className="h-full bg-white rounded-2xl p-6 border border-neutral-100 group-hover:border-neutral-200 transition-all duration-300 group-hover:shadow-lg">
                                        {/* Icon */}
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <Briefcase className="w-7 h-7 text-orange-600" />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-lg font-bold text-neutral-900 mb-1 group-hover:text-orange-600 transition-colors">
                                            Portfolio
                                        </h3>
                                        <p className="text-sm text-neutral-500 mb-4 line-clamp-2">
                                            Showcase your work beautifully
                                        </p>

                                        {/* Arrow indicator */}
                                        <div className="flex items-center text-orange-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
                                            <span>Build</span>
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

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
            <section className="py-6 lg:py-10 bg-neutral-50">
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

            {/* Popular Courses/Tracks */}
            <section className="py-6 lg:py-10 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="text-center mb-8"
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
                            Tool Centric Tracks

                        </motion.h2>

                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {popularTracks.map((track) => (
                            <motion.div key={track.title} variants={fadeInUp}>
                                <Link to={`/courses/category/${track.slug}`}>
                                    <Card hover variant="elevated" className="h-full p-6 cursor-pointer group">
                                        <div className="flex items-start gap-4">
                                            {/* Icon */}
                                            <div className={cn(
                                                'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform',
                                                track.iconBg
                                            )}>
                                                {/* @ts-ignore */}
                                                <track.Icon className={cn("w-6 h-6", track.iconColor)} />
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
                                                        'px-3 py-1 rounded-full text-xs font-medium',
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
                        className="mt-8 text-center"
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
            <section className="py-6 lg:py-10 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="text-center mb-8"
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
                            Full stack learning paths

                        </motion.h2>

                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {fullStackPaths.map((path) => (
                            <motion.div key={path.slug} variants={fadeInUp}>
                                <Link to={`/fullstack/${path.slug}`}>
                                    <Card hover variant="elevated" className="h-full p-6 cursor-pointer group">
                                        <div className="flex items-start gap-4">
                                            {/* Icon */}
                                            <div className={cn(
                                                'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform',
                                                path.iconBg
                                            )}>
                                                {/* @ts-ignore */}
                                                <path.Icon className={cn("w-6 h-6", path.iconColor)} />
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
                                                        'px-3 py-1 rounded-full text-xs font-medium',
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
                        className="mt-8 text-center"
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

            {/* Portfolio Builder Section */}
            <section className="py-8 lg:py-12 bg-gradient-to-br from-violet-50/50 via-purple-50/30 to-fuchsia-50/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeInUp}>
                                <Badge variant="primary" size="lg" className="bg-violet-100 text-violet-600 border-violet-200">
                                    <Layers className="w-4 h-4 mr-1" />
                                    Portfolio Builder
                                </Badge>
                            </motion.div>
                            <motion.h2
                                variants={fadeInUp}
                                className="mt-4 text-3xl lg:text-4xl font-display font-bold text-neutral-900"
                            >
                                Showcase Your Work with a
                                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> Stunning Portfolio</span>
                            </motion.h2>
                            <motion.p
                                variants={fadeInUp}
                                className="mt-4 text-lg text-neutral-500"
                            >
                                Create a professional online portfolio to display your projects, skills, and achievements. Stand out to recruiters and clients.
                            </motion.p>

                            <motion.div variants={fadeInUp} className="mt-8 space-y-4">
                                {[
                                    'Drag & drop project showcase',
                                    'Custom domain support',
                                    'Analytics & visitor tracking',
                                    'Share on social media',
                                    'Multiple beautiful templates'
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-neutral-700">{feature}</span>
                                    </div>
                                ))}
                            </motion.div>

                            <motion.div variants={fadeInUp} className="mt-8">
                                <Link to="/login?redirect=/learner/portfolio">
                                    <Button
                                        size="lg"
                                        className="bg-gradient-to-r from-violet-400 to-purple-400 hover:from-violet-500 hover:to-purple-500 text-white shadow-lg shadow-violet-500/20"
                                        rightIcon={<ArrowRight className="w-5 h-5" />}
                                    >
                                        Build Your Portfolio
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Right Preview Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="bg-white rounded-2xl shadow-2xl shadow-violet-500/10 border border-violet-100 p-6 lg:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-violet-100 animate-pulse" />
                                    <div className="space-y-2">
                                        <div className="h-4 w-24 bg-neutral-100 rounded animate-pulse" />
                                        <div className="h-3 w-32 bg-neutral-100 rounded animate-pulse" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-violet-50 rounded-xl p-4 text-center">
                                        <div className="h-8 w-12 bg-violet-200/50 rounded mx-auto mb-2 animate-pulse" />
                                        <div className="h-3 w-16 bg-violet-100 rounded mx-auto animate-pulse" />
                                    </div>
                                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                                        <div className="h-8 w-16 bg-purple-200/50 rounded mx-auto mb-2 animate-pulse" />
                                        <div className="h-3 w-12 bg-purple-100 rounded mx-auto animate-pulse" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-32 bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg border border-violet-100/50 flex flex-col p-4">
                                        <div className="h-4 w-1/3 bg-white rounded-md shadow-sm mb-3 animate-pulse" />
                                        <div className="space-y-2">
                                            <div className="h-2 w-full bg-white/60 rounded animate-pulse" />
                                            <div className="h-2 w-5/6 bg-white/60 rounded animate-pulse" />
                                            <div className="h-2 w-4/5 bg-white/60 rounded animate-pulse" />
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="h-6 w-16 bg-violet-50 rounded-full animate-pulse" />
                                        <div className="h-6 w-20 bg-purple-50 rounded-full animate-pulse" />
                                        <div className="h-6 w-18 bg-fuchsia-50 rounded-full animate-pulse" />
                                    </div>
                                </div>
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-violet-200/50 rounded-full blur-2xl" />
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-200/50 rounded-full blur-2xl" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Resume Builder Section */}
            <section className="py-8 lg:py-12 bg-gradient-to-br from-blue-50/50 via-cyan-50/30 to-sky-50/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Preview Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative order-2 lg:order-1"
                        >
                            <div className="bg-white rounded-2xl shadow-2xl shadow-blue-500/10 border border-blue-100 p-6 lg:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="font-semibold text-neutral-900">Resume.pdf</span>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">ATS Ready</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-4 bg-blue-100 rounded w-3/4" />
                                    <div className="h-3 bg-neutral-100 rounded w-full" />
                                    <div className="h-3 bg-neutral-100 rounded w-5/6" />
                                    <div className="h-3 bg-neutral-100 rounded w-4/5" />
                                    <div className="border-t border-neutral-100 pt-4 mt-4">
                                        <div className="h-3 bg-cyan-100 rounded w-1/3 mb-2" />
                                        <div className="h-2 bg-neutral-100 rounded w-full" />
                                        <div className="h-2 bg-neutral-100 rounded w-5/6 mt-1" />
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">Skills</span>
                                        <span className="px-2 py-1 bg-cyan-50 text-cyan-600 rounded text-xs">Experience</span>
                                        <span className="px-2 py-1 bg-sky-50 text-sky-600 rounded text-xs">Education</span>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200/50 rounded-full blur-2xl" />
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-cyan-200/50 rounded-full blur-2xl" />
                        </motion.div>

                        {/* Right Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={staggerContainer}
                            className="order-1 lg:order-2"
                        >
                            <motion.div variants={fadeInUp}>
                                <Badge variant="primary" size="lg" className="bg-blue-100 text-blue-600 border-blue-200">
                                    <FileText className="w-4 h-4 mr-1" />
                                    Resume Builder
                                </Badge>
                            </motion.div>
                            <motion.h2
                                variants={fadeInUp}
                                className="mt-4 text-3xl lg:text-4xl font-display font-bold text-neutral-900"
                            >
                                Create an ATS-Friendly
                                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Resume</span>
                            </motion.h2>
                            <motion.p
                                variants={fadeInUp}
                                className="mt-4 text-lg text-neutral-500"
                            >
                                Build professional resumes that pass Applicant Tracking Systems and get you noticed by recruiters.
                            </motion.p>

                            <motion.div variants={fadeInUp} className="mt-8 space-y-4">
                                {[
                                    'ATS-optimized templates',
                                    'AI-powered content suggestions',
                                    'Multiple export formats (PDF, DOCX)',
                                    'Real-time preview & editing',
                                    'Keyword optimization tips'
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-neutral-700">{feature}</span>
                                    </div>
                                ))}
                            </motion.div>

                            <motion.div variants={fadeInUp} className="mt-8">
                                <Link to="/login?redirect=/learner/resume">
                                    <Button
                                        size="lg"
                                        className="bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                                        rightIcon={<ArrowRight className="w-5 h-5" />}
                                    >
                                        Create Your Resume
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>




            {/* Testimonials */}
            {/* <section className="py-6 lg:py-10 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="text-center mb-8"
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
                        {testimonials.map((testimonial) => (
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
            </section > */}

            {/* CTA Section */}
            <section className="py-8 lg:py-12 bg-white relative overflow-hidden border-t border-neutral-100">
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
                            Your Legacy Starts Today.
                            <span className="block mt-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
                                Are You Ready?
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
                            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Button
                                size="xl"
                                className="shadow-glow-lg"
                                rightIcon={<ArrowRight className="w-5 h-5" />}
                            >
                                Create Free Account
                            </Button>

                        </motion.div>
                    </motion.div>
                </div>
            </section >
        </div >
    )
}
