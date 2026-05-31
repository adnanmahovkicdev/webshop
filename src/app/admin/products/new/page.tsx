"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { createProduct } from "@/lib/actions/products"
import { uploadImage } from "@/lib/actions/upload"

export default function NewProductPage() {
    const router  = useRouter()
    const [loading, setLoading]     = useState(false)
    const [imageUrl, setImageUrl]   = useState("")
    const [preview, setPreview]     = useState("")
    const [error, setError]         = useState("")

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        // Lokalni preview odmah
        setPreview(URL.createObjectURL(file))

        const fd = new FormData()
        fd.append("file", file)
        const result = await uploadImage(fd)

        if (result.error) {
            setError(result.error)
            return
        }
        setImageUrl(result.url!)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError("")

        const fd = new FormData(e.currentTarget)
        fd.set("imageUrl", imageUrl)

        const result = await createProduct(fd)

        if (result.success) {
            router.push("/admin/products")
        } else {
            setError("Greška pri kreiranju proizvoda")
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-2xl font-semibold mb-8">Novi proizvod</h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Slika */}
                <div className="space-y-2">
                    <Label>Slika proizvoda</Label>
                    <div className="border-2 border-dashed rounded-xl p-4 text-center">
                        {preview ? (
                            <div className="relative aspect-square w-48 mx-auto rounded-lg overflow-hidden">
                                <Image src={preview} alt="Preview" fill className="object-cover" />
                            </div>
                        ) : (
                            <p className="text-muted-foreground text-sm py-8">
                                Klikni da dodaš sliku
                            </p>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="mt-3 text-sm w-full cursor-pointer"
                        />
                    </div>
                </div>

                {/* Naziv */}
                <div className="space-y-2">
                    <Label htmlFor="name">Naziv *</Label>
                    <Input id="name" name="name" required placeholder="npr. Zimska jakna" />
                </div>

                {/* Opis */}
                <div className="space-y-2">
                    <Label htmlFor="description">Opis</Label>
                    <Textarea
                        id="description"
                        name="description"
                        rows={4}
                        placeholder="Detaljan opis proizvoda..."
                    />
                </div>

                {/* Cijene */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="price">Cijena (KM) *</Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            placeholder="0.00"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="comparePrice">Stara cijena (KM)</Label>
                        <Input
                            id="comparePrice"
                            name="comparePrice"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                {/* Zalihe */}
                <div className="space-y-2">
                    <Label htmlFor="stock">Količina na stanju</Label>
                    <Input
                        id="stock"
                        name="stock"
                        type="number"
                        min="0"
                        defaultValue="0"
                        placeholder="0"
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}

                <div className="flex gap-3">
                    <Button type="submit" disabled={loading} className="flex-1">
                        {loading ? "Kreiranje..." : "Kreiraj proizvod"}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/admin/products")}
                    >
                        Odustani
                    </Button>
                </div>

            </form>
        </div>
    )
}