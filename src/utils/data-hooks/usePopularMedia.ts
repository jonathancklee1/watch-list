import { useTMDBQuery } from "./useTMDBApi";

export function usePopularMedia(mediaType: "movie" | "tv") {
    return useTMDBQuery(`${mediaType}/popular?adult=false`);
}
