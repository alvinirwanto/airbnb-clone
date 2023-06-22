'use client'

import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import { SafeUser } from '@/app/types'
import Categories from './Categories'

type NavbarProps = {
    currentUser?: SafeUser | null
}

export default function Navbar({ currentUser }: NavbarProps) {

    return (
        <div className='fixed w-full bg-white z-10 shadow-sm'>
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className='flex justify-between items-center gap-3 md:gap-0'>
                        <div className='xl:w-[20vw]'>
                            <Logo />
                        </div>
                        <Search />
                        <div className='xl:w-[20vw] xl:flex justify-end'>
                            <UserMenu currentUser={currentUser} />
                        </div>
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    )
}
