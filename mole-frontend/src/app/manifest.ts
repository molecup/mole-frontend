import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mole Cup - sito ufficiale',
    short_name: 'Mole Cup',
    description: 'Sito ufficiale della Mole Cup, il torneo più amato dagli studenti',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/icon1.svg',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}