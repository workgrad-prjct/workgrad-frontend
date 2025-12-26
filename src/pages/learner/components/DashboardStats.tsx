
import { TrendingUp, Briefcase, CheckCircle, Clock } from 'lucide-react'
import { Card } from '@/components/ui'

interface StatCardProps {
    title: string
    value: string | number
    change?: string
    icon: React.ElementType
    variant?: 'primary' | 'secondary' | 'accent' | 'neutral'
}

function StatCard({ title, value, change, icon: Icon, variant = 'neutral' }: StatCardProps) {
    const colors = {
        primary: 'bg-primary-50 text-primary-600',
        secondary: 'bg-secondary-50 text-secondary-600',
        accent: 'bg-accent-50 text-accent-600',
        neutral: 'bg-neutral-100 text-neutral-600',
    }

    return (
        <Card className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-neutral-500">{title}</p>
                    <h3 className="mt-2 text-2xl font-bold text-neutral-900">{value}</h3>
                    {change && (
                        <div className="mt-2 flex items-center text-xs text-success-600 font-medium">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {change} from last month
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-xl ${colors[variant]}`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
        </Card>
    )
}

export function DashboardStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
                title="Jobs Applied"
                value="12"
                change="+2"
                icon={Briefcase}
                variant="primary"
            />
            <StatCard
                title="Interviews"
                value="3"
                icon={CheckCircle}
                variant="secondary"
            />
            <StatCard
                title="Profile Views"
                value="45"
                change="+12%"
                icon={TrendingUp}
                variant="accent"
            />
            <StatCard
                title="Saved Jobs"
                value="8"
                icon={Clock}
                variant="neutral"
            />
        </div>
    )
}
