import { useTMDBQuery } from "./useTMDBApi";

export function useAiringNowMovies() {
    return useTMDBQuery("movie/now_playing");
}
