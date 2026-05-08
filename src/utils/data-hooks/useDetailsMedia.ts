import { useTMDBQuery } from "./useTMDBApi";

export function useMediaDetails(mediaType: "movie" | "tv", id: string) {
    return useTMDBQuery(`${mediaType}/${id}`);
}
