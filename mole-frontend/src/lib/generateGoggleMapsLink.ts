export default function generateGoogleMapsLink(address : string){
    const base = "https://www.google.com/maps/search/?api=1";
    const query= "&query=" + encodeURI(address);
    return base + query;
}