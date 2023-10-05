/*
  using next/image component inside media card: https://stackoverflow.com/questions/68721497/how-to-use-next-js-image-inside-material-ui-card-media
*/

import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import Chip from '@mui/material/Chip';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
/*
import VideocamIcon from '@mui/icons-material/Videocam';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CheckIcon from '@mui/icons-material/Check';
*/
import Stack from '@mui/material/Stack';



export default function MatchCard(props) {
  return (
    <Card sx={{
      MaxWidth:200,
      minWidth:200,
      transition: "transform 0.15s ease-in-out",
      "&:hover": { transform: "scale3d(0.98, 0.98, 1)" }
      }} 
      id = {props.initial? 'initial': null}
      elevation={3}
    >
      <CardActionArea LinkComponent={Link} href={props.url}>
        <CardMedia
          sx={{height: "100px"}}
          title="Match_placeholder"
        >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image alt="Image placeholder" src={props.img}  fill='true' style={{objectFit: "cover"}} sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 12vw"/>
          </div>
        </CardMedia>
        <CardContent>
          <Typography /*gutterBottom*/ variant="h5" color="textPrimary" textTransform="uppercase">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom >
            {props.description}
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Chip icon={<CalendarMonthIcon />} size='small' label={<Typography variant='caption' color="textSecondary">{props.datetime}</Typography>} />
          </Stack>
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}