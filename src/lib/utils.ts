import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {Locale, localesConfig} from "@/src/config/i18n";

// Ovo je standardna shadcn utility funkcija - spaja CSS klase
// i rješava konflikte između Tailwind klasa
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Formatira cijenu u ispravan format za dati locale
// formatCurrency(49.9, "bs") → "49,90 KM"
// formatCurrency(49.9, "hr") → "49,90 €"  (kad dodaš hr)
export function formatCurrency(amount: number, locale: Locale = localesConfig.defaultLocale) {
    const { currency, currencySymbol } = localesConfig.locales[locale]

    const formatted = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount)

    return `${formatted} ${currencySymbol}`
}

// Formatira datum po lokalnom formatu
// formatDate("2024-01-15", "bs") → "15.01.2024"
export function formatDate(date: string | Date, locale: Locale = localesConfig.defaultLocale) {
    return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(date))
}

// Skraćuje tekst na određenu dužinu (za opise proizvoda u karticama)
// truncate("Ovo je dug opis...", 20) → "Ovo je dug opis..."
export function truncate(text: string, length: number) {
    if (text.length <= length) return text
    return text.slice(0, length) + "..."
}