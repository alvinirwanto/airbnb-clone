'use client'

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";

import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImagesUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// import { z } from 'zod';
// import { zodResolver } from "@hookform/resolvers/zod";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

export default function RentModal() {

    const router = useRouter()
    const rentModal = useRentModal()

    const [step, setStep] = useState(STEPS.CATEGORY)
    const [isLoading, setIsLoading] = useState(false)

    // const schema = z.object({
    //     category: z.string().optional(),
    //     location: z.string().optional(),
    //     guestCount: z.string().optional(),
    //     roomCount: z.string().optional(),
    //     bathroomCount: z.string().optional(),
    //     imageSrc: z.string().optional(),
    //     title: z.string()
    //         .nonempty('The title is required')
    //         .min(8, 'Title must be at least 8 characters long'),
    //     description: z.string()
    //         .nonempty('Description is required')
    //         .min(8, 'Description must be at least 8 characters long')
    //         .max(250, 'Description cannot exceed 250 characters'),
    //     price: z.string()
    //         .nonempty('Price is required')
    // })

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            title: '',
            description: '',
            price: 1,
        },
        // resolver: zodResolver(schema)
    })

    // Because the input is map using another components, so it have to use watch to get the data
    const location = watch('location');
    const category = watch('category');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);

    // Because the setValue from the react-hook-form by default set the value but did not re-renders the page, so we have to modify it
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings', data)
            .then(() => {
                toast.success('Listing created!');
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY)
                rentModal.onClose();
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create'
        }

        return 'Next'
    }, [step]);


    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }

        return 'Back'
    }, [step]);


    // First step
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describe your place?"
                subtitle="Pick a Category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {
                    categories.map((item) => (
                        <div key={item.label}>
                            <CategoryInput onClick={(category) => { setCustomValue('category', category) }}
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find you!"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map center={location?.latlng} />
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your place"
                    subtitle="What amenities do you have?"
                />
                <Counter
                    title="Guests"
                    subtitle="How many guest do you allow?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo of your place"
                    subtitle="Show guests what your place look like!"
                />
                <ImagesUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Now, set your price"
                    subtitle="How much do you charge per night?"
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal
            disabled={isLoading}
            isOpen={rentModal.isOpen}
            title="Airbnb your home!"
            actionLabel={actionLabel}
            onSubmit={handleSubmit(onSubmit)}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            onClose={rentModal.onClose}
            body={bodyContent}
        />
    )
}
