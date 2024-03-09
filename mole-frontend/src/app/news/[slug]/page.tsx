import publicFetch from "@/lib/publicFetch";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Markdown from "@/components/Markdown";
import { stableImg } from "@/lib/outImg";
import { imgFormatsInterface } from "@/lib/commonInterfaces";
import HeroHeader from "@/components/heroHeader";
import RelatedArticles, { RelatedArticlesGrid, getRelatedArticles, relatedArticleInterface } from "@/components/relatedArticles";
import Box from "@mui/material/Box";
import { notFound } from 'next/navigation'
import type { Metadata, ResolvingMetadata } from 'next'
import { commonKeyWords } from "@/app/layout";


async function getArticleData(slug : string){
    const path=`/api/articles?filters[slug]=${slug}&populate=*`;
    const res  = await publicFetch(path);
    if(!Array.isArray(res.data) || res.data.length === 0){
        notFound();
    }
    return res.data[0]; 
}

export async function generateMetadata({params} : {params : {slug : string}}, parent: ResolvingMetadata): Promise<Metadata> {
    const articleData = await getArticleData(params.slug);
    if(!articleData){
        return({});
    }
    const imgUrl = stableImg(articleData.attributes.cover.data?.attributes, "large", "/match_placeholder.jpg");
    return({
        title: `${articleData.attributes.title}`,
        description: articleData.attributes.abstract,
        authors : articleData.attributes.author,
        keywords: commonKeyWords.concat(articleData.attributes.article_tags),
        openGraph: {
            title: articleData.attributes.title,
            description: articleData.attributes.abstract,
            type: 'article',
            publishedTime: articleData.attributes.publishedAt,
            authors: articleData.attributes.author,
            locale: 'it_IT',
            images: [
                {
                    url: imgUrl,
                    alt: articleData.attributes.cover.data?.attributes.alternativeText ? articleData.attributes.cover.data?.attributes.alternativeText : articleData.attributes.title
                }
            ]
          },
    })
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
            <Box sx={{display: { xs: 'block', sm: 'none' }}}>
                <RelatedArticles articles={relatedNews} />
            </Box>
            <Box sx={{display: { xs: 'none', sm: 'block' }}}>
                <RelatedArticlesGrid articles={relatedNews} lg={3} md={4} sm={6} />
            </Box>
        </Container>
        </>
    )
}

function NewsHeader(props : {title:string, author:string, date:Date, img?: imgFormatsInterface}){
    const imgUrl = stableImg(props.img, "medium", "/match_placeholder.jpg");
    const dateText = props.date.toLocaleDateString();
    return (
        <>
            <HeroHeader sx={{padding: "10px"}} src={imgUrl}>
                <Typography variant="h1" color="white" align="center">{props.title}</Typography>
                <Typography variant="h5" sx={{fontStyle: "italic"}} color="white">{props.author}</Typography>
                <Typography variant="subtitle1" color="white">{dateText}</Typography>
            </HeroHeader>
        </> 
    );
}