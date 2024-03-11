/*
    source: https://www.w3schools.com/howto/howto_css_hero_image.asp
*/

import Box from '@mui/material/Box';
import Stack from '@mui/system/Stack';
import { StaticImageData } from 'next/image';
import Image from "@/components/image";


export default function HeroHeader({children, sx, src, blurDataURL, blur=false, ...otherProps} : {children?:any, sx?:any, src:string | StaticImageData, blur?:boolean, blurDataUrl?:string, [key: string] : any}){
    const style={
        /* Use "linear-gradient" to add a darken background effect to the image (photographer.jpg). This will make the text easier to read */
        //backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${src})`,

        /* Set a specific height */
        height: "50%",
        minHeight: "200px",

        /* Position and center the image to scale nicely on all screens */
        /*backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",*/

        display:"flex",
        alignItems: "center",
        justifyContent:"center",
        position:"relative",
    }
    const placeholder = blur? "blur" : "empty";
    return(
        <Box component="header" sx={{...style, ...sx}} {...otherProps}>
            <Image 
                src={src}
                blurDataURL={blurDataURL}
                placeholder={placeholder}
                alt="Hero image"
                fill
                priority
                style={{
                    zIndex:"-1",
                    objectFit: "cover",
                    objectPosition: "center",
                    filter: "brightness(50%)",
                }}
                sizes='100vw'
            />
            <Stack sx={{alignItems:"center", alignContent: "center", zIndex:"1"}}>
            {children}
            </Stack>
        </Box>
    );
}
