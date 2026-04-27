import type { MediaType } from "../types";
import { useTMDBQuery } from "./useTMDBApi";

export function useSearchMovies(mediaType: MediaType, query: string, page = 1) {
    let validMediaType = "";
    switch (mediaType) {
        case "Movies":
            validMediaType = "movie";
            break;
        case "TV Shows":
            validMediaType = "tv";
            break;
        case "Anime":
            validMediaType = "anime";
            break;
    }
    return useTMDBQuery(`search/${validMediaType}`, {
        query,
        page: page.toString(),
    });
}
