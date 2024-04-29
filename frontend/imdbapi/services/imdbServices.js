import { client } from "../imdbclient";

export async function fetchImdb({url}){
    const options = {
        method: 'GET',
        url: url,
        headers: {
            'X-RapidAPI-Key': 'ee8f2cfc00msh51a950f97794d08p135048jsn974877703753',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
        };
    
    const response = await client.request(options)
    console.log(response.data)

    return response.data
}