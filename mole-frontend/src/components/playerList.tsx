import { Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { stableImg } from '@/lib/outImg';
import { imgFormatsInterface } from '@/lib/commonInterfaces';
import { GoalIcon, YellowCardIcon, RedCardIcon } from '@/components/eventIcons';
import { mapEventType } from '@/lib/generatePlayerMapEvent';



export interface playerListProps {
    firstName: string,
    lastName: string,
    shirtNumber: number,
    role?: string | null,
    birth?: string | null,
    img?: imgFormatsInterface | null,
    captain?: boolean |null,
}

export default function PlayerList({ playerList, mapEvent } : {playerList : playerListProps[], mapEvent?: mapEventType}) {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {Array.isArray(playerList) && playerList.length>0 ? playerList.sort((x1, x2) => x1.shirtNumber - x2.shirtNumber).map((player, i) => {
                const imgUrl = stableImg(player.img, "small", null);
                return(
                    <Fragment key={i}>
                    <ListItem alignItems="flex-start"
                        secondaryAction={
                            <>
                                {mapEvent?.get(player.shirtNumber)?.map((event, idx) => {
                                    if(event.__component === "match-event.goal")
                                        return(
                                            <GoalIcon key={idx} />
                                        );
                                    if(event.cardType === "red")
                                            return(
                                            <RedCardIcon key={idx} />
                                        );
                                    return(
                                        <YellowCardIcon key={idx} />
                                    );
                                })}
                            </>
                          }>
                        <ListItemAvatar>
                            <Avatar alt={player.lastName + " image"} src={imgUrl} />
                         </ListItemAvatar>
                        <ListItemText
                            disableTypography={true}
                            primary={
                            <>
                                <Typography variant="h5" color="textPrimary" textTransform="uppercase">{player.shirtNumber + " " + player.lastName}</Typography>
                            </>
                            }
                            secondary={
                            <>
                                <Typography color="textSecondary" textTransform="capitalize">{player.firstName}</Typography>
                            </>
                            }
                        />
                    </ListItem>
                    {(i !== playerList.length - 1) && <Divider component="li" />}
                </Fragment>
                );
            }
            ) :
                <Typography sx={{margin: "5px"}}>Ancora nessun giocatore</Typography>
            }
        </List>
    );
}