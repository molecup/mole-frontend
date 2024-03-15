import JsonLd from "@/components/jsonLd/jsonLd";
import { imgFormatsInterface, teamInterface } from "@/lib/commonInterfaces";
import { WithContext, SportsEvent } from "schema-dts";
import { molecupOrganization } from "./sportsOrganization";
import { generateSportsTeamJson } from "./sportsTeam";

export default function SportsEventJsonLd(props : {matchInfo : any, img: string, slug: string, dateString : string}){
    const json : WithContext<SportsEvent> = {
        "@context": "https://schema.org",
        '@type': 'SportsEvent',
        sport: ["Soccer", "Football"],
        url: `${process.env.NEXT_PUBLIC_URL}/match/${props.slug}`,
        image: props.img,
        description: `La partita ${props.matchInfo.teamA?.name} - ${props.matchInfo.teamB?.name} del ${props.dateString} al ${props.matchInfo.stadium?.name} della Mole Cup Reale Mutua`,
        name: `${props.matchInfo.teamA.name} - ${props.matchInfo.teamB.name}`,
        alternateName: `${props.matchInfo.teamA.short} - ${props.matchInfo.teamB.short}`,
        doorTime: props.matchInfo.date,
        location: props.matchInfo.stadium?.location?.description,
        organizer: molecupOrganization,
        homeTeam : generateSportsTeamJson(props.matchInfo.teamA),
        awayTeam: generateSportsTeamJson(props.matchInfo.teamB),
    };
    return JsonLd<SportsEvent>(json, "jsopnLdmatch"+props.slug);
}