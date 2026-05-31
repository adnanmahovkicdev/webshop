import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

type Props = {
    id:           string
    name:         string
    slug:         string
    price:        string
    comparePrice: string | null
    stock:        number
    imageUrl:     string | null
    imageAlt:     string | null
    isFeatured:   boolean
    category?:    { name: string } | null
}

export default function ProductCard({
                                        name, slug, price, comparePrice,
                                        stock, imageUrl, imageAlt, isFeatured, category
                                    }: Props) {
    const isOutOfStock = stock === 0
    const hasDiscount  = comparePrice && parseFloat(comparePrice) > parseFloat(price)
    const discount     = hasDiscount
        ? Math.round((1 - parseFloat(price) / parseFloat(comparePrice!)) * 100)
        : null

    return (
        <Link href={`/products/${slug}`} className="group block">
            <div className="rounded-xl overflow-hidden border bg-card transition-shadow hover:shadow-md">

                {/* Slika */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={imageAlt || name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                            Nema slike
                        </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {discount && (
                            <Badge className="bg-red-500 hover:bg-red-500 text-white text-xs">
                                -{discount}%
                            </Badge>
                        )}
                        {isFeatured && (
                            <Badge className="bg-amber-500 hover:bg-amber-500 text-white text-xs">
                                Istaknuto
                            </Badge>
                        )}
                        {isOutOfStock && (
                            <Badge variant="secondary" className="text-xs">
                                Rasprodano
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Info */}
                <div className="p-3">
                    {category && (
                        <p className="text-xs text-muted-foreground mb-1">{category.name}</p>
                    )}
                    <h3 className="font-medium text-sm leading-tight line-clamp-2 mb-2">
                        {name}
                    </h3>
                    <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">
              {formatCurrency(parseFloat(price))}
            </span>
                        {hasDiscount && (
                            <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(parseFloat(comparePrice!))}
              </span>
                        )}
                    </div>
                </div>

            </div>
        </Link>
    )
}