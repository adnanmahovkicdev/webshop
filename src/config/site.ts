export const siteConfig = {
    name: "Naziv Shopa",
    description: "Opis shopa za SEO",
    url: "http://localhost:3000", // mijenja se kad ideš na produkciju

    // Kontakt
    email: "info@webshop.ba",
    phone: "+387 61 000 000",

    // Adresa
    address: {
        street: "Ulica bb",
        city: "Sarajevo",
        country: "BA",
    },

    // Dostava
    delivery: {
        freeShippingThreshold: 100, // KM - besplatna dostava iznad ovog iznosa
        defaultShippingCost: 7,     // KM
        estimatedDays: "2-4",
    },

    // Socijalne mreže
    social: {
        instagram: "",
        facebook: "",
        tiktok: "",
    },
} as const