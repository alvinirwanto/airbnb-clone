'use client'

import { useState } from "react"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { BiDollar } from "react-icons/bi"
import { RiInformationLine } from 'react-icons/ri'
import {HiOutlineEye, HiOutlineEyeSlash} from 'react-icons/hi2'


type InputProps = {
    id: string
    label: string
    type?: string
    disabled?: boolean
    formatPrice?: boolean
    required?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors<FieldValues>
}

export default function Input({
    id,
    label,
    type = 'text',
    disabled,
    formatPrice,
    required,
    register,
    errors
}: InputProps) {

    const errorMessage = errors[id]?.message?.toString()

    const [inputType, setInputType] = useState(type);

    const togglePasswordVisibility = () => {
        setInputType(prevType => prevType === 'password' ? 'text' : 'password');
    };

    return (
        <div className="w-full relative">
            {
                formatPrice && (
                    <BiDollar
                        size={24}
                        className="text-neutral-700 absolute top-5 left-2"
                    />
                )
            }
            <input
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=" "
                type={inputType}
                className={`peer w-full px-2 pt-5 pb-1 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
                ${formatPrice ? 'pl-9' : 'pl-[.9rem]'}
                ${errors[id] ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-300 focus:border-black'}
                focus:pt-5 [&:not(:placeholder-shown)]:pt-5
                font-semibold
                `
                }
            />
            <label className={`absolute text-md duration-150 transform -translate-y-1 top-3.5 z-10 origin-[0]
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-[&:not(:placeholder-shown)]:scale-75 
            peer-focus:scale-75
            peer-focus:-translate-y-3
            peer-[&:not(:placeholder-shown)]:-translate-y-3
            ${formatPrice ? 'left-9' : 'left-4'}
            ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
            `}>
                {label}
            </label>

            {/* {
                type === 'password' && (
                    <RiEyeLine size={25} className="absolute top-3 right-4" />
                )
            } */}
            {type === 'password' && (
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-3 right-4 text-zinc-400 rounded-full p-1 hover:bg-neutral-100"
                >
                    {inputType === 'password' ?
                        <HiOutlineEye size={23} />
                        : <HiOutlineEyeSlash size={23} />
                    }
                </button>
            )}

            {
                errorMessage && (
                    <div className='mt-1 text-rose-500 flex justify-start items-center gap-1'>
                        <RiInformationLine className={`text-sm ${errors[id] ? 'block' : 'hidden'} `} />
                        <p className='text-xs'>{errorMessage}</p>
                    </div>
                )
            }
        </div>
    )

}
