import JsonLd from "@/components/jsonLd/jsonLd";
import { imgFormatsInterface, teamInterface } from "@/lib/commonInterfaces";
import { SportsOrganization, SportsTeam, WithContext } from "schema-dts";
import { molecupOrganization } from "./sportsOrganization";
import { stableImg } from "@/lib/outImg";

export default function SportsTeamJsonLd(props : {team : teamInterface, logo?: imgFormatsInterface}){
    const json : WithContext<SportsOrganization> = {
        "@context": "https://schema.org",
        '@type': "SportsOrganization",
        sport: ["Soccer", "Football"],
        name : props.team.name,
        alternateName: props.team.short,
        url: `${process.env.NEXT_PUBLIC_URL}/team/${props.team.slug}`,
        logo: stableImg(props.logo, "medium", ""),
        description: `La squadra del liceo ${props.team.name} per la Lega Calcio Studenti`,
        keywords: ["squadra", "team", props.team.name, props.team.short, "liceo", "calcio", "Lega calcio", "LCS"],
        mainEntityOfPage: `${process.env.NEXT_PUBLIC_URL}/team/${props.team.slug}`,
        memberOf : molecupOrganization,
        subOrganization: {
            "@type": "SportsTeam",
            sport: ["Soccer", "Football"],
            name : props.team.name,
            alternateName: props.team.short,
            //url: `${process.env.NEXT_PUBLIC_URL}/team/${props.team.slug}`, 
            logo: stableImg(props.logo, "medium", ""),
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
        logo: stableImg(team.logo?.data?.attributes, "medium", ""),
        description: `La squadra del liceo ${team.name} per la Mole Cup Reale Mutua`,
        keywords: ["squadra", "team", team.name, team.short, "liceo", "calcio", "Mole Cup", "Molecup"],
        mainEntityOfPage: `${process.env.NEXT_PUBLIC_URL}/team/${team.slug}`,
    };
}