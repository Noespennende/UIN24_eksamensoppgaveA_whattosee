import { Link } from "react-router-dom";
import { RxStar } from "react-icons/rx";
import { RxStarFilled } from "react-icons/rx";
import { addFavoriteGenreToUser, removeFavoriteGenreromUser } from "../../sanity/services/userServices";
import { useState } from "react";

export default function GenreCard({title, genreId, url, userGenres, userId}){

    const handleAddToFavoriteClick = async (element) => {
        const result = await addFavoriteGenreToUser(userId, genreId)
        
    }

    const handleRemoveFromFavoriteClick = async (element) => {
        const result = await removeFavoriteGenreromUser(userId, genreId)
    }


    return(
        <article>
            <Link to={`/${url}/genre`}>{title}</Link>
            {(userGenres.includes(title)) ? (<section id="favoirite"><button onClick={handleRemoveFromFavoriteClick}><RxStarFilled /> Favorittsjanger</button></section>) : (<section id="notFavorite"><button onClick={handleAddToFavoriteClick}><RxStar /> Legg til favoritter</button></section>)}
        </article>
    )
}