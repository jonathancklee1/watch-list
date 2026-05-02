import { mapToValidMedia } from "../helpers/mapToValidMedia";
import type { MediaType } from "../types";
import { useJikan } from "./useJikan";
import { useTMDBQuery } from "./useTMDBApi";

export function useAiringNowMedia(mediaType: MediaType) {
    const endpoints = {
        movie: "movie/now_playing",
        tv: "tv/on_the_air",
        anime: "seasons/now",
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
