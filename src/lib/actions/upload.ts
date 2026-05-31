"use server"

import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function uploadImage(formData: FormData) {
    const file = formData.get("file") as File

    if (!file) return { error: "Nema fajla" }

    // Provjeri tip fajla
    const validTypes = ["image/jpeg", "image/png", "image/webp"]
    if (!validTypes.includes(file.type)) {
        return { error: "Samo JPG, PNG i WebP su dozvoljeni" }
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
        return { error: "Slika ne smije biti veća od 5MB" }
    }

    const bytes  = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Jedinstveno ime fajla da se ne prepisuju
    const ext      = path.extname(file.name)
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
    const uploadDir = path.join(process.cwd(), "public", "uploads")

    // Kreiraj folder ako ne postoji
    await mkdir(uploadDir, { recursive: true })

    const filepath = path.join(uploadDir, filename)
    await writeFile(filepath, buffer)

    return { url: `/uploads/${filename}` }
}