import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowUpRight } from 'lucide-react';

// Props interface for the CourseCard component
export interface CourseCardProps {
    id: string;
    title: string;
    description?: string;
    image?: string;           // Course cover image URL
    modules: number;          // Number of modules
    linkTo: string;
    state?: any;              // Navigation state
}

// Placeholder gradient backgrounds for courses without images
const placeholderGradients = [
    'from-emerald-500 to-teal-600',      // Green
    'from-amber-400 to-orange-500',       // Yellow/Gold  
    'from-cyan-500 to-blue-600',          // Teal/Blue
    'from-pink-500 to-rose-600',          // Pink
    'from-violet-500 to-purple-600',      // Purple
    'from-indigo-500 to-blue-600',        // Indigo
];

// Get placeholder gradient based on title
const getPlaceholderGradient = (title: string) => {
    const index = title.length % placeholderGradients.length;
    return placeholderGradients[index];
};

export const CourseCard: React.FC<CourseCardProps> = ({
    title,
    description,
    image,
    modules,
    linkTo,
    state,
}) => {
    const gradient = getPlaceholderGradient(title);

    return (
        <Link
            to={linkTo}
            state={state}
            className="group bg-white rounded-2xl shadow-sm border border-neutral-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
        >
            {/* Image Header */}
            <div className="relative aspect-[2/1] overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    /* Placeholder gradient with icon when no image */
                    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                        <div className="text-white/90 text-6xl">📚</div>
                    </div>
                )}
            </div>

            {/* Card Body */}
            <div className="p-4 flex flex-col flex-grow">
                {/* Modules Count */}
                <div className="flex items-center gap-1.5 text-neutral-500 text-sm mb-2">
                    <Play className="w-4 h-4 fill-current" />
                    <span>{modules} Modules</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-neutral-900 text-base mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                    {title}
                </h3>

                {/* Description */}
                {description && (
                    <p className="text-sm text-neutral-500 line-clamp-2 mb-4 flex-grow">
                        {description}
                    </p>
                )}

                {/* View Course Button */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 mt-auto">
                    <span className="font-semibold text-neutral-800 text-sm">View Course</span>
                    <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;
