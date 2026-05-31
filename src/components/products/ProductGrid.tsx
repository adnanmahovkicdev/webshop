import ProductCard from "./ProductCard"
import { getProducts } from "@/lib/actions/products"

export default async function ProductGrid() {
    const products = await getProducts()

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-muted-foreground text-lg">Nema proizvoda</p>
                <p className="text-muted-foreground text-sm mt-1">Dodaj prve proizvode u admin panelu</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    price={product.price}
                    comparePrice={product.comparePrice}
                    stock={product.stock}
                    imageUrl={product.imageUrl ?? null}
                    imageAlt={product.imageAlt ?? null}
                    isFeatured={product.isFeatured}
                    category={product.category}
                />
            ))}
        </div>
    )
}