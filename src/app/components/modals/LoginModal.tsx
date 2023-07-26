'use client'

import { signIn } from 'next-auth/react'

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
import Input from "../inputs/Input"

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'react-hot-toast'
import Button from "../Button"
import useLoginModal from "@/app/hooks/useLoginModal"
import { useRouter } from 'next/navigation'

const schema = z.object({
    email: z.string().nonempty('Email is required').email('Email is not valid'),
    password: z.string()
        .nonempty('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .max(30, 'Password cannot exceed 30 characters')
        .regex(/^(?=.*[0-9a-zA-Z])(?=.*[@#$%^&+=*!]).*$/, 'Password must contain at least one number, one alphabet character, and one special character'),
    // z.string().nonempty('This field is required').min(6, { message: "Password must be atleast 6 characters" }),
})

export default function LoginModal() {
    const router = useRouter()

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: zodResolver(schema),
        mode: "onTouched"
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        signIn('credentials', {
            ...data,
            redirect: false,
        })
            .then((callback) => {
                setIsLoading(false);

                if (callback?.error) {
                    toast.error(callback.error);
                    reset()
                } else {
                    toast.success('Logged in');
                    router.refresh();
                    loginModal.onClose();
                    reset()
                }
            })
    }

    const toggle = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome back!"
                subtitle="Login to your account!"
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

    const footerContent = (
        <div className="flex flex-col gap-4 mt-1">
            <div className="flex justify-center items-center gap-5">
                <hr className="w-full h-[1px]" />
                <span className="text-neutral-500 text-sm">or</span>
                <hr className="w-full h-[1px]" />
            </div>

            <div className="flex gap-4">
                <Button
                    outline
                    label="Continue with Google"
                    icon={FcGoogle}
                    onClick={() => signIn('google')}
                />

                <Button
                    outline
                    label="Continue with Github"
                    icon={AiFillGithub}
                    onClick={() => signIn('github')}
                />
            </div>

            <div className="justify-center flex text-neutral-500 text-center font-light">
                <div className="flex flex-row items-center gap-2">
                    <div>
                        First time using Airbnb?
                    </div>
                    <div
                        onClick={toggle}
                        className="text-rose-500 font-semibold cursor-pointer hover:underline"
                    >
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Log In'
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}
