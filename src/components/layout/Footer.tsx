import { Link } from 'react-router-dom'
import {
    GraduationCap,
    Building2,
    Users,
    Mail,
    MapPin,
    Phone,
    Linkedin,
    Twitter,
    Facebook,
    Instagram,
    ArrowRight,
} from 'lucide-react'
import { Button, Input } from '@/components/ui'

const footerLinks = {
    forLearners: [
        { name: 'Browse Jobs', href: '/jobs' },
        { name: 'Internships', href: '/jobs?type=internship' },
        { name: 'Resume Builder', href: '/resume-builder' },
        { name: 'Skill Courses', href: '/courses' },
        { name: 'Career Guide', href: '/resources' },
    ],
    forEmployers: [
        { name: 'Post a Job', href: '/employer/post-job' },
        { name: 'Campus Hiring', href: '/employer/campus-hiring' },
        { name: 'Virtual Hiring', href: '/employer/virtual-hiring' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Enterprise', href: '/enterprise' },
    ],
    forMentors: [
        { name: 'Become a Mentor', href: '/become-mentor' },
        { name: 'Create Course', href: '/mentor/create-course' },
        { name: 'Revenue Model', href: '/mentor/revenue' },
        { name: 'Teaching Resources', href: '/mentor/resources' },
        { name: 'Community', href: '/community' },
    ],
    company: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
        { name: 'Press', href: '/press' },
        { name: 'Contact', href: '/contact' },
    ],
    legal: [
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Cookie Policy', href: '/cookies' },
    ],
}

const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
]

export function Footer() {
    return (
        <footer className="bg-neutral-900 text-neutral-300">
            {/* Newsletter Section */}
            <div className="border-b border-neutral-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h3 className="text-2xl font-display font-bold text-white">
                                Stay Updated
                            </h3>
                            <p className="mt-2 text-neutral-400 max-w-md">
                                Get the latest job openings, career tips, and industry insights
                                delivered to your inbox.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto max-w-md">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-primary-500"
                            />
                            <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">W</span>
                            </div>
                            <span className="font-display font-bold text-xl text-white">
                                Work<span className="text-primary-400">Grad</span>
                            </span>
                        </Link>
                        <p className="text-neutral-400 mb-6 max-w-sm">
                            Connecting students, educators, and employers through skills
                            development, career readiness, and recruitment services.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0" />
                                <span>Bangalore, Karnataka, India</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                                <a href="mailto:hello@workgrad.com" className="hover:text-white transition-colors">
                                    hello@workgrad.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                                    +91 98765 43210
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* For Learners */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-primary-400" />
                            For Learners
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.forLearners.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-sm hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* For Employers */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-primary-400" />
                            For Employers
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.forEmployers.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-sm hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* For Mentors */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary-400" />
                            For Mentors
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.forMentors.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-sm hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-sm hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-neutral-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <div className="text-sm text-neutral-500">
                            © {new Date().getFullYear()} WorkGrad. All rights reserved.
                        </div>

                        {/* Legal Links */}
                        <div className="flex items-center gap-6">
                            {footerLinks.legal.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-sm text-neutral-500 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-lg bg-neutral-800 text-neutral-400 
                             flex items-center justify-center
                             hover:bg-primary-600 hover:text-white transition-all"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
