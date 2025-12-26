import { ReactNode } from 'react'
import { Header, Footer } from './index'

interface PublicLayoutProps {
    children: ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-16 lg:pt-20">
                {children}
            </main>
            <Footer />
        </div>
    )
}
