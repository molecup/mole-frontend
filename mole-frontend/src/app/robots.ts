import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
    const urlBase = process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : "https://molecup.com";

    return {
    rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/account/', '/cookie-policy', '/privacy-policy'],
    },
    sitemap: `${urlBase}/sitemap.xml`
    }
}