import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import RectangleRoundedIcon from '@mui/icons-material/RectangleRounded';

export function GoalIcon(){
    return(
        <SportsSoccerIcon aria-label="Goal"/>
    );
}

export function YellowCardIcon(){
    return(
        <RectangleRoundedIcon color="warning" sx={{transform: "rotate(90deg)"}} aria-label="yellow card"/>
    );
}

export function RedCardIcon(){
    return(
        <RectangleRoundedIcon color="error" sx={{transform: "rotate(90deg)"}} aria-label="yellow card"/>
    );
}