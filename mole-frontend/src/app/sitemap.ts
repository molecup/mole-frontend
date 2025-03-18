import { tournamentInterface } from '@/lib/commonInterfaces';
import publicFetch from '@/lib/publicFetch';
import { MetadataRoute } from 'next';
import getConfig from "next/config";

 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const urlBase = process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : "https://molecup.com";
    const { publicRuntimeConfig } = getConfig();
    const buildDate = new Date(publicRuntimeConfig.buildDate);

    const [sitemapData, articleSlugs] = await Promise.all([getSitemapData(), getArticleSlugs()]) ;

    const lastDateOf = (pages: {lastModified? : Date|string, updatedAt?: Date|string}[]) : Date => {
        if(!Array.isArray(pages) || pages.length === 0){
            return buildDate;
        }
        return new Date(Math.max.apply(null, pages.map(function(e) {
            return new Date(e.lastModified || e.updatedAt || 0) as unknown as number;
          })));
    };


    const teamPages : MetadataRoute.Sitemap = sitemapData.flatMap((tournament) => {
        const tSlug = tournament.attributes.slug;

        return tournament.attributes.main_edition.data.attributes.team_editions?.data.map((teamEdition) => ({
            url: `${urlBase}/${tSlug}/team/${teamEdition.attributes.team.data.attributes.slug}`,
            lastModified: teamEdition.attributes.updatedAt,
            changeFrequency: 'weekly',
            priority: 0.5,
        }));
    }).filter((teamPage) => teamPage !== undefined) as MetadataRoute.Sitemap;

    const matchGroupPages: MetadataRoute.Sitemap = sitemapData.flatMap((tournament) => {
        const tSlug = tournament.attributes.slug;

        return tournament.attributes.main_edition.data.attributes.group_phases?.data.flatMap((groupPhase) => 
            (groupPhase.attributes.matches?.data.map((match) => ({
                url: `${urlBase}/${tSlug}/match/${match.id}`,
                lastModified: match.attributes.updatedAt,
                changeFrequency: 'monthly',
                priority: 0.4,
            })))
        );
    }).filter((matchPage) => matchPage !== undefined) as MetadataRoute.Sitemap;

    const matchKOPages: MetadataRoute.Sitemap = sitemapData.flatMap((tournament) => {
        const tSlug = tournament.attributes.slug;

        return tournament.attributes.main_edition.data.attributes.knock_out_phase?.data?.attributes.matches?.data.flatMap((match) => 
            ({
                url: `${urlBase}/${tSlug}/match/${match.id}`,
                lastModified: match.attributes.updatedAt,
                changeFrequency: 'monthly',
                priority: 0.4,
            })
        );
    }).filter((matchPage) => matchPage !== undefined) as MetadataRoute.Sitemap;

    const matchPages = matchGroupPages.concat(matchKOPages);

    const tournamentPages : MetadataRoute.Sitemap = sitemapData.map((tournament) => {
        const matches = matchPages.filter((match) => match.url.includes(tournament.attributes.slug));
        const lastUpdated = lastDateOf(matches);
        return({
            url: `${urlBase}/${tournament.attributes.slug}`,
            lastModified: lastUpdated,
            changeFrequency: 'weekly',
            priority: 0.9,
        });
    }
    );

    const articlePages : MetadataRoute.Sitemap = articleSlugs.map((articleSlug => {
        return({
            url: `${urlBase}/news/${articleSlug.slug}`,
            lastModified: articleSlug.updatedAt,
            changeFrequency: 'yearly',
            priority: 0.6,
        });
    }));


    const lastUpdatedArticle = lastDateOf(articlePages);
    const lastUpdatedMatch = lastDateOf(matchPages);

    const staticPages : MetadataRoute.Sitemap = [
        {
            url: `${urlBase}`,
            lastModified: buildDate,
            changeFrequency: 'yearly',
            priority: 1,
          },
          {
            url: `${urlBase}/news`,
            lastModified: lastUpdatedArticle,
            changeFrequency: 'weekly',
            priority: 0.8,
          },
    ];

  return staticPages.concat(tournamentPages, articlePages, teamPages, matchPages);
}

async function getSitemapData() : Promise<tournamentInterface[]> {
    const path = "/api/tournaments?populate[main_edition][populate][team_editions][populate][team]=1&populate[main_edition][populate][group_phases][populate][matches]=1&populate[main_edition][populate][knock_out_phase][populate][matches]=1";
    const res = await publicFetch(path);
    return res.data;
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