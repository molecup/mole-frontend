'use client'
/*
reference: https://lonare.medium.com/how-to-integrate-google-maps-with-marker-on-my-react-next-js-website-with-address-4741d69e6324
*/

import Box from '@mui/material/Box';

import { useState, useEffect } from 'react';
import loader from '@/lib/googleMapsLoader';
import generateGoogleMapsLink from '@/lib/generateGoggleMapsLink';

const Map = ({ address, mapHeight="400px", id="map", ...props }) => {
    const [map, setMap] = useState(null);
    useEffect(() => {
      loader.importLibrary('places').then(() => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK') {
            const mapOptions = {
              center: results[0].geometry.location,
              zoom: 15,
            };
            const newMap = new window.google.maps.Map(
              document.getElementById(id),
              mapOptions
            );
            const marker = new window.google.maps.Marker({
              position: results[0].geometry.location,
              url: generateGoogleMapsLink(address),
              map: newMap,
            });
            google.maps.event.addListener(marker, 'click', function() {
              window.location.href = this.url;
            });
            setMap(newMap);
          }
        });
      });
    }, [address]);
    return <Box id={id} sx={{ height: mapHeight, ...props.sx }}></Box>;
  };
  export default Map;