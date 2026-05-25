export const localesConfig = {
    defaultLocale: "bs",
    defaultCurrency: "BAM",

    locales: {
        bs: {
            label: "Bosanski",
            currency: "BAM",
            currencySymbol: "KM",
            flag: "🇧🇦",
            dateFormat: "DD.MM.YYYY",
            phonePrefix: "+387",
        },
        // Kad budeš dodavao, samo uncommentaš:
        // hr: {
        //   label: "Hrvatski",
        //   currency: "EUR",
        //   currencySymbol: "€",
        //   flag: "🇭🇷",
        //   dateFormat: "DD.MM.YYYY",
        //   phonePrefix: "+385",
        // },
        // en: {
        //   label: "English",
        //   currency: "EUR",
        //   currencySymbol: "€",
        //   flag: "🇬🇧",
        //   dateFormat: "MM/DD/YYYY",
        //   phonePrefix: "+44",
        // },
    },
} as const

// TypeScript tip za locale ključeve - automatski je "bs" sad,
// a kad dodaš hr bit će "bs" | "hr"
export type Locale = keyof typeof localesConfig.locales
export type Currency = typeof localesConfig.locales[Locale]["currency"]