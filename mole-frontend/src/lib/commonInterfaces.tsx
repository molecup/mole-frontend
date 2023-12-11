export interface imgInterface{
    url : string,
    size : number,
    width : number,
    height : number,
}

export interface imgFormatsInterface{
    formats: {
        large : imgInterface,
        medium : imgInterface,
        small : imgInterface,
        thumbnail : imgInterface,
    },
    caption : string | null,
    alternativeText: string | null,
    width: number,
    height: number,
}

export interface teamInterface {
    id : number, 
    name : string, 
    short: string,
    slug : string,
    logo: imgFormatsInterface | null,
}

export type teamRankInterface  = {
    rank: number,
    mp: number,
    pts : number,
    gs : number,
    gt: number,
    w: number,
    t: number,
    l: number,
    
} & teamInterface;