import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Outlet,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { TrendingUp, Award, Target, Zap, Rocket, Heart, Share2, Clock, Download, BookOpen, ArrowLeft } from "lucide-react";
import { AuthProvider } from "@/context";
import { ProtectedRoute } from "@/components/auth";
import { PublicLayout } from "@/components/layout";
import { getCategoryColor } from "@/utils/categoryColors";
import { CourseCard } from "@/components/CourseCard";

// Public Pages
import { LandingPage } from "@/pages/public";

// Auth Pages
import { LoginPage, RegisterPage } from "@/pages/auth";

// Dashboard Pages
import { LearnerDashboard } from "@/pages/learner";
import { EmployerDashboard } from "@/pages/employer";
import { MentorDashboard } from "@/pages/mentor";
import { AdminDashboard } from "@/pages/admin";

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
);

// About Page
const AboutPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-6">
      About WorkGrad
    </h1>
    <div className="prose prose-lg text-neutral-600">
      <p className="text-xl">
        WorkGrad is a comprehensive career development platform designed to
        bridge the gap between talented learners and top employers, facilitated
        by expert mentors.
      </p>
      <h2 className="text-2xl font-bold text-neutral-900 mt-8">Our Mission</h2>
      <p>
        To empower individuals with the skills, tools, and connections they need
        to launch and accelerate their careers in the modern workforce.
      </p>
      <h2 className="text-2xl font-bold text-neutral-900 mt-8">
        What We Offer
      </h2>
      <ul className="space-y-2">
        <li>
          <strong>For Learners:</strong> ATS-optimized resume builder, portfolio
          showcase, job portal, and industry-relevant courses.
        </li>
        <li>
          <strong>For Employers:</strong> Talent discovery, campus hiring,
          virtual recruitment campaigns, and candidate assessment tools.
        </li>
        <li>
          <strong>For Mentors:</strong> Course creation platform, curriculum
          builder, and earnings through teaching.
        </li>
      </ul>
      <h2 className="text-2xl font-bold text-neutral-900 mt-8">Our Values</h2>
      <ul className="space-y-2">
        <li>
          <strong>Accessibility:</strong> Making career development tools
          available to everyone.
        </li>
        <li>
          <strong>Quality:</strong> Providing industry-standard resources and
          expert-led courses.
        </li>
        <li>
          <strong>Community:</strong> Building connections between learners,
          mentors, and employers.
        </li>
        <li>
          <strong>Innovation:</strong> Continuously improving our platform with
          modern technologies.
        </li>
      </ul>
    </div>
  </div>
);

// Pricing Page
const PricingPage = () => (
  <div className="max-w-6xl mx-auto px-4 py-16">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
        Simple, Transparent Pricing
      </h1>
      <p className="text-xl text-neutral-600">
        Choose the plan that's right for you
      </p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {/* Free Plan */}
      <div className="bg-white rounded-2xl p-8 border border-neutral-200 hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-bold text-neutral-900">Free</h3>
        <p className="text-neutral-500 mt-2">Perfect for getting started</p>
        <p className="text-4xl font-bold mt-6">
          $0<span className="text-lg font-normal text-neutral-500">/month</span>
        </p>
        <ul className="mt-8 space-y-4">
          <li className="flex items-center gap-2">
            <span className="text-success-500">✓</span> Basic resume builder
          </li>
          <li className="flex items-center gap-2">
            <span className="text-success-500">✓</span> Job search access
          </li>
          <li className="flex items-center gap-2">
            <span className="text-success-500">✓</span> 5 job applications/month
          </li>
          <li className="flex items-center gap-2">
            <span className="text-success-500">✓</span> Community access
          </li>
        </ul>
        <a
          href="/register"
          className="mt-8 block w-full text-center py-3 border border-primary-600 text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-colors"
        >
          Get Started
        </a>
      </div>
      {/* Pro Plan */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white transform scale-105 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Pro</h3>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
            Most Popular
          </span>
        </div>
        <p className="text-white/80 mt-2">For serious job seekers</p>
        <p className="text-4xl font-bold mt-6">
          $19<span className="text-lg font-normal text-white/70">/month</span>
        </p>
        <ul className="mt-8 space-y-4">
          <li className="flex items-center gap-2">
            <span>✓</span> Advanced ATS resume builder
          </li>
          <li className="flex items-center gap-2">
            <span>✓</span> Portfolio builder
          </li>
          <li className="flex items-center gap-2">
            <span>✓</span> Unlimited job applications
          </li>
          <li className="flex items-center gap-2">
            <span>✓</span> All courses included
          </li>
          <li className="flex items-center gap-2">
            <span>✓</span> Priority support
          </li>
        </ul>
        <a
          href="/register"
          className="mt-8 block w-full text-center py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-neutral-50 transition-colors"
        >
          Start Free Trial
        </a>
      </div>
      {/* Enterprise Plan */}
      <div className="bg-white rounded-2xl p-8 border border-neutral-200 hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-bold text-neutral-900">Enterprise</h3>
        <p className="text-neutral-500 mt-2">For organizations</p>
        <p className="text-4xl font-bold mt-6">Custom</p>
        <ul className="mt-8 space-y-4">
          <li className="flex items-center gap-2">
            <span className="text-success-500">✓</span> Everything in Pro
          </li>
          <li className="flex items-center gap-2">
            <span className="text-success-500">✓</span> Campus hiring tools
          </li>
          <li className="flex items-center gap-2">
            <span className="text-success-500">✓</span> Custom branding
          </li>
          <li className="flex items-center gap-2">
            <span className="text-success-500">✓</span> API access
          </li>
          <li className="flex items-center gap-2">
            <span className="text-success-500">✓</span> Dedicated support
          </li>
        </ul>
        <a
          href="/register"
          className="mt-8 block w-full text-center py-3 border border-primary-600 text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-colors"
        >
          Contact Sales
        </a>
      </div>
    </div>
  </div>
);

// Features Page
const FeaturesPage = () => (
  <div className="max-w-6xl mx-auto px-4 py-16">
    <div className="text-center mb-16">
      <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
        Platform Features
      </h1>
      <p className="text-xl text-neutral-600">
        Everything you need to succeed in your career
      </p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: "ATS Resume Builder",
          desc: "Create resumes that pass applicant tracking systems with our AI-powered builder.",
        },
        {
          title: "Portfolio Showcase",
          desc: "Display your best work with beautiful, customizable portfolio templates.",
        },
        {
          title: "Job Portal",
          desc: "Access thousands of job listings from top companies worldwide.",
        },
        {
          title: "Course Marketplace",
          desc: "Learn from industry experts with our curated course library.",
        },
        {
          title: "Campus Hiring",
          desc: "Connect with universities for efficient campus recruitment.",
        },
        {
          title: "Analytics Dashboard",
          desc: "Track your progress with detailed insights and metrics.",
        },
      ].map((feature) => (
        <div
          key={feature.title}
          className="bg-white p-6 rounded-2xl border border-neutral-200 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-bold text-neutral-900 mb-2">
            {feature.title}
          </h3>
          <p className="text-neutral-600">{feature.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

// Settings Page
const SettingsPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-6">
      Settings
    </h1>
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-neutral-200">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">
          Account Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Email Notifications
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded text-primary-600"
                  defaultChecked
                />
                <span className="text-sm">Job alerts</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded text-primary-600"
                  defaultChecked
                />
                <span className="text-sm">Course updates</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-primary-600" />
                <span className="text-sm">Newsletter</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Language
            </label>
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
            <input
              type="checkbox"
              className="rounded text-primary-600"
              defaultChecked
            />
          </label>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-neutral-200">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Security</h2>
        <div className="space-y-3">
          <button className="w-full text-left p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
            <p className="font-medium">Change Password</p>
            <p className="text-sm text-neutral-500">
              Update your password regularly for security
            </p>
          </button>
          <button className="w-full text-left p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
            <p className="font-medium">Two-Factor Authentication</p>
            <p className="text-sm text-neutral-500">
              Add an extra layer of security
            </p>
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Support Page
const SupportPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-16">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
        Help & Support
      </h1>
      <p className="text-xl text-neutral-600">We're here to help you succeed</p>
    </div>
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      {[
        {
          title: "Getting Started",
          desc: "Learn the basics of using WorkGrad",
          icon: "🚀",
        },
        {
          title: "Account & Billing",
          desc: "Manage your subscription and payments",
          icon: "💳",
        },
        {
          title: "Resume Builder",
          desc: "Tips for creating ATS-friendly resumes",
          icon: "📄",
        },
        {
          title: "Job Applications",
          desc: "Applying and tracking your applications",
          icon: "✉️",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="bg-white p-6 rounded-2xl border border-neutral-200 hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="text-3xl mb-3">{item.icon}</div>
          <h3 className="text-lg font-bold text-neutral-900 mb-1">
            {item.title}
          </h3>
          <p className="text-neutral-600">{item.desc}</p>
        </div>
      ))}
    </div>
    <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center">
      <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
      <p className="text-white/80 mb-6">
        Our support team is available 24/7 to assist you.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="mailto:support@workgrad.com"
          className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-neutral-50 transition-colors"
        >
          Email Support
        </a>
        <button className="px-6 py-3 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
          Live Chat
        </button>
      </div>
    </div>
    <div className="mt-12 bg-white p-6 rounded-2xl border border-neutral-200">
      <h2 className="text-xl font-bold text-neutral-900 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {[
          {
            q: "How do I create a resume?",
            a: "Navigate to Dashboard → Resume Builder and follow the step-by-step guide.",
          },
          {
            q: "How do I apply for jobs?",
            a: "Browse the Jobs section, click on a job listing, and click the Apply button.",
          },
          {
            q: "How do I change my subscription?",
            a: "Go to Settings → Account & Billing to manage your subscription.",
          },
        ].map((faq) => (
          <details key={faq.q} className="p-4 bg-neutral-50 rounded-lg">
            <summary className="font-medium cursor-pointer">{faq.q}</summary>
            <p className="mt-2 text-neutral-600">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  </div>
);

// Jobs Page
const JobsPage = () => (
  <div className="max-w-6xl mx-auto px-4 py-16">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
        Browse Jobs
      </h1>
      <p className="text-xl text-neutral-600">
        Find your dream job from thousands of opportunities
      </p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        {
          title: "Senior React Developer",
          company: "TechCorp",
          location: "Remote",
          salary: "$120K-150K",
        },
        {
          title: "Product Designer",
          company: "DesignHub",
          location: "New York",
          salary: "$90K-120K",
        },
        {
          title: "Backend Engineer",
          company: "StartupXYZ",
          location: "San Francisco",
          salary: "$130K-160K",
        },
        {
          title: "Data Scientist",
          company: "AI Labs",
          location: "Boston",
          salary: "$140K-180K",
        },
        {
          title: "DevOps Engineer",
          company: "CloudTech",
          location: "Remote",
          salary: "$125K-155K",
        },
        {
          title: "Mobile Developer",
          company: "AppWorks",
          location: "Austin",
          salary: "$110K-140K",
        },
      ].map((job) => (
        <div
          key={job.title}
          className="bg-white p-6 rounded-2xl border border-neutral-200 hover:shadow-lg transition-all"
        >
          <h3 className="font-bold text-neutral-900 mb-2">{job.title}</h3>
          <p className="text-neutral-600 mb-1">{job.company}</p>
          <p className="text-sm text-neutral-500 mb-3">{job.location}</p>
          <p className="text-primary-600 font-semibold">{job.salary}</p>
          <a
            href="/login"
            className="mt-4 block w-full text-center py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Apply Now
          </a>
        </div>
      ))}
    </div>
  </div>
);

// Course data
const coursesData = [
  {
    id: "react-masterclass",
    title: "React Masterclass",
    instructor: "John Smith",
    instructorRole: "Senior Frontend Engineer at Meta",
    students: 2500,
    rating: 4.8,
    price: 49,
    hours: 42,
    lessons: 86,
    level: "Beginner to Advanced",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    description:
      "Master React from basics to advanced patterns. Build real-world applications with hooks, context, and modern best practices.",
    tags: ["React", "JavaScript", "Hooks", "Redux"],
    requirements: [
      "Basic understanding of HTML, CSS, and JavaScript",
      "Familiarity with ES6+ syntax",
      "A computer with Node.js installed",
      "Code editor (VS Code recommended)",
    ],
  },
  {
    id: "nodejs-backend",
    title: "Node.js Backend",
    instructor: "Sarah Wilson",
    instructorRole: "Backend Lead at Stripe",
    students: 1800,
    rating: 4.7,
    price: 39,
    hours: 38,
    lessons: 72,
    level: "Intermediate",
    image: "https://plus.unsplash.com/premium_photo-1661877737564-96d97911b3bf?w=800&auto=format&fit=crop&q=60",
    description:
      "Build scalable backend applications with Node.js, Express, and MongoDB. Learn RESTful APIs and authentication.",
    tags: ["Node.js", "Express", "MongoDB", "REST API"],
    requirements: [
      "JavaScript fundamentals",
      "Basic understanding of web servers",
      "Familiarity with terminal/command line",
      "MongoDB installed locally or Atlas account",
    ],
  },
  {
    id: "python-data-science",
    title: "Python for Data Science",
    instructor: "Mike Chen",
    instructorRole: "Data Scientist at Google",
    students: 3200,
    rating: 4.9,
    price: 59,
    hours: 56,
    lessons: 120,
    level: "Beginner to Advanced",
    image: "https://images.unsplash.com/photo-1649180556628-9ba704115795?w=800&auto=format&fit=crop&q=60",
    description:
      "Learn Python for data analysis, visualization, and machine learning. Master pandas, numpy, and scikit-learn.",
    tags: ["Python", "Pandas", "NumPy", "Machine Learning"],
    requirements: [
      "Basic programming knowledge",
      "Python 3.x installed",
      "Jupyter Notebook or Google Colab",
      "Basic math/statistics background helpful",
    ],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    instructor: "Emily Brown",
    instructorRole: "Design Director at Airbnb",
    students: 2100,
    rating: 4.6,
    price: 45,
    hours: 32,
    lessons: 64,
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d28?w=800&auto=format&fit=crop&q=60",
    description:
      "Create stunning user interfaces and experiences. Learn Figma, design principles, and user research methods.",
    tags: ["Figma", "UI Design", "UX Research", "Prototyping"],
    requirements: [
      "No prior design experience needed",
      "Figma account (free)",
      "Creative mindset",
      "Access to a computer with internet",
    ],
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing",
    instructor: "Alex Kumar",
    instructorRole: "Cloud Architect at AWS",
    students: 1500,
    rating: 4.8,
    price: 55,
    hours: 44,
    lessons: 88,
    level: "Intermediate to Advanced",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
    description:
      "Master AWS, Azure, and GCP. Learn cloud architecture, serverless, and DevOps practices.",
    tags: ["AWS", "Azure", "Docker", "Kubernetes"],
    requirements: [
      "Basic Linux command line skills",
      "Understanding of networking concepts",
      "AWS/Azure/GCP free tier account",
      "Docker installed locally",
    ],
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    instructor: "Lisa Park",
    instructorRole: "ML Engineer at OpenAI",
    students: 2800,
    rating: 4.9,
    price: 69,
    hours: 62,
    lessons: 140,
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&auto=format&fit=crop&q=60",
    description:
      "Deep dive into machine learning algorithms, neural networks, and AI applications. Build real ML projects.",
    tags: ["TensorFlow", "PyTorch", "Deep Learning", "Neural Networks"],
    requirements: [
      "Strong Python programming skills",
      "Linear algebra and calculus fundamentals",
      "Statistics and probability knowledge",
      "GPU access recommended (Google Colab works)",
    ],
  },
  {
    id: "html-css-basics",
    title: "HTML & CSS Fundamentals",
    instructor: "David Miller",
    instructorRole: "Frontend Architect",
    students: 5000,
    rating: 4.7,
    price: 29,
    hours: 8,
    lessons: 24,
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800&auto=format&fit=crop&q=60",
    description:
      "Structure web pages with semantic HTML5 elements and style modern responsive layouts with CSS3.",
    tags: ["HTML5", "CSS3", "Web Design"],
    requirements: ["No prior experience needed"],
  },
  {
    id: "javascript-essentials",
    title: "JavaScript Essentials",
    instructor: "Sarah Wilson",
    instructorRole: "Backend Lead at Stripe",
    students: 4500,
    rating: 4.8,
    price: 39,
    hours: 15,
    lessons: 24,
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60",
    description:
      "Master the fundamentals of JavaScript, the language of the web. Learn DOM manipulation, events, and modern ES6+ syntax.",
    tags: ["JavaScript", "ES6", "Web Development"],
    requirements: ["Basic HTML/CSS knowledge"],
  },
  {
    id: "git-github",
    title: "Git & GitHub",
    instructor: "Alex Kumar",
    instructorRole: "DevOps Engineer",
    students: 3000,
    rating: 4.9,
    price: 19,
    hours: 6,
    lessons: 24,
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=60",
    description:
      "Version control and collaborative development made easy. Learn branching, merging, pull requests, and git workflows.",
    tags: ["Git", "GitHub", "Version Control"],
    requirements: ["Basic command line knowledge helpful"],
  },
  {
    id: "mongodb-fundamentals",
    title: "MongoDB Fundamentals",
    instructor: "Mike Chen",
    instructorRole: "Data Engineer",
    students: 2800,
    rating: 4.8,
    price: 34,
    hours: 12,
    lessons: 24,
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1569144157591-c60f3f82f137?w=800&auto=format&fit=crop&q=60",
    description:
      "NoSQL database for flexible document storage. Learn schema design, indexing, and aggregation framework.",
    tags: ["MongoDB", "NoSQL", "Database"],
    requirements: ["Basic JavaScript knowledge"],
  },
  {
    id: "typescript-essentials",
    title: "TypeScript Essentials",
    instructor: "John Smith",
    instructorRole: "Senior Engineer",
    students: 2200,
    rating: 4.8,
    price: 39,
    hours: 10,
    lessons: 20,
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1629904853716-6b03d6e795d7?w=800&auto=format&fit=crop&q=60",
    description: "Supercharge your JavaScript with static types. Learn interfaces, generics, and advanced types.",
    tags: ["TypeScript", "JavaScript", "Type Safety"],
    requirements: ["Solid JavaScript knowledge"],
  },
  {
    id: "angular-course",
    title: "Angular Masterclass",
    instructor: "Emily Brown",
    instructorRole: "Frontend Lead",
    students: 1900,
    rating: 4.7,
    price: 49,
    hours: 28,
    lessons: 45,
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1564865878688-9a244444042a?w=800&auto=format&fit=crop&q=60",
    description: "Build enterprise-grade applications with Angular. Learn dependency injection, RxJS, and routing.",
    tags: ["Angular", "TypeScript", "RxJS"],
    requirements: ["TypeScript basics"],
  },
  {
    id: "django-course",
    title: "Django Web Framework",
    instructor: "Mike Chen",
    instructorRole: "Python Expert",
    students: 2500,
    rating: 4.8,
    price: 49,
    hours: 22,
    lessons: 40,
    level: "Intermediate",
    description:
      "Build secure and scalable web applications with Django. Battery-included framework for perfectionists.",
    tags: ["Python", "Django", "Backend"],
    requirements: ["Python fundamentals"],
  },
  {
    id: "postgresql-course",
    title: "PostgreSQL Deep Dive",
    instructor: "Sarah Wilson",
    instructorRole: "Database Architect",
    students: 1800,
    rating: 4.7,
    price: 39,
    hours: 10,
    lessons: 20,
    level: "Intermediate",
    description:
      "Advanced SQL and database optimization with PostgreSQL. Learn indexing, transactions, and JSONB.",
    tags: ["SQL", "PostgreSQL", "Database"],
    requirements: ["Basic SQL knowledge"],
  },
  {
    id: "docker-course",
    title: "Docker for Developers",
    instructor: "Alex Kumar",
    instructorRole: "DevOps Engineer",
    students: 3500,
    rating: 4.9,
    price: 39,
    hours: 8,
    lessons: 20,
    level: "Intermediate",
    description:
      "Containerize your applications with Docker. Learn images, containers, compost, and deployment.",
    tags: ["Docker", "Containers", "DevOps"],
    requirements: ["Basic command line skills"],
  },
];

// Category data with colorIndex (references categoryColorPalette)
// colorIndex: 0=Blue, 1=Green, 2=Orange, 3=Pink, 4=Purple, 5=Cyan, 6=Rose, 7=Amber, 8=Lime, 9=Fuchsia, 10=Sky, 11=Teal
const categoryData = [
  {
    slug: "programming-tools",
    title: "Programming Tools",
    description: "Master essential programming languages and development tools",
    colorIndex: 0,
    icon: "💻",
    courses: ["react-masterclass", "nodejs-backend"],
    tools: ["JavaScript", "React", "Node.js", "Git"],
  },
  {
    slug: "data-professional",
    title: "Data Professional",
    description: "Learn data analysis, visualization, and machine learning",
    colorIndex: 1,
    icon: "📊",
    courses: ["python-data-science"],
    tools: ["Python", "SQL", "Power BI", "Tableau"],
  },
  {
    slug: "digital-marketer",
    title: "Digital Marketer",
    description: "Master SEO, social media, and digital advertising",
    colorIndex: 2,
    icon: "📈",
    courses: [],
    tools: ["SEO", "Google Ads", "Analytics", "Social Media"],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    description: "Create stunning user interfaces and experiences",
    colorIndex: 3,
    icon: "🎨",
    courses: ["ui-ux-design"],
    tools: ["Figma", "Adobe XD", "Photoshop", "Sketch"],
  },
];

// Full Stack Domain data
const fullStackDomains = [
  {
    slug: "mern-stack",
    title: "MERN STACK",
    description:
      "MongoDB, Express.js, React, Node.js - The most popular JavaScript full-stack",
    icon: "🚀",
    color: "from-green-500 to-emerald-600",
    students: 15000,
    rating: 4.9,
    topics: [
      {
        id: "html-css",
        title: "HTML & CSS Fundamentals",
        icon: "🎨",
        duration: "8 hours",
        courseId: "html-css-basics",
      },
      {
        id: "javascript",
        title: "JavaScript Essentials",
        icon: "⚡",
        duration: "15 hours",
        courseId: "javascript-essentials",
      },
      {
        id: "git-github",
        title: "Git & GitHub",
        icon: "🔧",
        duration: "6 hours",
        courseId: "git-github",
      },
      {
        id: "react",
        title: "React.js",
        icon: "⚛️",
        duration: "25 hours",
        courseId: "react-masterclass",
      },
      {
        id: "nodejs",
        title: "Node.js & Express",
        icon: "🟢",
        duration: "20 hours",
        courseId: "nodejs-backend",
      },
      {
        id: "mongodb",
        title: "MongoDB",
        icon: "🍃",
        duration: "12 hours",
        courseId: "mongodb-fundamentals",
      },
    ],
  },
  {
    slug: "mean-stack",
    title: "MEAN STACK",
    description:
      "MongoDB, Express.js, Angular, Node.js - Enterprise-grade full-stack",
    icon: "🔺",
    color: "from-red-500 to-rose-600",
    students: 8500,
    rating: 4.8,
    topics: [
      {
        id: "html-css",
        title: "HTML & CSS Fundamentals",
        icon: "🎨",
        duration: "8 hours",
        courseId: "html-css-basics",
      },
      {
        id: "typescript",
        title: "TypeScript",
        icon: "📘",
        duration: "10 hours",
        courseId: "typescript-essentials",
      },
      {
        id: "angular",
        title: "Angular",
        icon: "🔺",
        duration: "28 hours",
        courseId: "angular-course",
      },
      {
        id: "nodejs",
        title: "Node.js & Express",
        icon: "🟢",
        duration: "20 hours",
        courseId: "nodejs-backend",
      },
      {
        id: "mongodb",
        title: "MongoDB",
        icon: "🍃",
        duration: "12 hours",
        courseId: "mongodb-fundamentals",
      },
    ],
  },
  {
    slug: "python-fullstack",
    title: "PYTHON FULL STACK",
    description:
      "Python, Django/Flask, PostgreSQL, React - Versatile full-stack development",
    icon: "🐍",
    color: "from-yellow-500 to-orange-600",
    students: 12000,
    rating: 4.7,
    topics: [
      {
        id: "python",
        title: "Python Programming",
        icon: "🐍",
        duration: "18 hours",
        courseId: "python-data-science",
      },
      {
        id: "django",
        title: "Django Framework",
        icon: "🎸",
        duration: "22 hours",
        courseId: "django-course",
      },
      {
        id: "postgresql",
        title: "PostgreSQL",
        icon: "🐘",
        duration: "10 hours",
        courseId: "postgresql-course",
      },
      {
        id: "react",
        title: "React.js",
        icon: "⚛️",
        duration: "25 hours",
        courseId: "react-masterclass",
      },
      {
        id: "docker",
        title: "Docker & Deployment",
        icon: "🐳",
        duration: "8 hours",
        courseId: "docker-course",
      },
    ],
  },
];

// Helper to get theme (supports course override > domain > default)
const getTheme = (domainSlug: string = "", courseId: string = "") => {
  // 1. Course Specific Overrides (Granular Theming)
  // HTML & CSS -> Orange
  if (courseId === "html-css-basics") {
    return {
      heroBg: "from-orange-50 via-red-50 to-amber-50",
      primaryGradient: "from-orange-500 to-red-500",
      accentColor: "text-orange-600",
      badgeBg: "bg-orange-100",
      badgeText: "text-orange-700",
      shadowColor: "shadow-orange-500/30",
      iconBg: "from-orange-500 to-red-500",
      blob1: "bg-orange-200",
      blob2: "bg-red-200",
    };
  }
  // JavaScript -> Yellow/Amber
  if (courseId === "javascript-essentials") {
    return {
      heroBg: "from-yellow-50 via-amber-50 to-orange-50",
      primaryGradient: "from-yellow-500 to-amber-600",
      accentColor: "text-yellow-700",
      badgeBg: "bg-yellow-100",
      badgeText: "text-yellow-700",
      shadowColor: "shadow-yellow-500/30",
      iconBg: "from-yellow-400 to-amber-500",
      blob1: "bg-yellow-200",
      blob2: "bg-amber-200",
    };
  }
  // Git & GitHub -> Red/Tomato
  if (courseId === "git-github") {
    return {
      heroBg: "from-red-50 via-orange-50 to-rose-50",
      primaryGradient: "from-red-500 to-orange-600",
      accentColor: "text-red-700",
      badgeBg: "bg-red-100",
      badgeText: "text-red-700",
      shadowColor: "shadow-red-500/30",
      iconBg: "from-red-500 to-orange-600",
      blob1: "bg-red-200",
      blob2: "bg-orange-200",
    };
  }
  // React -> Sky/Cyan (React Blue)
  if (courseId === "react-masterclass") {
    return {
      heroBg: "from-sky-50 via-cyan-50 to-blue-50",
      primaryGradient: "from-sky-500 to-cyan-600",
      accentColor: "text-sky-600",
      badgeBg: "bg-sky-100",
      badgeText: "text-sky-700",
      shadowColor: "shadow-sky-500/30",
      iconBg: "from-sky-500 to-cyan-600",
      blob1: "bg-sky-200",
      blob2: "bg-cyan-200",
    };
  }
  // TypeScript -> Blue/Indigo
  if (courseId === "typescript-essentials") {
    return {
      heroBg: "from-blue-50 via-indigo-50 to-sky-50",
      primaryGradient: "from-blue-600 to-indigo-600",
      accentColor: "text-blue-600",
      badgeBg: "bg-blue-100",
      badgeText: "text-blue-700",
      shadowColor: "shadow-blue-500/30",
      iconBg: "from-blue-600 to-indigo-600",
      blob1: "bg-blue-200",
      blob2: "bg-indigo-200",
    };
  }
  // Node.js -> Green
  if (courseId === "nodejs-backend") {
    return {
      heroBg: "from-green-50 via-emerald-50 to-lime-50",
      primaryGradient: "from-green-500 to-emerald-600",
      accentColor: "text-green-600",
      badgeBg: "bg-green-100",
      badgeText: "text-green-700",
      shadowColor: "shadow-green-500/30",
      iconBg: "from-green-500 to-emerald-600",
      blob1: "bg-green-200",
      blob2: "bg-emerald-200",
    };
  }
  // MongoDB -> Emerald
  if (courseId === "mongodb-fundamentals") {
    return {
      heroBg: "from-emerald-50 via-green-50 to-teal-50",
      primaryGradient: "from-emerald-500 to-green-600",
      accentColor: "text-emerald-600",
      badgeBg: "bg-emerald-100",
      badgeText: "text-emerald-700",
      shadowColor: "shadow-emerald-500/30",
      iconBg: "from-emerald-500 to-green-600",
      blob1: "bg-emerald-200",
      blob2: "bg-green-200",
    };
  }

  // 2. Domain Level Fallbacks
  if (domainSlug === "mern-stack") {
    return {
      heroBg: "from-blue-50 via-indigo-50 to-purple-50",
      primaryGradient: "from-blue-500 to-indigo-500",
      accentColor: "text-blue-500",
      badgeBg: "bg-blue-50",
      badgeText: "text-blue-600",
      shadowColor: "shadow-blue-500/30",
      iconBg: "from-blue-500 to-indigo-500",
      blob1: "bg-blue-100",
      blob2: "bg-indigo-100",
    };
  }

  if (domainSlug === "mean-stack") {
    return {
      heroBg: "from-rose-50 via-red-50 to-orange-50",
      primaryGradient: "from-rose-500 to-red-500",
      accentColor: "text-rose-600",
      badgeBg: "bg-rose-100",
      badgeText: "text-rose-700",
      shadowColor: "shadow-rose-500/30",
      iconBg: "from-rose-500 to-red-500",
      blob1: "bg-rose-200",
      blob2: "bg-orange-200",
    };
  }

  if (domainSlug === "python-fullstack") {
    return {
      heroBg: "from-amber-50 via-orange-50 to-yellow-50",
      primaryGradient: "from-amber-500 to-orange-500",
      accentColor: "text-amber-600",
      badgeBg: "bg-amber-100",
      badgeText: "text-amber-700",
      shadowColor: "shadow-amber-500/30",
      iconBg: "from-amber-500 to-orange-500",
      blob1: "bg-amber-200",
      blob2: "bg-orange-200",
    };
  }

  // Default Fallback
  return {
    heroBg: "from-blue-50 via-indigo-50 to-purple-50",
    primaryGradient: "from-blue-600 to-indigo-600",
    accentColor: "text-blue-600",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-700",
    shadowColor: "shadow-blue-500/30",
    iconBg: "from-blue-500 to-indigo-500",
    blob1: "bg-blue-200",
    blob2: "bg-indigo-200",
  };
};

// Full Stack Domain Detail Page
const FullStackDomainPage = () => {
  const { domain: domainSlug } = useParams();
  const domain =
    fullStackDomains.find((d) => d.slug === domainSlug) || fullStackDomains[0];
  const theme = getTheme(domainSlug || "");

  return (
    <div>
      {/* Premium Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 lg:py-20 relative overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button + Breadcrumb */}
          <div className="mb-8 flex justify-center lg:justify-start">
            <nav className="flex items-center gap-3 text-xs">
              <Link
                to="/fullstack"
                className="w-8 h-8 rounded-full bg-white/50 hover:bg-white flex items-center justify-center text-slate-500 hover:text-slate-700 transition-all backdrop-blur-sm border border-white/20"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <span className="text-slate-400">/</span>
              <Link to="/fullstack" className="text-slate-500 hover:text-slate-700 font-medium">Full Stack</Link>
              <span className="text-slate-400">/</span>
              <span className="text-slate-900 font-medium">{domain.title}</span>
            </nav>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="flex-1">



              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-4">
                {domain.title}
              </h1>

              {/* Sub-description */}
              <p className="text-sm text-neutral-500 mb-2">
                {domain.description}
              </p>

              {/* Description */}
              <p className="text-lg text-neutral-600 mb-8 max-w-lg">
                Master the most popular JavaScript full-stack development with
                MongoDB, Express.js, React, and Node.js. Build real-world
                applications from scratch.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-8">
                <Link
                  to={`/courses/${domain.topics[0].courseId}`}
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${theme.primaryGradient} text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg ${theme.shadowColor}`}
                >
                  <Zap className="w-4 h-4" />
                  Start Learning
                </Link>

              </div>
            </div>

            {/* Right Learning Path Card */}
            <div className="flex-shrink-0 w-full max-w-sm bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
              <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
                <h3 className="font-bold text-neutral-900">Learning Path</h3>
                <span className="text-xs text-neutral-500">
                  {domain.topics.length} topics
                </span>
              </div>
              <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                {domain.topics.map((topic, index) => (
                  <div
                    key={topic.id}
                    className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-neutral-50 transition-colors"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${index === 0
                        ? "bg-emerald-100 text-emerald-600"
                        : index === 1
                          ? "bg-blue-100 text-blue-600"
                          : index === 2
                            ? "bg-purple-100 text-purple-600"
                            : index === 3
                              ? "bg-orange-100 text-orange-600"
                              : "bg-neutral-100 text-neutral-600"
                        }`}
                    >
                      {topic.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900">
                        {topic.title}
                      </p>
                    </div>
                    <span className="text-neutral-300">→</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-neutral-50 border-t border-neutral-100">
                <a
                  href="#courses"
                  className="text-sm text-primary-600 font-medium hover:text-primary-700 transition-colors"
                >
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
            Follow the recommended order of topics to stay on course or pick up
            from wherever
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domain.topics.map((topic, index) => {
            const descriptions = [
              "Structure web pages with semantic HTML5 elements",
              "Style modern responsive layouts with CSS and Tailwind",
              "Build interactive UI with React hooks and components",
              "Server-side JavaScript runtime for scalable backends",
              "Fast and minimalist web framework for Node.js",
              "NoSQL database for flexible document storage",
              "Version control and collaborative development",
            ];

            // Find the matching course to get the image
            const course = coursesData.find(c => c.id === topic.courseId);

            return (
              <CourseCard
                key={topic.id}
                id={topic.id}
                title={topic.title}
                description={descriptions[index % descriptions.length]}
                image={course?.image}
                modules={6}
                linkTo={`/courses/${topic.courseId}`}
                state={{ from: location.pathname, fromLabel: domain.title }}
              />
            );
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
              Complete this path and become a full-stack developer in 3-6 months
              of practice
            </p>
          </div>

          {/* Achievement Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Rocket,
                color: "bg-emerald-100 text-emerald-600",
                title: "Build Real Projects",
                description:
                  "Create production-ready applications, including a portfolio-worthy showcase to impress recruiters and hiring managers",
              },
              {
                icon: Award,
                color: "bg-blue-100 text-blue-600",
                title: "Earn Certificates",
                description:
                  "Get industry-recognized certificates that validate your expertise with verifiable credentials to add to your profile",
              },
              {
                icon: TrendingUp,
                color: "bg-purple-100 text-purple-600",
                title: "Job-Ready Skills",
                description:
                  "Master the exact skills that top companies are hiring for, with hands-on experience that sets you apart from others",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {item.description}
                </p>
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
                Join thousands of learners who have transformed their careers
                with {domain.title}.
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
  );
};

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
              <span className="text-neutral-700 font-medium text-sm">
                Full Stack Mastery
              </span>
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
              Master complete technology stacks from frontend to backend. Choose
              your path and become a full-stack developer.
            </p>

            {/* Stats Row */}
            <div className="inline-flex items-center gap-8 px-6 py-3 bg-white rounded-2xl shadow-sm border border-neutral-100">
              <div className="text-center">
                <p className="text-2xl font-bold text-neutral-900">
                  {fullStackDomains.length}
                </p>
                <p className="text-xs text-neutral-500">Learning Paths</p>
              </div>
              <div className="w-px h-10 bg-neutral-200" />
              <div className="text-center">
                <p className="text-2xl font-bold text-neutral-900">
                  {fullStackDomains.reduce(
                    (acc, d) => acc + d.topics.length,
                    0,
                  )}
                  +
                </p>
                <p className="text-xs text-neutral-500">Total Courses</p>
              </div>
              <div className="w-px h-10 bg-neutral-200" />
              <div className="text-center">
                <p className="text-2xl font-bold text-neutral-900">
                  {fullStackDomains
                    .reduce((acc, d) => acc + d.students, 0)
                    .toLocaleString()}
                  +
                </p>
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
            Each path is designed to take you from beginner to job-ready in 3-6
            months
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {fullStackDomains.map((domain, index) => {
            const rating = (4.7 + (index % 3) * 0.1).toFixed(1);
            const reviews = 2500 + index * 800;

            return (
              <Link
                key={domain.slug}
                to={`/fullstack/${domain.slug}`}
                className="group relative bg-white rounded-2xl border border-neutral-200/80 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/15 hover:-translate-y-2 hover:border-indigo-300 transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Gradient Header with Icon */}
                <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 p-6 pb-8">
                  {/* Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30">
                      Job Ready
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm border border-white shadow-lg flex items-center justify-center text-3xl mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    {domain.icon}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 pt-4 flex flex-col flex-grow -mt-4 bg-white rounded-t-2xl relative">
                  {/* Title */}
                  <h3 className="font-bold text-neutral-900 text-lg mb-1 group-hover:text-indigo-600 transition-colors duration-300 text-center">
                    {domain.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-500 mb-3 text-center line-clamp-2">
                    {domain.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-sm ${star <= Math.floor(Number(rating)) ? "text-amber-400" : "text-neutral-200"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-bold text-neutral-900">
                      {rating}
                    </span>
                    <span className="text-xs text-neutral-400">
                      ({reviews.toLocaleString()}+)
                    </span>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center justify-center gap-4 text-sm text-neutral-500 mb-4 pb-4 border-b border-neutral-100">
                    <span className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-indigo-500" />
                      <span className="font-medium">
                        {domain.topics.length}
                      </span>{" "}
                      Courses
                    </span>
                    <span className="flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-indigo-500" />
                      <span className="font-medium">
                        {domain.students.toLocaleString()}+
                      </span>{" "}
                      Learners
                    </span>
                  </div>

                  {/* View Path Button */}
                  <div className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-sm font-bold rounded-xl text-center group-hover:from-indigo-700 group-hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-500/25 group-hover:shadow-xl group-hover:shadow-indigo-500/30 flex items-center justify-center gap-2 mt-auto">
                    <span>View Path</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {/* Why Choose Full Stack Section */}
      <div className="bg-gradient-to-b from-neutral-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium mb-4 border border-indigo-100">
              <TrendingUp className="w-4 h-4" />
              Why Full Stack?
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-3">
              Why Learn Full Stack Development?
            </h2>
            <p className="text-neutral-500 max-w-lg mx-auto">
              Full-stack developers are among the most sought-after
              professionals in tech
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-5">
            {[
              {
                icon: TrendingUp,
                title: "High Demand",
                description: "Companies actively hiring full-stack developers",
              },
              {
                icon: Zap,
                title: "Higher Salary",
                description: "Avg $120K+ in the US, ₹15L+ in India",
              },
              {
                icon: Target,
                title: "Versatility",
                description: "Work on any part of the application",
              },
              {
                icon: Rocket,
                title: "Start Products",
                description: "Build complete apps independently",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl border border-neutral-200/80 p-6 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 hover:border-indigo-300 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/50 flex items-center justify-center mb-4 mx-auto group-hover:scale-105 transition-transform duration-300">
                  <item.icon className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
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
                Pick a learning path and start your journey today. No prior
                experience needed.
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
  );
};

// Premium Categories Page
const CategoriesPage = () => {
  const totalCourses = categoryData.reduce(
    (acc, cat) => acc + cat.courses.length,
    0,
  );

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
              <span className="text-neutral-700 font-medium text-sm">
                Skill Development
              </span>
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
              Choose your learning path and start building job-ready skills with
              courses designed by industry experts.
            </p>

            {/* Stats Row */}
            <div className="inline-flex items-center gap-8 px-6 py-3 bg-white rounded-2xl shadow-sm border border-neutral-100">
              <div className="text-center">
                <p className="text-2xl font-bold text-neutral-900">
                  {categoryData.length}
                </p>
                <p className="text-xs text-neutral-500">Skill Tracks</p>
              </div>
              <div className="w-px h-10 bg-neutral-200" />
              <div className="text-center">
                <p className="text-2xl font-bold text-neutral-900">
                  {totalCourses}+
                </p>
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
          {categoryData.map((cat) => {
            return (
              <Link
                key={cat.slug}
                to={`/courses/category/${cat.slug}`}
                className="group relative bg-white rounded-2xl border border-neutral-200/80 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 hover:border-indigo-300 transition-all duration-300 overflow-hidden flex flex-col h-full"
              >
                {/* Top accent gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Card content */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Icon - Top center position */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/50 flex items-center justify-center text-2xl mb-3 mx-auto group-hover:scale-105 transition-transform duration-300">
                    {cat.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-neutral-900 text-base mb-2 group-hover:text-indigo-600 transition-colors duration-300 text-center">
                    {cat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-500 mb-3 line-clamp-2 leading-relaxed text-center">
                    {cat.description}
                  </p>

                  {/* Stats - Compact inline */}
                  <div className="flex items-center justify-center gap-3 text-xs text-neutral-400 mb-3">
                    <span className="flex items-center gap-1">
                      📚{" "}
                      <span className="font-medium text-neutral-600">
                        {cat.courses.length}
                      </span>{" "}
                      courses
                    </span>
                    <span className="flex items-center gap-1">
                      🔧{" "}
                      <span className="font-medium text-neutral-600">
                        {cat.tools.length}
                      </span>{" "}
                      tools
                    </span>
                  </div>

                  {/* Tools Tags - Compact, centered */}
                  <div className="flex flex-wrap justify-center gap-1.5 mb-4 flex-grow">
                    {cat.tools.slice(0, 3).map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-0.5 bg-neutral-100 border border-neutral-200/60 rounded-full text-xs font-medium text-neutral-600 group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-all duration-300 h-fit"
                      >
                        {tool}
                      </span>
                    ))}
                    {cat.tools.length > 3 && (
                      <span className="px-2.5 py-0.5 bg-neutral-100 rounded-full text-xs font-medium text-neutral-500 h-fit">
                        +{cat.tools.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Explore Button - Always at bottom */}
                  <div className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-sm font-semibold rounded-lg text-center group-hover:from-indigo-700 group-hover:to-purple-700 transition-all duration-300 shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 mt-auto">
                    <span>Explore Track</span>
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Why Skill Courses Section */}
      <div className="bg-gradient-to-b from-neutral-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4">
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
              {
                icon: TrendingUp,
                color: "bg-blue-100 text-blue-600",
                title: "Industry Skills",
                description: "Learn what top companies need",
              },
              {
                icon: Award,
                color: "bg-emerald-100 text-emerald-600",
                title: "Certificates",
                description: "Earn verified credentials",
              },
              {
                icon: Target,
                color: "bg-purple-100 text-purple-600",
                title: "Hands-on Projects",
                description: "Build real portfolio pieces",
              },
              {
                icon: Rocket,
                color: "bg-orange-100 text-orange-600",
                title: "Career Ready",
                description: "Job-ready in 3-6 months",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm hover:shadow-lg transition-shadow text-center"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-4`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-2">
                  {item.title}
                </h3>
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
  );
};

// Single Category Page
const CategoryPage = () => {
  const { slug: categorySlug } = useParams();
  const category =
    categoryData.find((c) => c.slug === categorySlug) || categoryData[0];
  const categoryColor = getCategoryColor(category.colorIndex);
  const categoryCourses = coursesData.filter((c) =>
    category.courses.includes(c.id),
  );

  return (
    <div className="overflow-x-hidden w-full">
      {/* Premium Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 lg:py-20 relative overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Back Button + Breadcrumb */}
              <div className="mb-6 flex justify-center lg:justify-start">
                <nav className="flex items-center gap-3 text-xs mb-6">
                  <Link
                    to="/courses"
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                  <span className="text-slate-400">/</span>
                  <Link to="/courses" className="text-slate-500 hover:text-slate-700 font-medium">Courses</Link>
                  <span className="text-slate-400">/</span>
                  <span className="text-slate-900 font-medium">{category.title}</span>
                </nav>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-4 leading-tight">
                <span
                  className={`block bg-gradient-to-r ${categoryColor.gradient} bg-clip-text text-transparent pb-2`}
                >
                  {category.title}
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg text-neutral-600 mb-8 max-w-lg mx-auto lg:mx-0">
                {category.description}. Master coding languages for software
                development and build real-world applications.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-8">
                <Link
                  to="/register"
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${categoryColor.gradient} text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg`}
                >
                  Start Learning
                </Link>

              </div>

              {/* Avatar Group */}

            </div>

            {/* Right Stats Grid */}
            <div className="flex-shrink-0 grid grid-cols-2 gap-4 w-full max-w-sm">
              {[
                {
                  icon: BookOpen,
                  value: categoryCourses.length,
                  label: "Premium Courses",
                  color: "bg-blue-50 text-blue-600",
                },
                {
                  icon: Clock,
                  value: `${categoryCourses.reduce((acc, c) => acc + c.hours, 0)}+`,
                  label: "Hours Content",
                  color: "bg-purple-50 text-purple-600",
                },
                {
                  icon: Zap,
                  value: `${categoryCourses.reduce((acc, c) => acc + c.lessons, 0)}+`,
                  label: "Interactive Lessons",
                  color: "bg-amber-50 text-amber-600",
                },
                {
                  icon: Target,
                  value: `${categoryCourses.length * 4}+`,
                  label: "Real-world Projects",
                  color: "bg-green-50 text-green-600",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}
                  >
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-neutral-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-neutral-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div id="courses" className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-neutral-600">
            {categoryCourses.length} courses found
          </p>

        </div>

        {categoryCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                image={course.image}
                modules={Math.ceil(course.lessons / 4)}
                linkTo={`/courses/${course.id}`}
                state={{ from: location.pathname, fromLabel: category.title }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/50 flex items-center justify-center text-4xl mx-auto mb-6">
              📚
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">
              No courses yet
            </h3>
            <p className="text-neutral-500 mb-6">
              Courses for this category are coming soon!
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25"
            >
              Browse All Courses
              <span>→</span>
            </Link>
          </div>
        )}
      </div>

      {/* Why Learn With Us Section */}

      <div className="bg-white py-20 mt-12 w-full">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium mb-4 border border-indigo-100">
              <TrendingUp className="w-4 h-4" />
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Why Learn {category.title} with Us?
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Industry-recognized curriculum designed by experts to fast-track
              your career
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: TrendingUp,
                title: "High Demand Skills",
                description: "Top skills requested by Fortune 500 companies",
              },
              {
                icon: Award,
                title: "Certification",
                description:
                  "Industry-recognized certificates for your portfolio",
              },
              {
                icon: Target,
                title: "Hands-on Projects",
                description: "Build real projects to showcase your abilities",
              },
              {
                icon: Heart,
                title: "Lifetime Access",
                description:
                  "Learn at your pace with forever access to content",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl border border-neutral-200/80 p-6 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 hover:border-indigo-300 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/50 flex items-center justify-center mb-4 mx-auto group-hover:scale-105 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-500">
                  {feature.description}
                </p>
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
                Join thousands of learners who have transformed their careers
                with our {category.title} courses.
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
    </div >
  );
};

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
              <span className="text-neutral-700 font-medium text-sm">
                All Courses
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Skill
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                Courses
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-neutral-600 mb-8 max-w-xl mx-auto">
              Learn from industry experts and boost your career with our
              job-ready courses
            </p>

            {/* Stats Row */}
            <div className="inline-flex items-center gap-8 px-6 py-3 bg-white rounded-2xl shadow-sm border border-neutral-100">
              <div className="text-center">
                <p className="text-2xl font-bold text-neutral-900">
                  {coursesData.length}
                </p>
                <p className="text-xs text-neutral-500">Courses</p>
              </div>
              <div className="w-px h-10 bg-neutral-200" />
              <div className="text-center">
                <p className="text-2xl font-bold text-neutral-900">
                  {coursesData
                    .reduce((acc, c) => acc + c.students, 0)
                    .toLocaleString()}
                  +
                </p>
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
            Each course is designed by industry experts to help you land your
            dream job
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coursesData.map((course) => (
            <CourseCard
              key={course.id}
              image={course.image}
              modules={course.lessons}
              description={`Learn ${course.title} from industry experts. Master real-world skills with hands-on projects and get certified.`}
              title={course.title}
              linkTo={`/courses/${course.id}`}
            />
          ))}
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
              {
                icon: TrendingUp,
                color: "bg-cyan-100 text-cyan-600",
                title: "Expert Instructors",
                description: "Learn from industry professionals",
              },
              {
                icon: Award,
                color: "bg-blue-100 text-blue-600",
                title: "Certificates",
                description: "Earn verified credentials",
              },
              {
                icon: Target,
                color: "bg-indigo-100 text-indigo-600",
                title: "Hands-on Projects",
                description: "Build real portfolio pieces",
              },
              {
                icon: Rocket,
                color: "bg-purple-100 text-purple-600",
                title: "Lifetime Access",
                description: "Learn at your own pace",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm hover:shadow-lg transition-shadow text-center"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-4`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-2">
                  {item.title}
                </h3>
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
  );
};

// Premium Course Detail Page
const CourseDetailPage = () => {
  const { id: courseId } = useParams();
  const course = coursesData.find((c) => c.id === courseId) || coursesData[0];

  // Resolve domain for theming
  const domain = fullStackDomains.find((d) =>
    d.topics.some((t) => t.courseId === courseId),
  );
  const theme = getTheme(domain?.slug, courseId);

  const [expandedSections, setExpandedSections] = React.useState<number[]>([0]);

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const curriculum = [
    {
      title: "Getting Started",
      lessons: [
        { name: "Introduction to the Course", duration: "10 min", free: true },
        { name: "Setting Up Your Environment", duration: "20 min", free: true },
        { name: "Course Prerequisites", duration: "8 min", free: false },
      ],
    },
    {
      title: "Core Fundamentals",
      lessons: [
        { name: "Understanding the Basics", duration: "25 min", free: false },
        { name: "Key Concepts Explained", duration: "30 min", free: false },
        { name: "Hands-on Practice", duration: "45 min", free: false },
        {
          name: "Quiz: Fundamentals",
          duration: "15 min",
          free: false,
          quiz: true,
        },
      ],
    },
    {
      title: "Advanced Techniques",
      lessons: [
        {
          name: "Deep Dive into Advanced Topics",
          duration: "40 min",
          free: false,
        },
        { name: "Best Practices", duration: "35 min", free: false },
        { name: "Real-world Applications", duration: "50 min", free: false },
        {
          name: "Project: Build Something Amazing",
          duration: "120 min",
          free: false,
          project: true,
        },
      ],
    },
    {
      title: "Mastery & Beyond",
      lessons: [
        { name: "Expert-level Patterns", duration: "45 min", free: false },
        { name: "Performance Optimization", duration: "30 min", free: false },
        {
          name: "Final Project",
          duration: "180 min",
          free: false,
          project: true,
        },
        {
          name: "Course Completion Quiz",
          duration: "20 min",
          free: false,
          quiz: true,
        },
      ],
    },
  ];

  return (
    <div>
      {/* Hero Section - New Design */}
      <div className="relative bg-gradient-to-br from-white via-indigo-50 to-purple-50 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.1) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Back Button + Breadcrumb */}
          <nav className="flex items-center gap-3 text-xs mb-6">
            <Link
              to={location.state?.from || "/courses"}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="text-slate-400">/</span>
            <Link to={location.state?.from || "/courses"} className="text-slate-500 hover:text-slate-700 font-medium">
              {location.state?.fromLabel || "Courses"}
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-700 font-medium">{course.tags?.[0] || 'Programming'}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {/* Left Content */}
            <div className="flex-1 space-y-6">
              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 leading-tight">
                {course.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                "{course.title}" transforms how you learn {course.tags?.[0]?.toLowerCase() || 'programming'}—with guided projects and AI-powered assistance!
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center gap-4 pt-2">
                <a
                  href={`/dashboard/courses/${course.id}/lesson/1`}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/30"
                >
                  Enroll Now
                </a>
                <button className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right - Course Card Image */}
            <div className="w-full lg:w-72 flex-shrink-0 self-start">
              <div className="rounded-2xl overflow-hidden shadow-xl shadow-indigo-200/50 border border-indigo-100">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                ) : (
                  <div className={`w-full aspect-[4/3] bg-gradient-to-br ${theme.primaryGradient} flex items-center justify-center`}>
                    <div className="text-white text-6xl">📚</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 py-6 border-t border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8">
            {/* Total Modules */}
            <div className="flex flex-col items-center px-6 py-4 bg-white rounded-xl shadow-lg min-w-[120px]">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-2xl font-bold text-slate-900">{Math.ceil(course.lessons / 4)}</span>
              <span className="text-xs text-slate-500">Total Modules</span>
            </div>

            {/* Hands-On Exercises */}
            <div className="flex flex-col items-center px-6 py-4 bg-white rounded-xl shadow-lg min-w-[120px]">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-2">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-slate-900">{Math.ceil(course.lessons / 8)}</span>
              <span className="text-xs text-slate-500">Hands-On Exercises</span>
            </div>

            {/* Hours of Content */}
            <div className="flex flex-col items-center px-6 py-4 bg-white rounded-xl shadow-lg min-w-[120px]">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-rose-600" />
              </div>
              <span className="text-2xl font-bold text-slate-900">{course.hours}</span>
              <span className="text-xs text-slate-500">Hours of Content</span>
            </div>

            {/* Resources */}
            <div className="flex flex-col items-center px-6 py-4 bg-white rounded-xl shadow-lg min-w-[120px]">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-2">
                <Download className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-2xl font-bold text-slate-900">{Math.ceil(course.lessons / 6)}</span>
              <span className="text-xs text-slate-500">Resources</span>
            </div>

            {/* Certification */}
            <div className="flex flex-col items-center px-6 py-4 bg-white rounded-xl shadow-lg min-w-[120px]">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-2">
                <Award className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-sm font-bold text-slate-900">Certification of</span>
              <span className="text-xs text-slate-500">Completion</span>
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
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                What You'll Learn
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Build real-world applications from scratch",
                  "Master core concepts and advanced patterns",
                  "Understand best practices and optimization",
                  "Deploy and scale your applications",
                  "Write clean, maintainable code",
                  "Debug and troubleshoot effectively",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-white rounded-xl border border-neutral-100"
                  >
                    <span className="w-6 h-6 rounded-full bg-success-100 text-success-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-neutral-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Course Requirements */}
            <section>
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                Requirements
              </h2>
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
                <h2 className="text-2xl font-display font-bold text-neutral-900">
                  Course Curriculum
                </h2>
                <span className="text-sm text-neutral-500">
                  {curriculum.length} sections •{" "}
                  {curriculum.reduce((acc, s) => acc + s.lessons.length, 0)}{" "}
                  lessons • {course.hours}h total
                </span>
              </div>
              <div className="space-y-3">
                {curriculum.map((section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    className="bg-white rounded-xl border border-neutral-200 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleSection(sectionIndex)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${expandedSections.includes(sectionIndex) ? "bg-primary-100 text-primary-600" : "bg-neutral-100 text-neutral-500"}`}
                        >
                          {sectionIndex + 1}
                        </span>
                        <div className="text-left">
                          <h3 className="font-semibold text-neutral-900">
                            {section.title}
                          </h3>
                          <p className="text-sm text-neutral-500">
                            {section.lessons.length} lessons
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-neutral-400 transition-transform ${expandedSections.includes(sectionIndex) ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </button>

                    {expandedSections.includes(sectionIndex) && (
                      <div className="border-t border-neutral-100">
                        {section.lessons.map((lesson, lessonIndex) => {
                          // Calculate absolute index for the link
                          const previousLessonsCount = curriculum
                            .slice(0, sectionIndex)
                            .reduce((acc, s) => acc + s.lessons.length, 0);
                          const absoluteIndex =
                            previousLessonsCount + lessonIndex + 1;

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
                                    <p className="text-neutral-700 group-hover:text-success-700 transition-colors">
                                      {lesson.name}
                                    </p>
                                    <p className="text-xs text-neutral-400">
                                      {lesson.duration}
                                    </p>
                                  </div>
                                </div>
                                <span className="px-2 py-0.5 bg-success-100 text-success-600 rounded text-xs font-medium">
                                  Free Preview
                                </span>
                              </div>
                            </a>
                          ) : (
                            <div
                              key={lessonIndex}
                              onClick={() =>
                                alert(
                                  "Please enroll in this course to access this lesson.",
                                )
                              }
                              className="block px-6 py-3 hover:bg-neutral-50 transition-colors border-b border-neutral-50 last:border-0 cursor-pointer"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <span className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center text-sm">
                                    {lesson.quiz
                                      ? "📝"
                                      : lesson.project
                                        ? "🎯"
                                        : "🔒"}
                                  </span>
                                  <div>
                                    <p className="text-neutral-500">
                                      {lesson.name}
                                    </p>
                                    <p className="text-xs text-neutral-400">
                                      {lesson.duration}
                                    </p>
                                  </div>
                                </div>
                                <span className="text-neutral-400 text-xs">
                                  Enroll to unlock
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Instructor */}
            <section>
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                Meet Your Instructor
              </h2>
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                    {course.instructor.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-neutral-900">
                      {course.instructor}
                    </h3>
                    <p className="text-primary-600 font-medium">
                      {course.instructorRole}
                    </p>
                    <div className="flex items-center gap-6 my-4 text-sm text-neutral-500">
                      <span className="flex items-center gap-1">
                        <span className="text-warning-500">★</span> 4.9
                        Instructor Rating
                      </span>
                      <span>👨‍🎓 45,000+ Students</span>
                      <span>📚 12 Courses</span>
                    </div>
                    <p className="text-neutral-600 leading-relaxed">
                      With over 10 years of industry experience, I've helped
                      thousands of students transition into successful tech
                      careers. My teaching philosophy focuses on practical,
                      hands-on learning that prepares you for real-world
                      challenges.
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
  );
};

// Resume Builder Page
const ResumeBuilderPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 text-center">
    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
      ATS-Friendly Resume Builder
    </h1>
    <p className="text-xl text-neutral-600 mb-8">
      Create professional resumes that pass Applicant Tracking Systems
    </p>
    <a
      href="/register"
      className="inline-block px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700"
    >
      Get Started Free
    </a>
  </div>
);

// Resources Page
const ResourcesPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
      Career Resources
    </h1>
    <p className="text-xl text-neutral-600 mb-8">
      Tips, guides, and resources to accelerate your career
    </p>
    <div className="space-y-4">
      {[
        "Interview Preparation Guide",
        "Salary Negotiation Tips",
        "Career Path Planning",
        "Networking Strategies",
      ].map((item) => (
        <div
          key={item}
          className="bg-white p-6 rounded-xl border border-neutral-200 hover:shadow-md transition-all cursor-pointer"
        >
          <h3 className="font-bold text-neutral-900">{item}</h3>
        </div>
      ))}
    </div>
  </div>
);

// Enterprise Page
const EnterprisePage = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 text-center">
    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
      Enterprise Solutions
    </h1>
    <p className="text-xl text-neutral-600 mb-8">
      Custom hiring solutions for large organizations
    </p>
    <a
      href="/contact"
      className="inline-block px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700"
    >
      Contact Sales
    </a>
  </div>
);

// Become Mentor Page
const BecomeMentorPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 text-center">
    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
      Become a Mentor
    </h1>
    <p className="text-xl text-neutral-600 mb-8">
      Share your knowledge and earn up to 97% on course sales
    </p>
    <a
      href="/register"
      className="inline-block px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700"
    >
      Start Teaching
    </a>
  </div>
);

// Careers Page
const CareersPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
      Careers at WorkGrad
    </h1>
    <p className="text-xl text-neutral-600 mb-8">
      Join our mission to transform career development
    </p>
    <p className="text-neutral-600">Check back soon for open positions!</p>
  </div>
);

// Blog Page
const BlogPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-8">
      Blog
    </h1>
    <p className="text-neutral-600">
      Coming soon - Career tips, industry insights, and more!
    </p>
  </div>
);

// Press Page
const PressPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
      Press
    </h1>
    <p className="text-neutral-600">
      For media inquiries, contact press@workgrad.com
    </p>
  </div>
);

// Contact Page
const ContactPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
      Contact Us
    </h1>
    <div className="bg-white p-6 rounded-xl border border-neutral-200">
      <p className="mb-4">
        <strong>Email:</strong> hello@workgrad.com
      </p>
      <p className="mb-4">
        <strong>Phone:</strong> +91 98765 43210
      </p>
      <p>
        <strong>Address:</strong> Bangalore, Karnataka, India
      </p>
    </div>
  </div>
);

// Terms Page
const TermsPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-6">
      Terms of Service
    </h1>
    <div className="prose prose-neutral max-w-none">
      <p>Last updated: December 2024</p>
      <p className="mt-4">
        By using WorkGrad, you agree to these terms of service...
      </p>
    </div>
  </div>
);

// Privacy Page
const PrivacyPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-6">
      Privacy Policy
    </h1>
    <div className="prose prose-neutral max-w-none">
      <p>Last updated: December 2024</p>
      <p className="mt-4">
        Your privacy is important to us. This policy explains how we collect and
        use your data...
      </p>
    </div>
  </div>
);

// Cookies Page
const CookiesPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-6">
      Cookie Policy
    </h1>
    <div className="prose prose-neutral max-w-none">
      <p>Last updated: December 2024</p>
      <p className="mt-4">
        We use cookies to improve your experience on our platform...
      </p>
    </div>
  </div>
);

// Community Page
const CommunityPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 text-center">
    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
      Community
    </h1>
    <p className="text-xl text-neutral-600 mb-8">
      Join our community of learners, mentors, and employers
    </p>
    <a
      href="/register"
      className="inline-block px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700"
    >
      Join Now
    </a>
  </div>
);

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#0f172a",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            borderRadius: "12px",
            padding: "16px",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#f43f5e",
              secondary: "#fff",
            },
          },
        }}
      />

      {/* Routes */}
      <Routes>
        {/* Public Routes wrapped in PublicLayout */}
        <Route
          element={
            <PublicLayout>
              <Outlet />
            </PublicLayout>
          }
        >
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
        <Route element={<ProtectedRoute allowedRoles={["learner"]} />}>
          <Route path="/dashboard" element={<LearnerDashboard />} />
          <Route path="/dashboard/*" element={<LearnerDashboard />} />
        </Route>

        {/* Protected Employer Routes */}
        <Route element={<ProtectedRoute allowedRoles={["employer"]} />}>
          <Route path="/employer" element={<EmployerDashboard />} />
          <Route path="/employer/*" element={<EmployerDashboard />} />
        </Route>

        {/* Protected Mentor Routes */}
        <Route element={<ProtectedRoute allowedRoles={["mentor"]} />}>
          <Route path="/mentor" element={<MentorDashboard />} />
          <Route path="/mentor/*" element={<MentorDashboard />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
