import { imgFormatsInterface } from "@/lib/commonInterfaces";

export default function outImg (path : string | null | undefined, fallback : any = "") : string{
    return path ? process.env.NEXT_PUBLIC_MEDIA_URL + path : fallback;
}

export type formats = "thumbnail" | "small" | "medium" | "large";

export function stableImg (img? : imgFormatsInterface | null, format : formats = "medium", fallback : any = "/match_placeholder.jpg") : string{
    if(!img?.formats){
        return outImg(undefined, fallback);
    }
    if(img.formats[format]){
        return outImg(img.formats[format]?.url);
    }
    const formatOptions : formats[] = ["thumbnail" , "small" , "medium" , "large"];
    const defaultIdx = formatOptions.findIndex(x => x === format);
    var idx : number;
    for(let offset = 1; offset < formatOptions.length; offset++){
        for(let dir of [1, -1]){
            idx = defaultIdx + offset * dir;
            if(idx >= 0 && idx < formatOptions.length){
                if(img.formats[formatOptions[idx]]){
                    return outImg(img.formats[formatOptions[idx]]?.url)
                }
            }
        }
    }
    return (outImg(undefined, fallback));
}