'use client'

import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'

import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'

import useRegisterModal from "@/app/hooks/useRegisterModal"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../input/Input"

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'react-hot-toast'

const schema = z.object({
    email: z.string().nonempty('Email is required').email('Email is not valid'),
    name: z.string().nonempty('This field is required'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters long')
        .max(30, 'Password cannot exceed 30 characters')
        .regex(/^(?=.*[0-9a-zA-Z])(?=.*[@#$%^&+=*!]).*$/, 'Password must contain at least one number, one alphabet character, and one special character')
    // z.string().nonempty('This field is required').min(6, { message: "Password must be atleast 6 characters" }),
})

export default function RegisterModal() {
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
        resolver: zodResolver(schema),
        mode: "onTouched"
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose()
            })
            .catch((error) => {
                toast.error('Something went wrong')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to Airbnb"
                subtitle="Create an account!"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
    )
}
