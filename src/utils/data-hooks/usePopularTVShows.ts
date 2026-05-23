import { useTMDBQuery } from "./useTMDBApi";

export function usePopularTVShows() {
    return useTMDBQuery("tv/popular?adult=false");
}
