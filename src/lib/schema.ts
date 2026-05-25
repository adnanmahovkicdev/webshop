import { pgTable, uuid, varchar, text, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core"

export const products = pgTable("products", {
    id:          uuid("id").defaultRandom().primaryKey(),
    name:        varchar("name", { length: 255 }).notNull(),
    slug:        varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    price:       numeric("price", { precision: 10, scale: 2 }).notNull(),
    stock:       integer("stock").notNull().default(0),
    imageUrl:    varchar("image_url", { length: 500 }),
    isActive:    boolean("is_active").notNull().default(true),
    createdAt:   timestamp("created_at").notNull().defaultNow(),
    updatedAt:   timestamp("updated_at").notNull().defaultNow(),
})

// TypeScript tip za produkt - automatski izveden iz sheme
// Koristiš ovo kad tipiziraš funkcije koje rade s produktima
export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert