import { useEffect, useState } from "react"
import { fetchFavoriteGenresByUser } from "../../sanity/services/userServices"
import { Link } from "react-router-dom"

export default function CommonGenres({user1, user2}) {

    const [commonFavoriteGenres, setCommonFavoriteGenres] = useState([])

    // Sanity fetch -> setter commonFavoriteMovies -> alle filmer som to brukere har som favoritt
    const getCommonFavoriteGenresByUsers = async (user1, user2) => {
        const user1FavoriteGenres = (await fetchFavoriteGenresByUser(user1))
        const user2FavoriteGenres = (await fetchFavoriteGenresByUser(user2))
        const commonFavoriteGenres = []

        if (user1FavoriteGenres && user2FavoriteGenres) {
            // Prøvde sammenligne ._id, men da kom det en ikke-felles fra user1genre med i listen
            for (const user1genre of user1FavoriteGenres.favoriteGenres) {
                for (const user2genre of user2FavoriteGenres.favoriteGenres) {
                    if (user1genre.genretitle === user2genre.genretitle) {
                        commonFavoriteGenres.push(user1genre)
                        
                        break
                    }
                }
            }
        }

        setCommonFavoriteGenres(commonFavoriteGenres);
    }

    // "Initialiserer" getCommonFavoriteMoviesUsers()
    useEffect(() => {
        getCommonFavoriteGenresByUsers(user1, user2)
    }, [user2])

    return (
        <section>
                <h2>Utforsk!</h2>
                {(commonFavoriteGenres.length > 0) ? (<>
                <p>Dere liker begge disse sjangerne. Sjekk hvilke filmer som finnes å velge mellom:</p>
                <ul>
                    {commonFavoriteGenres?.map((genre, index) =>
                    <li key={index}><Link to={`/${genre.url}/genre`}>{genre.genretitle}</Link></li>
                    )}
                </ul> </>) : (<p>Dere har ingen felles favorittsjangere <span role="img" aria-label="Trist emoji">😞</span></p>)}
            </section>
    )
}