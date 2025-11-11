"use client"
import { useRef } from "react"
import Autoplay from "embla-carousel-autoplay"
import { DEFAULT_FRIENDS_TEMPLATE } from "~/lib/default-friends-template"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "~/components/ui/carousel"
import { FriendCard } from "./friends/friend-card"

export function FriendCarousel() {
    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full "
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {DEFAULT_FRIENDS_TEMPLATE.map((f) => (
                    <CarouselItem className="basis-1/3" key={f.id + f.name}>
                        <FriendCard friend={f} isSmall />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}

