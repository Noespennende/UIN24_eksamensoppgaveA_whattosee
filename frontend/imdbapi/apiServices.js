import { apiClient } from "./apiClient"

// Henter api-data for én film basert på imdbID
export const getMovieData = async (imdbID) => {
    const url = `https://moviesdatabase.p.rapidapi.com/titles/${imdbID}`
    return await fetch(url, apiClient)
    .then(response => response.json())
    .catch(error => console.error(error))
    
}

// Henter api-data for alle filmer i "moviesList"
export const getMoviesData = async (moviesList) => {
    const moviesData = []
    for (const movie of moviesList) {
        const movieData = await getMovieData(movie.imdbid); 
        moviesData.push(movieData.results)
    }
    return moviesData
    
}