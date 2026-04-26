import { useTMDBQuery } from "./useTMDBApi";

export function usePopularMovies() {
    return useTMDBQuery("movie/popular");
}
