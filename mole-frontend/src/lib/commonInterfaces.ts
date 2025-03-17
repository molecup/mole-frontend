export interface imgInterface{
    url : string,
    size : number,
    width : number,
    height : number,
    mime: string,
}

export interface imgFormatsInterface{
    formats: {
        large? : imgInterface,
        medium? : imgInterface,
        small? : imgInterface,
        thumbnail : imgInterface,
    },
    caption : string | null,
    alternativeText: string | null,
    width: number,
    height: number,
    placeholder?: string
}



export type teamRankInterface  = {
    id:number,
    rank: number,
    played: number,
    pts : number,
    goal_scored : number,
    goal_taken : number,
    wins: number,
    draws: number,
    losses: number,
    team: rawTeamEditionInterface,
}



//raws types from APIs
/*
    naming notes: raw* includes the data key

*/
export interface rawImgFormatsInterface{
    data: {
        id: number,
        attributes: imgFormatsInterface,
    } | null,
}



export interface rawTeamEditionInterface{
    data: teamEditionInterface
}

export interface teamEditionInterface{
    id: number,
    attributes: {
        slug: string,
        year: number,
        team: rawTeamInterface,
        cover?: rawImgFormatsInterface,
        article_tags?: {
            data: articleTagsInterface[],
        },
        player_list?: rawPlayerListInterface,
    }
}

export interface rawTeamInterface{
    data: {
        id: number,
        attributes: teamInterface,
    }
}

export interface teamInterface {
    name : string, 
    short: string,
    slug : string,
    logo?: rawImgFormatsInterface,
    main_edition?: rawTeamEditionInterface,
}

export interface matchShortInterface{
    id: number,
    attributes: {
        home_team?: rawTeamEditionInterface,
        away_team?: rawTeamEditionInterface,
        home_score: number,
        away_score: number,
        penalties: boolean,
        home_penalties: number,
        away_penalties: number,
        event_info: eventInfoInterface,
        hide_event_minutes: boolean,
        cover?: rawImgFormatsInterface,
        group_phase?: {
            data: groupPhase | null,
        },
        knock_out_phase?: {
            data: knockOutPhase | null,
        },
    }
}

export interface rawMatchLongInterface{
    data: matchShortInterface&{
        attributes: {
            match_events: matchEventsInterface[],
        }
    }
}

export interface eventInfoInterface{
        id: number,
        datetime: string,
        registration_link: string,
        event_registration: boolean,
        status: string,
        stadium?: rawStadiumInterface,
}

export interface rawStadiumInterface{
    data: {
        id: number,
        attributes: {
            name: string,
            slug: string,
            location: {
                address: string,
                coordinates: {
                    lat: number,
                    lng: number,
                },
                geohash: string,
            }
        }
    } | null
}

export interface groupPhase{
    id: number,
    attributes: {
        name: string,
        slug: string,
        teams?: teamRankInterface[],
        matches?: {
            data: matchShortInterface[]
        },
    }
}

export interface knockOutPhase{
    id: number,
    attributes: {
        name: string,
        slug: string,
        matches?: {
            data: matchShortInterface[]
        },
    }
}

export interface rawTournamentEditionInterface{
    data: {
        id: number,
        attributes: {
            title: string,
            slug: string,
            year?: number,
            cover?: rawImgFormatsInterface,
            article_tags?: {
                data: articleTagsInterface[],
            },
            team_editions?: {
                data: teamEditionInterface[],
            },
            group_phases?: {
                data: groupPhase[]
            },
        }
    }
}

export interface tournamentInterface{
    id: number,
    attributes: {
        name: string,
        slug: string,
        main_edition: rawTournamentEditionInterface,
    }
}

export interface articleTagsInterface{
    id: number,
    attributes: {
        name: string,
    }
}

export interface playerInterface{
    id: number,
    attributes: {
        lastName: string,
        firstName: string,
        shirtNumber: number,
        role?: string | null,
        birth?: string | null,
        captain?: boolean | null,
        image?: rawImgFormatsInterface | null,
    }
}

export interface rawPlayerListInterface{
    data: {
        id: number,
        attributes: {
            players: {
                data: playerInterface[],
            }
        }
    } | null,
}

export interface matchEventsInterface{
    id: number,
    __component: "match-event.goal" | "match-event.card",
    card_type?: "yellow" | "red",
    player: {
        data: playerInterface | null,
    },
    minute: number,
    team: "home_team" | "away_team",
}
