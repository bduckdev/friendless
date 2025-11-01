import Link from "next/link";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";
import { SwipeGallery } from "~/components/friends/swipe-gallery";
import { Button } from "~/components/ui/button";

export default async function Home() {
    const session = await auth();

    // If authenticated, show swipe gallery
    if (session?.user) {
        const friends = await api.friend.getAll();

        return (
            <main className="container mx-auto px-4 py-8 ">
                <div className="sm:block sm:mb-8 text-center pb-4">
                    <h1 className="select-none text-4xl font-bold">Welcome to friendless</h1>
                    <p className="select-none text-muted-foreground mt-2">
                        Swipe through your AI companions
                    </p>
                </div>
                <SwipeGallery friends={friends} />
            </main>
        );
    }

    // Landing page for non-authenticated users
    return (
        <main className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-5xl font-bold">Welcome to friendless</h1>
                <p className="text-muted-foreground mt-6 text-lg">
                    Create AI companions with unique personalities and chat with them.
                    Build meaningful connections with friends who understand you.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button asChild size="lg">
                        <Link href="/friends">Get Started</Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
