import { motion } from 'framer-motion'
import {
    Users,
    Target,
    TrendingUp,
    BookOpen,
    CheckCircle2,
    DollarSign,
    Clock,
    Globe,
    ArrowRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, Card } from '@/components/ui'

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
}

const benefits = [
    {
        title: 'High Revenue Share',
        description: 'Earn up to 97% of your course sales. We believe in rewarding experts for their knowledge.',
        icon: DollarSign,
        gradient: 'from-emerald-300 to-teal-300'
    },
    {
        title: 'Global Impact',
        description: 'Reach thousands of ambitious learners from around the world and shape the next generation of tech talent.',
        icon: Globe,
        gradient: 'from-blue-300 to-indigo-300'
    },
    {
        title: 'Flexible Teaching',
        description: 'Create content on your own schedule. Use our advanced platform to build courses, quizzes, and projects.',
        icon: Clock,
        gradient: 'from-amber-300 to-orange-300'
    },
    {
        title: 'Premium Community',
        description: 'Join an exclusive circle of industry leaders from top tech companies like Google, Meta, and Stripe.',
        icon: Users,
        gradient: 'from-violet-300 to-purple-300'
    }
]

const steps = [
    {
        title: 'Apply to Join',
        description: 'Submit your profile and areas of expertise. We look for practitioners with real-world experience.',
        icon: Target
    },
    {
        title: 'Build Your Content',
        description: 'Use our course builder to create impactful learning experiences with videos, code, and exercises.',
        icon: BookOpen
    },
    {
        title: 'Launch & Earn',
        description: 'Go live to our student base. Provide mentorship, track progress, and build your digital legacy.',
        icon: TrendingUp
    }
]

export default function MentorsPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative pt-12 pb-12 lg:pt-20 lg:pb-16 overflow-hidden">


                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >

                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl lg:text-7xl font-display font-black text-neutral-700 tracking-tight mb-6"
                        >
                            Share Your Knowledge.<br />
                            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">Shape the Future.</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-xl text-neutral-600 max-w-3xl mx-auto mb-10 leading-relaxed"
                        >
                            Join the world's most elite network of tech mentors. Turn your professional expertise into
                            impactful learning paths and earn premium revenue while doing it.
                        </motion.p>

                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Button
                                size="lg"
                                className="w-full sm:w-auto px-10 bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 text-white shadow-lg shadow-blue-500/20"
                                rightIcon={<ArrowRight className="w-5 h-5" />}
                            >
                                Apply as a Mentor
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                            Why Mentor on WorkGrad?
                        </h2>
                        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                            We provide the platform, the audience, and the tools. You provide the expertise.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="p-8 h-full border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/10">
                                            <benefit.icon className="w-6 h-6 text-blue-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-neutral-900 pt-2">
                                            {benefit.title}
                                        </h3>
                                    </div>
                                    <p className="text-neutral-600 leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-8 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-blue-100 hidden lg:block" />

                        <div className="grid lg:grid-cols-3 gap-12 relative z-10">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="text-center group cursor-default"
                                >
                                    <div className="w-20 h-20 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 relative z-20 transition-all duration-300 shadow-xl shadow-blue-500/10">
                                        <step.icon className="w-8 h-8 text-blue-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-3">{step.title}</h3>
                                    <p className="text-neutral-500 leading-relaxed max-w-xs mx-auto">{step.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white border border-neutral-100 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl shadow-neutral-200/50">
                        <div className="relative z-10">
                            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-8">
                                Ready to build your digital legacy?
                            </h2>
                            <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-12">
                                Join hundreds of industry experts who are already sharing their knowledge
                                and earning with WorkGrad. Application takes less than 5 minutes.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link to="/register?role=mentor">
                                    <Button
                                        size="lg"
                                        className="px-12 bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 text-white shadow-lg shadow-blue-500/20"
                                        rightIcon={<ArrowRight className="w-5 h-5" />}
                                    >
                                        Join as a Mentor
                                    </Button>
                                </Link>
                            </div>
                            <div className="mt-12 flex flex-wrap justify-center gap-6 text-neutral-500 text-sm font-medium">
                                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> No Upfront Costs</span>
                                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Keep 97% Revenue</span>
                                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Global Audience</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
