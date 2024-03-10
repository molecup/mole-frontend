/*
    clip-path reference: https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path
    polygon reference: https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/polygon
*/
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';


/*
    @params:
        src : string. Source of image for the image side
        children: JSX:Element. Content of the content side
        variant: "contentRight" | "contentLeft". Whether to put the content side on the right or on the left
        sx: style prop. Applied to the root Grid element. Declare height attribute to change the height of the section (default 200px)
*/
export default function TwoSpanBlogSection({src = "", children, variant="contentRight", sx}: {src:string, children?:JSX.Element[], variant?:"contentRight" | "contentLeft", sx?: {[key: string] : any} }){
    var polygon = null;
    var margin = null;
    if(variant === "contentRight"){
        polygon = {
            xs : "polygon(70% 0, 0 0, 0 100%, 100% 100%)",
            md : "polygon(75% 0, 0 0, 0 100%, 100% 100%)",
            lg : "polygon(88% 0, 0 0, 0 100%, 100% 100%)",
        };
        margin = {
            xs : "0 -1% 0 0",
            md : "0 -1% 0 0",
            lg : "0 -1% 0 0",
        };
    }else{
        polygon = {
            xs : "polygon(100% 0, 30% 0, 0 100%, 100% 100%)",
            md : "polygon(100% 0, 25% 0, 0 100%, 100% 100%)",
            lg : "polygon(100% 0, 12% 0, 0 100%, 100% 100%)",
        };
        margin = {
            xs : "0 0 0 -1%",
            md : "0 0 0 -1%",
            lg : "0 0 0 -1%",
        };
    }

    const backgroundImage = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${src})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    }
    const polygonShape = {
        WebkitClipPath: polygon,
        clipPath: polygon,
        margin: margin,
    }

    const imageSide = (
        <Grid xs={4} lg={6} component="span" sx={{ ...polygonShape, height:"100%", position:"relative"}}>
            <Image 
                src={src} 
                alt="Section image" 
                fill
                style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    filter: "brightness(50%)",
                }}
            />
        </Grid>
    );

    if(!sx?.height){
        sx = {
            height: "200px",
            ...sx
        }
    }

    return(
        <Grid container component="section" sx={{...sx, alignContent:"center"}}>
            {variant==="contentRight" && imageSide}
            <Grid xs={8} lg={6} component="span">
                <Stack 
                direction="column" 
                spacing={2} 
                sx={{
                    textAlign: "center", 
                    justifyContent:"center", 
                    height:"100%", 
                    paddingRight: variant==="contentRight" ? "10px" : "0",
                    paddingLeft: variant==="contentLeft" ? "10px" : "0",
                }}
                >
                    {children}
                </Stack>
            </Grid>
            {variant==="contentLeft" && imageSide}
        </Grid>
    );
}