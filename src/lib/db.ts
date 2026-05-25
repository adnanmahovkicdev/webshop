import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

// Provjeri da DATABASE_URL postoji - bolje da crashira ovdje
// s jasnom porukom nego negdje dublje s nejasnom greškom
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL nije postavljen u .env.local")
}

// Konekcija na PostgreSQL
const client = postgres(process.env.DATABASE_URL)

// Drizzle instanca - ovo izvozimo i koristimo svuda u projektu
export const db = drizzle(client)