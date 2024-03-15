import Script from 'next/script'
import { Thing, WithContext } from 'schema-dts';

export default function JsonLd<T extends Thing>(json: WithContext<T>, id : string) : JSX.Element{
    return(
        <Script
            type="application/ld+json"
            id={id}
            dangerouslySetInnerHTML={{ __html: JSON.stringify({json}) }}
        />
    );
}