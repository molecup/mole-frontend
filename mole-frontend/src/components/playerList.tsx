import { Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { stableImg } from '@/lib/outImg';
import { imgFormatsInterface, rawPlayerListInterface } from '@/lib/commonInterfaces';
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

export default function PlayerList({ playerList, mapEvent } : {playerList : rawPlayerListInterface | null, mapEvent?: mapEventType}) {
    const players = playerList?.data?.attributes.players.data;
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {Array.isArray(players) && players.length>0 ? players.sort((x1, x2) => x1.attributes.shirtNumber - x2.attributes.shirtNumber).map((player, i) => {
                const imgUrl = stableImg(player.attributes.image?.data?.attributes, "small", null);
                return(
                    <Fragment key={i}>
                    <ListItem alignItems="flex-start"
                        secondaryAction={
                            <>
                                {mapEvent?.get(player.id)?.map((event, idx) => {
                                    if(event.__component === "match-event.goal")
                                        return(
                                            <GoalIcon key={idx} />
                                        );
                                    if(event.card_type === "red")
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
                            <Avatar alt={player.attributes.lastName + " image"} src={imgUrl} />
                         </ListItemAvatar>
                        <ListItemText
                            disableTypography={true}
                            primary={
                            <>
                                <Typography variant="h5" color="textPrimary" textTransform="uppercase">{player.attributes.shirtNumber + " " + player.attributes.lastName}</Typography>
                            </>
                            }
                            secondary={
                            <>
                                <Typography color="textSecondary" textTransform="capitalize">{player.attributes.firstName}</Typography>
                            </>
                            }
                        />
                    </ListItem>
                    {(i !== players.length - 1) && <Divider component="li" />}
                </Fragment>
                );
            }
            ) :
                <Typography sx={{margin: "5px"}}>Ancora nessun giocatore</Typography>
            }
        </List>
    );
}