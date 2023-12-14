import publicFetch from "@/lib/publicFetch";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

async function getArticleData(slug : string){
    const path=`/api/articles?filters[slug]=${slug}&populate=*`;
    const res  = await publicFetch(path);
    if(Array.isArray(res) || res.length === 0){
        throw new Error("Pagina non trovata");
    }
    return res.data[0]; 
}

export default async function NewsArticlePage({params} : {params : {slug : string}}){
    const articleData = await getArticleData(params.slug);
    return(
        <Container sx={{textAlign : "center"}}>
            <Typography variant="h1">{articleData.attributes.title}</Typography>
            <Typography variant="subtitle1" textAlign={"center"}>{articleData.attributes.author}</Typography>
            <Paper>
                
            </Paper>
        </Container>
    )
}