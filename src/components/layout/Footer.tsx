import { Link } from 'react-router-dom'
import {
    Linkedin,
    Twitter,
    Instagram,
} from 'lucide-react'

// Simplified Footer for Learners only
const footerLinks = {
    platform: [
        { name: 'Browse Jobs', href: '/jobs' },
        { name: 'Skill Courses', href: '/courses' },
        { name: 'Resume Builder', href: '/resume-builder' },
        { name: 'Career Guide', href: '/resources' },
    ],
    mentors: [
        { name: 'Become a Mentor', href: '/mentors' },
        { name: 'Teaching Resources', href: '/mentor/resources' },
        { name: 'Revenue Model', href: '/mentor/revenue' },
        { name: 'Community', href: '/community' },
    ],
    company: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
    ],
}

const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
]

export function Footer() {
    return (
        <footer className="bg-neutral-900 border-t border-neutral-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <span className="text-white font-bold text-xl">W</span>
                            </div>
                            <span className="font-display font-bold text-xl text-white">
                                Work<span className="text-blue-500">Grad</span>
                            </span>
                        </Link>
                        <p className="text-neutral-400 mb-8 max-w-sm leading-relaxed">
                            Empowering learners with the skills, tools, and opportunities needed to launch successful careers in the modern tech industry.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Platform</h4>
                        <ul className="space-y-4">
                            {footerLinks.platform.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-neutral-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Mentors Section */}
                    <div>
                        <h4 className="font-bold text-white mb-6">For Mentors</h4>
                        <ul className="space-y-4">
                            {footerLinks.mentors.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-neutral-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Company</h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-neutral-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-center gap-4">
                    <p className="text-sm text-neutral-500">
                        © {new Date().getFullYear()} WorkGrad. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
