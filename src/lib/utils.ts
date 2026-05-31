import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { localesConfig, type Locale } from "@/config/i18n"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, locale: Locale = localesConfig.defaultLocale) {
  const { currencySymbol } = localesConfig.locales[locale]
  const formatted = new Intl.NumberFormat("bs", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
  return `${formatted} ${currencySymbol}`
}

export function formatDate(date: string | Date, locale: Locale = localesConfig.defaultLocale) {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date))
}

export function truncate(text: string, length: number) {
  if (text.length <= length) return text
  return text.slice(0, length) + "..."
}