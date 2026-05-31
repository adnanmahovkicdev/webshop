import Link from "next/link"
import { siteConfig } from "@/config/site"

export default function Footer() {
    return (
        <footer className="border-t mt-auto">
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

                    {/* Brand */}
                    <div className="space-y-2">
                        <h3 className="font-semibold">{siteConfig.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {siteConfig.description}
                        </p>
                    </div>

                    {/* Linkovi */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">Navigacija</h3>
                        <ul className="space-y-1">
                            {[
                                { href: "/products", label: "Proizvodi" },
                                { href: "/about",    label: "O nama" },
                                { href: "/contact",  label: "Kontakt" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kontakt */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">Kontakt</h3>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>{siteConfig.email}</li>
                            <li>{siteConfig.phone}</li>
                            <li>{siteConfig.address.city}, {siteConfig.address.country}</li>
                        </ul>
                    </div>

                </div>

                <div className="border-t mt-8 pt-6 text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} {siteConfig.name}. Sva prava zadržana.
                </div>
            </div>
        </footer>
    )
}