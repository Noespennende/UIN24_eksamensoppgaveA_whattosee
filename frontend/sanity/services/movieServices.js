import { client } from "../test"

export async function fetchAllMovies(){
    const data = await client.fetch(`*[_type == "movies"]{
        movietitle,
        id
    }`)
     return data
}
