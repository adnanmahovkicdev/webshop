"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { uploadImage } from "@/lib/actions/upload"
import { getAdminProducts, updateProduct } from "@/lib/actions/products"

export default function EditProductPage() {
    const router = useRouter()
    const params = useParams()
    const id     = params.id as string

    const [loading, setLoading]   = useState(false)
    const [saving, setSaving]     = useState(false)
    const [preview, setPreview]   = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [error, setError]       = useState("")
    const [product, setProduct]   = useState<any>(null)

    useEffect(() => {
        getAdminProducts().then((products) => {
            const found = products.find((p) => p.id === id)
            if (found) {
                setProduct(found)
                if (found.imageUrl) {
                    setImageUrl(found.imageUrl)
                    setPreview(found.imageUrl)
                }
            }
        })
    }, [id])

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return
        setPreview(URL.createObjectURL(file))
        const fd = new FormData()
        fd.append("file", file)
        const result = await uploadImage(fd)
        if (result.error) { setError(result.error); return }
        setImageUrl(result.url!)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSaving(true)
        setError("")
        const fd = new FormData(e.currentTarget)
        fd.set("imageUrl", imageUrl)
        fd.set("id", id)
        const result = await updateProduct(fd)
        if (result.success) {
            router.push("/admin/products")
        } else {
            setError("Greška pri čuvanju")
            setSaving(false)
        }
    }

    if (!product) return (
        <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-4 max-w-2xl">
                <div className="h-8 bg-muted rounded w-48" />
                <div className="h-48 bg-muted rounded" />
                <div className="h-10 bg-muted rounded" />
                <div className="h-10 bg-muted rounded" />
            </div>
        </div>
    )

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-2xl font-semibold mb-8">Uredi proizvod</h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="space-y-2">
                    <Label>Slika proizvoda</Label>
                    <div className="border-2 border-dashed rounded-xl p-4 text-center">
                        {preview ? (
                            <div className="relative aspect-square w-48 mx-auto rounded-lg overflow-hidden">
                                <Image src={preview} alt="Preview" fill className="object-cover" />
                            </div>
                        ) : (
                            <p className="text-muted-foreground text-sm py-8">Klikni da dodaš sliku</p>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="mt-3 text-sm w-full cursor-pointer"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="name">Naziv *</Label>
                    <Input id="name" name="name" required defaultValue={product.name} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Opis</Label>
                    <Textarea id="description" name="description" rows={4} defaultValue={product.description ?? ""} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="price">Cijena (KM) *</Label>
                        <Input id="price" name="price" type="number" step="0.01" min="0" required defaultValue={product.price} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="comparePrice">Stara cijena (KM)</Label>
                        <Input id="comparePrice" name="comparePrice" type="number" step="0.01" min="0" defaultValue={product.comparePrice ?? ""} />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="stock">Količina na stanju</Label>
                    <Input id="stock" name="stock" type="number" min="0" defaultValue={product.stock} />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <div className="flex gap-3">
                    <Button type="submit" disabled={saving} className="flex-1">
                        {saving ? "Čuvanje..." : "Sačuvaj izmjene"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
                        Odustani
                    </Button>
                </div>

            </form>
        </div>
    )
}
