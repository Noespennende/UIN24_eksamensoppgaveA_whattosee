import { Link } from "react-router-dom";
import { RxStar } from "react-icons/rx";
import { RxStarFilled } from "react-icons/rx";
import { addFavoriteGenreToUser, removeFavoriteGenreromUser } from "../../sanity/services/userServices";

export default function GenreCard({title, genreId, url, userGenres, userId, index, setChange}){

    const handleAddToFavoriteClick = async () => {
        document.getElementById(`addFavorite${index}`).outerHTML = "<p>Lagt til favoritter</p>"
        const result = await addFavoriteGenreToUser(userId, genreId)
        setChange({index})

        
    }

    const handleRemoveFromFavoriteClick = async () => {
        document.getElementById(`removeFavorite${index}`).outerHTML = "<p>Fjernet fra favorites</p>"
        const result = await removeFavoriteGenreromUser(userId, genreId)
        setChange({index})
    }

    return(
        <article>
            <Link to={`/${url}/genre`}>{title}</Link>
            {(userGenres.favoriteGenres.some(genre => genre.genretitle === title)) ?
            (<button id={`removeFavorite${index}`} onClick={() =>handleRemoveFromFavoriteClick()}><RxStarFilled /> Favorittsjanger</button>)
            :
            (<button id={`addFavorite${index}`} onClick={() => handleAddToFavoriteClick()}><RxStar /> Legg til favoritter</button>)}
        </article>
    )
}