export default function outImg (path : string | null | undefined, fallback="") : string{
    return path ? process.env.NEXT_PUBLIC_MEDIA_URL + path : fallback;
}