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

export default function MatchCard(props) {
  return (
    <Card sx={{maxWidth: 200}} elevation={3}>
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
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}