import Script from 'next/script'
import Head from 'next/head'
import { Thing, WithContext } from 'schema-dts';

export default function JsonLd<T extends Thing>(json: WithContext<T>){
    return(
        <Head>
            <Script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
            />
        </Head>
        
    );
}