import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
    title: "User",
    description: "Generated by create next app",
};

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <SidebarProvider>
                <div className="h-full">
                    {children}
                </div>
            </SidebarProvider>
            <SanityLive />
        </ClerkProvider>
    );
}
