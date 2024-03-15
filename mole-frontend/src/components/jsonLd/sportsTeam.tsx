import JsonLd from "@/components/jsonLd/jsonLd";
import { imgFormatsInterface, teamInterface } from "@/lib/commonInterfaces";
import { SportsTeam, WithContext } from "schema-dts";

export default function SportsTeamJsonLd(props : {team : teamInterface, logo: imgFormatsInterface}){
    const json : WithContext<SportsTeam> = {
        "@context": "https://schema.org",
        '@type': 'SportsTeam',
        sport: ["Soccer", "Football"],
        name : props.team.name,
        alternateName: props.team.short,
        url: `${process.env.NEXT_PUBLIC_URL}/team/${props.team.slug}`,
        logo: props.logo?.formats.medium?.url,
        description: `La squadra del liceo ${props.team.name} per la Mole Cup Reale Mutua`,
        keywords: ["squadra", "team", props.team.name, props.team.short, "liceo", "calcio", "Mole Cup", "Molecup"],
        mainEntityOfPage: `${process.env.NEXT_PUBLIC_URL}/team/${props.team.slug}`,
        memberOf : {
            "@type": "SportsOrganization",
            name: "Mole Cup",
            alternateName: ["Molecup", "Mole Cup Reale Mutua"],
            url: `${process.env.NEXT_PUBLIC_URL}/molecup`,
            keywords: ["torneo", "calcio", "2024", "Torino", "licei"],
            description: "La Mole Cup Reale Mutua è un torneo di calcio tra i licei di Torino",
            logo: `${process.env.NEXT_PUBLIC_URL}/favicon.ico`,
        }
    };
    return JsonLd<SportsTeam>(json, "jsopnLdteam"+props.team.slug);
}