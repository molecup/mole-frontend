'use client'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';

export default function PlayerList(props) {
    return (
        <List sx={{ width: '100%', maxWidth: 360}}>
             {props.playerList.map((player, i) => 
             <>
                <ListItem alignItems="flex-start" key={i}>
                <ListItemAvatar>
                  <Avatar alt={player.lastName + " image"} src={player.img} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                    <Typography variant="h5" color="textPrimary" textTransform="uppercase">{player.lastName}</Typography>
                    <Typography variant="h5" color="textSecondary" textTransform="capitalize">{player.firstName}</Typography>
                    </>
                  }
                />
                </ListItem>
                {(i != props.playerList.len-1) && <Divider component="li" />}
            </>
             )}
        </List>
    );
}