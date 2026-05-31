import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu } from "lucide-react"

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                {/* Logo */}
                <Link href="/" className="text-xl font-bold">
                    {siteConfig.name}
                </Link>

                {/* Navigacija */}
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

                {/* Desna strana */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <ShoppingCart className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

            </div>
        </header>
    )
}