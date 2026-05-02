import { mapToValidMedia } from "../helpers/mapToValidMedia";
import type { MediaType } from "../types";
import { useTMDBQuery } from "./useTMDBApi";

export function useAiringNowMedia(mediaType: Omit<MediaType, "Anime">) {
    const endpoints = {
        movie: "movie/now_playing",
        tv: "tv/on_the_air",
        // anime: "seasons/now",
    };

    const tmdbData = useTMDBQuery(
        endpoints[mapToValidMedia(mediaType) as keyof typeof endpoints],
    );

    // Conditionally return based on mediaType

    return tmdbData;
}
