'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Logo() {

    const router = useRouter()

    return (
        <Image
            className="hidden md:block cursor-pointer"
            alt="logo"
            width={100}
            height={100}
            src='/images/logo.png'
        />
    )
}
