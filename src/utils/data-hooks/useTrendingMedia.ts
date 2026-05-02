import { useTMDBQuery } from "./useTMDBApi";

export function useTrendingMedia(
    mediaType: "movie" | "tv",
    timeWindow: "day" | "week" = "day",
) {
    return useTMDBQuery(`trending/${mediaType}/${timeWindow}`);
}
