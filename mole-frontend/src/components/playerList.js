import { Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function PlayerList(props) {
    const { playerList } = props;
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {playerList.sort((entry) => entry.number).map((player, i) =>
                <Fragment key={i}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={player.lastName + " image"} src={player.img} />
                         </ListItemAvatar>
                        <ListItemText
                            primary={
                            <>
                                <Typography variant="h5" color="textPrimary" textTransform="uppercase">{player.number + " " + player.lastName}</Typography>
                                <Typography variant="h5" color="textSecondary" textTransform="capitalize">{player.firstName}</Typography>
                            </>
                            }
                        />
                    </ListItem>
                    {(i !== playerList.length - 1) && <Divider component="li" />}
                </Fragment>
            )}
        </List>
    );
}