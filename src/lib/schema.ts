import {
    pgTable, uuid, varchar, text,
    integer, boolean, timestamp, numeric
} from "drizzle-orm/pg-core"

// ─── Kategorije ───────────────────────────────────────────────
export const categories = pgTable("categories", {
    id:          uuid("id").defaultRandom().primaryKey(),
    name:        varchar("name", { length: 255 }).notNull(),
    slug:        varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    imageUrl:    varchar("image_url", { length: 500 }),
    isActive:    boolean("is_active").notNull().default(true),
    createdAt:   timestamp("created_at").notNull().defaultNow(),
})

// ─── Proizvodi ────────────────────────────────────────────────
export const products = pgTable("products", {
    id:           uuid("id").defaultRandom().primaryKey(),
    categoryId:   uuid("category_id").references(() => categories.id),
    name:         varchar("name", { length: 255 }).notNull(),
    slug:         varchar("slug", { length: 255 }).notNull().unique(),
    description:  text("description"),
    price:        numeric("price", { precision: 10, scale: 2 }).notNull(),
    comparePrice: numeric("compare_price", { precision: 10, scale: 2 }), // prekrižena cijena
    stock:        integer("stock").notNull().default(0),
    isActive:     boolean("is_active").notNull().default(true),
    isFeatured:   boolean("is_featured").notNull().default(false),
    createdAt:    timestamp("created_at").notNull().defaultNow(),
    updatedAt:    timestamp("updated_at").notNull().defaultNow(),
})

// ─── Slike proizvoda ──────────────────────────────────────────
// Odvojeno od proizvoda jer jedan proizvod može imati više slika
export const productImages = pgTable("product_images", {
    id:        uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    url:       varchar("url", { length: 500 }).notNull(),
    altText:   varchar("alt_text", { length: 255 }),
    position:  integer("position").notNull().default(0), // redoslijed prikaza
    createdAt: timestamp("created_at").notNull().defaultNow(),
})

// ─── Korisnici ────────────────────────────────────────────────
// Clerk upravlja autentikacijom, mi čuvamo samo naše podatke
export const users = pgTable("users", {
    id:        uuid("id").defaultRandom().primaryKey(),
    clerkId:   varchar("clerk_id", { length: 255 }).notNull().unique(), // Clerk user ID
    email:     varchar("email", { length: 255 }).notNull().unique(),
    firstName: varchar("first_name", { length: 255 }),
    lastName:  varchar("last_name", { length: 255 }),
    phone:     varchar("phone", { length: 50 }),
    role:      varchar("role", { length: 50 }).notNull().default("customer"), // customer | admin
    createdAt: timestamp("created_at").notNull().defaultNow(),
})

// ─── TypeScript tipovi ────────────────────────────────────────
export type Category    = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert
export type Product     = typeof products.$inferSelect
export type NewProduct  = typeof products.$inferInsert
export type ProductImage    = typeof productImages.$inferSelect
export type NewProductImage = typeof productImages.$inferInsert
export type User    = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert