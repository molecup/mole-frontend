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

export interface teamRank {
    id : string, 
    name : string, 
    short: string,
    slug : string,
    rank: number,
    mp: number,
    pts : number,
    gs : number,
    gt: number,
    w: number,
    t: number,
    l: number,
    logo: imgFormatsInterface | null,
};