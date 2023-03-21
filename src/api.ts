const API_KEY = "4492803b36158e20fc91f0b4e2d80010";
const BASE_PATH = "https://api.themoviedb.org/3";
interface IMovieInfo {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
interface IMoviesInfo {
    dates: { maximum: string; minimum: string };
    page: number;
    results: IMovieInfo[];
    total_pages: number;
    total_results: number;
}
export function getMovies(): Promise<IMoviesInfo> {
    return fetch(
        `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    ).then((res) => res.json());
}
export default API_KEY;
export type { IMoviesInfo, IMovieInfo };
