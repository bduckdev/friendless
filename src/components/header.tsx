"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserDropdown } from "./header/user-dropdown";
import { MobileNav } from "./header/mobile-nav";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Mobile Menu + Logo Section */}
        <div className="flex items-center gap-3">
          <MobileNav session={session} />

          <div className="text-xl font-semibold">
            <Link href="/">friendless</Link>
          </div>
        </div>

        {/* Desktop Navigation - Hidden on Mobile */}
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

        {/* User Section */}
        <div className="flex flex-shrink-0 items-center gap-4">
          {status === "loading" ? (
            <Spinner className="h-6 w-6" />
          ) : session?.user ? (
            <UserDropdown session={session} />
          ) : (
            <Button variant="default" size="sm" asChild>
              <Link href="/api/auth/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
