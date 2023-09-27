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
import VideocamIcon from '@mui/icons-material/Videocam';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';



export default function MatchCard(props) {
  return (
    <Card sx={{
      maxWidth: 200, 
      transition: "transform 0.15s ease-in-out",
      "&:hover": { transform: "scale3d(1.05, 1.05, 1)" }
      }} 
      elevation={3}
    >
      <CardActionArea LinkComponent={Link} href={props.url}>
        <CardMedia
          sx={{height: "100px"}}
          title="Match_placeholder"
        >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image src={props.img}  fill='true' style={{objectFit: "cover"}} />
          </div>
        </CardMedia>
        <CardContent>
          <Typography /*gutterBottom*/ variant="h4" >
            {props.title}
          </Typography>
          

          <Typography variant="body2" color="textSecondary" >
            {props.description}
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Chip icon={<CalendarMonthIcon />} size='small' label={<Typography variant='caption'>{props.datetime}</Typography>} />
          </Stack>
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}