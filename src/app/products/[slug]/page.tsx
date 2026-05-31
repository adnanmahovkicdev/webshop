import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getProductBySlug } from "@/lib/actions/products"
import { formatCurrency } from "@/lib/utils"
import { ShoppingCart } from "lucide-react"

export default async function ProductDetailPage({
                                                    params,
                                                }: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) notFound()

    const hasDiscount = product.comparePrice &&
        parseFloat(product.comparePrice) > parseFloat(product.price)

    const discount = hasDiscount
        ? Math.round((1 - parseFloat(product.price) / parseFloat(product.comparePrice!)) * 100)
        : null

    const mainImage = product.images?.[0]

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">

                {/* Slika */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                    {mainImage ? (
                        <Image
                            src={mainImage.url}
                            alt={mainImage.altText || product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="eager"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            Nema slike
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="flex flex-col gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">{product.name}</h1>
                    </div>

                    {/* Cijena */}
                    <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">
              {formatCurrency(parseFloat(product.price))}
            </span>
                        {hasDiscount && (
                            <>
                <span className="text-muted-foreground line-through text-lg">
                  {formatCurrency(parseFloat(product.comparePrice!))}
                </span>
                                <Badge className="bg-red-500 hover:bg-red-500 text-white">
                                    -{discount}%
                                </Badge>
                            </>
                        )}
                    </div>

                    {/* Stanje */}
                    <p className="text-sm text-muted-foreground">
                        {product.stock > 0
                            ? `${product.stock} kom na stanju`
                            : "Rasprodano"}
                    </p>

                    {/* Opis */}
                    {product.description && (
                        <p className="text-muted-foreground leading-relaxed text-sm">
                            {product.description}
                        </p>
                    )}

                    {/* Dugme */}
                    <Button
                        size="lg"
                        className="mt-2"
                        disabled={product.stock === 0}
                    >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        {product.stock === 0 ? "Rasprodano" : "Dodaj u košaricu"}
                    </Button>
                </div>

            </div>
        </div>
    )
}