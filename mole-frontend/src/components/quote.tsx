import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';

export default function Quote({children}: {children:string}){
    return(
        <Stack direction="row" spacing={2} sx={{alignSelf: "center"}}>
            <FormatQuoteRoundedIcon sx={{color: "text.secondary", display:"inline-block"}}/>
            <Typography variant="body1" color="text.secondary" sx={{display:"inline-block"}}>{children}</Typography>
            <FormatQuoteRoundedIcon sx={{color: "text.secondary", display:"inline-block"}}/>
        </Stack>
    )
}