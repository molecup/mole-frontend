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

export interface teamInterface {
    name : string, 
    short: string,
    slug : string,
    logo: rawImgFormatsInterface | null,
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
    team: teamEditionInterface,
}



//raws types from APIs
export interface rawImgFormatsInterface{
    data: {
        id: number,
        attributes: imgFormatsInterface,
    } | null,
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
                data: rawArticleTagsInterface[],
            },
            team_editions?: {
                data: rawTeamEditionInterface[],
            },
            group_phases?: {
                data: groupPhase[]
            },
        }
    }
}

export interface teamEditionInterface{
    data: {
        id: number,
        attributes: {
            slug: string,
            year: number|null,
            team?: rawTeamInterface
        },
    }
}

export interface matchShortInterface{
    id: number,
    attributes: {
        home_team?: teamEditionInterface,
        away_team?: teamEditionInterface,
        home_score: number,
        away_score: number,
        penalties: boolean,
        home_penalties: number,
        away_penalties: number,
        event_info: eventInfoInterface,
        cover?: rawImgFormatsInterface,
    }
}

export interface eventInfoInterface{
        id: number,
        datetime: string,
        registration_ling: string,
        event_registration: boolean,
        status: string,
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

export interface rawTeamInterface{
    data: {
        id: number,
        attributes: teamInterface,
    }
}

export interface rawTeamEditionInterface{
    id: number,
    attributes: {
        slug: string,
        year: number,
        team: rawTeamInterface,
        cover?: rawImgFormatsInterface,
    }
}

export interface rawTournamentInterface{
    id: number,
    attributes: {
        name: string,
        slug: string,
        main_edition: rawTournamentEditionInterface,
    }
}

export interface rawArticleTagsInterface{
    id: number,
    attributes: {
        name: string,
    }
}