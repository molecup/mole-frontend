import { Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import outImg from '@/lib/outImg';
import { imgFormatsInterface } from '@/lib/commonInterfaces';

export interface playerListProps {
    firstName: string,
    lastName: string,
    shirtNumber: number,
    role?: string | null,
    birth?: string | null,
    img?: imgFormatsInterface | null,
}

export default function PlayerList({ playerList } : {playerList : playerListProps[]}) {
    
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {playerList.sort((entry) => entry.shirtNumber).map((player, i) => {
                const imgUrl = outImg(player.img?.formats.medium.url, null);
                return(
                    <Fragment key={i}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={player.lastName + " image"} src={imgUrl} />
                         </ListItemAvatar>
                        <ListItemText
                            primary={
                            <>
                                <Typography variant="h5" color="textPrimary" textTransform="uppercase">{player.shirtNumber + " " + player.lastName}</Typography>
                                <Typography variant="h5" color="textSecondary" textTransform="capitalize">{player.firstName}</Typography>
                            </>
                            }
                        />
                    </ListItem>
                    {(i !== playerList.length - 1) && <Divider component="li" />}
                </Fragment>
                );
            }
            )}
        </List>
    );
}