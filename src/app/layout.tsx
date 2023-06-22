import RegisterModal from './components/modal/RegisterModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modal/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import { useSession } from 'next-auth/react'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
    title: 'Air bnb',
    description: 'Airbnb clone next app',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const currentUser = await getCurrentUser()

    return (
        <html lang="en">
            <body className={nunito.className}>
                <ToasterProvider />
                <Navbar currentUser={currentUser} />
                <LoginModal />
                <RegisterModal />
                {children}
            </body>
        </html>
    )
}
