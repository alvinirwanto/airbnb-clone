'use client'

type ContainerProps = {
    children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
    return (
        <div className="max-w-[2520px] mx-auto px-4 sm:px-2 md:px-8 xl:px-20">
            {children}
        </div>
    )
}
