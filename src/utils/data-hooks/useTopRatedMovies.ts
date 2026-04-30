import { useTMDBQuery } from "./useTMDBApi";

export function useTopRatedMovies() {
    return useTMDBQuery("movie/top_rated");
}
