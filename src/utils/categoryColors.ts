// Category Color Palette System
// Admin can assign colorIndex (0-11) to each category
// This ensures consistent, curated colors across the platform

export const categoryColorPalette = [
    {
        index: 0,
        name: 'Blue',
        gradient: 'from-blue-500 to-indigo-600',
        bgColor: 'bg-blue-500',
        lightBg: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200'
    },
    {
        index: 1,
        name: 'Green',
        gradient: 'from-emerald-500 to-teal-600',
        bgColor: 'bg-emerald-500',
        lightBg: 'bg-emerald-50',
        text: 'text-emerald-600',
        border: 'border-emerald-200'
    },
    {
        index: 2,
        name: 'Orange',
        gradient: 'from-orange-500 to-amber-600',
        bgColor: 'bg-orange-500',
        lightBg: 'bg-orange-50',
        text: 'text-orange-600',
        border: 'border-orange-200'
    },
    {
        index: 3,
        name: 'Pink',
        gradient: 'from-pink-500 to-rose-600',
        bgColor: 'bg-pink-500',
        lightBg: 'bg-pink-50',
        text: 'text-pink-600',
        border: 'border-pink-200'
    },
    {
        index: 4,
        name: 'Purple',
        gradient: 'from-purple-500 to-violet-600',
        bgColor: 'bg-purple-500',
        lightBg: 'bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-200'
    },
    {
        index: 5,
        name: 'Cyan',
        gradient: 'from-cyan-500 to-sky-600',
        bgColor: 'bg-cyan-500',
        lightBg: 'bg-cyan-50',
        text: 'text-cyan-600',
        border: 'border-cyan-200'
    },
    {
        index: 6,
        name: 'Rose',
        gradient: 'from-rose-500 to-red-600',
        bgColor: 'bg-rose-500',
        lightBg: 'bg-rose-50',
        text: 'text-rose-600',
        border: 'border-rose-200'
    },
    {
        index: 7,
        name: 'Amber',
        gradient: 'from-amber-500 to-yellow-600',
        bgColor: 'bg-amber-500',
        lightBg: 'bg-amber-50',
        text: 'text-amber-600',
        border: 'border-amber-200'
    },
    {
        index: 8,
        name: 'Lime',
        gradient: 'from-lime-500 to-green-600',
        bgColor: 'bg-lime-500',
        lightBg: 'bg-lime-50',
        text: 'text-lime-600',
        border: 'border-lime-200'
    },
    {
        index: 9,
        name: 'Fuchsia',
        gradient: 'from-fuchsia-500 to-pink-600',
        bgColor: 'bg-fuchsia-500',
        lightBg: 'bg-fuchsia-50',
        text: 'text-fuchsia-600',
        border: 'border-fuchsia-200'
    },
    {
        index: 10,
        name: 'Sky',
        gradient: 'from-sky-500 to-blue-600',
        bgColor: 'bg-sky-500',
        lightBg: 'bg-sky-50',
        text: 'text-sky-600',
        border: 'border-sky-200'
    },
    {
        index: 11,
        name: 'Teal',
        gradient: 'from-teal-500 to-cyan-600',
        bgColor: 'bg-teal-500',
        lightBg: 'bg-teal-50',
        text: 'text-teal-600',
        border: 'border-teal-200'
    },
]

// Get color by index (with fallback to first color)
export function getCategoryColor(colorIndex: number) {
    return categoryColorPalette[colorIndex % categoryColorPalette.length]
}

// Get color by category slug (hash-based fallback for categories without colorIndex)
export function getCategoryColorBySlug(slug: string) {
    const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return categoryColorPalette[hash % categoryColorPalette.length]
}

// Type for category with color
export interface CategoryWithColor {
    slug: string
    title: string
    description: string
    colorIndex: number
    icon: string
    courses: string[]
    tools: string[]
}
