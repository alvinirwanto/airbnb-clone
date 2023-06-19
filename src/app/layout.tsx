import RegisterModal from './components/modal/RegisterModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
    title: 'Air bnb',
    description: 'Airbnb clone next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={nunito.className}>
                <ToasterProvider />
                <Navbar />
                <RegisterModal />
                {children}
            </body>
        </html>
    )
}
