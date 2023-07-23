'use client'

type MenuItemProps = {
    onClick: () => void;
    label: string;
}

import React from 'react'

export default function MenuItem({ onClick, label }: MenuItemProps) {
    return (
        <div
            onClick={onClick}
            className='w-full text-start px-4 py-3 hover:bg-neutral-100 transition font-semibold'
        >
            {label}
        </div>
    )
}
