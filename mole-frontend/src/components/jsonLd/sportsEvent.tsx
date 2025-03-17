import JsonLd from "@/components/jsonLd/jsonLd";
import { imgFormatsInterface, rawMatchLongInterface, teamInterface } from "@/lib/commonInterfaces";
import { WithContext, SportsEvent } from "schema-dts";
import { molecupOrganization } from "./sportsOrganization";
import { generateSportsTeamJson } from "./sportsTeam";

export default function SportsEventJsonLd(props : {matchInfo : rawMatchLongInterface, img: string, slug: string, dateString : string}){
    const json : WithContext<SportsEvent> = {
        "@context": "https://schema.org",
        '@type': 'SportsEvent',
        sport: ["Soccer", "Football"],
        url: `${process.env.NEXT_PUBLIC_URL}/match/${props.slug}`,
        image: props.img,
        description: `La partita ${props.matchInfo.data.attributes.home_team?.data.attributes.team.data.attributes.name} - ${props.matchInfo.data.attributes.away_team?.data.attributes.team.data.attributes.name} del ${props.dateString}} della Lega Calcio Studenti`,
        name: `${props.matchInfo.data.attributes.home_team?.data.attributes.team.data.attributes.name} - ${props.matchInfo.data.attributes.away_team?.data.attributes.team.data.attributes.name}`,
        alternateName: `${props.matchInfo.data.attributes.home_team?.data.attributes.team.data.attributes.short} - ${props.matchInfo.data.attributes.away_team?.data.attributes.team.data.attributes.short}`,
        doorTime: props.matchInfo.data.attributes.event_info.datetime,
        location: {
            "@type" : "Place",
            name: props.matchInfo.data.attributes.event_info.stadium?.data?.attributes.name,
            address: props.matchInfo.data.attributes.event_info.stadium?.data?.attributes.location.address,
        },
        organizer: molecupOrganization,
        homeTeam : generateSportsTeamJson(props.matchInfo.data.attributes.home_team?.data.attributes.team.data.attributes || {} as teamInterface),
        awayTeam: generateSportsTeamJson(props.matchInfo.data.attributes.home_team?.data.attributes.team.data.attributes || {} as teamInterface),
        startDate: props.matchInfo.data.attributes.event_info.datetime,
        eventAttendanceMode: "OfflineEventAttendanceMode",
        mainEntityOfPage: `${process.env.NEXT_PUBLIC_URL}/match/${props.slug}`,
    };
    return JsonLd<SportsEvent>(json, "jsopnLdmatch"+props.slug);
}