'server only'

/*
This function fetches data from public accesible APIs (when user authentication is not needed)
@params path : string . It's the path for the api. Ex. /api/league-standings/mole-cup
@return a json response
*/
export default async function publicFetch(path : string){
    const request = process.env.API_URL + path;
    const token = process.env.API_TOKEN;
    const res = await fetch(request, {
        headers: {Authorization: `Bearer ${token}`}
    });
    if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
    }

    return res.json();
}