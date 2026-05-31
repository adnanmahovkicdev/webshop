import { Suspense } from "react"
import ProductGrid from "@/components/products/ProductGrid"

export const metadata = {
    title: "Proizvodi",
    description: "Pregledaj naš katalog proizvoda",
}

export default function ProductsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold">Proizvodi</h1>
                <p className="text-muted-foreground mt-1">Pronađi što ti treba</p>
            </div>
            <Suspense fallback={
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="rounded-xl border bg-muted animate-pulse aspect-[3/4]" />
                    ))}
                </div>
            }>
                <ProductGrid />
            </Suspense>
        </div>
    )
}