"use server"

import { db } from "@/lib/db"
import { products, productImages, categories } from "@/lib/schema"
import { eq, desc, and } from "drizzle-orm"
import slugify from "slugify"
import { revalidatePath } from "next/cache"

// ─── Dohvati sve aktivne proizvode (za listing stranicu) ──────
export async function getProducts() {
    const result = await db
        .select({
            id:           products.id,
            name:         products.name,
            slug:         products.slug,
            price:        products.price,
            comparePrice: products.comparePrice,
            stock:        products.stock,
            isFeatured:   products.isFeatured,
            category: {
                id:   categories.id,
                name: categories.name,
            },
            // Prva slika proizvoda
            imageUrl: productImages.url,
            imageAlt: productImages.altText,
        })
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .leftJoin(productImages, and(
            eq(productImages.productId, products.id),
            eq(productImages.position, 0) // samo prva slika
        ))
        .where(eq(products.isActive, true))
        .orderBy(desc(products.createdAt))

    return result
}

// ─── Dohvati jedan proizvod po slug-u (za detail page) ────────
export async function getProductBySlug(slug: string) {
    const product = await db
        .select()
        .from(products)
        .where(and(eq(products.slug, slug), eq(products.isActive, true)))
        .limit(1)

    if (!product[0]) return null

    const images = await db
        .select()
        .from(productImages)
        .where(eq(productImages.productId, product[0].id))
        .orderBy(productImages.position)

    return { ...product[0], images }
}

// ─── Dohvati sve proizvode za admin (uključuje neaktivne) ─────
export async function getAdminProducts() {
    return await db
        .select({
            id:        products.id,
            name:      products.name,
            slug:      products.slug,
            price:     products.price,
            stock:     products.stock,
            isActive:  products.isActive,
            isFeatured: products.isFeatured,
            createdAt: products.createdAt,
            imageUrl:  productImages.url,
        })
        .from(products)
        .leftJoin(productImages, and(
            eq(productImages.productId, products.id),
            eq(productImages.position, 0)
        ))
        .orderBy(desc(products.createdAt))
}

// ─── Kreiraj novi proizvod ────────────────────────────────────
export async function createProduct(formData: FormData) {
    const name        = formData.get("name") as string
    const description = formData.get("description") as string
    const price       = formData.get("price") as string
    const comparePrice = formData.get("comparePrice") as string
    const stock       = formData.get("stock") as string
    const categoryId  = formData.get("categoryId") as string
    const isFeatured  = formData.get("isFeatured") === "true"
    const imageUrl    = formData.get("imageUrl") as string

    // Generiraj slug iz naziva
    const slug = slugify(name, { lower: true, strict: true })

    const [product] = await db.insert(products).values({
        name,
        slug,
        description,
        price,
        comparePrice: comparePrice || null,
        stock:        parseInt(stock) || 0,
        categoryId:   categoryId || null,
        isFeatured,
        isActive:     true,
    }).returning()

    // Dodaj sliku ako postoji
    if (imageUrl) {
        await db.insert(productImages).values({
            productId: product.id,
            url:       imageUrl,
            altText:   name,
            position:  0,
        })
    }

    revalidatePath("/products")
    revalidatePath("/admin/products")

    return { success: true, slug: product.slug }
}

// ─── Obriši proizvod ──────────────────────────────────────────
export async function deleteProduct(id: string) {
    await db.delete(products).where(eq(products.id, id))
    revalidatePath("/admin/products")
    revalidatePath("/products")
    return { success: true }
}

// ─── Toggle aktivan/neaktivan ─────────────────────────────────
export async function toggleProductActive(id: string, isActive: boolean) {
    await db.update(products)
        .set({ isActive })
        .where(eq(products.id, id))
    revalidatePath("/admin/products")
    revalidatePath("/products")
}

export async function updateProduct(formData: FormData) {
    const id          = formData.get("id") as string
    const name        = formData.get("name") as string
    const description = formData.get("description") as string
    const price       = formData.get("price") as string
    const comparePrice = formData.get("comparePrice") as string
    const stock       = formData.get("stock") as string
    const imageUrl    = formData.get("imageUrl") as string

    const slug = slugify(name, { lower: true, strict: true })

    await db.update(products)
        .set({
            name,
            slug,
            description,
            price,
            comparePrice: comparePrice || null,
            stock:        parseInt(stock) || 0,
            updatedAt:    new Date(),
        })
        .where(eq(products.id, id))

    if (imageUrl) {
        const existing = await db
            .select()
            .from(productImages)
            .where(and(eq(productImages.productId, id), eq(productImages.position, 0)))
            .limit(1)

        if (existing[0]) {
            await db.update(productImages)
                .set({ url: imageUrl, altText: name })
                .where(eq(productImages.id, existing[0].id))
        } else {
            await db.insert(productImages).values({
                productId: id,
                url:       imageUrl,
                altText:   name,
                position:  0,
            })
        }
    }

    revalidatePath("/products")
    revalidatePath("/admin/products")
    return { success: true }
}