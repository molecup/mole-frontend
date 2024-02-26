'server-only'

import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
    apiKey: process.env.GOOGLE_MAPS_TOKEN,
    version: 'weekly',
    libraries: ['places'],
  });
  export default loader;