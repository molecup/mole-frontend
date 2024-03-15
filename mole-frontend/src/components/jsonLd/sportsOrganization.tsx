import JsonLd from "@/components/jsonLd/jsonLd";
import { SportsOrganization, WithContext } from "schema-dts";

export default function SportsOrganizationJsonLd(){
    const json : WithContext<SportsOrganization> = {
        "@context": "https://schema.org",
        "@type": "SportsOrganization",
        name: "Mole Cup",
        alternateName: ["Molecup", "Mole Cup Reale Mutua"],
        url: `${process.env.NEXT_PUBLIC_URL}/molecup`,
        foundingDate: "2017-02-01",
        keywords: ["torneo", "calcio", "2024", "Torino", "licei"],
        description: "La Mole Cup Reale Mutua è un torneo di calcio tra i licei di Torino che tipicamente si svolge in primavera",
        logo: `${process.env.NEXT_PUBLIC_URL}/favicon.ico`,
        sport: ["Soccer", "Football"],
        sponsor: [
            {
            "@type" : "Organization",
            name: "Reale Mutua",
            description: "Reale Mutua è lo sponsor principale della Mole Cup 2024",
            url: "https://www.realemutua.it/",
            },
            {
            "@type" : "Organization",
            name: "Umbro",
            description: "Umbro è lo sponsor tecnico della Mole Cup 2024",
            url: "https://www.umbroitalia.it/",
            },
        ],
        sameAs: ["https://www.instagram.com/molecup_torino/", "https://www.facebook.com/p/Mole-Cup-100053946433255/?locale=it_IT", "https://www.tiktok.com/@molecup_torino"]
    };
    return JsonLd<SportsOrganization>(json, "jsopnLdtorneomolecup");
}

export const molecupOrganization : SportsOrganization = {
    "@type": "SportsOrganization",
    name: "Mole Cup",
    alternateName: ["Molecup", "Mole Cup Reale Mutua"],
    url: `${process.env.NEXT_PUBLIC_URL}/molecup`,
    keywords: ["torneo", "calcio", "2024", "Torino", "licei"],
    description: "La Mole Cup Reale Mutua è un torneo di calcio tra i licei di Torino",
    logo: `${process.env.NEXT_PUBLIC_URL}/favicon.ico`,
}