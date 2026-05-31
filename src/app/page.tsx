import Link from "next/link"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import ProductGrid from "@/components/products/ProductGrid"
import { ArrowRight } from "lucide-react"
import { siteConfig } from "@/config/site"

export default function HomePage() {
    return (
        <div>

            {/* Hero */}
            <section className="border-b">
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
                        {siteConfig.name}
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
                        {siteConfig.description}
                    </p>
                    <div className="flex gap-3 justify-center">
                        <Link href="/products">
                            <Button size="lg">
                                Pregledaj proizvode
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Istaknuti proizvodi */}
            <section className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Novi proizvodi</h2>
                    <Link
                        href="/products"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                    >
                        Svi proizvodi
                        <ArrowRight className="h-3 w-3" />
                    </Link>
                </div>
                <Suspense fallback={
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="rounded-xl border bg-muted animate-pulse aspect-[3/4]" />
                        ))}
                    </div>
                }>
                    <ProductGrid limit={4} />
                </Suspense>
            </section>

            {/* Dostava info */}
            <section className="border-t">
                <div className="container mx-auto px-4 py-10">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                        <div className="space-y-1">
                            <p className="font-medium text-sm">Besplatna dostava</p>
                            <p className="text-xs text-muted-foreground">
                                Za narudžbe iznad {siteConfig.delivery.freeShippingThreshold} KM
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-medium text-sm">Plaćanje pri preuzimanju</p>
                            <p className="text-xs text-muted-foreground">Plati kad primeš paket</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-medium text-sm">Dostava {siteConfig.delivery.estimatedDays} dana</p>
                            <p className="text-xs text-muted-foreground">Brza i sigurna dostava</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}