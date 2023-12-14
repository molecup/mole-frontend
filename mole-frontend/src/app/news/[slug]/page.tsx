import publicFetch from "@/lib/publicFetch";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Markdown from "@/components/Markdown";
import outImg from "@/lib/outImg";
import { imgFormatsInterface } from "@/lib/commonInterfaces";
import HeroHeader from "@/components/heroHeader";
import defaultImg from "@/components/static_media/match_placeholder.jpg";
import RelatedArticles, { getRelatedArticles, relatedArticleInterface } from "@/components/relatedArticles";

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
    const relatedNews = (await getRelatedArticles(articleData.attributes.article_tags.data))
        .filter((x : relatedArticleInterface) => x.id != articleData.id);
    return(
        <>
        <NewsHeader 
            title={articleData.attributes.title} 
            author={articleData.attributes.author} 
            date={new Date(articleData.attributes.date)}
            img={articleData.attributes.cover.data?.attributes}
        />
        <Container sx = {{marginBottom:"20px", marginTop:"20px"}}>
            <Markdown >
                {articleData.attributes.content}
            </Markdown>
        </Container>
        <Container>
            <Typography variant="h2">Articoli correlati</Typography>
            <RelatedArticles articles={relatedNews} />
        </Container>
        </>
    )
}

function NewsHeader(props : {title:string, author:string, date:Date, img?: imgFormatsInterface}){
    const imgUrl = outImg(props.img?.formats.medium.url, "/match_placeholder.jpg");
    const dateText = props.date.toLocaleDateString();
    return (
        <>
            <HeroHeader sx={{padding: "10px"}} src={imgUrl}>
                <Typography variant="h1" color="white">{props.title}</Typography>
                <Typography variant="h5" sx={{fontStyle: "italic"}} color="white">{props.author}</Typography>
                <Typography variant="subtitle1" color="white">{dateText}</Typography>
            </HeroHeader>
        </> 
    );
}