'use client'

import React, { useState, useRef, useEffect } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'

type UserMenuProps = {
    currentUser?: SafeUser | null
}

export default function UserMenu({ currentUser }: UserMenuProps) {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const btnMenuRef = useRef<HTMLDivElement | any>(null)

    useEffect(() => {
        const handleClick = (e: any) => {
            if (btnMenuRef.current && !btnMenuRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }

        document.body.addEventListener('click', handleClick)

        return () => document.body.removeEventListener('click', handleClick)
    }, [])


    return (
        <div className='relative justify-self-end'>
            <div className='flex flex-row items-center gap-3'>
                <div
                    onClick={() => { }}
                    className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
                >
                    Airbnb your home
                </div>

                <div
                    ref={btnMenuRef}
                    onClick={() =>
                        setIsOpen(!isOpen)
                    }
                    className='p-4 md:py-1 md-px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                    {
                        isOpen ?
                            <AiOutlineClose />
                            : <AiOutlineMenu />
                    }
                    <div className='hidden md:block'>
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>

            {
                isOpen && (
                    <div ref={btnMenuRef} className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-16 md:top-12 text-sm'>
                        <div className='flex flex-col cursor-pointer'>
                            {
                                currentUser ? (
                                    <>
                                        <MenuItem
                                            onClick={() => { }}
                                            label='My Trips'
                                        />
                                        <MenuItem
                                            onClick={() => { }}
                                            label='My Favorites'
                                        />
                                        <MenuItem
                                            onClick={() => { }}
                                            label='My Reservations'
                                        />
                                        <MenuItem
                                            onClick={() => { }}
                                            label='My Properties'
                                        />
                                        <MenuItem
                                            onClick={() => { }}
                                            label='Airbnb My Home'
                                        />
                                        <MenuItem
                                            onClick={() => signOut()}
                                            label='Log Out'
                                        />
                                    </>

                                ) : (
                                    <>
                                        <MenuItem
                                            onClick={loginModal.onOpen}
                                            label='Login'
                                        />

                                        <MenuItem
                                            onClick={registerModal.onOpen}
                                            label='Sign Up'
                                        />
                                    </>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div >
    )
}