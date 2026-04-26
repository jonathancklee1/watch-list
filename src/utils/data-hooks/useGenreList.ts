import { useTMDBQuery } from "./useTMDBApi";

export function useGenreList() {
    return useTMDBQuery("genre/movie/list");
}
