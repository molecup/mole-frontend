import publicFetch from '@/lib/publicFetch';
import { MetadataRoute } from 'next';
import getConfig from "next/config";

 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const urlBase = process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : "https://molecup.com";
    const { publicRuntimeConfig } = getConfig();
    const buildDate = new Date(publicRuntimeConfig.buildDate);

    const [teamSlugs, matchIds, articleSlugs] = await Promise.all([getTeamSlugs(), getMatchIds(), getArticleSlugs()]) ;
    const teamPages : MetadataRoute.Sitemap = teamSlugs.map((teamSlug => {
        return({
            url: `${urlBase}/team/${teamSlug.slug}`,
            lastModified: teamSlug.updatedAt,
            changeFrequency: 'weekly',
            priority: 0.5,
        });
    }));

    const matchPages : MetadataRoute.Sitemap = matchIds.map((matchId => {
        return({
            url: `${urlBase}/match/${matchId.id}`,
            lastModified: matchId.updatedAt,
            changeFrequency: 'weekly',
            priority: 0.4,
        });
    }));

    const articlePages : MetadataRoute.Sitemap = articleSlugs.map((articleSlug => {
        return({
            url: `${urlBase}/news/${articleSlug.slug}`,
            lastModified: articleSlug.updatedAt,
            changeFrequency: 'yearly',
            priority: 0.6,
        });
    }));

    /*@ts-ignore*/
    const lastUpdatedArticle = new Date(Math.max.apply(null, articleSlugs.map(function(e) {
        return new Date(e.updatedAt);
      })));

    /*@ts-ignore*/
    const lastUpdatedMatch = new Date(Math.max.apply(null, matchIds.map(function(e) {
    return new Date(e.updatedAt);
    })));

    const staticPages : MetadataRoute.Sitemap = [
        {
            url: `${urlBase}`,
            lastModified: buildDate,
            changeFrequency: 'yearly',
            priority: 1,
          },
          {
            url: `${urlBase}/molecup`,
            lastModified: lastUpdatedMatch,
            changeFrequency: 'weekly',
            priority: 0.9,
          },
          {
            url: `${urlBase}/news`,
            lastModified: lastUpdatedArticle,
            changeFrequency: 'weekly',
            priority: 0.8,
          },
    ];

  return staticPages.concat(articlePages, teamPages, matchPages);
}

async function getTeamSlugs() : Promise<{slug: string, updatedAt: string}[]>{
    const path = "/api/teams";
    const res  = await publicFetch(path);
    if(!Array.isArray(res.data) || res.data.length === 0){
        return [];
    }
    return res.data.map((team : {attributes : {slug : string, updatedAt : string}}) => {
        return({
            slug : team.attributes.slug, 
            updatedAt : team.attributes.updatedAt
        })
    });
}

async function getMatchIds() : Promise<{id: number, updatedAt: string}[]>{
    const path = "/api/matches";
    const res  = await publicFetch(path);
    if(!Array.isArray(res.data) || res.data.length === 0){
        return [];
    }
    return res.data.map((match : {id : number, attributes : {updatedAt : string}}) => {
        return({
            id : match.id, 
            updatedAt : match.attributes.updatedAt
        })
    });
}

async function getArticleSlugs() : Promise<{slug: string, updatedAt: Date}[]>{
    const path = "/api/articles";
    const res  = await publicFetch(path);
    if(!Array.isArray(res.data) || res.data.length === 0){
        return [];
    }
    return res.data.map((article : {attributes : {slug : string, updatedAt : string}}) => {
        return({
            slug : article.attributes.slug, 
            updatedAt : article.attributes.updatedAt
        })
    });
}