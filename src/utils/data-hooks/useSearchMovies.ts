import { useTMDBQuery } from "./useTMDBApi";

export function useSearchMovies(query: string, page = 1) {
    return useTMDBQuery("search/movie", { query, page: page.toString() });
}
