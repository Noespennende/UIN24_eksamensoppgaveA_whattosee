import { useParams } from "react-router-dom";
import { fetchWishlistMoviesByUser } from "../../sanity/services/userServices";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";

export default function Dashboard() {

    const {slug} = useParams()

    const[wishlist, setWishlist] = useState()

    const getWishlistMovies = async (slug) => {
        const movies = await fetchWishlistMoviesByUser(slug);
        setWishlist(movies)
    }

    useEffect(()=>{
        getWishlistMovies(slug)
        console.log("Test: ", wishlist)
    }, [slug])

    


    return(
        <main>
            <h1>Forslag for Bruker1 og Bruker2</h1>
            <section>
                <h2>Catch up!</h2>
                <MovieCard/>
            </section>
            <section>
                <h2>Go safe!</h2>
                <MovieCard/>
            </section>
            <section>
                <h2>Utforsk!</h2>
                <MovieCard/>
            </section>
        </main>
        
    )
}