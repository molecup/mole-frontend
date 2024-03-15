import JsonLd from "@/components/jsonLd/jsonLd";
import { imgFormatsInterface, teamInterface } from "@/lib/commonInterfaces";
import { SportsOrganization, SportsTeam, WithContext } from "schema-dts";
import { molecupOrganization } from "./sportsOrganization";

export default function SportsTeamJsonLd(props : {team : teamInterface, logo: imgFormatsInterface}){
    const json : WithContext<SportsOrganization> = {
        "@context": "https://schema.org",
        '@type': 'SportsOrganization',
        sport: ["Soccer", "Football"],
        name : props.team.name,
        alternateName: props.team.short,
        url: `${process.env.NEXT_PUBLIC_URL}/team/${props.team.slug}`,
        logo: props.logo?.formats.medium?.url,
        description: `La squadra del liceo ${props.team.name} per la Mole Cup Reale Mutua`,
        keywords: ["squadra", "team", props.team.name, props.team.short, "liceo", "calcio", "Mole Cup", "Molecup"],
        mainEntityOfPage: `${process.env.NEXT_PUBLIC_URL}/team/${props.team.slug}`,
        memberOf : molecupOrganization,
        subOrganization: {
            "@type": "SportsTeam",
            sport: ["Soccer", "Football"],
            name : props.team.name,
            alternateName: props.team.short,
            url: `${process.env.NEXT_PUBLIC_URL}/team/${props.team.slug}`, 
            logo: props.logo?.formats.medium?.url,
        }
    };
    return JsonLd<SportsOrganization>(json, "jsopnLdteam"+props.team.slug);
}

export function generateSportsTeamJson(team : teamInterface) : SportsTeam{
    return {
        '@type': 'SportsTeam',
        sport: ["Soccer", "Football"],
        name : team.name,
        alternateName: team.short,
        url: `${process.env.NEXT_PUBLIC_URL}/team/${team.slug}`,
        logo: team.logo?.formats.medium?.url,
        description: `La squadra del liceo ${team.name} per la Mole Cup Reale Mutua`,
        keywords: ["squadra", "team", team.name, team.short, "liceo", "calcio", "Mole Cup", "Molecup"],
        mainEntityOfPage: `${process.env.NEXT_PUBLIC_URL}/team/${team.slug}`,
    };
}