import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getAdminProducts } from "@/lib/actions/products"
import { formatCurrency } from "@/lib/utils"
import { Plus } from "lucide-react"

export default async function AdminProductsPage() {
    const products = await getAdminProducts()

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold">Proizvodi</h1>
                <Link href="/admin/products/new">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Novi proizvod
                    </Button>
                </Link>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-24 text-muted-foreground">
                    <p>Nema proizvoda još.</p>
                    <Link href="/admin/products/new" className="text-primary hover:underline text-sm mt-2 inline-block">
                        Dodaj prvi proizvod
                    </Link>
                </div>
            ) : (
                <div className="rounded-xl border overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 border-b">
                        <tr>
                            <th className="text-left p-4 font-medium">Proizvod</th>
                            <th className="text-left p-4 font-medium">Cijena</th>
                            <th className="text-left p-4 font-medium">Stanje</th>
                            <th className="text-left p-4 font-medium">Status</th>
                            <th className="p-4"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                            {product.imageUrl ? (
                                                <Image
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-muted" />
                                            )}
                                        </div>
                                        <span className="font-medium">{product.name}</span>
                                    </div>
                                </td>
                                <td className="p-4">{formatCurrency(parseFloat(product.price))}</td>
                                <td className="p-4">{product.stock} kom</td>
                                <td className="p-4">
                                    <Badge variant={product.isActive ? "default" : "secondary"}>
                                        {product.isActive ? "Aktivan" : "Neaktivan"}
                                    </Badge>
                                </td>
                                <td className="p-4 text-right">
                                    <Link href={`/admin/products/${product.id}/edit`}>
                                        <Button variant="ghost" size="sm">Uredi</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}