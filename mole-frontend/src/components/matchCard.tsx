/*
  using next/image component inside media card: https://stackoverflow.com/questions/68721497/how-to-use-next-js-image-inside-material-ui-card-media
*/

//import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import Chip from '@mui/material/Chip';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Avatar from '@mui/material/Avatar';
import defaultImg from "@/components/static_media/match_placeholder.jpg";
import { imgFormatsInterface, teamInterface } from "@/lib/commonInterfaces";
import outImg from "@/lib/outImg";
import Stack from '@mui/material/Stack';




/*
import VideocamIcon from '@mui/icons-material/Videocam';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CheckIcon from '@mui/icons-material/Check';
*/

export interface matchCardProps {
  url : string,
  teamA : teamInterface,
  teamB : teamInterface,
  league : string,
  date : string,
  time : string,
  scoreText : string,
  initial? : boolean,
  img : imgFormatsInterface | null,
}

export default function MatchCard(props : matchCardProps) {
  const imgUrl = outImg(props.img?.formats.medium.url, defaultImg);
  return (
    <Card sx={{
      MaxWidth: 200,
      minWidth: 200,
      transition: "transform 0.15s ease-in-out",
      "&:hover": { transform: "scale3d(0.98, 0.98, 1)" }
    }}
      id={props.initial ? 'initial' : undefined}
      elevation={3}
    >
      <CardActionArea LinkComponent={Link} href={props.url}>
        <CardMedia
          sx={{ height: "100px", backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          title="Match_placeholder"
        >
          <div style={{ position: 'relative', width: '100%', height: '100%', opacity: 0.9 }}>
            <Image alt="Image placeholder" src={imgUrl} fill={true} style={{ objectFit: "cover" }} sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 12vw" />
          </div>
        </CardMedia>
        <CardContent>
          <Stack direction='row' spacing={1} sx={{ justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h4" color="textPrimary" textTransform="uppercase">{props.teamA.short}</Typography>
            <Chip label={<Typography variant="button">{props.scoreText}</Typography>} />
            <Typography variant="h4" color="textPrimary" textTransform="uppercase">{props.teamB.short}</Typography>
          </Stack>
          <Stack>
            <Typography variant="overline" color="textSecondary" sx={{ textAlign: "center" }}>{props.league}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="flex-end">
            <Chip icon={<CalendarMonthIcon />} size='small' label={<Typography variant='caption' color="textSecondary">{props.date + " " + props.time}</Typography>} />
          </Stack>

        </CardContent>
      </CardActionArea>
    </Card>
  );
}

