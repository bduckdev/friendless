import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { TRPCReactProvider } from "~/trpc/react";
import { Header } from "~/components/header";
import AppShell from "~/components/app-shell";

export const metadata: Metadata = {
    title: "Friendless",
    description:
        "AI companion app to cure your loneliness and fix all your problems.",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};


const geist = Geist({
    subsets: ["latin"],
    variable: "--font-geist-sans",
});

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${geist.variable}`}>
            <body>
                <SessionProvider>
                    <AppShell>
                        <TRPCReactProvider>
                            <Header />
                            {children}
                        </TRPCReactProvider>
                    </AppShell>
                </SessionProvider>
            </body>
        </html>
    );
}
