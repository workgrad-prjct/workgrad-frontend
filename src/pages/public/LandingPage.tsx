import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    ArrowRight,
    FileText,
    Briefcase,
    Code2,
    Palette,
    BarChart3,
    Megaphone,
    UserCog,
    Layers,
    Database,
    Server,
} from 'lucide-react'

import { Button, Card } from '@/components/ui'
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

// Reusable Preview Card Component
const FeaturePreview = ({ icon: Icon, title, badgeText, type }: {
    icon: any;
    title: string;
    badgeText: string;
    type: 'resume' | 'portfolio';
}) => (
    <div className="bg-white rounded-2xl border border-blue-100 p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <span className="font-semibold text-neutral-900">{title}</span>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-500 rounded-full text-[10px] font-medium tracking-wide uppercase">{badgeText}</span>
        </div>

        <div className="space-y-4">
            <div className="h-4 bg-neutral-200 rounded w-3/4 animate-pulse opacity-60" />
            <div className="h-3 bg-neutral-100 rounded w-full animate-pulse opacity-60" />
            <div className="h-3 bg-neutral-100 rounded w-5/6 animate-pulse opacity-60" />
            <div className="h-3 bg-neutral-100 rounded w-4/5 animate-pulse opacity-60" />
            <div className="border-t border-neutral-100 pt-4 mt-4">
                <div className="h-3 bg-neutral-200 rounded w-1/3 mb-2 animate-pulse opacity-60" />
                <div className="h-2 bg-neutral-100 rounded w-full animate-pulse opacity-60" />
                <div className="h-2 bg-neutral-100 rounded w-5/6 mt-1 animate-pulse opacity-60" />
            </div>
            <div className="flex gap-2 pt-2">
                {type === 'resume' ? (
                    <>
                        <div className="px-2 py-1 bg-blue-50 text-blue-500 rounded text-[10px] font-medium opacity-80">Skills</div>
                        <div className="px-2 py-1 bg-blue-50 text-blue-500 rounded text-[10px] font-medium opacity-80">Experience</div>
                        <div className="px-2 py-1 bg-blue-50 text-blue-500 rounded text-[10px] font-medium opacity-80">Education</div>
                    </>
                ) : (
                    <>
                        <div className="px-2 py-1 bg-blue-50 text-blue-500 rounded text-[10px] font-medium opacity-80">Projects</div>
                        <div className="px-2 py-1 bg-blue-50 text-blue-500 rounded text-[10px] font-medium opacity-80">Skills</div>
                        <div className="px-2 py-1 bg-blue-50 text-blue-500 rounded text-[10px] font-medium opacity-80">Reviews</div>
                    </>
                )}
            </div>
        </div>
    </div>
);

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
        iconColor: 'text-blue-500',
        tools: ['Python', 'JavaScript', 'R'],
        students: 12500,
        rating: 4.8,
        color: 'bg-neutral-50 text-neutral-600 border border-neutral-100',
    },
    {
        title: 'Design',
        slug: 'ui-ux-designer',
        description: 'Create stunning visual designs and interfaces',
        Icon: Palette,
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-500',
        tools: ['Figma', 'Adobe Photoshop', 'Sketch'],
        students: 6800,
        rating: 4.8,
        color: 'bg-neutral-50 text-neutral-600 border border-neutral-100',
    },
    {
        title: 'Analytics',
        slug: 'data-professional',
        description: 'Transform data into actionable insights',
        Icon: BarChart3,
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-500',
        tools: ['SQL', 'Power BI', 'Tableau'],
        students: 8900,
        rating: 4.9,
        color: 'bg-neutral-50 text-neutral-600 border border-neutral-100',
    },
    {
        title: 'Marketing',
        slug: 'digital-marketer',
        description: 'Drive growth with digital marketing strategies',
        Icon: Megaphone,
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-500',
        tools: ['SEO', 'Google Ads', 'Google Tag Manager'],
        students: 7200,
        rating: 4.7,
        color: 'bg-neutral-50 text-neutral-600 border border-neutral-100',
    },
    {
        title: 'HR & Operations',
        slug: 'hr-operations',
        description: 'Streamline operations and manage teams effectively',
        Icon: UserCog,
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-500',
        tools: ['Salesforce', 'Zoho CRM', 'BambooHR'],
        students: 5400,
        rating: 4.6,
        color: 'bg-neutral-50 text-neutral-600 border border-neutral-100',
    },
    {
        title: 'Full Stack',
        slug: 'programming-tools',
        description: 'Build complete applications from front to back',
        Icon: Layers,
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-500',
        tools: ['React', 'Node.js', 'Docker'],
        students: 15000,
        rating: 4.9,
        color: 'bg-neutral-50 text-neutral-600 border border-neutral-100',
    },
]

// Full Stack Learning Paths data
const fullStackPaths = [
    {
        slug: 'mern-stack',
        title: 'MERN Stack',
        description: 'MongoDB, Express, React & Node.js development',
        Icon: Database,
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-500',
        topics: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
        students: '15K+',
        color: 'bg-neutral-50 text-neutral-600 border border-neutral-100',
    },
    {
        slug: 'mean-stack',
        title: 'MEAN Stack',
        description: 'MongoDB, Express, Angular & Node.js development',
        Icon: Server,
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-500',
        topics: ['TypeScript', 'Angular', 'Node.js', 'MongoDB'],
        students: '8.5K+',
        color: 'bg-neutral-50 text-neutral-600 border border-neutral-100',
    },
    {
        slug: 'python-fullstack',
        title: 'Python Full Stack',
        description: 'Python, Django, React & PostgreSQL development',
        Icon: Code2,
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-500',
        topics: ['Python', 'Django', 'React', 'PostgreSQL'],
        students: '12K+',
        color: 'bg-neutral-50 text-neutral-600 border border-neutral-100',
    },
]

// Featured Competitions data
const featuredBanners = [
    {
        id: 'coding-sprint',
        title: '100 DAYS CODING SPRINT',
        description: 'Level up your skills daily with our 100-Day Coding Sprint',
        gradient: 'from-blue-50 to-blue-100',
        accentColor: 'border-neutral-900',
        textColor: 'text-neutral-900',
        buttonVariant: 'secondary',
        icon: (
            <div className="relative w-full h-full flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-3 rotate-[-5deg] absolute transform -translate-x-8 -translate-y-4">
                    <div className="text-[10px] font-bold text-blue-500 mb-1">DAY 01</div>
                    <div className="h-1 w-12 bg-neutral-100 rounded" />
                </div>
                <div className="bg-blue-500 rounded-xl shadow-xl p-4 rotate-[5deg] z-10 scale-110">
                    <div className="text-[10px] font-bold text-white mb-1">DAY 02</div>
                    <div className="h-1 w-16 bg-white/30 rounded" />
                </div>
                <div className="bg-white rounded-xl shadow-lg p-3 rotate-[-3deg] absolute transform translate-x-12 translate-y-6">
                    <div className="text-[10px] font-bold text-neutral-400 mb-1">DAY 03</div>
                    <div className="h-1 w-10 bg-neutral-100 rounded" />
                </div>
            </div>
        )
    },
    {
        id: 'code-conquest',
        title: 'CODE CONQUEST',
        description: 'Pick your topics, set your difficulty, and master key concepts with ease!',
        gradient: 'from-amber-50 to-amber-100',
        accentColor: 'border-neutral-900',
        textColor: 'text-neutral-900',
        buttonVariant: 'secondary',
        icon: (
            <div className="relative w-full h-full flex items-center justify-center p-4">
                <div className="relative">
                    <div className="text-6xl text-neutral-800 font-mono flex items-center gap-2">
                        <div className="relative">
                            <Database className="w-24 h-24 text-neutral-700" />
                            <div className="absolute -top-6 -right-4 text-4xl">👑</div>
                        </div>
                        <div className="space-y-1">
                            <div className="w-12 h-1 bg-neutral-800" />
                            <div className="w-8 h-1 bg-neutral-800" />
                            <div className="w-10 h-1 bg-neutral-800" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
]

// Testimonials

// Companies with brand colors


export function LandingPage() {

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
                                <Button
                                    size="lg"
                                    className="w-72 whitespace-nowrap bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 text-white shadow-lg shadow-blue-500/20"
                                    rightIcon={<ArrowRight className="w-5 h-5" />}
                                >
                                    Start Learning Today
                                </Button>
                            </Link>

                            <Link to="/login">
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="w-72 whitespace-nowrap bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                                >
                                    Explore Tracks
                                </Button>
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
                                        <div className="flex items-center gap-4 mb-4">
                                            {/* Icon */}
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0 border border-blue-100/50">
                                                <Code2 className="w-6 h-6 text-blue-500" />
                                            </div>

                                            {/* Content */}
                                            <h3 className="text-lg font-bold text-neutral-900 transition-colors">
                                                Tool Tracks
                                            </h3>
                                        </div>
                                        <p className="text-sm text-neutral-500 mb-4 line-clamp-2">
                                            Master in-demand tools & technologies
                                        </p>

                                        {/* Arrow indicator */}
                                        <div className="flex items-center text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
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
                                        <div className="flex items-center gap-4 mb-4">
                                            {/* Icon */}
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0 border border-blue-100/50">
                                                <Layers className="w-6 h-6 text-blue-500" />
                                            </div>

                                            {/* Content */}
                                            <h3 className="text-lg font-bold text-neutral-900 transition-colors">
                                                Domain Tracks
                                            </h3>
                                        </div>
                                        <p className="text-sm text-neutral-500 mb-4 line-clamp-2">
                                            Full stack learning paths
                                        </p>

                                        {/* Arrow indicator */}
                                        <div className="flex items-center text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
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
                                        <div className="flex items-center gap-4 mb-4">
                                            {/* Icon */}
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0 border border-blue-100/50">
                                                <FileText className="w-6 h-6 text-blue-500" />
                                            </div>

                                            {/* Content */}
                                            <h3 className="text-lg font-bold text-neutral-900 transition-colors">
                                                Resume Builder
                                            </h3>
                                        </div>
                                        <p className="text-sm text-neutral-500 mb-4 line-clamp-2">
                                            ATS-optimized professional resumes
                                        </p>

                                        {/* Arrow indicator */}
                                        <div className="flex items-center text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
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
                                        <div className="flex items-center gap-4 mb-4">
                                            {/* Icon */}
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0 border border-blue-100/50">
                                                <Briefcase className="w-6 h-6 text-blue-500" />
                                            </div>

                                            {/* Content */}
                                            <h3 className="text-lg font-bold text-neutral-900 transition-colors">
                                                Portfolio
                                            </h3>
                                        </div>
                                        <p className="text-sm text-neutral-500 mb-4 line-clamp-2">
                                            Showcase your work beautifully
                                        </p>

                                        {/* Arrow indicator */}
                                        <div className="flex items-center text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
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

            {/* Featured Banners Section */}
            <section className="py-12 bg-neutral-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        {featuredBanners.map((banner) => (
                            <motion.div
                                key={banner.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className={cn(
                                    "relative h-full rounded-[2.5rem] p-8 md:p-12 overflow-hidden bg-gradient-to-br flex flex-col md:flex-row items-center gap-8",
                                    banner.gradient
                                )}>
                                    <div className="flex-1 space-y-6 text-center md:text-left">
                                        <div className="space-y-2">
                                            <h3 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight leading-none uppercase">
                                                {banner.title.split(' ').map((word, i) => (
                                                    <span key={i} className={i === 0 && banner.id === 'coding-sprint' ? 'text-blue-600 mr-2' : i === 0 && banner.id === 'code-conquest' ? 'text-amber-500 mr-2' : 'mr-2'}>
                                                        {word}
                                                    </span>
                                                ))}
                                            </h3>
                                            <p className="text-neutral-600 text-lg font-medium max-w-xs mx-auto md:mx-0">
                                                {banner.description}
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="w-72 whitespace-nowrap rounded-full bg-transparent border-neutral-300 text-neutral-700 hover:bg-blue-500 hover:text-white hover:border-blue-500 group"
                                            rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                        >
                                            Start Now
                                        </Button>
                                    </div>
                                    <div className="w-full md:w-1/2 aspect-square md:aspect-auto h-48 flex items-center justify-center">
                                        {banner.icon}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
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
                        className="text-center mb-12"
                    >
                        <motion.h2
                            variants={fadeInUp}
                            className="text-3xl lg:text-4xl font-display font-bold text-neutral-900"
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
                                    <Card hover variant="elevated" className="h-full flex flex-col p-6 cursor-pointer group">
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
                                                <h3 className="text-lg font-semibold text-neutral-900 mb-1 transition-colors">
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
                                        <div className="flex items-center text-blue-600 font-medium text-sm mt-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
                                            <span>Explore Courses</span>
                                            <ArrowRight className="w-4 h-4 ml-1" />
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
                                className="w-72 whitespace-nowrap bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
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
                        className="text-center mb-12"
                    >
                        <motion.h2
                            variants={fadeInUp}
                            className="text-3xl lg:text-4xl font-display font-bold text-neutral-900"
                        >
                            Full Stack Learning Paths
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
                                    <Card hover variant="elevated" className="h-full flex flex-col p-6 cursor-pointer group">
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
                                                <h3 className="text-lg font-semibold text-neutral-900 mb-1 transition-colors">
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
                                        <div className="flex items-center text-blue-600 font-medium text-sm mt-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
                                            <span>Explore Courses</span>
                                            <ArrowRight className="w-4 h-4 ml-1" />
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
                                className="w-72 whitespace-nowrap bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                                rightIcon={<ArrowRight className="w-4 h-4" />}
                            >
                                View All Learning Paths
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Portfolio Builder Section */}
            <section className="py-8 lg:py-12 bg-gradient-to-br from-blue-50/50 via-cyan-50/30 to-sky-50/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={staggerContainer}
                        >

                            <motion.h2
                                variants={fadeInUp}
                                className="mt-4 text-3xl lg:text-4xl font-display font-bold text-neutral-900"
                            >
                                Showcase Your Work with a Stunning Portfolio
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
                                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
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
                                        className="w-72 whitespace-nowrap bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 text-white shadow-lg shadow-blue-500/20"
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
                            <FeaturePreview
                                icon={Briefcase}
                                title="Portfolio.web"
                                badgeText="Live Projects"
                                type="portfolio"
                            />
                            {/* Decorative elements */}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Resume Builder Section */}
            <section className="py-8 lg:py-12 bg-gradient-to-br from-blue-50/50 via-cyan-50/30 to-sky-50/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Resume Preview Card (Left) */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative lg:order-1 order-2"
                        >
                            <FeaturePreview
                                icon={FileText}
                                title="Resume.pdf"
                                badgeText="ATS Ready"
                                type="resume"
                            />
                        </motion.div>

                        {/* Text Content (Right) */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={staggerContainer}
                            className="lg:order-2 order-1"
                        >

                            <motion.h2
                                variants={fadeInUp}
                                className="mt-4 text-3xl lg:text-4xl font-display font-bold text-neutral-900"
                            >
                                Create an ATS-Friendly Resume
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
                                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
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
                                        className="w-72 whitespace-nowrap bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 text-white shadow-lg shadow-blue-500/20"
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


                        <motion.h2
                            variants={fadeInUp}
                            className="mt-6 text-3xl lg:text-5xl font-display font-bold text-neutral-900"
                        >
                            Your Legacy Starts Today.
                            <br />
                            Are You Ready?

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
                            <Link to="/register">
                                <Button
                                    size="lg"
                                    className="w-72 whitespace-nowrap bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 text-white shadow-lg shadow-blue-500/20"
                                    rightIcon={<ArrowRight className="w-5 h-5" />}
                                >
                                    Start Your Journey
                                </Button>
                            </Link>

                        </motion.div>
                    </motion.div>
                </div>
            </section >
        </div >
    )
}
