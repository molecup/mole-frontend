import Box from '@mui/material/Box';

export default function HeroHeader(props){
    const {children, sx, src, ...otherProps} = props;
    const style={
        /* Use "linear-gradient" to add a darken background effect to the image (photographer.jpg). This will make the text easier to read */
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${src})`,

        /* Set a specific height */
        height: "50%",

        /* Position and center the image to scale nicely on all screens */
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
    }
    return(
        <Box sx={{...style, ...sx}} {...otherProps}>
            {children}
        </Box>
    );
}