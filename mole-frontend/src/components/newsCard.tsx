import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Image from "@/components/image";
import Link from "next/link";
import Chip from '@mui/material/Chip';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import defaultImg from "@/public/static/match_placeholder.webp";
import { imgFormatsInterface, teamInterface } from "@/lib/commonInterfaces";
import { stableImg } from "@/lib/outImg";
import Stack from '@mui/material/Stack';
import dateTimeText from '@/lib/dateTimeText';


export interface newsCardInterface {
    title: string,
    date : Date,
    author : string,
    img? : imgFormatsInterface,
    abstract: string,
    url : string,
    initial? : boolean,
    elevation? : number
}

export default  function NewsCard({elevation=3, ...props} : newsCardInterface){
    const imgUrl = stableImg(props.img, "small", defaultImg);
    const [date, time] = dateTimeText(props.date);
  return (
    <Card sx={{
      MaxWidth: 230,
      minWidth: 230,
      transition: "transform 0.15s ease-in-out",
      "&:hover": { transform: "scale3d(0.98, 0.98, 1)" },
    }}
      id={props.initial ? 'initial' : undefined}
      elevation={elevation}
    >
      <CardActionArea LinkComponent={Link} href={props.url} >
        <CardMedia
          sx={{ height: "100px", backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          title="Match_placeholder"
        >
          <div style={{ position: 'relative', width: '100%', height: '100%', opacity: 0.9 }}>
            <Image alt="Article cover" src={imgUrl} blurDataURL={props.img?.placeholder} placeholder="blur" fill={true} style={{ objectFit: "cover" }} sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 12vw" />
          </div>
          
        </CardMedia>
        <CardContent>
            
            <Stack justifyContent={"flex-end"}>
                <Typography variant="h5" color="textPrimary" sx={{ textAlign: "center" }} textTransform="uppercase">{props.title}</Typography>
                <Typography variant="overline" color="textSecondary" sx={{ textAlign: "center" }}>{props.author}</Typography>
                <Typography variant="body2" >{props.abstract}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="flex-end" >
              <Chip icon={<CalendarMonthIcon />} size='small' label={<Typography variant='caption' color="textSecondary">{date}</Typography>} />
            </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}