import { matchEventsInterface } from "./commonInterfaces"

/*export interface matchEventInterface{
    __component: "match-event.card" | "match-event.goal"
    id: number,
    team: "teamA" | "teamB",
    shirtNumber: number,
    minute: number,
    penalty?: boolean,
    cardType?: "yellow" | "red"
}

export interface goalEventInterface{
    __component: "match-event.goal"
    id: number,
    team: "teamA" | "teamB",
    scorerShirtNumber?: number | null,
    minute: number,
    penalty: boolean,
}

export interface cardEventInterface{
    __component: "match-event.card"
    id: number,
    team: "teamA" | "teamB",
    playerShirtNumber?: number | null,
    minute: number,
    cardType: "yellow" | "red"
}

export type eventRawType = cardEventInterface | goalEventInterface;

*/

export type mapEventType = Map<number, matchEventsInterface[]>;

/*export function convertInterface(event : eventRawType) : matchEventInterface{
    var shirtNumber = 0;
    if (event.__component === "match-event.goal"){
        shirtNumber = event.scorerShirtNumber? event.scorerShirtNumber : 0;
    }
    else if (event.__component === "match-event.card"){
        shirtNumber = event.playerShirtNumber? event.playerShirtNumber : 0;
    }
    return({
        ...event,
        shirtNumber: shirtNumber
    })
}*/

export default function generatePlayerMapEvent(matchEvents : matchEventsInterface[]): [mapEventType, mapEventType]{
    const teamAEvents : mapEventType = new Map();
    const teamBEvents : mapEventType = new Map();
    var map: mapEventType;
    matchEvents.forEach(event => {
        if(event.team === "home_team"){
            map = teamAEvents;
        }
        else{
            map = teamBEvents;
        }
        const playerId = event.player.data?.id;
        if (playerId !== undefined) {
            if (!Array.isArray(map.get(playerId))) {
                map.set(playerId, []);
            }
            map.get(playerId)?.push(event);
        }
    })
    return [teamAEvents, teamBEvents];
}