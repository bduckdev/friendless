"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mars, NonBinary, RefreshCw, Venus } from "lucide-react"
import Image from "next/image"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { Button } from "~/components/ui/button"
import { ButtonGroup } from "~/components/ui/button-group"
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { MultiSelect } from "../../../../../components/ui/multi-select"
import { getRandomTraits, TRAIT_CATEGORIES } from "~/lib/trait-categories"
import { faker } from "@faker-js/faker"
import { getRandomInterests, INTEREST_CATEGORIES } from "~/lib/interest-categories"
import { Slider } from "~/components/ui/slider"
import { VOICE_OPTIONS, getRandomVoiceOption } from "~/lib/default-voice-options"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Textarea } from "~/components/ui/textarea"
import { handleCreateFriend } from "~/app/(client)/friends/actions"
import { toast } from "sonner"
import { redirect } from "next/navigation"

const NUM_AVATARS = 20

export const DEFAULT_PERSONALITY_PLACEHOLDER =
    "Warm, curious, and a little mischievous—asks thoughtful questions, keeps things grounded and kind, and mixes calm reflection with quick flashes of humor.";
export const DEFAULT_BACKGROUND_PLACEHOLDER =
    "Grew up bouncing between books and late-night conversations, studied a bit of science and art, and chose people over prestige. Keeps a beat-up notebook of half-ideas, believes small daily rituals change lives, and is always collecting stories worth telling twice.";

export default function CreateFriendForm() {
    const getRandomAvatar = () => Math.floor(Math.random() * NUM_AVATARS + 1)
    const formSchema = z.object({
        name: z.string().min(2).max(30).regex(/^[A-Za-z]+$/),
        age: z.coerce.number().min(22).max(40),
        gender: z.enum(["male", "female", "non_binary"]),
        avatar: z.number().min(1).max(NUM_AVATARS),
        traits: z.array(z.string()).min(1).max(5),
        interests: z.array(z.string()).min(1).max(5),
        voice: z.enum(VOICE_OPTIONS),
        background: z.string().min(5).max(5000),
        personality: z.string().min(5).max(5000),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: faker.person.firstName("female"),
            age: 26,
            gender: "female",
            avatar: getRandomAvatar(),
            traits: getRandomTraits(3),
            interests: getRandomInterests(3),
            voice: getRandomVoiceOption(),
            personality: DEFAULT_PERSONALITY_PLACEHOLDER,
            background: DEFAULT_BACKGROUND_PLACEHOLDER,
        }
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            const avatar = `/avatars/${data.gender}/${data.avatar}.png`
            const newFriend = await handleCreateFriend({ ...data, avatar })
            toast.success(`successfully created new friend: ${newFriend.name}`)
            redirect(`/chat/${newFriend.id}`)
        } catch (e) {
            toast.error("Error in creating new friend: ", e!)
            throw new Error("Error in create-friend-form onSubmit", e!);
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-4">
                <Controller
                    name="avatar"
                    control={form.control}
                    render={({ field }) => (
                        <Image priority draggable={false} className="select-none rounded-xl object-cover" width={500} height={500} alt="Your new friend's avatar." src={`/avatars/${form.getValues("gender")}/${field.value}.png`} />
                    )} />
                <ButtonGroup className="">
                    <Controller
                        name="avatar"
                        control={form.control}
                        render={({ field }) => (
                            <ButtonGroup className="flex justify-center">
                                <Button
                                    type="button"
                                    aria-label="refresh image"
                                    onClick={() => field.onChange(getRandomAvatar())}
                                    variant={"outline"}>
                                    <RefreshCw />
                                    <span>Refresh Image</span>
                                </Button>
                            </ButtonGroup>
                        )} />
                </ButtonGroup>
            </div>
            <FieldSeparator />
            <FieldGroup className="flex-row justify-between items-center">
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field className="" data-invald={fieldState.invalid}>
                            <FieldContent>
                                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                <FieldDescription>{"Your new friend's name."}</FieldDescription>
                                <ButtonGroup className="w-full">
                                    <Input
                                        {...field}
                                        autoComplete="off"
                                        placeholder=""
                                        id="name"
                                        aria-invalid={fieldState.invalid}
                                        type="text"
                                    />
                                    <Button
                                        type="button"
                                        size="icon"
                                        aria-label="refresh name"
                                        onClick={() => field.onChange(faker.person.firstName((form.getValues("gender") !== "non_binary") ? form.getValues("gender") as "male" | "female" : undefined))}
                                        variant={"outline"}>
                                        <RefreshCw />
                                    </Button>
                                </ButtonGroup>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </FieldContent>
                        </Field>
                    )}
                />
                <Controller
                    name="gender"
                    control={form.control}
                    render={({ field }) => (
                        <Field className="w-[25%]">
                            <FieldContent>
                                <FieldLabel htmlFor={field.name}>Gender</FieldLabel>
                                <FieldDescription>{"Your new friend's gender identity."}</FieldDescription>
                                <ButtonGroup role="radiogroup" className="">
                                    <Button
                                        type="button"
                                        onClick={() => field.onChange("female")}
                                        variant={field.value == "female" ? "default" : "outline"}
                                        aria-pressed={field.value === "female"}>
                                        <Venus />
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => field.onChange("male")}
                                        variant={field.value == "male" ? "default" : "outline"}
                                        aria-pressed={field.value === "male"}>
                                        <Mars />
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => field.onChange("non_binary")}
                                        variant={field.value == "non_binary" ? "default" : "outline"}
                                        aria-pressed={field.value === "non_binary"}>
                                        <NonBinary />
                                    </Button>
                                </ButtonGroup>
                            </FieldContent>
                        </Field>
                    )} />
            </FieldGroup>
            <FieldSeparator />
            <Controller
                name="age"
                control={form.control}
                render={({ field }) => (
                    <Field >
                        <FieldContent className="flex flex-col justify-between">
                            <FieldLabel className="self-start flex justify-between items-center" htmlFor={field.name}>
                                <span className="">Age</span>
                            </FieldLabel>
                            <FieldDescription>{"Your new friend's age"}</FieldDescription>
                            <div className="flex item-center justify-evenly my-5">
                                <Slider
                                    {...field}
                                    defaultValue={[field.value as number]}
                                    value={[field.value as number]}
                                    onValueChange={(v) => field.onChange(v[0] ?? 26)}
                                    className="w-[60%] "
                                    max={40}
                                    min={22}
                                    step={1}
                                    id="age"
                                />
                                <span className="font-semibold tracking-tighter text-xl">{field.value as number}</span>
                            </div>
                        </FieldContent>
                    </Field>
                )}
            />
            <FieldSeparator />
            <FieldGroup className="">
                <Controller
                    name="traits"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invald={fieldState.invalid}>
                            <FieldContent className="">
                                <FieldLabel htmlFor={field.name}>Traits</FieldLabel>
                                <FieldDescription>{"Your friend's traits."}</FieldDescription>
                            </FieldContent>
                            <MultiSelect
                                {...field}
                                label="traits"
                                options={TRAIT_CATEGORIES}
                                placeholder="Select traits..."
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>
            <FieldSeparator />
            <FieldGroup>
                <Controller
                    name="interests"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invald={fieldState.invalid}>
                            <FieldContent className="">
                                <FieldLabel htmlFor={field.name}>Interests</FieldLabel>
                                <FieldDescription>{"Your friend's interests."}</FieldDescription>
                            </FieldContent>
                            <MultiSelect
                                {...field}
                                label="interests"
                                options={INTEREST_CATEGORIES}
                                placeholder="Select interests..."
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>
            <FieldSeparator />
            <FieldGroup>
                <Controller
                    name="voice"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                        >
                            <FieldContent>
                                <FieldLabel htmlFor="voice">
                                    Voice
                                </FieldLabel>
                                <FieldDescription>
                                    {"Choose how you'd like your friend to speak."}
                                </FieldDescription>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </FieldContent>
                            <Select
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger
                                    id="voice"
                                    aria-invalid={fieldState.invalid}
                                    className="min-w-[120px] capitalize"
                                >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="item-aligned">
                                    {VOICE_OPTIONS.map((voice) => (
                                        <SelectItem className="capitalize" key={voice} value={voice}>
                                            {voice}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                />
            </FieldGroup>
            <FieldSeparator />
            <Controller
                name="personality"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invald={fieldState.invalid}>
                        <FieldContent>
                            <FieldLabel htmlFor="personality">
                                Personality
                            </FieldLabel>
                            <FieldDescription>
                                {"Describe your new friend's personality."}
                            </FieldDescription>
                            <Textarea
                                {...field}
                                placeholder={DEFAULT_PERSONALITY_PLACEHOLDER}
                                id="personality"
                                aria-invalid={fieldState.invalid}
                                onChange={(e) => {
                                    field.onChange(e);
                                }}
                                className="max-h-20 resize-none transition-all"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </FieldContent>
                    </Field>
                )}
            />
            <FieldSeparator />
            <Controller
                name="background"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invald={fieldState.invalid}>
                        <FieldContent>
                            <FieldLabel htmlFor="background">
                                Background
                            </FieldLabel>
                            <FieldDescription>
                                {"Describe your new friend's background."}
                            </FieldDescription>
                            <Textarea
                                {...field}
                                placeholder={DEFAULT_BACKGROUND_PLACEHOLDER}
                                id="background"
                                aria-invalid={fieldState.invalid}
                                onChange={(e) => {
                                    field.onChange(e);
                                }}
                                className="max-h-20 resize-none transition-all"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </FieldContent>
                    </Field>
                )}
            />
            <Button type="submit">
                Create Friend
            </Button>
        </form >
    )
}


