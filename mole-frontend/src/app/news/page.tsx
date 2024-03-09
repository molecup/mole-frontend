import { RelatedArticlesGrid, getAllArticles } from "@/components/relatedArticles";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import HeroHeader from "@/components/heroHeader";


export default async function News(){
    const news = await getAllArticles();
    return(
        <>
        <HeroHeader src="/DSC_0666-3.jpg">
            <Typography variant="h1" color="white" textTransform="uppercase">Notizie</Typography>
        </HeroHeader>
        
        <Container sx={{display:"flex", flexDirection:"column", minHeight:"40vh"}}>
            <RelatedArticlesGrid articles={news} xs={12} sm={6} md={4} lg={3}/>
        </Container>
        </>
    )
}