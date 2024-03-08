import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { imgFormatsInterface } from "@/lib/commonInterfaces";
import outImg from "@/lib/outImg";


export interface teamCardProps {
    url : string,
    name? : string,
    noTitle? : boolean,
    initial? : boolean,
    img : imgFormatsInterface | null,

}

export default function TeamCard(props : teamCardProps){
    const imgUrl = outImg(props.img?.formats.medium?.url, "/match_placeholder.jpg");
    return(
        <Card sx={{
            MaxWidth: props.noTitle? 140 : 180,
            minWidth: props.noTitle? 140 : 180,
            transition: "transform 0.15s ease-in-out",
            "&:hover": { transform: "scale3d(0.98, 0.98, 1)" }
            }} 
            id = {props.initial? 'initial': undefined}
            elevation={3}
          >
            <CardActionArea LinkComponent={Link} href={props.url}>
                <CardMedia 
                    sx={{height: "100px"}}
                    title="Match_placeholder"
                >
                    <div style={{ position: 'relative', width: '100%', height: '100%'}}>
                        <Image alt="Image placeholder" src={imgUrl}  fill={true} style={{objectFit: "fill"}} sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 12vw"/>
                    </div>
                    
                </CardMedia>
                <CardContent sx={props.noTitle ? {display:"none"} : {}}>
                    <Typography variant='h4' align="center">
                        {props.name}
                    </Typography>
                </CardContent>
            </CardActionArea>

        </Card>
    );
}