import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";


export default function TeamCard(props){
    return(
        <Card sx={{
            MaxWidth:140,
            minWidth:140,
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
                <CardContent sx={props.noTitle ? {display:"none"} : {}}>
                    <Typography variant='h4' align="center">
                        {props.name}
                    </Typography>
                </CardContent>
            </CardActionArea>

        </Card>
    );
}