
export interface matchEventInterface{
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
    scorerShirtNumber: number,
    minute: number,
    penalty: boolean,
}

export interface cardEventInterface{
    __component: "match-event.card"
    id: number,
    team: "teamA" | "teamB",
    playerShirtNumber: number,
    minute: number,
    cardType: "yellow" | "red"
}

export type eventRawType = cardEventInterface | goalEventInterface;

export type mapEventType = Map<number, matchEventInterface[]>;

export function convertInterface(event : eventRawType) : matchEventInterface{
    var shirtNumber = 0;
    if (event.__component === "match-event.goal"){
        shirtNumber = event.scorerShirtNumber;
    }
    else if (event.__component === "match-event.card"){
        shirtNumber = event.playerShirtNumber;
    }
    return({
        ...event,
        shirtNumber: shirtNumber
    })
}

export default function generatePlayerMapEvent(matchEvents : eventRawType[]): [mapEventType, mapEventType]{
    const teamAEvents : mapEventType = new Map();
    const teamBEvents : mapEventType = new Map();
    var map: mapEventType;
    var standardEvent: matchEventInterface;
    matchEvents.forEach(event => {
        if(event.team === "teamA"){
            map = teamAEvents;
        }
        else{
            map = teamBEvents;
        }
        standardEvent = convertInterface(event);
        if(! Array.isArray(map.get(standardEvent.shirtNumber))){
            map.set(standardEvent.shirtNumber, []);
        }
        map.get(standardEvent.shirtNumber)?.push(standardEvent);
    })
    return [teamAEvents, teamBEvents];
}