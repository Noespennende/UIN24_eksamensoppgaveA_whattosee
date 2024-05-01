
export default function DashMovieCard({movie}) {

    if (movie) {
        return (
            <article>
                <p>{movie.id}</p>
                <p>{movie.originalTitleText.text}</p>
                <img src={movie.primaryImage.url} alt={`${movie.originalTitleText.text} cover image`}/>
                
            </article>
            
        )
    } else {
        return null
    }
}