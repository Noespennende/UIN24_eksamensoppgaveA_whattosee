export async function fetchByImdbId({imdbId, setMovie}){
    const url = 'https://moviesdatabase.p.rapidapi.com/titles/tt0086250';
    const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ee8f2cfc00msh51a950f97794d08p135048jsn974877703753',
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
            setMovie(result)
        } catch (error) {
            console.error(error);
        }
}
