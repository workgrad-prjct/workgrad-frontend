import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Header, Footer } from './index'

interface PublicLayoutProps {
    children: ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
    const location = useLocation()
    const isHome = location.pathname === '/'

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className={`flex-grow ${isHome ? '' : 'pt-16 lg:pt-20'}`}>
                {children}
            </main>
            <Footer />
        </div>
    )
}
