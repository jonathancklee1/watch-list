import type { MediaType } from "../types";
import { useTMDBQuery } from "./useTMDBApi";

export function useAiringNowMedia(mediaType: Omit<MediaType, "Anime">) {
    const endpoints = {
        movie: "movie/now_playing?adult=false",
        tv: "tv/on_the_air?adult=false",
        // anime: "seasons/now",
    };

    const tmdbData = useTMDBQuery(
        endpoints[mediaType as keyof typeof endpoints],
    );

    // Conditionally return based on mediaType

    return tmdbData;
}
