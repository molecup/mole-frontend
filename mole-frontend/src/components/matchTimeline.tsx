import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { GoalIcon, YellowCardIcon, RedCardIcon } from '@/components/eventIcons';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { matchEventsInterface, teamInterface } from '@/lib/commonInterfaces';
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

export default function MatchTimeline({matchEvents, teams, hideMinutes=false} : {matchEvents : matchEventsInterface[], teams: [teamInterface, teamInterface], hideMinutes?: boolean}){
    const eventType = (event: matchEventsInterface) : eventType => {
        if(event.__component === "match-event.goal"){
            return("goal");
        }
        if(event.__component === "match-event.card"){
            if(event.card_type === "red"){
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
                {matchEvents.filter((event) => event.minute > 0).sort((x1, x2) => x1.minute-x2.minute).map((event, idx) => 
                    <EventElement type={eventType(event)} key={idx}>
                        <EventLabel teams={teams} label={hideMinutes ? "" : event.minute + "'"} teamIdx={event.team==="home_team" ? 0 : 1}/>
                    </EventElement>
                )}
                <EventElement type="dot"/>
            </Stepper>
        </Box>
    )
}

function EventLabel({teams, teamIdx, label}: {teams:[teamInterface, teamInterface], teamIdx:0|1,  label:string}){
    const img = stableImg(teams[teamIdx].logo?.data?.attributes, "small");
    const colors = ["primary.light", "secondary.light"];
    return(
        <Paper sx={{bgcolor: colors[teamIdx], paddingBottom: "5px"}}>
            <Stack direction="column" sx={{alignItems: "center", marginTop: "-10px"}}>
                <Avatar variant="rounded" sx={{ width: 40, height: 40, marginTop: "5px", bgcolor: "inherit" }} alt={"logo " + teams[teamIdx].name} >
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