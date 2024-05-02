import { client } from "../client"

export async function fetchAllMovies(){
    const data = await client.fetch(`*[_type == "movies"]{
        movietitle,
        imdbid,
        "genre": genre->genretitle
    }`)
     return data
}

export async function fetchMoviesByGenre(genre){
    const data = await client.fetch(`*[_type == "movies" && genre->genreurl.current == $genre]{
        movietitle,
        imdbid
    }`, {genre})
    return data
}
