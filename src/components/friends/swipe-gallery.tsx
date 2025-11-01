"use client"
import type { Friend } from "~/types"
import { FriendCard } from "./friend-card"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

type SwipeGalleryProps = {
    friends: Friend[]
}

export function SwipeGallery({ friends }: SwipeGalleryProps) {
    const [cards, setCards] = useState<Friend[]>(friends);
    const router = useRouter()


    function handleLeftSwipe(id: string) {
        setCards((prev) => prev.filter((f) => f.id !== id))
    }

    function handleRightSwipe(id: string) {
        router.push(`/chat/${id}`)
    }

    if (cards.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <h2 className="mb-2 text-2xl font-bold">
                    {"You've seen all your friends!"}
                </h2>
                <p className="text-muted-foreground mb-6">
                    Start over or create a new friend.
                </p>
                <div className="flex gap-4">
                    <Button onClick={() => setCards(friends)} variant="outline">
                        Start Over
                    </Button>
                    <Button asChild>
                        <Link href="/friends/create">
                            <Plus className="size-4" />
                            Create New Friend
                        </Link>
                    </Button>
                </div>
            </div>

        )
    }

    return (
        <div className="h-full grid grid-cols-1 place-items-center">
            {cards.map((friend, i) => (
                <SwipeCard i={i} isFront={i === cards.length - 1} handleLeftSwipe={handleLeftSwipe} handleRightSwipe={handleRightSwipe} key={friend.id} friend={friend} />
            ))}
        </div>
    )
}

type SwipeCardProps = {
    friend: Friend
    i: number
    isFront: boolean
    handleLeftSwipe: (id: string) => void
    handleRightSwipe: (id: string) => void
}

function SwipeCard({ friend, i, isFront, handleLeftSwipe, handleRightSwipe, }: SwipeCardProps) {
    const x = useMotionValue(0)
    const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0])
    const rotateRaw = useTransform(x, [-150, 150], [-18, 18])

    const rotate = useTransform(() => {
        const offset = isFront ? 0 : i % 2 ? 6 : -6

        return `${rotateRaw.get() + offset}deg`
    })

    function handleDragEnd() {
        if (x.get() > 50) {
            handleRightSwipe(friend.id)
        } else if (x.get() < -50) {
            handleLeftSwipe(friend.id)
        }
    }
    return (
        <motion.div
            className="hover:cursor-grab active:cursor-grabbing w-72 origin-bottom select-none"
            style={{
                gridRow: 1,
                gridColumn: 1,
                x,
                opacity,
                rotate,
                boxShadow: isFront
                    ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
                    : undefined,
                transition: "0.125s transform",
            }}
            animate={{
                scale: isFront ? 1 : 0.98,
            }}
            drag={isFront ? "x" : false}
            dragConstraints={{
                left: 0,
                right: 0,
            }}
            onDragEnd={handleDragEnd}
        >
            <FriendCard friend={friend} />
        </motion.div>
    )
}

