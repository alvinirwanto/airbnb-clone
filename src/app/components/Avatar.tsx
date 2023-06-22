'use client'

import Image from "next/image"

type AvatarProps = {
    src?: string | null | undefined
}

export default function Avatar({ src }: AvatarProps) {
    return (
        <Image
            className="rounded-full w-9 border-[1px] aspect-square"
            height={100}
            width={100}
            alt="avatar"
            src={src || '/images/placeholder.jpg'}
        />
    )
}
