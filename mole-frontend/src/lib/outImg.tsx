export default function outImg (path : string | null | undefined, fallback? : any) : string{
    if(!fallback){
        fallback = "";
    }
    return path ? process.env.NEXT_PUBLIC_MEDIA_URL + path : fallback;
}