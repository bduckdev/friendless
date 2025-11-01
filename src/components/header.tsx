"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserDropdown } from "./header/user-dropdown";
import { MobileNav } from "./header/mobile-nav";

export function Header() {
    const { data: session, status } = useSession();
    if (status === "loading") {
        return
    }

    return (
        <header className=" bg-background top-0 z-50 border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Mobile Menu + Logo Section */}
                <div className="flex items-center gap-3">
                    <MobileNav session={session} />

                    <div className="text-xl font-semibold">
                        <Link href="/">friendless</Link>
                    </div>
                </div>

                <nav className="hidden flex-1 justify-center gap-6 md:flex">
                    {session?.user && (
                        <Link
                            href="/friends"
                            className="hover:text-primary text-sm font-medium transition-colors"
                        >
                            My Friends
                        </Link>
                    )}
                    <Link
                        href="/pricing"
                        className="hover:text-primary text-sm font-medium transition-colors"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/faq"
                        className="hover:text-primary text-sm font-medium transition-colors"
                    >
                        FAQ
                    </Link>
                </nav>
                <div className="flex flex-shrink-0 items-center gap-4">
                    <UserDropdown session={session!} status={status} />
                </div>
            </div>
        </header >
    );
}
