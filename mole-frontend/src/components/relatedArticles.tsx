import publicFetch from "@/lib/publicFetch";
import CardSlider from "./cardSlider";
import NewsCard from "./newsCard";
import { imgFormatsInterface } from "@/lib/commonInterfaces";
import Grid from '@mui/material/Unstable_Grid2';


export interface relatedArticleInterface {
    id : number,
    attributes : {
        date: string,
        title: string,
        author: string,
        abstract: string,
        slug: string,
        cover: {
            data? : {
                id : number,
                attributes : imgFormatsInterface
            }
        }
        article_tags : {
            data: {
                id: number,
                attributes: {
                    name: string
                }
            }[]
        }
    }
}

export async function getAllArticles(): Promise<relatedArticleInterface[]>{
    const path = `/api/articles?sort[0]=date:desc&populate[cover]=1&populate[article_tags][fields][0]=id&populate[article_tags][fields][1]=name&fields[0]=title&fields[1]=author&fields[2]=date&fields[3]=abstract&fields[4]=slug`;
    const res  = await publicFetch(path);
    return res.data;
}

export async function getRelatedArticles(tags : {id : number}[]) : Promise<relatedArticleInterface[]>{
    if(tags.length === 0){
        return [];
    }
    const idsFilter = "".concat(...tags.map((tag : {id : number}, i : number) : string => {
        return `&filters[article_tags][id][$in][${i}]=${tag.id}`;
    }));
    const path = `/api/articles?sort[0]=date:desc${idsFilter}&populate[cover]=1&populate[article_tags][fields][0]=id&populate[article_tags][fields][1]=name&fields[0]=title&fields[1]=author&fields[2]=date&fields[3]=abstract&fields[4]=slug`;
    const res  = await publicFetch(path);
    return res.data;
}

export default function RelatedArticles({articles, ...otherProps} : {articles: relatedArticleInterface[], [index: string]: any}){
    return(
        <>
        <CardSlider {...otherProps}>
            {articles.map((article : relatedArticleInterface, i : number) => 
                <NewsCard
                    key={i}
                    title = {article.attributes.title}
                    author = {article.attributes.author}
                    abstract = {article.attributes.abstract}
                    date = {new Date(article.attributes.date)}
                    url = {"/news/"+article.attributes.slug}
                    initial = {i === 0}
                    img= {article.attributes.cover.data?.attributes}
                />
            )}
        </CardSlider>
        </>
    );
}

export function RelatedArticlesGrid({articles, xs=12, sm=6, md=6, lg=6, ...otherProps} : {articles: relatedArticleInterface[], [index: string]: any}){
    return(
        <div>
            <Grid container spacing={1} sx={{padding:"5px"}}>
            {articles.map((article : relatedArticleInterface, i : number) => 
                <Grid lg={lg} md={md} sm={sm} xs={xs} key={i}>
                    <NewsCard
                        title = {article.attributes.title}
                        author = {article.attributes.author}
                        abstract = {article.attributes.abstract}
                        date = {new Date(article.attributes.date)}
                        url = {"/news/"+article.attributes.slug}
                        initial = {i === 0}
                        img= {article.attributes.cover.data?.attributes}
                        elevation={0}
                    />
                </Grid>
            )}
            </Grid>
        </div>
    );
}