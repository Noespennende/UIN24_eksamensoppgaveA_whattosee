import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { fetchFavoriteMoviesByUser } from "../../sanity/services/userServices";
import { getMoviesData } from "../../imdbapi/apiServices";

export default function CommonFavories({user1, user2}) {
 
    const [commonFavoriteMovieIDs, setCommonFavoriteMovieIDs] = useState([])
    const [commonFavoriteMoviesData, setcommonFavoriteMoviesData] = useState([])

    // Sanity fetch -> setter commonFavoriteMovies -> alle filmer som to brukere har som favoritt
    const getCommonFavoriteMoviesForUsers = async (user1, user2) => {
        const user1FavoriteMovieIDs = await fetchFavoriteMoviesByUser(user1)
        const user2FavoriteMovieIDs = await fetchFavoriteMoviesByUser(user2)

        const commonFavoriteMovieIDs = []

        if (user1FavoriteMovieIDs.favoriteMovies && user2FavoriteMovieIDs.favoriteMovies) {
            for (const user1movie of user1FavoriteMovieIDs.favoriteMovies) {
                for (const user2movie of user2FavoriteMovieIDs.favoriteMovies) {
                    if (user1movie.imdbid === user2movie.imdbid) {
                        commonFavoriteMovieIDs.push(user1movie)
                        
                        break
                    }
                }
            }
        }

        setCommonFavoriteMovieIDs(commonFavoriteMovieIDs);
    }

    // "Initialiserer" getCommonFavoriteMoviesUsers()
    useEffect(() => {
        getCommonFavoriteMoviesForUsers(user1, user2)
    }, [user2])


    // "Initialiserer" getMoviesData() for å hente alle filmer, og bruker "felles favorittfilmer" listen
    useEffect(() => {
        getMoviesData(commonFavoriteMovieIDs)
        .then(data => {
            setcommonFavoriteMoviesData(data)
        })
    }, [commonFavoriteMovieIDs])


    return (
        <section>
                <h2>Go safe!</h2>
                {commonFavoriteMoviesData.length > 1 || commonFavoriteMoviesData.length == 0
                ? (<p>Dere har {commonFavoriteMoviesData.length} filmer felles i favorittlisten deres.</p>) 
                : <p>Dere har {commonFavoriteMoviesData.length} film felles i favorittlisten deres.</p>
                }
                {commonFavoriteMoviesData?.map((movie, index) => 
                <MovieCard key={index} movie={movie} className="favoritesDash"/>)}
            </section>
    )
}