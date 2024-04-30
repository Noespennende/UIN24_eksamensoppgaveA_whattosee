import { client } from "../client"

export async function fetchAllGenres(){
    const data = await client.fetch(`*[_type == "genres"]{
        genretitle,
        imdbid,
        "url": genreurl.current
    }`)
    console.log(data)
     return data
}