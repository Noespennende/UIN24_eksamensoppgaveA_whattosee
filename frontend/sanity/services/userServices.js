import { client } from "../client"

export async function fetchWishlistMoviesByUser(username){
    const data = await client.fetch(`*[_type == "users" && username == $username]{
        wishlist[]->{
            imdbid
        }
    }`, {username : username})
     return data[0]
}

/*
export async function fetchCommonWishlistMoviesForUsers(user1Wishlist, user2Wishlist){
    // prøver fortsatt slå sammen spørringer .. 🤓
}
*/
