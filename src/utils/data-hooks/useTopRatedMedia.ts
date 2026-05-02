import { mapToValidMedia } from "../helpers/mapToValidMedia";
import type { MediaType } from "../types";
import { useJikan } from "./useJikan";
import { useTMDBQuery } from "./useTMDBApi";

export function useTopRatedMedia(mediaType: MediaType) {
    const endpoints = {
        movie: "movie/top_rated",
        tv: "tv/top_rated",
        anime: "top/anime",
    };

    // Always call both hooks to follow rules of hooks
    const jikanData = useJikan(endpoints.anime);
    const tmdbData = useTMDBQuery(endpoints[mapToValidMedia(mediaType)]);

    // Conditionally return based on mediaType
    if (mediaType === "Anime") {
        return jikanData;
    }
    return tmdbData;
}
