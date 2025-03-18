import publicFetch from '@/lib/publicFetch';
import type { Metadata, ResolvingMetadata } from 'next'

export async function getTournamentName(slug: string){
    const path = `/api/tournaments?filters[slug]=${slug}`;
    const res = await publicFetch(path);
    return res.data[0].attributes.name;
}

export async function generateMetadata({params} : {params : {slug : number, tSlug: string}}, parent: ResolvingMetadata): Promise<Metadata> {
    const tournamentName = await getTournamentName(params.tSlug);
    return ({
        title: {
        template: `%s - ${tournamentName} `,
        default: `${tournamentName}`,
      }
    })
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>
}