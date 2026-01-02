import React from 'react'
import { Routes, Route, Outlet, Link, useParams } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { TrendingUp, Award, Target, Zap, Rocket, Heart } from 'lucide-react'
import { AuthProvider } from '@/context'
import { ProtectedRoute } from '@/components/auth'
import { PublicLayout } from '@/components/layout'

// Public Pages
import { LandingPage } from '@/pages/public'

// Auth Pages
import { LoginPage, RegisterPage } from '@/pages/auth'

// Dashboard Pages
import { LearnerDashboard } from '@/pages/learner'
import { EmployerDashboard } from '@/pages/employer'
import { MentorDashboard } from '@/pages/mentor'
import { AdminDashboard } from '@/pages/admin'



const NotFound = () => (
    <div className="flex items-center justify-center py-20">
        <div className="text-center">
            <h1 className="text-6xl font-display font-bold text-primary-600 mb-4">
                404
            </h1>
            <p className="text-xl text-neutral-700 mb-8">Page not found</p>
            <a
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-semibold rounded-xl shadow-glow-sm hover:shadow-glow transition-all"
            >
                Go Home
            </a>
        </div>
    </div>
)

// About Page
const AboutPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-6">About WorkGrad</h1>
        <div className="prose prose-lg text-neutral-600">
            <p className="text-xl">
                WorkGrad is a comprehensive career development platform designed to bridge the gap between
                talented learners and top employers, facilitated by expert mentors.
            </p>
            <h2 className="text-2xl font-bold text-neutral-900 mt-8">Our Mission</h2>
            <p>
                To empower individuals with the skills, tools, and connections they need to launch
                and accelerate their careers in the modern workforce.
            </p>
            <h2 className="text-2xl font-bold text-neutral-900 mt-8">What We Offer</h2>
            <ul className="space-y-2">
                <li><strong>For Learners:</strong> ATS-optimized resume builder, portfolio showcase, job portal, and industry-relevant courses.</li>
                <li><strong>For Employers:</strong> Talent discovery, campus hiring, virtual recruitment campaigns, and candidate assessment tools.</li>
                <li><strong>For Mentors:</strong> Course creation platform, curriculum builder, and earnings through teaching.</li>
            </ul>
            <h2 className="text-2xl font-bold text-neutral-900 mt-8">Our Values</h2>
            <ul className="space-y-2">
                <li><strong>Accessibility:</strong> Making career development tools available to everyone.</li>
                <li><strong>Quality:</strong> Providing industry-standard resources and expert-led courses.</li>
                <li><strong>Community:</strong> Building connections between learners, mentors, and employers.</li>
                <li><strong>Innovation:</strong> Continuously improving our platform with modern technologies.</li>
            </ul>
        </div>
    </div>
)

// Pricing Page  
const PricingPage = () => (
    <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-neutral-600">Choose the plan that's right for you</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl p-8 border border-neutral-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-neutral-900">Free</h3>
                <p className="text-neutral-500 mt-2">Perfect for getting started</p>
                <p className="text-4xl font-bold mt-6">$0<span className="text-lg font-normal text-neutral-500">/month</span></p>
                <ul className="mt-8 space-y-4">
                    <li className="flex items-center gap-2"><span className="text-success-500">✓</span> Basic resume builder</li>
                    <li className="flex items-center gap-2"><span className="text-success-500">✓</span> Job search access</li>
                    <li className="flex items-center gap-2"><span className="text-success-500">✓</span> 5 job applications/month</li>
                    <li className="flex items-center gap-2"><span className="text-success-500">✓</span> Community access</li>
                </ul>
                <a href="/register" className="mt-8 block w-full text-center py-3 border border-primary-600 text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-colors">Get Started</a>
            </div>
            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white transform scale-105 shadow-xl">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Pro</h3>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Most Popular</span>
                </div>
                <p className="text-white/80 mt-2">For serious job seekers</p>
                <p className="text-4xl font-bold mt-6">$19<span className="text-lg font-normal text-white/70">/month</span></p>
                <ul className="mt-8 space-y-4">
                    <li className="flex items-center gap-2"><span>✓</span> Advanced ATS resume builder</li>
                    <li className="flex items-center gap-2"><span>✓</span> Portfolio builder</li>
                    <li className="flex items-center gap-2"><span>✓</span> Unlimited job applications</li>
                    <li className="flex items-center gap-2"><span>✓</span> All courses included</li>
                    <li className="flex items-center gap-2"><span>✓</span> Priority support</li>
                </ul>
                <a href="/register" className="mt-8 block w-full text-center py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-neutral-50 transition-colors">Start Free Trial</a>
            </div>
            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl p-8 border border-neutral-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-neutral-900">Enterprise</h3>
                <p className="text-neutral-500 mt-2">For organizations</p>
                <p className="text-4xl font-bold mt-6">Custom</p>
                <ul className="mt-8 space-y-4">
                    <li className="flex items-center gap-2"><span className="text-success-500">✓</span> Everything in Pro</li>
                    <li className="flex items-center gap-2"><span className="text-success-500">✓</span> Campus hiring tools</li>
                    <li className="flex items-center gap-2"><span className="text-success-500">✓</span> Custom branding</li>
                    <li className="flex items-center gap-2"><span className="text-success-500">✓</span> API access</li>
                    <li className="flex items-center gap-2"><span className="text-success-500">✓</span> Dedicated support</li>
                </ul>
                <a href="/register" className="mt-8 block w-full text-center py-3 border border-primary-600 text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-colors">Contact Sales</a>
            </div>
        </div>
    </div>
)

// Features Page
const FeaturesPage = () => (
    <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
            <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">Platform Features</h1>
            <p className="text-xl text-neutral-600">Everything you need to succeed in your career</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
                { title: 'ATS Resume Builder', desc: 'Create resumes that pass applicant tracking systems with our AI-powered builder.' },
                { title: 'Portfolio Showcase', desc: 'Display your best work with beautiful, customizable portfolio templates.' },
                { title: 'Job Portal', desc: 'Access thousands of job listings from top companies worldwide.' },
                { title: 'Course Marketplace', desc: 'Learn from industry experts with our curated course library.' },
                { title: 'Campus Hiring', desc: 'Connect with universities for efficient campus recruitment.' },
                { title: 'Analytics Dashboard', desc: 'Track your progress with detailed insights and metrics.' },
            ].map((feature) => (
                <div key={feature.title} className="bg-white p-6 rounded-2xl border border-neutral-200 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">{feature.title}</h3>
                    <p className="text-neutral-600">{feature.desc}</p>
                </div>
            ))}
        </div>
    </div>
)

// Settings Page
const SettingsPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-6">Settings</h1>
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200">
                <h2 className="text-xl font-bold text-neutral-900 mb-4">Account Settings</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Email Notifications</label>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded text-primary-600" defaultChecked />
                                <span className="text-sm">Job alerts</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded text-primary-600" defaultChecked />
                                <span className="text-sm">Course updates</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded text-primary-600" />
                                <span className="text-sm">Newsletter</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Language</label>
                        <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none">
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200">
                <h2 className="text-xl font-bold text-neutral-900 mb-4">Privacy</h2>
                <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                        <span className="font-medium">Profile visibility</span>
                        <select className="px-3 py-1 border border-neutral-200 rounded-lg text-sm">
                            <option>Public</option>
                            <option>Private</option>
                            <option>Connections only</option>
                        </select>
                    </label>
                    <label className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                        <span className="font-medium">Show activity status</span>
                        <input type="checkbox" className="rounded text-primary-600" defaultChecked />
                    </label>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200">
                <h2 className="text-xl font-bold text-neutral-900 mb-4">Security</h2>
                <div className="space-y-3">
                    <button className="w-full text-left p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                        <p className="font-medium">Change Password</p>
                        <p className="text-sm text-neutral-500">Update your password regularly for security</p>
                    </button>
                    <button className="w-full text-left p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-neutral-500">Add an extra layer of security</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
)

// Support Page
const SupportPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">Help & Support</h1>
            <p className="text-xl text-neutral-600">We're here to help you succeed</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
                { title: 'Getting Started', desc: 'Learn the basics of using WorkGrad', icon: '🚀' },
                { title: 'Account & Billing', desc: 'Manage your subscription and payments', icon: '💳' },
                { title: 'Resume Builder', desc: 'Tips for creating ATS-friendly resumes', icon: '📄' },
                { title: 'Job Applications', desc: 'Applying and tracking your applications', icon: '✉️' },
            ].map((item) => (
                <div key={item.title} className="bg-white p-6 rounded-2xl border border-neutral-200 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">{item.title}</h3>
                    <p className="text-neutral-600">{item.desc}</p>
                </div>
            ))}
        </div>
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
            <p className="text-white/80 mb-6">Our support team is available 24/7 to assist you.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="mailto:support@workgrad.com" className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-neutral-50 transition-colors">
                    Email Support
                </a>
                <button className="px-6 py-3 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                    Live Chat
                </button>
            </div>
        </div>
        <div className="mt-12 bg-white p-6 rounded-2xl border border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {[
                    { q: 'How do I create a resume?', a: 'Navigate to Dashboard → Resume Builder and follow the step-by-step guide.' },
                    { q: 'How do I apply for jobs?', a: 'Browse the Jobs section, click on a job listing, and click the Apply button.' },
                    { q: 'How do I change my subscription?', a: 'Go to Settings → Account & Billing to manage your subscription.' },
                ].map((faq) => (
                    <details key={faq.q} className="p-4 bg-neutral-50 rounded-lg">
                        <summary className="font-medium cursor-pointer">{faq.q}</summary>
                        <p className="mt-2 text-neutral-600">{faq.a}</p>
                    </details>
                ))}
            </div>
        </div>
    </div>
)

// Jobs Page
const JobsPage = () => (
    <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">Browse Jobs</h1>
            <p className="text-xl text-neutral-600">Find your dream job from thousands of opportunities</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
                { title: 'Senior React Developer', company: 'TechCorp', location: 'Remote', salary: '$120K-150K' },
                { title: 'Product Designer', company: 'DesignHub', location: 'New York', salary: '$90K-120K' },
                { title: 'Backend Engineer', company: 'StartupXYZ', location: 'San Francisco', salary: '$130K-160K' },
                { title: 'Data Scientist', company: 'AI Labs', location: 'Boston', salary: '$140K-180K' },
                { title: 'DevOps Engineer', company: 'CloudTech', location: 'Remote', salary: '$125K-155K' },
                { title: 'Mobile Developer', company: 'AppWorks', location: 'Austin', salary: '$110K-140K' },
            ].map((job) => (
                <div key={job.title} className="bg-white p-6 rounded-2xl border border-neutral-200 hover:shadow-lg transition-all">
                    <h3 className="font-bold text-neutral-900 mb-2">{job.title}</h3>
                    <p className="text-neutral-600 mb-1">{job.company}</p>
                    <p className="text-sm text-neutral-500 mb-3">{job.location}</p>
                    <p className="text-primary-600 font-semibold">{job.salary}</p>
                    <a href="/login" className="mt-4 block w-full text-center py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Apply Now</a>
                </div>
            ))}
        </div>
    </div>
)

// Course data
const coursesData = [
    { id: 'react-masterclass', title: 'React Masterclass', instructor: 'John Smith', instructorRole: 'Senior Frontend Engineer at Meta', students: 2500, rating: 4.8, price: 49, hours: 42, lessons: 86, level: 'Beginner to Advanced', description: 'Master React from basics to advanced patterns. Build real-world applications with hooks, context, and modern best practices.', tags: ['React', 'JavaScript', 'Hooks', 'Redux'], requirements: ['Basic understanding of HTML, CSS, and JavaScript', 'Familiarity with ES6+ syntax', 'A computer with Node.js installed', 'Code editor (VS Code recommended)'] },
    { id: 'nodejs-backend', title: 'Node.js Backend', instructor: 'Sarah Wilson', instructorRole: 'Backend Lead at Stripe', students: 1800, rating: 4.7, price: 39, hours: 38, lessons: 72, level: 'Intermediate', description: 'Build scalable backend applications with Node.js, Express, and MongoDB. Learn RESTful APIs and authentication.', tags: ['Node.js', 'Express', 'MongoDB', 'REST API'], requirements: ['JavaScript fundamentals', 'Basic understanding of web servers', 'Familiarity with terminal/command line', 'MongoDB installed locally or Atlas account'] },
    { id: 'python-data-science', title: 'Python for Data Science', instructor: 'Mike Chen', instructorRole: 'Data Scientist at Google', students: 3200, rating: 4.9, price: 59, hours: 56, lessons: 120, level: 'Beginner to Advanced', description: 'Learn Python for data analysis, visualization, and machine learning. Master pandas, numpy, and scikit-learn.', tags: ['Python', 'Pandas', 'NumPy', 'Machine Learning'], requirements: ['Basic programming knowledge', 'Python 3.x installed', 'Jupyter Notebook or Google Colab', 'Basic math/statistics background helpful'] },
    { id: 'ui-ux-design', title: 'UI/UX Design', instructor: 'Emily Brown', instructorRole: 'Design Director at Airbnb', students: 2100, rating: 4.6, price: 45, hours: 32, lessons: 64, level: 'Beginner', description: 'Create stunning user interfaces and experiences. Learn Figma, design principles, and user research methods.', tags: ['Figma', 'UI Design', 'UX Research', 'Prototyping'], requirements: ['No prior design experience needed', 'Figma account (free)', 'Creative mindset', 'Access to a computer with internet'] },
    { id: 'cloud-computing', title: 'Cloud Computing', instructor: 'Alex Kumar', instructorRole: 'Cloud Architect at AWS', students: 1500, rating: 4.8, price: 55, hours: 44, lessons: 88, level: 'Intermediate to Advanced', description: 'Master AWS, Azure, and GCP. Learn cloud architecture, serverless, and DevOps practices.', tags: ['AWS', 'Azure', 'Docker', 'Kubernetes'], requirements: ['Basic Linux command line skills', 'Understanding of networking concepts', 'AWS/Azure/GCP free tier account', 'Docker installed locally'] },
    { id: 'machine-learning', title: 'Machine Learning', instructor: 'Lisa Park', instructorRole: 'ML Engineer at OpenAI', students: 2800, rating: 4.9, price: 69, hours: 62, lessons: 140, level: 'Advanced', description: 'Deep dive into machine learning algorithms, neural networks, and AI applications. Build real ML projects.', tags: ['TensorFlow', 'PyTorch', 'Deep Learning', 'Neural Networks'], requirements: ['Strong Python programming skills', 'Linear algebra and calculus fundamentals', 'Statistics and probability knowledge', 'GPU access recommended (Google Colab works)'] },
]

// Category data with icons
const categoryData = [
    { slug: 'programming-tools', title: 'Programming Tools', description: 'Master essential programming languages and development tools', color: 'from-blue-500 to-indigo-600', bgColor: 'bg-blue-500', icon: '💻', courses: ['react-masterclass', 'nodejs-backend'], tools: ['JavaScript', 'React', 'Node.js', 'Git'] },
    { slug: 'data-professional', title: 'Data Professional', description: 'Learn data analysis, visualization, and machine learning', color: 'from-emerald-500 to-teal-600', bgColor: 'bg-emerald-500', icon: '📊', courses: ['python-data-science'], tools: ['Python', 'SQL', 'Power BI', 'Tableau'] },
    { slug: 'digital-marketer', title: 'Digital Marketer', description: 'Master SEO, social media, and digital advertising', color: 'from-orange-500 to-amber-600', bgColor: 'bg-orange-500', icon: '📈', courses: [], tools: ['SEO', 'Google Ads', 'Analytics', 'Social Media'] },
    { slug: 'ui-ux-designer', title: 'UI/UX Designer', description: 'Create stunning user interfaces and experiences', color: 'from-pink-500 to-rose-600', bgColor: 'bg-pink-500', icon: '🎨', courses: ['ui-ux-design'], tools: ['Figma', 'Adobe XD', 'Photoshop', 'Sketch'] },
]

// Full Stack Domain data
const fullStackDomains = [
    {
        slug: 'mern-stack',
        title: 'MERN Stack',
        description: 'MongoDB, Express.js, React, Node.js - The most popular JavaScript full-stack',
        icon: '🚀',
        color: 'from-green-500 to-emerald-600',
        students: 15000,
        rating: 4.9,
        topics: [
            { id: 'html-css', title: 'HTML & CSS Fundamentals', icon: '🎨', duration: '8 hours', courseId: 'html-css-basics' },
            { id: 'javascript', title: 'JavaScript Essentials', icon: '⚡', duration: '15 hours', courseId: 'javascript-essentials' },
            { id: 'git-github', title: 'Git & GitHub', icon: '🔧', duration: '6 hours', courseId: 'git-github' },
            { id: 'react', title: 'React.js', icon: '⚛️', duration: '25 hours', courseId: 'react-masterclass' },
            { id: 'nodejs', title: 'Node.js & Express', icon: '🟢', duration: '20 hours', courseId: 'nodejs-backend' },
            { id: 'mongodb', title: 'MongoDB', icon: '🍃', duration: '12 hours', courseId: 'mongodb-fundamentals' },
        ]
    },
    {
        slug: 'mean-stack',
        title: 'MEAN Stack',
        description: 'MongoDB, Express.js, Angular, Node.js - Enterprise-grade full-stack',
        icon: '🔺',
        color: 'from-red-500 to-rose-600',
        students: 8500,
        rating: 4.8,
        topics: [
            { id: 'html-css', title: 'HTML & CSS Fundamentals', icon: '🎨', duration: '8 hours', courseId: 'html-css-basics' },
            { id: 'typescript', title: 'TypeScript', icon: '📘', duration: '10 hours', courseId: 'typescript-essentials' },
            { id: 'angular', title: 'Angular', icon: '🔺', duration: '28 hours', courseId: 'angular-course' },
            { id: 'nodejs', title: 'Node.js & Express', icon: '🟢', duration: '20 hours', courseId: 'nodejs-backend' },
            { id: 'mongodb', title: 'MongoDB', icon: '🍃', duration: '12 hours', courseId: 'mongodb-fundamentals' },
        ]
    },
    {
        slug: 'python-fullstack',
        title: 'Python Full Stack',
        description: 'Python, Django/Flask, PostgreSQL, React - Versatile full-stack development',
        icon: '🐍',
        color: 'from-yellow-500 to-orange-600',
        students: 12000,
        rating: 4.7,
        topics: [
            { id: 'python', title: 'Python Programming', icon: '🐍', duration: '18 hours', courseId: 'python-data-science' },
            { id: 'django', title: 'Django Framework', icon: '🎸', duration: '22 hours', courseId: 'django-course' },
            { id: 'postgresql', title: 'PostgreSQL', icon: '🐘', duration: '10 hours', courseId: 'postgresql-course' },
            { id: 'react', title: 'React.js', icon: '⚛️', duration: '25 hours', courseId: 'react-masterclass' },
            { id: 'docker', title: 'Docker & Deployment', icon: '🐳', duration: '8 hours', courseId: 'docker-course' },
        ]
    },
]

// Full Stack Domain Detail Page
const FullStackDomainPage = () => {
    const { domain: domainSlug } = useParams()
    const domain = fullStackDomains.find(d => d.slug === domainSlug) || fullStackDomains[0]

    return (
        <div>


            {/* Premium Hero Section */}
            <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-16 lg:py-20 relative overflow-hidden">
                {/* Decorative blurs */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

                        {/* Left Content */}
                        <div className="flex-1">
                            {/* Back Link */}
                            <Link to="/fullstack" className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-neutral-700 mb-4 transition-colors">
                                ← All Stacks
                            </Link>

                            {/* Icon + Label */}
                            <div className="inline-flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-neutral-100 mb-6">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${domain.color} flex items-center justify-center text-xl`}>
                                    {domain.icon}
                                </div>
                                <div className="text-left">
                                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">Full Stack</span>
                                </div>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-4">
                                {domain.title}
                            </h1>

                            {/* Sub-description */}
                            <p className="text-sm text-neutral-500 mb-2">{domain.description}</p>

                            {/* Description */}
                            <p className="text-lg text-neutral-600 mb-8 max-w-lg">
                                Master the most popular JavaScript full-stack development with MongoDB, Express.js, React, and Node.js. Build real-world applications from scratch.
                            </p>

                            {/* Mini Stats Row */}
                            <div className="flex items-center gap-6 mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                                        <span className="text-yellow-600 text-sm">★</span>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-neutral-900">{domain.rating}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <TrendingUp className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-neutral-900">{domain.students.toLocaleString()}+</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                                        <Award className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-neutral-900">{domain.topics.length}+</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <Link
                                    to={`/courses/${domain.topics[0].courseId}`}
                                    className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${domain.color} text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg`}
                                >
                                    <Zap className="w-4 h-4" />
                                    Start Learning
                                </Link>
                                <a
                                    href="#courses"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-700 font-semibold rounded-xl border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-all"
                                >
                                    <Target className="w-4 h-4" />
                                    View Curriculum
                                </a>
                            </div>
                        </div>

                        {/* Right Learning Path Card */}
                        <div className="flex-shrink-0 w-full max-w-sm bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
                            <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
                                <h3 className="font-bold text-neutral-900">Learning Path</h3>
                                <span className="text-xs text-neutral-500">{domain.topics.length} topics</span>
                            </div>
                            <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                                {domain.topics.map((topic, index) => (
                                    <div key={topic.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${index === 0 ? 'bg-emerald-100 text-emerald-600' :
                                            index === 1 ? 'bg-blue-100 text-blue-600' :
                                                index === 2 ? 'bg-purple-100 text-purple-600' :
                                                    index === 3 ? 'bg-orange-100 text-orange-600' :
                                                        'bg-neutral-100 text-neutral-600'
                                            }`}>
                                            {topic.icon}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-neutral-900">{topic.title}</p>
                                        </div>
                                        <span className="text-neutral-300">→</span>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 bg-neutral-50 border-t border-neutral-100">
                                <a href="#courses" className="text-sm text-primary-600 font-medium hover:text-primary-700 transition-colors">
                                    + View detailed syllabus
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Courses in This Path Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-3">
                        Courses in This Path
                    </h2>
                    <p className="text-neutral-500 max-w-xl mx-auto">
                        Follow the recommended order of topics to stay on course or pick up from wherever
                    </p>
                </div>

                {/* Course Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {domain.topics.map((topic, index) => {
                        const colorSchemes = [
                            { bg: 'from-orange-500 to-rose-500', light: 'bg-orange-100', iconBg: 'bg-orange-500', border: 'border-l-orange-500' },
                            { bg: 'from-sky-500 to-blue-600', light: 'bg-sky-100', iconBg: 'bg-sky-500', border: 'border-l-sky-500' },
                            { bg: 'from-emerald-500 to-teal-600', light: 'bg-emerald-100', iconBg: 'bg-emerald-500', border: 'border-l-emerald-500' },
                            { bg: 'from-purple-500 to-violet-600', light: 'bg-purple-100', iconBg: 'bg-purple-500', border: 'border-l-purple-500' },
                            { bg: 'from-rose-500 to-pink-600', light: 'bg-rose-100', iconBg: 'bg-rose-500', border: 'border-l-rose-500' },
                            { bg: 'from-amber-500 to-orange-600', light: 'bg-amber-100', iconBg: 'bg-amber-500', border: 'border-l-amber-500' },
                            { bg: 'from-indigo-500 to-purple-600', light: 'bg-indigo-100', iconBg: 'bg-indigo-500', border: 'border-l-indigo-500' },
                        ]
                        const colors = colorSchemes[index % colorSchemes.length]
                        const levels = ['Beginner', 'Beginner', 'Beginner', 'Intermediate', 'Intermediate', 'Intermediate', 'Advanced']
                        const level = levels[index % levels.length]
                        const hasProgress = index > 0 && index < 3
                        const progress = hasProgress ? (index === 1 ? 65 : 30) : 0

                        return (
                            <div key={topic.id} className={`group bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 ${colors.border}`}>
                                {/* Header with Icon and Title */}
                                <div className="p-5 pb-4">
                                    <div className="flex items-start gap-4 mb-3">
                                        {/* Icon Badge */}
                                        <div className={`w-12 h-12 rounded-xl ${colors.light} flex items-center justify-center text-2xl flex-shrink-0`}>
                                            {topic.icon}
                                        </div>

                                        {/* Title */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-neutral-900 text-base leading-tight mb-1 group-hover:text-primary-600 transition-colors">
                                                {topic.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-neutral-500 mb-3 line-clamp-2">
                                        {index === 0 ? 'Structure web pages with semantic HTML5 elements' :
                                            index === 1 ? 'Style modern responsive layouts with CSS and Tailwind' :
                                                index === 2 ? 'Build interactive UI with React hooks and components' :
                                                    index === 3 ? 'Server-side JavaScript runtime for scalable backends' :
                                                        index === 4 ? 'Fast and minimalist web framework for Node.js' :
                                                            index === 5 ? 'NoSQL database for flexible document storage' :
                                                                'Version control and collaborative development'}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
                                        <span className="flex items-center gap-1">
                                            <span>⏱</span> {topic.duration}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span>📚</span> 24 lessons
                                        </span>
                                    </div>

                                    {/* Level Badge */}
                                    <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${level === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
                                        level === 'Intermediate' ? 'bg-amber-100 text-amber-700' :
                                            'bg-rose-100 text-rose-700'
                                        }`}>
                                        {level}
                                    </span>

                                    {/* Progress Bar (if in progress) */}
                                    {hasProgress && (
                                        <div className="mt-3">
                                            <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full bg-gradient-to-r ${colors.bg} rounded-full transition-all`}
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Start Course Button */}
                                <div className="px-5 pb-5">
                                    <Link
                                        to={`/courses/${topic.courseId}`}
                                        className={`w-full py-2.5 bg-gradient-to-r ${colors.bg} text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity text-center flex items-center justify-center gap-2`}
                                    >
                                        Start Course
                                        <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* What You'll Achieve Section */}
            <div className="bg-gradient-to-b from-neutral-50 to-white py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-3">
                            What You'll Achieve
                        </h2>
                        <p className="text-neutral-500 max-w-lg mx-auto">
                            Complete this path and become a full-stack developer in 3-6 months of practice
                        </p>
                    </div>

                    {/* Achievement Cards */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Rocket,
                                color: 'bg-emerald-100 text-emerald-600',
                                title: 'Build Real Projects',
                                description: 'Create production-ready applications, including a portfolio-worthy showcase to impress recruiters and hiring managers'
                            },
                            {
                                icon: Award,
                                color: 'bg-blue-100 text-blue-600',
                                title: 'Earn Certificates',
                                description: 'Get industry-recognized certificates that validate your expertise with verifiable credentials to add to your profile'
                            },
                            {
                                icon: TrendingUp,
                                color: 'bg-purple-100 text-purple-600',
                                title: 'Job-Ready Skills',
                                description: 'Master the exact skills that top companies are hiring for, with hands-on experience that sets you apart from others'
                            },
                        ].map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm hover:shadow-lg transition-shadow">
                                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-neutral-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-neutral-500 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Ready to Start CTA Section */}
            <div className="py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="relative overflow-hidden bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl p-10 md:p-14 text-center">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-200/30 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-200/30 rounded-full blur-3xl" />

                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-600 rounded-2xl mb-6 shadow-lg shadow-emerald-500/30">
                                <Rocket className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-display font-bold text-neutral-900 mb-3">
                                Ready to Start Your Journey?
                            </h2>
                            <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                                Join thousands of learners who have transformed their careers with {domain.title}.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href={`/courses/${domain.topics[0].courseId}`}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/30"
                                >
                                    <Zap className="w-4 h-4" />
                                    Get Started Free
                                </a>
                                <a
                                    href="/courses"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-700 font-semibold rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all"
                                >
                                    View All Courses
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// All Full Stack Domains Page
const FullStackDomainsPage = () => {
    return (
        <div>


            {/* Premium Hero Section */}
            <div className="bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 py-16 lg:py-20 relative overflow-hidden">
                {/* Decorative blurs */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-200/40 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-neutral-100 shadow-sm mb-6">
                            <span className="text-xl">🎯</span>
                            <span className="text-neutral-700 font-medium text-sm">Full Stack Mastery</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
                            Full Stack
                            <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                Learning Paths
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-neutral-600 mb-8 max-w-xl mx-auto">
                            Master complete technology stacks from frontend to backend. Choose your path and become a full-stack developer.
                        </p>

                        {/* Stats Row */}
                        <div className="inline-flex items-center gap-8 px-6 py-3 bg-white rounded-2xl shadow-sm border border-neutral-100">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-neutral-900">{fullStackDomains.length}</p>
                                <p className="text-xs text-neutral-500">Learning Paths</p>
                            </div>
                            <div className="w-px h-10 bg-neutral-200" />
                            <div className="text-center">
                                <p className="text-2xl font-bold text-neutral-900">{fullStackDomains.reduce((acc, d) => acc + d.topics.length, 0)}+</p>
                                <p className="text-xs text-neutral-500">Total Courses</p>
                            </div>
                            <div className="w-px h-10 bg-neutral-200" />
                            <div className="text-center">
                                <p className="text-2xl font-bold text-neutral-900">{fullStackDomains.reduce((acc, d) => acc + d.students, 0).toLocaleString()}+</p>
                                <p className="text-xs text-neutral-500">Learners</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Learning Paths Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-3">
                        Choose Your Learning Path
                    </h2>
                    <p className="text-neutral-500 max-w-lg mx-auto">
                        Each path is designed to take you from beginner to job-ready in 3-6 months
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {fullStackDomains.map((domain, index) => {
                        const colorSchemes = [
                            { bg: 'from-orange-500 to-rose-500', light: 'bg-orange-100', border: 'border-l-orange-500' },
                            { bg: 'from-sky-500 to-blue-600', light: 'bg-sky-100', border: 'border-l-sky-500' },
                            { bg: 'from-emerald-500 to-teal-600', light: 'bg-emerald-100', border: 'border-l-emerald-500' },
                            { bg: 'from-purple-500 to-violet-600', light: 'bg-purple-100', border: 'border-l-purple-500' },
                            { bg: 'from-rose-500 to-pink-600', light: 'bg-rose-100', border: 'border-l-rose-500' },
                            { bg: 'from-amber-500 to-orange-600', light: 'bg-amber-100', border: 'border-l-amber-500' },
                        ]
                        const colors = colorSchemes[index % colorSchemes.length]

                        return (
                            <div key={domain.slug} className={`group bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 ${colors.border}`}>
                                {/* Header with Icon and Title */}
                                <div className="p-5 pb-4">
                                    <div className="flex items-start gap-4 mb-3">
                                        {/* Icon Badge */}
                                        <div className={`w-12 h-12 rounded-xl ${colors.light} flex items-center justify-center text-2xl flex-shrink-0`}>
                                            {domain.icon}
                                        </div>

                                        {/* Title */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-neutral-900 text-base leading-tight mb-1 group-hover:text-primary-600 transition-colors">
                                                {domain.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-neutral-500 mb-3 line-clamp-2">
                                        {domain.description}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
                                        <span className="flex items-center gap-1">
                                            <Award className="w-3 h-3" />
                                            <span>{domain.topics.length} Courses</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" />
                                            <span>{domain.students.toLocaleString()}+ Learners</span>
                                        </span>
                                    </div>

                                    {/* Level Badge */}
                                    <span className="inline-block px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700">
                                        Job Ready
                                    </span>
                                </div>

                                {/* View Path Button */}
                                <div className="px-5 pb-5">
                                    <Link
                                        to={`/fullstack/${domain.slug}`}
                                        className={`w-full py-2.5 bg-gradient-to-r ${colors.bg} text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity text-center flex items-center justify-center gap-2`}
                                    >
                                        View Path
                                        <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Why Choose Full Stack Section */}
            <div className="bg-gradient-to-b from-neutral-50 to-white py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-3">
                            Why Learn Full Stack Development?
                        </h2>
                        <p className="text-neutral-500 max-w-lg mx-auto">
                            Full-stack developers are among the most sought-after professionals in tech
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: TrendingUp, color: 'bg-emerald-100 text-emerald-600', title: 'High Demand', description: 'Companies actively hiring full-stack developers' },
                            { icon: Zap, color: 'bg-blue-100 text-blue-600', title: 'Higher Salary', description: 'Avg $120K+ in the US, ₹15L+ in India' },
                            { icon: Target, color: 'bg-purple-100 text-purple-600', title: 'Versatility', description: 'Work on any part of the application' },
                            { icon: Rocket, color: 'bg-orange-100 text-orange-600', title: 'Start Products', description: 'Build complete apps independently' },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm hover:shadow-lg transition-shadow text-center">
                                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-4`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-neutral-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-neutral-500">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="relative overflow-hidden bg-gradient-to-r from-violet-50 via-purple-50 to-indigo-50 rounded-3xl p-10 md:p-14 text-center">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-violet-200/30 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-200/30 rounded-full blur-3xl" />

                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-violet-600 rounded-2xl mb-6 shadow-lg shadow-violet-500/30">
                                <Rocket className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-display font-bold text-neutral-900 mb-3">
                                Ready to Become a Full Stack Developer?
                            </h2>
                            <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                                Pick a learning path and start your journey today. No prior experience needed.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href={`/fullstack/${fullStackDomains[0].slug}`}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-colors shadow-lg shadow-violet-500/30"
                                >
                                    <Zap className="w-4 h-4" />
                                    Start with {fullStackDomains[0].title}
                                </a>
                                <a
                                    href="/courses"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-700 font-semibold rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all"
                                >
                                    Browse All Courses
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Premium Categories Page
const CategoriesPage = () => {
    const totalCourses = categoryData.reduce((acc, cat) => acc + cat.courses.length, 0)

    return (
        <div>


            {/* Premium Hero Section */}
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 lg:py-20 relative overflow-hidden">
                {/* Decorative blurs */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-neutral-100 shadow-sm mb-6">
                            <span className="text-xl">📚</span>
                            <span className="text-neutral-700 font-medium text-sm">Skill Development</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
                            Master In-Demand
                            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Tools & Skills
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-neutral-600 mb-8 max-w-xl mx-auto">
                            Choose your learning path and start building job-ready skills with courses designed by industry experts.
                        </p>

                        {/* Stats Row */}
                        <div className="inline-flex items-center gap-8 px-6 py-3 bg-white rounded-2xl shadow-sm border border-neutral-100">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-neutral-900">{categoryData.length}</p>
                                <p className="text-xs text-neutral-500">Skill Tracks</p>
                            </div>
                            <div className="w-px h-10 bg-neutral-200" />
                            <div className="text-center">
                                <p className="text-2xl font-bold text-neutral-900">{totalCourses}+</p>
                                <p className="text-xs text-neutral-500">Courses</p>
                            </div>
                            <div className="w-px h-10 bg-neutral-200" />
                            <div className="text-center">
                                <p className="text-2xl font-bold text-neutral-900">50K+</p>
                                <p className="text-xs text-neutral-500">Students</p>
                            </div>
                            <div className="w-px h-10 bg-neutral-200" />
                            <div className="text-center">
                                <p className="text-2xl font-bold text-neutral-900">4.8★</p>
                                <p className="text-xs text-neutral-500">Avg Rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-3">
                        Explore Skill Categories
                    </h2>
                    <p className="text-neutral-500 max-w-lg mx-auto">
                        Each track is designed to take you from beginner to professional
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {categoryData.map((cat, index) => {
                        const colorSchemes = [
                            { bg: 'from-blue-500 to-indigo-600', light: 'bg-blue-100', border: 'border-l-blue-500' },
                            { bg: 'from-emerald-500 to-teal-600', light: 'bg-emerald-100', border: 'border-l-emerald-500' },
                            { bg: 'from-orange-500 to-rose-600', light: 'bg-orange-100', border: 'border-l-orange-500' },
                            { bg: 'from-purple-500 to-violet-600', light: 'bg-purple-100', border: 'border-l-purple-500' },
                            { bg: 'from-pink-500 to-rose-600', light: 'bg-pink-100', border: 'border-l-pink-500' },
                            { bg: 'from-cyan-500 to-blue-600', light: 'bg-cyan-100', border: 'border-l-cyan-500' },
                        ]
                        const colors = colorSchemes[index % colorSchemes.length]

                        return (
                            <Link
                                key={cat.slug}
                                to={`/courses/category/${cat.slug}`}
                                className={`group bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 ${colors.border}`}
                            >
                                {/* Header with Icon and Title */}
                                <div className="p-5 pb-4">
                                    <div className="flex items-start gap-4 mb-3">
                                        {/* Icon Badge */}
                                        <div className={`w-12 h-12 rounded-xl ${colors.light} flex items-center justify-center text-2xl flex-shrink-0`}>
                                            {cat.icon}
                                        </div>

                                        {/* Title */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-neutral-900 text-base leading-tight mb-1 group-hover:text-primary-600 transition-colors">
                                                {cat.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-neutral-500 mb-3 line-clamp-2">
                                        {cat.description}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
                                        <span className="flex items-center gap-1">
                                            <span>📚</span> {cat.courses.length} courses
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span>🔧</span> {cat.tools.length} tools
                                        </span>
                                    </div>

                                    {/* Tools Tags */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {cat.tools.slice(0, 3).map((tool) => (
                                            <span
                                                key={tool}
                                                className={`px-2 py-0.5 ${colors.light} rounded-md text-xs font-medium text-neutral-600`}
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                        {cat.tools.length > 3 && (
                                            <span className="px-2 py-0.5 bg-neutral-100 rounded-md text-xs text-neutral-500">
                                                +{cat.tools.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Explore Button */}
                                <div className="px-5 pb-5">
                                    <div className={`w-full py-2.5 bg-gradient-to-r ${colors.bg} text-white text-sm font-semibold rounded-lg text-center group-hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}>
                                        Explore Track
                                        <span>→</span>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* Why Skill Courses Section */}
            <div className="bg-gradient-to-b from-neutral-50 to-white py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-3">
                            Why Learn With Us?
                        </h2>
                        <p className="text-neutral-500 max-w-lg mx-auto">
                            Industry-recognized curriculum designed by experts
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: TrendingUp, color: 'bg-blue-100 text-blue-600', title: 'Industry Skills', description: 'Learn what top companies need' },
                            { icon: Award, color: 'bg-emerald-100 text-emerald-600', title: 'Certificates', description: 'Earn verified credentials' },
                            { icon: Target, color: 'bg-purple-100 text-purple-600', title: 'Hands-on Projects', description: 'Build real portfolio pieces' },
                            { icon: Rocket, color: 'bg-orange-100 text-orange-600', title: 'Career Ready', description: 'Job-ready in 3-6 months' },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm hover:shadow-lg transition-shadow text-center">
                                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-4`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-neutral-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-neutral-500">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-10 md:p-14 text-center">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-200/30 rounded-full blur-3xl" />

                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl mb-6 shadow-lg shadow-indigo-500/30">
                                <Zap className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-display font-bold text-neutral-900 mb-3">
                                Ready to Start Learning?
                            </h2>
                            <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                                Pick a skill track and start building your expertise today.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href="/courses"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30"
                                >
                                    <Zap className="w-4 h-4" />
                                    Browse All Courses
                                </a>
                                <a
                                    href="/fullstack"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-700 font-semibold rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all"
                                >
                                    Full Stack Paths
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Single Category Page
const CategoryPage = () => {
    const { slug: categorySlug } = useParams()
    const category = categoryData.find(c => c.slug === categorySlug) || categoryData[0]
    const categoryCourses = coursesData.filter(c => category.courses.includes(c.id))

    return (
        <div>


            {/* Premium Hero Section */}
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 lg:py-20 relative overflow-hidden">
                {/* Decorative blurs */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-200/20 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                        {/* Left Content */}
                        <div className="flex-1 text-center lg:text-left">
                            {/* Popular Skills Badge */}
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500 mb-4">
                                ← Popular Skills
                            </span>

                            {/* Icon Card */}
                            <div className="inline-flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-neutral-100 mb-6">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                                    <Zap className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-neutral-900">Fully Verified</p>
                                    <p className="text-xs text-neutral-500">Industry-recognized curriculum</p>
                                </div>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-4">
                                Master
                                <span className={`block bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                                    {category.title}
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-lg text-neutral-600 mb-8 max-w-lg mx-auto lg:mx-0">
                                {category.description}. Master coding languages for software development and build real-world applications.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-8">
                                <Link
                                    to="/register"
                                    className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${category.color} text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg`}
                                >
                                    Start Learning
                                </Link>
                                <a
                                    href="#courses"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-700 font-semibold rounded-xl border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-all"
                                >
                                    <Target className="w-4 h-4" />
                                    View Curriculum
                                </a>
                            </div>

                            {/* Avatar Group */}
                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 border-2 border-white" />
                                    ))}
                                </div>
                                <div className="text-sm">
                                    <span className="font-bold text-neutral-900">5000+</span>
                                    <span className="text-neutral-500 ml-1">learners</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Stats Grid */}
                        <div className="flex-shrink-0 grid grid-cols-2 gap-4 w-full max-w-sm">
                            {[
                                { icon: TrendingUp, value: '500K+', label: 'Active Students', color: 'bg-blue-50 text-blue-600' },
                                { icon: Award, value: '135', label: 'Certifications', color: 'bg-purple-50 text-purple-600' },
                                { icon: Rocket, value: '250+', label: 'Projects Built', color: 'bg-green-50 text-green-600' },
                                { icon: Heart, value: '45', label: 'Expert Mentors', color: 'bg-rose-50 text-rose-600' },
                            ].map((stat, index) => (
                                <div key={index} className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                                        <stat.icon className="w-5 h-5" />
                                    </div>
                                    <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                                    <p className="text-sm text-neutral-500">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div id="courses" className="max-w-6xl mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <p className="text-neutral-600">{categoryCourses.length} courses found</p>
                    <Link to="/courses/categories" className="text-primary-600 hover:text-primary-700 font-medium">← All Categories</Link>
                </div>

                {categoryCourses.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {categoryCourses.map((course, index) => {
                            const colorSchemes = [
                                { bg: 'from-orange-500 to-rose-500', light: 'bg-orange-100', border: 'border-l-orange-500' },
                                { bg: 'from-sky-500 to-blue-600', light: 'bg-sky-100', border: 'border-l-sky-500' },
                                { bg: 'from-emerald-500 to-teal-600', light: 'bg-emerald-100', border: 'border-l-emerald-500' },
                                { bg: 'from-purple-500 to-violet-600', light: 'bg-purple-100', border: 'border-l-purple-500' },
                                { bg: 'from-rose-500 to-pink-600', light: 'bg-rose-100', border: 'border-l-rose-500' },
                                { bg: 'from-amber-500 to-orange-600', light: 'bg-amber-100', border: 'border-l-amber-500' },
                            ]
                            const colors = colorSchemes[index % colorSchemes.length]
                            const icons = ['💻', '🎨', '⚛️', '🚀', '📱', '🔧', '📊', '🎯']
                            const icon = icons[index % icons.length]

                            return (
                                <div key={course.id} className={`group bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 ${colors.border}`}>
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
                                            {course.instructor} • Learn to build real-world applications
                                        </p>

                                        {/* Stats */}
                                        <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
                                            <span className="flex items-center gap-1">
                                                <span>⏱</span> {course.hours}h
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span>📚</span> {course.lessons} lessons
                                            </span>
                                        </div>

                                        {/* Level Badge */}
                                        <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${course.level === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
                                            course.level === 'Intermediate' ? 'bg-amber-100 text-amber-700' :
                                                'bg-rose-100 text-rose-700'
                                            }`}>
                                            {course.level}
                                        </span>
                                    </div>

                                    {/* View Course Button */}
                                    <div className="px-5 pb-5">
                                        <Link
                                            to={`/courses/${course.id}`}
                                            className={`w-full py-2.5 bg-gradient-to-r ${colors.bg} text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity text-center flex items-center justify-center gap-2`}
                                        >
                                            View Course
                                            <span>→</span>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">No courses yet</h3>
                        <p className="text-neutral-500 mb-6">Courses for this category are coming soon!</p>
                        <a href="/courses" className="inline-block px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
                            Browse All Courses
                        </a>
                    </div>
                )}
            </div>

            {/* Why Learn With Us Section */}
            <div className="bg-white py-20 mt-12 -mx-4 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4">
                            <TrendingUp className="w-4 h-4" />
                            Why Choose Us
                        </span>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
                            Why Learn {category.title} with Us?
                        </h2>
                        <p className="text-neutral-500 max-w-2xl mx-auto">
                            Industry-recognized curriculum designed by experts to fast-track your career
                        </p>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: TrendingUp, title: 'High Demand Skills', description: 'Top skills requested by Fortune 500 companies' },
                            { icon: Award, title: 'Certification', description: 'Industry-recognized certificates for your portfolio' },
                            { icon: Target, title: 'Hands-on Projects', description: 'Build real projects to showcase your abilities' },
                            { icon: Heart, title: 'Lifetime Access', description: 'Learn at your pace with forever access to content' },
                        ].map((feature, index) => (
                            <div key={index} className="group bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-xl hover:border-primary-200 transition-all duration-300">
                                <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                                    <feature.icon className="w-7 h-7 text-primary-600" />
                                </div>
                                <h3 className="text-lg font-bold text-neutral-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-neutral-500">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Ready to Start CTA Section */}
            <div className="py-20 -mx-4 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="relative overflow-hidden bg-gradient-to-r from-blue-100 via-indigo-50 to-purple-100 rounded-3xl p-10 md:p-16 text-center">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-primary-200/30 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary-200/30 rounded-full blur-3xl" />

                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-6 shadow-lg shadow-primary-500/30">
                                <Rocket className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-4">
                                Ready to Start Your Journey?
                            </h2>
                            <p className="text-neutral-600 mb-8 max-w-lg mx-auto">
                                Join thousands of learners who have transformed their careers with our {category.title} courses.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    to="/register"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30"
                                >
                                    <Zap className="w-4 h-4" />
                                    Get Started Free
                                </Link>
                                <Link
                                    to="/courses"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-700 font-semibold rounded-xl border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-all"
                                >
                                    View All Courses
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Courses Page with clickable cards
const CoursesPage = () => {
    return (
        <div>


            {/* Premium Hero Section */}
            <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 py-16 lg:py-20 relative overflow-hidden">
                {/* Decorative blurs */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-neutral-100 shadow-sm mb-6">
                            <span className="text-xl">🎓</span>
                            <span className="text-neutral-700 font-medium text-sm">All Courses</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
                            Skill
                            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent"> Courses</span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-neutral-600 mb-8 max-w-xl mx-auto">
                            Learn from industry experts and boost your career with our job-ready courses
                        </p>

                        {/* Stats Row */}
                        <div className="inline-flex items-center gap-8 px-6 py-3 bg-white rounded-2xl shadow-sm border border-neutral-100">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-neutral-900">{coursesData.length}</p>
                                <p className="text-xs text-neutral-500">Courses</p>
                            </div>
                            <div className="w-px h-10 bg-neutral-200" />
                            <div className="text-center">
                                <p className="text-2xl font-bold text-neutral-900">{coursesData.reduce((acc, c) => acc + c.students, 0).toLocaleString()}+</p>
                                <p className="text-xs text-neutral-500">Students</p>
                            </div>
                            <div className="w-px h-10 bg-neutral-200" />
                            <div className="text-center">
                                <p className="text-2xl font-bold text-neutral-900">4.8★</p>
                                <p className="text-xs text-neutral-500">Avg Rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-3">
                        Browse All Courses
                    </h2>
                    <p className="text-neutral-500 max-w-lg mx-auto">
                        Each course is designed by industry experts to help you land your dream job
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {coursesData.map((course, index) => {
                        const colorSchemes = [
                            { bg: 'from-orange-500 to-rose-500', light: 'bg-orange-100', border: 'border-l-orange-500' },
                            { bg: 'from-sky-500 to-blue-600', light: 'bg-sky-100', border: 'border-l-sky-500' },
                            { bg: 'from-emerald-500 to-teal-600', light: 'bg-emerald-100', border: 'border-l-emerald-500' },
                            { bg: 'from-purple-500 to-violet-600', light: 'bg-purple-100', border: 'border-l-purple-500' },
                            { bg: 'from-rose-500 to-pink-600', light: 'bg-rose-100', border: 'border-l-rose-500' },
                            { bg: 'from-amber-500 to-orange-600', light: 'bg-amber-100', border: 'border-l-amber-500' },
                            { bg: 'from-indigo-500 to-purple-600', light: 'bg-indigo-100', border: 'border-l-indigo-500' },
                            { bg: 'from-cyan-500 to-blue-600', light: 'bg-cyan-100', border: 'border-l-cyan-500' },
                        ]
                        const colors = colorSchemes[index % colorSchemes.length]
                        const icons = ['💻', '🎨', '⚛️', '🚀', '📱', '🔧', '📊', '🎯']
                        const icon = icons[index % icons.length]

                        return (
                            <div key={course.id} className={`group bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 ${colors.border}`}>
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
                                        {course.instructor} • Learn to build real-world applications
                                    </p>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
                                        <span className="flex items-center gap-1">
                                            <span>⏱</span> {course.hours}h
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span>📚</span> {course.lessons} lessons
                                        </span>
                                    </div>

                                    {/* Level Badge */}
                                    <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${course.level === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
                                        course.level === 'Intermediate' ? 'bg-amber-100 text-amber-700' :
                                            'bg-rose-100 text-rose-700'
                                        }`}>
                                        {course.level}
                                    </span>
                                </div>

                                {/* View Course Button */}
                                <div className="px-5 pb-5">
                                    <Link
                                        to={`/courses/${course.id}`}
                                        className={`w-full py-2.5 bg-gradient-to-r ${colors.bg} text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity text-center flex items-center justify-center gap-2`}
                                    >
                                        View Course
                                        <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Why Learn Section */}
            <div className="bg-gradient-to-b from-neutral-50 to-white py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-3">
                            Why Learn With WorkGrad?
                        </h2>
                        <p className="text-neutral-500 max-w-lg mx-auto">
                            Industry-recognized curriculum designed by experts
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: TrendingUp, color: 'bg-cyan-100 text-cyan-600', title: 'Expert Instructors', description: 'Learn from industry professionals' },
                            { icon: Award, color: 'bg-blue-100 text-blue-600', title: 'Certificates', description: 'Earn verified credentials' },
                            { icon: Target, color: 'bg-indigo-100 text-indigo-600', title: 'Hands-on Projects', description: 'Build real portfolio pieces' },
                            { icon: Rocket, color: 'bg-purple-100 text-purple-600', title: 'Lifetime Access', description: 'Learn at your own pace' },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm hover:shadow-lg transition-shadow text-center">
                                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-4`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-neutral-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-neutral-500">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="relative overflow-hidden bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50 rounded-3xl p-10 md:p-14 text-center">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-200/30 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl" />

                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/30">
                                <Zap className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-display font-bold text-neutral-900 mb-3">
                                Can't Decide Where to Start?
                            </h2>
                            <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                                Explore our learning paths or browse by skill category
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href="/fullstack"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
                                >
                                    <Zap className="w-4 h-4" />
                                    Full Stack Paths
                                </a>
                                <a
                                    href="/courses/categories"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-700 font-semibold rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all"
                                >
                                    Skill Categories
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Premium Course Detail Page
const CourseDetailPage = () => {
    const { id: courseId } = useParams()
    const course = coursesData.find(c => c.id === courseId) || coursesData[0]


    const [expandedSections, setExpandedSections] = React.useState<number[]>([0])

    const toggleSection = (index: number) => {
        setExpandedSections(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        )
    }

    const curriculum = [
        {
            title: 'Getting Started', lessons: [
                { name: 'Introduction to the Course', duration: '10 min', free: true },
                { name: 'Setting Up Your Environment', duration: '20 min', free: true },
                { name: 'Course Prerequisites', duration: '8 min', free: false },
            ]
        },
        {
            title: 'Core Fundamentals', lessons: [
                { name: 'Understanding the Basics', duration: '25 min', free: false },
                { name: 'Key Concepts Explained', duration: '30 min', free: false },
                { name: 'Hands-on Practice', duration: '45 min', free: false },
                { name: 'Quiz: Fundamentals', duration: '15 min', free: false, quiz: true },
            ]
        },
        {
            title: 'Advanced Techniques', lessons: [
                { name: 'Deep Dive into Advanced Topics', duration: '40 min', free: false },
                { name: 'Best Practices', duration: '35 min', free: false },
                { name: 'Real-world Applications', duration: '50 min', free: false },
                { name: 'Project: Build Something Amazing', duration: '120 min', free: false, project: true },
            ]
        },
        {
            title: 'Mastery & Beyond', lessons: [
                { name: 'Expert-level Patterns', duration: '45 min', free: false },
                { name: 'Performance Optimization', duration: '30 min', free: false },
                { name: 'Final Project', duration: '180 min', free: false, project: true },
                { name: 'Course Completion Quiz', duration: '20 min', free: false, quiz: true },
            ]
        },
    ]

    return (
        <div>


            {/* Hero Section */}
            <div className="bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 relative overflow-hidden">
                {/* Decorative blurs */}
                <div className="absolute top-0 right-1/3 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

                        {/* Left Content */}
                        <div className="flex-1 space-y-6">
                            {/* Back Link */}
                            <Link to="/courses" className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700 transition-colors">
                                ← Back to Courses
                            </Link>

                            {/* Icon Card + Badges */}
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-2xl shadow-lg shadow-orange-500/30">
                                    📘
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                                        {course.level}
                                    </span>
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                                        Bestseller
                                    </span>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 leading-tight">
                                {course.title}
                            </h1>

                            {/* Description */}
                            <p className="text-lg text-neutral-600 max-w-xl leading-relaxed">
                                {course.description}
                            </p>

                            {/* Stats Row */}
                            <div className="flex flex-wrap items-center gap-6 py-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-500 text-lg">★</span>
                                    <span className="font-bold text-neutral-900">{course.rating}</span>
                                </div>
                                <div className="flex items-center gap-2 text-neutral-600">
                                    <TrendingUp className="w-4 h-4 text-blue-500" />
                                    <span>{course.hours}h</span>
                                </div>
                                <div className="flex items-center gap-2 text-neutral-600">
                                    <Award className="w-4 h-4 text-purple-500" />
                                    <span>{course.lessons} lessons</span>
                                </div>
                                <div className="flex items-center gap-2 text-neutral-600">
                                    <Heart className="w-4 h-4 text-rose-500" />
                                    <span>{course.students.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Instructor */}
                            <div className="flex items-center gap-3 pt-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center font-bold text-white text-sm">
                                    {course.instructor.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-neutral-900">{course.instructor}</p>
                                    <p className="text-sm text-neutral-500">{course.instructorRole}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar - Compact Card */}
                        <div className="w-full lg:w-80 flex-shrink-0">
                            <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 overflow-hidden">
                                {/* Video Preview */}
                                <div className="aspect-video bg-gradient-to-br from-orange-500 via-rose-500 to-red-500 relative group m-4 rounded-2xl overflow-hidden">
                                    <a href={`/dashboard/courses/${course.id}/lesson/1`} className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center cursor-pointer group-hover:scale-110 transition-transform shadow-xl">
                                            <div className="w-0 h-0 border-l-[16px] border-l-orange-500 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                                        </div>
                                    </a>
                                </div>

                                <div className="p-5 space-y-4">
                                    <a
                                        href={`/dashboard/courses/${course.id}/lesson/1`}
                                        className="w-full py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg text-center block"
                                    >
                                        Get Started
                                    </a>

                                    <button className="w-full py-3 bg-neutral-100 text-neutral-700 font-medium rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
                                        <Target className="w-4 h-4" />
                                        Load syllabus
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        {/* What You'll Learn */}
                        <section>
                            <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">What You'll Learn</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    'Build real-world applications from scratch',
                                    'Master core concepts and advanced patterns',
                                    'Understand best practices and optimization',
                                    'Deploy and scale your applications',
                                    'Write clean, maintainable code',
                                    'Debug and troubleshoot effectively',
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-neutral-100">
                                        <span className="w-6 h-6 rounded-full bg-success-100 text-success-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                                        <span className="text-neutral-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Course Requirements */}
                        <section>
                            <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">Requirements</h2>
                            <div className="bg-white rounded-xl border border-neutral-200 p-6">
                                <ul className="space-y-3">
                                    {(course.requirements || []).map((req, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-medium">
                                                {i + 1}
                                            </span>
                                            <span className="text-neutral-700">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Course Curriculum */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-display font-bold text-neutral-900">Course Curriculum</h2>
                                <span className="text-sm text-neutral-500">{curriculum.length} sections • {curriculum.reduce((acc, s) => acc + s.lessons.length, 0)} lessons • {course.hours}h total</span>
                            </div>
                            <div className="space-y-3">
                                {curriculum.map((section, sectionIndex) => (
                                    <div key={sectionIndex} className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                                        <button
                                            onClick={() => toggleSection(sectionIndex)}
                                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${expandedSections.includes(sectionIndex) ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100 text-neutral-500'}`}>
                                                    {sectionIndex + 1}
                                                </span>
                                                <div className="text-left">
                                                    <h3 className="font-semibold text-neutral-900">{section.title}</h3>
                                                    <p className="text-sm text-neutral-500">{section.lessons.length} lessons</p>
                                                </div>
                                            </div>
                                            <span className={`text-neutral-400 transition-transform ${expandedSections.includes(sectionIndex) ? 'rotate-180' : ''}`}>
                                                ▼
                                            </span>
                                        </button>

                                        {expandedSections.includes(sectionIndex) && (
                                            <div className="border-t border-neutral-100">
                                                {section.lessons.map((lesson, lessonIndex) => {
                                                    // Calculate absolute index for the link
                                                    const previousLessonsCount = curriculum.slice(0, sectionIndex).reduce((acc, s) => acc + s.lessons.length, 0)
                                                    const absoluteIndex = previousLessonsCount + lessonIndex + 1

                                                    return lesson.free ? (
                                                        <a
                                                            key={lessonIndex}
                                                            href={`/dashboard/courses/${course.id}/lesson/${absoluteIndex}`}
                                                            className="block px-6 py-3 hover:bg-success-50 transition-colors border-b border-neutral-50 last:border-0 group"
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-4">
                                                                    <span className="w-8 h-8 rounded-full bg-success-100 text-success-600 flex items-center justify-center text-sm">
                                                                        ▶
                                                                    </span>
                                                                    <div>
                                                                        <p className="text-neutral-700 group-hover:text-success-700 transition-colors">{lesson.name}</p>
                                                                        <p className="text-xs text-neutral-400">{lesson.duration}</p>
                                                                    </div>
                                                                </div>
                                                                <span className="px-2 py-0.5 bg-success-100 text-success-600 rounded text-xs font-medium">Free Preview</span>
                                                            </div>
                                                        </a>
                                                    ) : (
                                                        <div
                                                            key={lessonIndex}
                                                            onClick={() => alert('Please enroll in this course to access this lesson.')}
                                                            className="block px-6 py-3 hover:bg-neutral-50 transition-colors border-b border-neutral-50 last:border-0 cursor-pointer"
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-4">
                                                                    <span className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center text-sm">
                                                                        {lesson.quiz ? '📝' : lesson.project ? '🎯' : '🔒'}
                                                                    </span>
                                                                    <div>
                                                                        <p className="text-neutral-500">{lesson.name}</p>
                                                                        <p className="text-xs text-neutral-400">{lesson.duration}</p>
                                                                    </div>
                                                                </div>
                                                                <span className="text-neutral-400 text-xs">Enroll to unlock</span>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Instructor */}
                        <section>
                            <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">Meet Your Instructor</h2>
                            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                                <div className="flex items-start gap-6">
                                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                                        {course.instructor.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-neutral-900">{course.instructor}</h3>
                                        <p className="text-primary-600 font-medium">{course.instructorRole}</p>
                                        <div className="flex items-center gap-6 my-4 text-sm text-neutral-500">
                                            <span className="flex items-center gap-1"><span className="text-warning-500">★</span> 4.9 Instructor Rating</span>
                                            <span>👨‍🎓 45,000+ Students</span>
                                            <span>📚 12 Courses</span>
                                        </div>
                                        <p className="text-neutral-600 leading-relaxed">
                                            With over 10 years of industry experience, I've helped thousands of students transition into successful tech careers.
                                            My teaching philosophy focuses on practical, hands-on learning that prepares you for real-world challenges.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Placeholder for sticky sidebar on desktop */}
                    <div className="hidden lg:block"></div>
                </div>
            </div>
        </div>
    )
}

// Resume Builder Page
const ResumeBuilderPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">ATS-Friendly Resume Builder</h1>
        <p className="text-xl text-neutral-600 mb-8">Create professional resumes that pass Applicant Tracking Systems</p>
        <a href="/register" className="inline-block px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700">Get Started Free</a>
    </div>
)

// Resources Page
const ResourcesPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">Career Resources</h1>
        <p className="text-xl text-neutral-600 mb-8">Tips, guides, and resources to accelerate your career</p>
        <div className="space-y-4">
            {['Interview Preparation Guide', 'Salary Negotiation Tips', 'Career Path Planning', 'Networking Strategies'].map((item) => (
                <div key={item} className="bg-white p-6 rounded-xl border border-neutral-200 hover:shadow-md transition-all cursor-pointer">
                    <h3 className="font-bold text-neutral-900">{item}</h3>
                </div>
            ))}
        </div>
    </div>
)

// Enterprise Page
const EnterprisePage = () => (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">Enterprise Solutions</h1>
        <p className="text-xl text-neutral-600 mb-8">Custom hiring solutions for large organizations</p>
        <a href="/contact" className="inline-block px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700">Contact Sales</a>
    </div>
)

// Become Mentor Page
const BecomeMentorPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">Become a Mentor</h1>
        <p className="text-xl text-neutral-600 mb-8">Share your knowledge and earn up to 97% on course sales</p>
        <a href="/register" className="inline-block px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700">Start Teaching</a>
    </div>
)

// Careers Page
const CareersPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">Careers at WorkGrad</h1>
        <p className="text-xl text-neutral-600 mb-8">Join our mission to transform career development</p>
        <p className="text-neutral-600">Check back soon for open positions!</p>
    </div>
)

// Blog Page
const BlogPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-8">Blog</h1>
        <p className="text-neutral-600">Coming soon - Career tips, industry insights, and more!</p>
    </div>
)

// Press Page
const PressPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">Press</h1>
        <p className="text-neutral-600">For media inquiries, contact press@workgrad.com</p>
    </div>
)

// Contact Page
const ContactPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">Contact Us</h1>
        <div className="bg-white p-6 rounded-xl border border-neutral-200">
            <p className="mb-4"><strong>Email:</strong> hello@workgrad.com</p>
            <p className="mb-4"><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Address:</strong> Bangalore, Karnataka, India</p>
        </div>
    </div>
)

// Terms Page
const TermsPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-6">Terms of Service</h1>
        <div className="prose prose-neutral max-w-none">
            <p>Last updated: December 2024</p>
            <p className="mt-4">By using WorkGrad, you agree to these terms of service...</p>
        </div>
    </div>
)

// Privacy Page
const PrivacyPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-6">Privacy Policy</h1>
        <div className="prose prose-neutral max-w-none">
            <p>Last updated: December 2024</p>
            <p className="mt-4">Your privacy is important to us. This policy explains how we collect and use your data...</p>
        </div>
    </div>
)

// Cookies Page
const CookiesPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-6">Cookie Policy</h1>
        <div className="prose prose-neutral max-w-none">
            <p>Last updated: December 2024</p>
            <p className="mt-4">We use cookies to improve your experience on our platform...</p>
        </div>
    </div>
)

// Community Page
const CommunityPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">Community</h1>
        <p className="text-xl text-neutral-600 mb-8">Join our community of learners, mentors, and employers</p>
        <a href="/register" className="inline-block px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700">Join Now</a>
    </div>
)

function App() {
    return (
        <AuthProvider>
            {/* Toast Notifications */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#fff',
                        color: '#0f172a',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        borderRadius: '12px',
                        padding: '16px',
                    },
                    success: {
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#f43f5e',
                            secondary: '#fff',
                        },
                    },
                }}
            />

            {/* Routes */}
            <Routes>
                {/* Public Routes wrapped in PublicLayout */}
                <Route element={<PublicLayout><Outlet /></PublicLayout>}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/features" element={<FeaturesPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/support" element={<SupportPage />} />
                    <Route path="/jobs" element={<JobsPage />} />
                    <Route path="/courses" element={<CoursesPage />} />
                    <Route path="/courses/categories" element={<CategoriesPage />} />
                    <Route path="/courses/category/:slug" element={<CategoryPage />} />
                    <Route path="/courses/:id" element={<CourseDetailPage />} />
                    <Route path="/fullstack" element={<FullStackDomainsPage />} />
                    <Route path="/fullstack/:domain" element={<FullStackDomainPage />} />
                    <Route path="/resume-builder" element={<ResumeBuilderPage />} />
                    <Route path="/resources" element={<ResourcesPage />} />
                    <Route path="/enterprise" element={<EnterprisePage />} />
                    <Route path="/become-mentor" element={<BecomeMentorPage />} />
                    <Route path="/careers" element={<CareersPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/press" element={<PressPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/cookies" element={<CookiesPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>


                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />


                {/* Protected Learner Routes */}
                <Route element={<ProtectedRoute allowedRoles={['learner']} />}>
                    <Route path="/dashboard" element={<LearnerDashboard />} />
                    <Route path="/dashboard/*" element={<LearnerDashboard />} />
                </Route>

                {/* Protected Employer Routes */}
                <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
                    <Route path="/employer" element={<EmployerDashboard />} />
                    <Route path="/employer/*" element={<EmployerDashboard />} />
                </Route>

                {/* Protected Mentor Routes */}
                <Route element={<ProtectedRoute allowedRoles={['mentor']} />}>
                    <Route path="/mentor" element={<MentorDashboard />} />
                    <Route path="/mentor/*" element={<MentorDashboard />} />
                </Route>

                {/* Protected Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/*" element={<AdminDashboard />} />
                </Route>
            </Routes>
        </AuthProvider>
    )
}

export default App
