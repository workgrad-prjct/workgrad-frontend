import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
    Zap,
    Briefcase,
    Target,
    Globe
} from 'lucide-react'
import { Card, Avatar } from '@/components/ui'

// Asset imports (using relative paths for Vite to process, or absolute if in public)
// Assuming they are in src/assets/images and we can import or refer by path
// For this environment, we refer by path string assuming Vite handles /src alias or similar, 
// otherwise standard import if supported. The user copied to src/assets/images.

export function Hero3DElement() {
    const ref = useRef<HTMLDivElement>(null)

    // Mouse tilt logic
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 })
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 })

    // Softer tilt for the whole collage
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"])

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseXFromCenter = e.clientX - rect.left - width / 2
        const mouseYFromCenter = e.clientY - rect.top - height / 2
        x.set(mouseXFromCenter / width)
        y.set(mouseYFromCenter / height)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <div
            style={{ perspective: 1000 }}
            className="w-full h-[600px] flex items-center justify-center -ml-8 lg:ml-0"
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                className="relative w-[500px] h-[500px]"
            >
                {/* BACKDROP: Network Lines / Blob */}
                <div
                    className="absolute inset-0 bg-gradient-to-tr from-primary-100/50 to-secondary-100/50 rounded-full blur-[80px] -z-20"
                    style={{ transform: "translateZ(-50px)" }}
                />

                {/* CENTRAL HUB: "Join the Community" */}
                {/* Positioned slightly back to allow avatars to float in front */}
                <motion.div
                    style={{ transform: "translateZ(0px)" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                >
                    <div className="relative w-40 h-40 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white">
                        {/* Central Avatar Group / Text */}
                        <div className="text-center p-4">
                            <div className="flex -space-x-3 justify-center mb-2">
                                <div className="w-8 h-8 rounded-full bg-red-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-red-600">You</div>
                                <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-600">Us</div>
                            </div>
                            <p className="text-sm font-bold text-neutral-800 leading-tight">Join the<br /><span className="text-primary-600">Squad</span></p>
                        </div>

                        {/* Orbiting Ring */}
                        <div className="absolute inset-0 border border-dashed border-neutral-300 rounded-full animate-spin-slow" />

                        {/* Connecting Lines (Simulated with absolute divs) */}
                        <div className="absolute top-1/2 left-1/2 w-[200px] h-[2px] bg-gradient-to-r from-primary-200 to-transparent -translate-y-1/2 origin-left rotate-0 -z-10" />
                        <div className="absolute top-1/2 left-1/2 w-[180px] h-[2px] bg-gradient-to-r from-secondary-200 to-transparent -translate-y-1/2 origin-left rotate-[120deg] -z-10" />
                        <div className="absolute top-1/2 left-1/2 w-[190px] h-[2px] bg-gradient-to-r from-accent-200 to-transparent -translate-y-1/2 origin-left rotate-[240deg] -z-10" />
                    </div>
                </motion.div>

                {/* SATELLITE 1: 3D Female Avatar (Student) */}
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transform: "translateZ(60px)" }}
                    className="absolute top-10 left-10 z-20"
                >
                    <div className="relative group">
                        {/* Avatar Image Container */}
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-card bg-gradient-to-b from-blue-50 to-white">
                            <img src="/src/assets/images/avatar_3d_female.png" alt="Student" className="w-full h-full object-cover scale-110 mt-2" />
                        </div>
                        {/* Badge Popout */}
                        <div className="absolute -bottom-4 right-0 bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 border border-blue-100">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-bold text-neutral-700">Hired!</span>
                        </div>
                    </div>
                </motion.div>

                {/* SATELLITE 2: 3D Male Avatar (Student) */}
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    style={{ transform: "translateZ(40px)" }}
                    className="absolute bottom-20 right-0 z-20"
                >
                    <div className="relative group">
                        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-card bg-gradient-to-b from-orange-50 to-white">
                            <img src="/src/assets/images/avatar_3d_male.png" alt="Student" className="w-full h-full object-cover scale-110 mt-2" />
                        </div>
                        <div className="absolute -top-4 -left-4 bg-white p-2 rounded-xl shadow-lg border border-orange-100">
                            <Zap className="w-5 h-5 text-orange-500 fill-orange-500" />
                        </div>
                    </div>
                </motion.div>

                {/* SATELLITE 3: 3D Trophy (Gamification) */}
                <motion.div
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 10, y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
                    style={{ transform: "translateZ(80px)" }}
                    className="absolute top-20 right-10 z-30"
                >
                    <div className="w-24 h-24 drop-shadow-2xl filter hover:scale-110 transition-transform cursor-pointer">
                        <img src="/src/assets/images/icon_3d_trophy.png" alt="Winner" className="w-full h-full object-contain" />
                    </div>
                    {/* Floating Label */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-950 text-[10px] font-bold px-2 py-0.5 rounded-md mt-1 shadow-sm">
                        #1 RANK
                    </div>
                </motion.div>

                {/* SATELLITE 4: Community Metrics Card */}
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ transform: "translateZ(30px)" }}
                    className="absolute bottom-10 left-10"
                >
                    <Card variant="glass" className="!bg-white/80 p-3 px-4 border-l-4 border-primary-500 shadow-xl backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" size="sm" className="border-2 border-white" />
                                <Avatar src="https://randomuser.me/api/portraits/women/44.jpg" size="sm" className="border-2 border-white" />
                                <Avatar src="https://randomuser.me/api/portraits/men/86.jpg" size="sm" className="border-2 border-white" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-neutral-800">500+ Online</p>
                                <p className="text-[10px] text-neutral-500">Learning now</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* DECORATION: Floating Icons */}
                <FloatingIcon Icon={Briefcase} color="text-purple-500 bg-purple-50" x="left-1/3" y="top-10" delay={0.2} />
                <FloatingIcon Icon={Globe} color="text-cyan-500 bg-cyan-50" x="right-1/4" y="bottom-32" delay={0.5} />
                <FloatingIcon Icon={Target} color="text-red-500 bg-red-50" x="left-0" y="top-1/2" delay={0.8} />

            </motion.div>
        </div>
    )
}

function FloatingIcon({ Icon, color, x, y, delay }: any) {
    return (
        <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
            className={`absolute ${x} ${y} p-2.5 rounded-xl shadow-lg ${color} z-10`}
            style={{ transform: "translateZ(20px)" }}
        >
            <Icon className="w-5 h-5" />
        </motion.div>
    )
}
