"use client"

import Link from "next/link"
import { useAuth, UserButton, SignInButton } from "@clerk/nextjs"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export default function Navbar() {
    const { isSignedIn } = useAuth()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                <Link href="/" className="text-xl font-bold tracking-tight">
                    {siteConfig.name}
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Proizvodi
                    </Link>
                    <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        O nama
                    </Link>
                    <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Kontakt
                    </Link>
                </nav>

                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon">
                        <ShoppingCart className="h-5 w-5" />
                    </Button>

                    {isSignedIn ? (
                        <UserButton />
                    ) : (
                        <SignInButton mode="modal">
                            <Button variant="outline" size="sm">
                                Prijava
                            </Button>
                        </SignInButton>
                    )}
                </div>

            </div>
        </header>
    )
}