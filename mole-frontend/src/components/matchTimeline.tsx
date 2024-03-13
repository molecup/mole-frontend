import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { GoalIcon, YellowCardIcon, RedCardIcon } from '@/components/eventIcons';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { teamInterface } from '@/lib/commonInterfaces';
import { stableImg } from '@/lib/outImg';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Image from "next/image";


export interface matchTimelineInterface{
    minute: number,
    team: "teamA" |"teamB",
    __component: "match-event.card" | "match-event.goal",
    cardType?: "yellow" | "red"
}

export default function MatchTimeline({matchEvents, teams} : {matchEvents : matchTimelineInterface[], teams: [teamInterface, teamInterface]}){
    const eventType = (event: matchTimelineInterface) : eventType => {
        if(event.__component === "match-event.goal"){
            return("goal");
        }
        if(event.__component === "match-event.card"){
            if(event.cardType === "red"){
                return("redCard");
            }
            return("yellowCard");
        }
        return("dot");
    }
    return(
        <Box sx={{maxWidth: "100vw", overflowX: "auto"}}>
            <Stepper activeStep={-1} alternativeLabel>
                <EventElement type="dot"/>
                {matchEvents.filter((event) => event.minute > 0).map((event, idx) => 
                    <EventElement type={eventType(event)} key={idx}>
                        <EventLabel teams={teams} label={event.minute + "'"} teamIdx={event.team==="teamA" ? 0 : 1}/>
                    </EventElement>
                )}
                <EventElement type="dot"/>
            </Stepper>
        </Box>
    )
}

function EventLabel({teams, teamIdx, label}: {teams:[teamInterface, teamInterface], teamIdx:0|1,  label:string}){
    const img = stableImg(teams[teamIdx].logo, "small");
    const colors = ["primary.light", "secondary.light"];
    return(
        <Paper sx={{bgcolor: colors[teamIdx], paddingBottom: "5px"}}>
            <Stack direction="column" sx={{alignItems: "center", marginTop: "-10px"}}>
                <Avatar variant="rounded" sx={{ width: 40, height: 40, marginTop: "5px" }} alt={"logo " + teams[teamIdx].name} >
                    <Image alt={"logo " + teams[teamIdx].name} src={img}  width="40" height="40" style={{objectFit: "contain", objectPosition:"center", height:"auto", padding:"1px"}} />
                </Avatar>
                <Typography color="primary.contrastText">{label}</Typography>
            </Stack>
        </Paper>
    )
}

type eventType = "dot" | "goal" | "yellowCard" | "redCard";

function EventElement({type, children} : {type?: eventType, children?: JSX.Element | string}){
    var icon;
    switch(type){
        case "goal":
            icon=<GoalIcon/>;
            break;
        case "yellowCard":
            icon=<YellowCardIcon/>;
            break;
        case "redCard":
            icon=<RedCardIcon/>;
            break;
        default:
            icon=<FiberManualRecordIcon color="disabled"/>;
            break;
    }
    return(
        <Step >
            <StepLabel icon={icon}>{children}</StepLabel>
        </Step>
    );
}