import JsonLd from "@/components/jsonLd/jsonLd";
import { imgFormatsInterface, teamInterface } from "@/lib/commonInterfaces";
import { SportsTeam, WithContext } from "schema-dts";
import { molecupOrganization } from "./sportsOrganization";

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
        memberOf : molecupOrganization,
    };
    return JsonLd<SportsTeam>(json, "jsopnLdteam"+props.team.slug);
}