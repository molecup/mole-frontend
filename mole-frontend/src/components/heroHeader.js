/*
    source: https://www.w3schools.com/howto/howto_css_hero_image.asp
*/

import Box from '@mui/material/Box';
import Stack from '@mui/system/Stack';
import Image from 'next/image';


export default function HeroHeader(props){
    const {children, sx, src, ...otherProps} = props;
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
    return(
        <Box component="header" sx={{...style, ...sx}} {...otherProps}>
            <Image 
                src={src}
                alt="Hero image"
                fill
                priority
                style={{
                    zIndex:"-1",
                    objectFit: "cover",
                    objectPosition: "center",
                    filter: "brightness(50%)",
                }}
                
            />
            <Stack sx={{alignItems:"center", alignContent: "center", zIndex:"1"}}>
            {children}
            </Stack>
        </Box>
    );
}
