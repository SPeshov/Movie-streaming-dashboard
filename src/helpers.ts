export const BASE_API = "https://wookie.codesubmit.io/movies";
export const BASE_API_KEY = "Wookie2021";

export type ResponseData = { data: { movies: Movie[] } };
export type Movie = {
    genres: [string];
    backdrop: string;
    title: string;
    overview: string;
    id: string;
    poster: string;
    imdb_rating: number;
  };

export const  getMovies = async ({search}:{search: string}):Promise<ResponseData>  => {
    try {
        const response = await fetch(`${BASE_API}${search ? `?q=${search}` : ""}`, {
            method: "get",
            headers: new Headers({
              Authorization: `Bearer ${BASE_API_KEY}`,
            }),
          });
          const data = await response.json();
    
          return data
    } catch (error) {
        throw new Error('something went wrong')
    }
   
}

// groupe movies by genre
export const groupeByGenre = ({ movies }: {movies: Movie[]}) => {

  let moviesByGenre: any = [];

  movies.forEach((movie) => {
    movie.genres.forEach((genre) => {
      if (typeof moviesByGenre[genre] === "undefined") {
        moviesByGenre[genre] = [];
      }
      moviesByGenre[genre].push(movie);
    });
  });
  return moviesByGenre;
};