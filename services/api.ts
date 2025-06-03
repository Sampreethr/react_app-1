export const TMDB_CONFIG = {
    BASE_URL : 'https://api.themoviedb.org/3',
    API_KEY :process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers : {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovies = async ({query}: {query: string}) =>{
    const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint,{
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if(!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;

}





//const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
//const options = {
//  method: 'GET',
//  headers: {
//    accept: 'application/json',
//    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTAyODUzNmQ0YjQwMzEyYjYwMWM4ZTk1MTg4ZjA2MSIsIm5iZiI6MTc0ODg2MzA3Mi41MzksInN1YiI6IjY4M2Q4ODYwYjZjODdkYmYwNWZkYjUyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jtrmTVwuE-wvBk0XV46DTdW-wwie53zsz-PEV64PByM'
//  }
//};

//fetch(url, options)
//  .then(res => res.json())
//  .then(json => console.log(json))
//  .catch(err => console.error(err));