"use client";
import { useSession } from "next-auth/react";
import { Spinner } from "./ui/spinner";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const { status } = useSession();

    if (status === "loading") {
        return (
            <main className="flex flex-col items-center gap-6 mt-60  w-screen h-screen">
                <p className="text-3xl font-semibold">friendless</p>
                <Spinner className="size-12" />
            </main>
        )
    }


    return <>{children}</>;
}
