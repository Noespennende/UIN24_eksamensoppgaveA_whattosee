import { client, writeClient } from "../client"

export async function fetchWishlistMoviesByUser(username) {
    const data = await client.fetch(`*[_type == "users" && username == $username]{
        wishlist[]->{
            imdbid,
            movietitle
        }
    }`, { username: username })
    return data[0]
}

export async function fetchFavoriteMoviesByUser(username) {
    const data = await client.fetch(`*[_type == "users" && username == $username]{
        favoriteMovies[]->{
            imdbid
        }
    }`, { username: username })
    return data[0]
}

export async function fetchFavoriteGenresByUser(username) {
    const data = await client.fetch(`*[_type == "users" && username == $username]{
        favoriteGenres[]->{
            genretitle,
            "url": genreurl.current
        }
    }`, { username: username })
    return data[0]
}


// Kommentert ut gammel fetchFavoriteGenresByUser -> I tilfellet det ikke funker helt enda
/*
export async function fetchFavoriteGenresByUser(username) {
    const data = await client.fetch(`*[_type == "users" && username == $username]{
        "favorites": favoriteGenres[]->genretitle
    }`, { username: username })
    return data
}
*/

export async function addFavoriteGenreToUser(userId, genreId) {
    const result = await writeClient
        .patch(userId).setIfMissing({ favoriteGenres: [] })
        .append("favoriteGenres", [{ _type: "reference", _ref: genreId }])
        .commit({ autoGenerateArrayKeys: true })
        .then(() => { return "sucess" })
        .catch((error) => { return "Error: " + error.message })
    return result
}

export async function removeFavoriteGenreromUser(userId, genreId) {
    const result = await writeClient
        .patch(userId).setIfMissing({ favoriteGenres: [] })
        .unset([`favoriteGenres[_ref=="${genreId}"]`])
        .commit()
        .then(() => { return "sucess" })
        .catch((error) => { return "Error: " + error.message })
    return result
}

export async function fetchUserId(userName) {
    const data = await client.fetch(`*[_type == "users" && username == $username]{
        "id": _id
    }`, { username: userName })

    return data
}


/*
export async function fetchCommonWishlistMoviesForUsers(user1Wishlist, user2Wishlist){
    // prøver fortsatt slå sammen spørringer .. 🤓
}
*/
