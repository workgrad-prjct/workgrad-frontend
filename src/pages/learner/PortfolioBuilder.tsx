import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Plus, Trash2, ExternalLink, Github, Globe, Image,
    Edit2, Eye, Save, X, Upload, Link as LinkIcon,
    Code, Palette, Layers, Zap
} from 'lucide-react'
import { Card, Button, Input, Badge } from '@/components/ui'
import { cn } from '@/utils'

interface Project {
    id: string
    title: string
    description: string
    image: string
    technologies: string[]
    liveUrl: string
    githubUrl: string
    category: string
    featured: boolean
}

const categoryIcons: Record<string, any> = {
    'Web Development': Code,
    'UI/UX Design': Palette,
    'Full Stack': Layers,
    'Mobile App': Zap,
}

const defaultProjects: Project[] = [
    {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform with React, Node.js, and Stripe integration. Features include user authentication, product management, and real-time inventory tracking.',
        image: '',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        category: 'Full Stack',
        featured: true,
    },
    {
        id: '2',
        title: 'Task Management App',
        description: 'A productivity app with drag-and-drop functionality, team collaboration features, and real-time updates using WebSockets.',
        image: '',
        technologies: ['TypeScript', 'Next.js', 'Prisma', 'PostgreSQL'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        category: 'Web Development',
        featured: false,
    },
]

export function PortfolioBuilder() {
    const [projects, setProjects] = useState<Project[]>(defaultProjects)
    const [editingProject, setEditingProject] = useState<Project | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [newTech, setNewTech] = useState('')

    const [portfolioSettings, setPortfolioSettings] = useState({
        name: 'John Doe',
        title: 'Full Stack Developer',
        bio: 'Passionate developer with 5+ years of experience building scalable web applications.',
        email: 'john@example.com',
        github: 'github.com/johndoe',
        linkedin: 'linkedin.com/in/johndoe',
        website: 'johndoe.dev',
    })

    const openNewProject = () => {
        setEditingProject({
            id: Date.now().toString(),
            title: '',
            description: '',
            image: '',
            technologies: [],
            liveUrl: '',
            githubUrl: '',
            category: 'Web Development',
            featured: false,
        })
        setIsModalOpen(true)
    }

    const openEditProject = (project: Project) => {
        setEditingProject({ ...project })
        setIsModalOpen(true)
    }

    const saveProject = () => {
        if (!editingProject?.title) return

        const existingIndex = projects.findIndex(p => p.id === editingProject.id)
        if (existingIndex >= 0) {
            const updated = [...projects]
            updated[existingIndex] = editingProject
            setProjects(updated)
        } else {
            setProjects([...projects, editingProject])
        }
        setIsModalOpen(false)
        setEditingProject(null)
    }

    const deleteProject = (id: string) => {
        setProjects(projects.filter(p => p.id !== id))
    }

    const addTechnology = () => {
        if (newTech.trim() && editingProject && !editingProject.technologies.includes(newTech.trim())) {
            setEditingProject({
                ...editingProject,
                technologies: [...editingProject.technologies, newTech.trim()]
            })
            setNewTech('')
        }
    }

    const removeTechnology = (tech: string) => {
        if (editingProject) {
            setEditingProject({
                ...editingProject,
                technologies: editingProject.technologies.filter(t => t !== tech)
            })
        }
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-neutral-900">
                        Portfolio Builder
                    </h1>
                    <p className="text-neutral-500 mt-1">
                        Showcase your best work to potential employers.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-neutral-100 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn(
                                "p-2 rounded-md transition-colors",
                                viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-neutral-200'
                            )}
                        >
                            <Layers className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={cn(
                                "p-2 rounded-md transition-colors",
                                viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-neutral-200'
                            )}
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                    </div>
                    <Button onClick={openNewProject} leftIcon={<Plus className="w-4 h-4" />}>
                        Add Project
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content - Projects */}
                <div className="lg:col-span-2 space-y-6">
                    <div className={cn(
                        "grid gap-6",
                        viewMode === 'grid' ? 'sm:grid-cols-2' : 'grid-cols-1'
                    )}>
                        {projects.map((project) => {
                            const Icon = categoryIcons[project.category] || Code
                            return (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <Card className="group overflow-hidden hover:shadow-lg transition-all">
                                        {/* Project Image */}
                                        <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 relative overflow-hidden">
                                            {project.image ? (
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Icon className="w-12 h-12 text-primary-300" />
                                                </div>
                                            )}
                                            {project.featured && (
                                                <Badge className="absolute top-3 left-3 bg-warning-500">
                                                    Featured
                                                </Badge>
                                            )}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => openEditProject(project)}
                                                    className="p-2 bg-white rounded-full hover:bg-neutral-100 transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 bg-white rounded-full hover:bg-neutral-100 transition-colors"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 bg-white rounded-full hover:bg-neutral-100 transition-colors"
                                                    >
                                                        <Github className="w-4 h-4" />
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => deleteProject(project.id)}
                                                    className="p-2 bg-error-500 text-white rounded-full hover:bg-error-600 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Project Info */}
                                        <div className="p-4 space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-bold text-neutral-900">{project.title}</h3>
                                                    <p className="text-xs text-neutral-500">{project.category}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-neutral-600 line-clamp-2">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.technologies.slice(0, 4).map((tech) => (
                                                    <Badge key={tech} variant="outline" size="sm">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                                {project.technologies.length > 4 && (
                                                    <Badge variant="secondary" size="sm">
                                                        +{project.technologies.length - 4}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            )
                        })}

                        {/* Add New Project Card */}
                        <Card
                            className="aspect-video flex items-center justify-center cursor-pointer border-2 border-dashed border-neutral-200 hover:border-primary-400 hover:bg-primary-50/50 transition-all group"
                            onClick={openNewProject}
                        >
                            <div className="text-center">
                                <Plus className="w-8 h-8 mx-auto text-neutral-400 group-hover:text-primary-600 transition-colors" />
                                <p className="mt-2 text-sm font-medium text-neutral-500 group-hover:text-primary-600">
                                    Add New Project
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Sidebar - Portfolio Settings */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="font-bold mb-4">Portfolio Settings</h3>
                        <div className="space-y-4">
                            <Input
                                label="Full Name"
                                value={portfolioSettings.name}
                                onChange={(e) => setPortfolioSettings({ ...portfolioSettings, name: e.target.value })}
                            />
                            <Input
                                label="Title / Role"
                                value={portfolioSettings.title}
                                onChange={(e) => setPortfolioSettings({ ...portfolioSettings, title: e.target.value })}
                            />
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Bio</label>
                                <textarea
                                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all text-sm min-h-[80px]"
                                    value={portfolioSettings.bio}
                                    onChange={(e) => setPortfolioSettings({ ...portfolioSettings, bio: e.target.value })}
                                />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="font-bold mb-4">Social Links</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Github className="w-4 h-4 text-neutral-400" />
                                <Input
                                    placeholder="github.com/username"
                                    value={portfolioSettings.github}
                                    onChange={(e) => setPortfolioSettings({ ...portfolioSettings, github: e.target.value })}
                                    className="flex-1"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <LinkIcon className="w-4 h-4 text-neutral-400" />
                                <Input
                                    placeholder="linkedin.com/in/username"
                                    value={portfolioSettings.linkedin}
                                    onChange={(e) => setPortfolioSettings({ ...portfolioSettings, linkedin: e.target.value })}
                                    className="flex-1"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-neutral-400" />
                                <Input
                                    placeholder="yourwebsite.com"
                                    value={portfolioSettings.website}
                                    onChange={(e) => setPortfolioSettings({ ...portfolioSettings, website: e.target.value })}
                                    className="flex-1"
                                />
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-gradient-primary text-white border-0">
                        <h3 className="font-bold mb-2">Portfolio Stats</h3>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <p className="text-3xl font-bold">{projects.length}</p>
                                <p className="text-sm text-white/70">Projects</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold">{projects.filter(p => p.featured).length}</p>
                                <p className="text-sm text-white/70">Featured</p>
                            </div>
                        </div>
                        <Button
                            variant="secondary"
                            className="w-full mt-4 bg-white text-primary-600 hover:bg-neutral-50"
                            leftIcon={<Eye className="w-4 h-4" />}
                        >
                            Preview Portfolio
                        </Button>
                    </Card>
                </div>
            </div>

            {/* Edit Modal */}
            {isModalOpen && editingProject && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold">
                                {projects.find(p => p.id === editingProject.id) ? 'Edit Project' : 'New Project'}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Image Upload */}
                            <div className="aspect-video bg-neutral-100 rounded-xl border-2 border-dashed border-neutral-200 flex items-center justify-center cursor-pointer hover:border-primary-400 transition-colors">
                                <div className="text-center">
                                    <Upload className="w-8 h-8 mx-auto text-neutral-400" />
                                    <p className="mt-2 text-sm text-neutral-500">Click to upload project image</p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <Input
                                    label="Project Title"
                                    placeholder="My Awesome Project"
                                    value={editingProject.title}
                                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                                />
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
                                    <select
                                        className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                        value={editingProject.category}
                                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                                    >
                                        <option>Web Development</option>
                                        <option>UI/UX Design</option>
                                        <option>Full Stack</option>
                                        <option>Mobile App</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                                <textarea
                                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all min-h-[100px]"
                                    placeholder="Describe your project..."
                                    value={editingProject.description}
                                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Technologies</label>
                                <div className="flex gap-2 mb-2">
                                    <Input
                                        placeholder="Add technology..."
                                        value={newTech}
                                        onChange={(e) => setNewTech(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
                                    />
                                    <Button onClick={addTechnology} leftIcon={<Plus className="w-4 h-4" />}>Add</Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {editingProject.technologies.map((tech) => (
                                        <Badge key={tech} variant="secondary" className="pr-1.5">
                                            {tech}
                                            <button onClick={() => removeTechnology(tech)} className="ml-2 hover:text-error-500">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <Input
                                    label="Live URL"
                                    placeholder="https://myproject.com"
                                    value={editingProject.liveUrl}
                                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                                />
                                <Input
                                    label="GitHub URL"
                                    placeholder="https://github.com/user/repo"
                                    value={editingProject.githubUrl}
                                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={editingProject.featured}
                                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                                    className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                                />
                                <label htmlFor="featured" className="text-sm font-medium text-neutral-700">
                                    Mark as featured project
                                </label>
                            </div>
                        </div>

                        <div className="p-6 border-t border-neutral-100 flex items-center justify-end gap-3">
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={saveProject} leftIcon={<Save className="w-4 h-4" />}>
                                Save Project
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}
