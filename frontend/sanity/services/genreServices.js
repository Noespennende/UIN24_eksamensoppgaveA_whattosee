import { client } from "../client"

export async function fetchAllGenres(){
    const data = await client.fetch(`*[_type == "genres"]{
        "id": _id,
        genretitle,
        imdbid,
        "url": genreurl.current
    }`)
     return data
}