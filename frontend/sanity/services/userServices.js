import { client } from "../test"

export async function fetchWishlistMoviesByUser(slug){
    const data = await client.fetch(`*[_type == "users" && username == $slug]{
        username,
        "wishlistMovies": wishlist->{
            imdbid
        }
    }`, {slug : slug})
     return data
}
