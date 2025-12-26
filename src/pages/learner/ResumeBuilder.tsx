import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    CheckCircle, ChevronRight, ChevronLeft, Upload, FileText,
    Plus, Trash2, GraduationCap, Briefcase, Code, Folder
} from 'lucide-react'
import { Card, Button, Input, Select, Badge } from '@/components/ui'
import { cn } from '@/utils'

// Steps configuration
const steps = [
    { id: 1, title: 'Personal Info', description: 'Basic contact details', icon: FileText },
    { id: 2, title: 'Education', description: 'Schools & degrees', icon: GraduationCap },
    { id: 3, title: 'Experience', description: 'Work history', icon: Briefcase },
    { id: 4, title: 'Skills', description: 'Technical abilities', icon: Code },
    { id: 5, title: 'Projects', description: 'Key achievements', icon: Folder },
]

interface Education {
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    gpa: string
}

interface Experience {
    id: string
    company: string
    position: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: string
}

interface Project {
    id: string
    name: string
    description: string
    technologies: string
    link: string
}

export function ResumeBuilder() {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        linkedin: '',
        portfolio: '',
        summary: '',
    })

    const [education, setEducation] = useState<Education[]>([
        { id: '1', institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' }
    ])

    const [experience, setExperience] = useState<Experience[]>([
        { id: '1', company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '' }
    ])

    const [skills, setSkills] = useState<string[]>([])
    const [skillInput, setSkillInput] = useState('')

    const [projects, setProjects] = useState<Project[]>([
        { id: '1', name: '', description: '', technologies: '', link: '' }
    ])

    // Calculate ATS Score based on form completion
    const calculateAtsScore = () => {
        let score = 0
        if (formData.firstName && formData.lastName) score += 10
        if (formData.email) score += 10
        if (formData.phone) score += 5
        if (formData.linkedin) score += 5
        if (formData.summary && formData.summary.length > 50) score += 15
        if (education.some(e => e.institution && e.degree)) score += 15
        if (experience.some(e => e.company && e.position)) score += 20
        if (skills.length >= 5) score += 15
        else if (skills.length > 0) score += skills.length * 2
        if (projects.some(p => p.name && p.description)) score += 5
        return Math.min(score, 100)
    }

    const atsScore = calculateAtsScore()

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const addEducation = () => {
        setEducation([...education, {
            id: Date.now().toString(),
            institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: ''
        }])
    }

    const removeEducation = (id: string) => {
        if (education.length > 1) {
            setEducation(education.filter(e => e.id !== id))
        }
    }

    const updateEducation = (id: string, field: keyof Education, value: string) => {
        setEducation(education.map(e => e.id === id ? { ...e, [field]: value } : e))
    }

    const addExperience = () => {
        setExperience([...experience, {
            id: Date.now().toString(),
            company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: ''
        }])
    }

    const removeExperience = (id: string) => {
        if (experience.length > 1) {
            setExperience(experience.filter(e => e.id !== id))
        }
    }

    const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
        setExperience(experience.map(e => e.id === id ? { ...e, [field]: value } : e))
    }

    const addSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            setSkills([...skills, skillInput.trim()])
            setSkillInput('')
        }
    }

    const removeSkill = (skill: string) => {
        setSkills(skills.filter(s => s !== skill))
    }

    const addProject = () => {
        setProjects([...projects, {
            id: Date.now().toString(),
            name: '', description: '', technologies: '', link: ''
        }])
    }

    const removeProject = (id: string) => {
        if (projects.length > 1) {
            setProjects(projects.filter(p => p.id !== id))
        }
    }

    const updateProject = (id: string, field: keyof Project, value: string) => {
        setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p))
    }

    const handleDownload = () => {
        // In production, this would generate a PDF
        alert('Resume PDF generation would happen here!')
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Steps & Form */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h1 className="text-2xl font-display font-bold text-neutral-900">
                            Resume Builder
                        </h1>
                        <p className="text-neutral-500 mt-1">
                            Create an ATS-friendly resume in minutes.
                        </p>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center justify-between">
                        {steps.map((step) => (
                            <button
                                key={step.id}
                                onClick={() => setCurrentStep(step.id)}
                                className={cn(
                                    'flex items-center gap-2 transition-colors',
                                    currentStep === step.id ? 'text-primary-600' :
                                        currentStep > step.id ? 'text-success-600' : 'text-neutral-400'
                                )}
                            >
                                <div className={cn(
                                    'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all',
                                    currentStep === step.id ? 'border-primary-600 bg-primary-50' :
                                        currentStep > step.id ? 'border-success-600 bg-success-50' : 'border-neutral-200'
                                )}>
                                    {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                                </div>
                                <span className="hidden sm:block text-sm font-medium">{step.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* Form Content */}
                    <Card className="p-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Step 1: Personal Info */}
                                {currentStep === 1 && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold mb-4">Personal Information</h3>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <Input
                                                label="First Name"
                                                placeholder="John"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            />
                                            <Input
                                                label="Last Name"
                                                placeholder="Doe"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            />
                                            <Input
                                                label="Email"
                                                type="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                            <Input
                                                label="Phone"
                                                placeholder="+1 (555) 000-0000"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                            <Input
                                                label="LinkedIn URL"
                                                placeholder="linkedin.com/in/john"
                                                value={formData.linkedin}
                                                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                            />
                                            <Input
                                                label="Portfolio URL"
                                                placeholder="john.design"
                                                value={formData.portfolio}
                                                onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                                Professional Summary
                                            </label>
                                            <textarea
                                                className="w-full px-4 py-2 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all min-h-[120px]"
                                                placeholder="Experienced software engineer with a passion for building scalable web applications..."
                                                value={formData.summary}
                                                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Education */}
                                {currentStep === 2 && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold">Education</h3>
                                            <Button variant="outline" size="sm" onClick={addEducation} leftIcon={<Plus className="w-4 h-4" />}>
                                                Add Education
                                            </Button>
                                        </div>

                                        {education.map((edu, index) => (
                                            <div key={edu.id} className="p-4 border border-neutral-200 rounded-xl space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-neutral-500">Education #{index + 1}</span>
                                                    {education.length > 1 && (
                                                        <button
                                                            onClick={() => removeEducation(edu.id)}
                                                            className="text-error-500 hover:text-error-600"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    <Input
                                                        label="Institution"
                                                        placeholder="University Name"
                                                        value={edu.institution}
                                                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                                    />
                                                    <Input
                                                        label="Degree"
                                                        placeholder="Bachelor of Science"
                                                        value={edu.degree}
                                                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                                    />
                                                    <Input
                                                        label="Field of Study"
                                                        placeholder="Computer Science"
                                                        value={edu.field}
                                                        onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                                                    />
                                                    <Input
                                                        label="GPA (Optional)"
                                                        placeholder="3.8"
                                                        value={edu.gpa}
                                                        onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                                                    />
                                                    <Input
                                                        label="Start Date"
                                                        type="month"
                                                        value={edu.startDate}
                                                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                                                    />
                                                    <Input
                                                        label="End Date"
                                                        type="month"
                                                        value={edu.endDate}
                                                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Step 3: Experience */}
                                {currentStep === 3 && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold">Work Experience</h3>
                                            <Button variant="outline" size="sm" onClick={addExperience} leftIcon={<Plus className="w-4 h-4" />}>
                                                Add Experience
                                            </Button>
                                        </div>

                                        {experience.map((exp, index) => (
                                            <div key={exp.id} className="p-4 border border-neutral-200 rounded-xl space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-neutral-500">Experience #{index + 1}</span>
                                                    {experience.length > 1 && (
                                                        <button
                                                            onClick={() => removeExperience(exp.id)}
                                                            className="text-error-500 hover:text-error-600"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    <Input
                                                        label="Company"
                                                        placeholder="Company Name"
                                                        value={exp.company}
                                                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                                    />
                                                    <Input
                                                        label="Position"
                                                        placeholder="Software Engineer"
                                                        value={exp.position}
                                                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                                                    />
                                                    <Input
                                                        label="Location"
                                                        placeholder="San Francisco, CA"
                                                        value={exp.location}
                                                        onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                                                    />
                                                    <div className="flex items-center gap-2 pt-6">
                                                        <input
                                                            type="checkbox"
                                                            id={`current-${exp.id}`}
                                                            checked={exp.current}
                                                            onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                                            className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                                                        />
                                                        <label htmlFor={`current-${exp.id}`} className="text-sm text-neutral-600">
                                                            Currently working here
                                                        </label>
                                                    </div>
                                                    <Input
                                                        label="Start Date"
                                                        type="month"
                                                        value={exp.startDate}
                                                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                                    />
                                                    <Input
                                                        label="End Date"
                                                        type="month"
                                                        disabled={exp.current}
                                                        value={exp.current ? '' : exp.endDate}
                                                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                                                        Description
                                                    </label>
                                                    <textarea
                                                        className="w-full px-4 py-2 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all min-h-[100px]"
                                                        placeholder="Describe your responsibilities and achievements..."
                                                        value={exp.description}
                                                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Step 4: Skills */}
                                {currentStep === 4 && (
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-bold">Skills</h3>
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Add a skill (e.g., React, Python, Project Management)"
                                                value={skillInput}
                                                onChange={(e) => setSkillInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                                            />
                                            <Button onClick={addSkill} leftIcon={<Plus className="w-4 h-4" />}>
                                                Add
                                            </Button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map((skill) => (
                                                <Badge
                                                    key={skill}
                                                    variant="secondary"
                                                    className="pl-3 pr-2 py-1.5 flex items-center gap-2"
                                                >
                                                    {skill}
                                                    <button
                                                        onClick={() => removeSkill(skill)}
                                                        className="hover:text-error-500"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </Badge>
                                            ))}
                                        </div>
                                        {skills.length === 0 && (
                                            <p className="text-neutral-400 text-sm text-center py-8">
                                                No skills added yet. Add your technical and soft skills above.
                                            </p>
                                        )}
                                        <div className="p-4 bg-primary-50 rounded-xl">
                                            <h4 className="font-medium text-primary-700 mb-2">Suggested Skills</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'SQL', 'Git', 'AWS'].map((skill) => (
                                                    !skills.includes(skill) && (
                                                        <button
                                                            key={skill}
                                                            onClick={() => setSkills([...skills, skill])}
                                                            className="px-3 py-1 bg-white border border-primary-200 rounded-full text-sm text-primary-600 hover:bg-primary-100 transition-colors"
                                                        >
                                                            + {skill}
                                                        </button>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 5: Projects */}
                                {currentStep === 5 && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold">Projects</h3>
                                            <Button variant="outline" size="sm" onClick={addProject} leftIcon={<Plus className="w-4 h-4" />}>
                                                Add Project
                                            </Button>
                                        </div>

                                        {projects.map((project, index) => (
                                            <div key={project.id} className="p-4 border border-neutral-200 rounded-xl space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-neutral-500">Project #{index + 1}</span>
                                                    {projects.length > 1 && (
                                                        <button
                                                            onClick={() => removeProject(project.id)}
                                                            className="text-error-500 hover:text-error-600"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    <Input
                                                        label="Project Name"
                                                        placeholder="E-commerce Platform"
                                                        value={project.name}
                                                        onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                                                    />
                                                    <Input
                                                        label="Technologies Used"
                                                        placeholder="React, Node.js, MongoDB"
                                                        value={project.technologies}
                                                        onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                                                    />
                                                    <Input
                                                        label="Project Link"
                                                        placeholder="github.com/user/project"
                                                        value={project.link}
                                                        onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                                                        className="sm:col-span-2"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                                                        Description
                                                    </label>
                                                    <textarea
                                                        className="w-full px-4 py-2 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all min-h-[100px]"
                                                        placeholder="Describe the project, your role, and the impact..."
                                                        value={project.description}
                                                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-100">
                            <Button
                                variant="outline"
                                onClick={handleBack}
                                disabled={currentStep === 1}
                                leftIcon={<ChevronLeft className="w-4 h-4" />}
                            >
                                Back
                            </Button>
                            <Button
                                onClick={currentStep === steps.length ? handleDownload : handleNext}
                                rightIcon={currentStep === steps.length ? <Upload className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            >
                                {currentStep === steps.length ? 'Generate Resume' : 'Next Step'}
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Right Column - ATS Score & Preview */}
                <div className="space-y-6">
                    <Card className="bg-neutral-900 text-white border-0">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="font-bold text-lg">ATS Score</h3>
                                <p className="text-sm text-neutral-400">Real-time analysis</p>
                            </div>
                            <div className={cn(
                                "w-14 h-14 rounded-full border-4 flex items-center justify-center font-bold text-lg",
                                atsScore >= 80 ? "border-success-500 text-success-400" :
                                    atsScore >= 50 ? "border-warning-500 text-warning-400" : "border-error-500 text-error-400"
                            )}>
                                {atsScore}
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className={cn(
                                "flex items-center gap-2 text-sm",
                                formData.firstName && formData.lastName ? "text-success-400" : "text-neutral-400"
                            )}>
                                <CheckCircle className="w-4 h-4" />
                                <span>Contact info {formData.firstName ? 'complete' : 'incomplete'}</span>
                            </div>
                            <div className={cn(
                                "flex items-center gap-2 text-sm",
                                formData.summary && formData.summary.length > 50 ? "text-success-400" : "text-warning-400"
                            )}>
                                <CheckCircle className="w-4 h-4" />
                                <span>{formData.summary ? 'Summary added' : 'Add a summary'}</span>
                            </div>
                            <div className={cn(
                                "flex items-center gap-2 text-sm",
                                skills.length >= 5 ? "text-success-400" : "text-warning-400"
                            )}>
                                <CheckCircle className="w-4 h-4" />
                                <span>{skills.length >= 5 ? 'Skills complete' : `Add ${5 - skills.length} more skills`}</span>
                            </div>
                            <div className={cn(
                                "flex items-center gap-2 text-sm",
                                experience.some(e => e.company && e.position) ? "text-success-400" : "text-neutral-400"
                            )}>
                                <CheckCircle className="w-4 h-4" />
                                <span>{experience.some(e => e.company) ? 'Experience added' : 'Add work experience'}</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4">
                        <h3 className="font-bold mb-4">Resume Preview</h3>
                        <div className="aspect-[1/1.414] bg-white rounded-lg border border-neutral-200 p-4 text-xs overflow-hidden">
                            {formData.firstName || formData.lastName ? (
                                <div className="space-y-3">
                                    <div className="text-center border-b pb-2">
                                        <h4 className="font-bold text-sm">{formData.firstName} {formData.lastName}</h4>
                                        <p className="text-neutral-500 text-[10px]">{formData.email} | {formData.phone}</p>
                                    </div>
                                    {formData.summary && (
                                        <div>
                                            <h5 className="font-bold text-[10px] text-primary-600">SUMMARY</h5>
                                            <p className="text-[9px] text-neutral-600 line-clamp-2">{formData.summary}</p>
                                        </div>
                                    )}
                                    {skills.length > 0 && (
                                        <div>
                                            <h5 className="font-bold text-[10px] text-primary-600">SKILLS</h5>
                                            <p className="text-[9px] text-neutral-600">{skills.slice(0, 5).join(' • ')}</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center text-neutral-400">
                                    <div className="text-center">
                                        <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                        <p className="text-[10px]">Start filling to see preview</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Button variant="outline" className="w-full mt-4" leftIcon={<Upload className="w-4 h-4" />} onClick={handleDownload}>
                            Download PDF
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}
