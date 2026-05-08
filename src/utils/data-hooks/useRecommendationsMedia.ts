import { useTMDBQuery } from "./useTMDBApi";

export function useMediaRecommendations(mediaType: "movie" | "tv", id: string) {
    return useTMDBQuery(`${mediaType}/${id}/recommendations`);
}
