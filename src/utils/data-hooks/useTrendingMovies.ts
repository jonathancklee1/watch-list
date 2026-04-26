import { useTMDBQuery } from "./useTMDBApi";

export function useTrendingMovies(timeWindow: "day" | "week" = "day") {
    return useTMDBQuery(`trending/movie/${timeWindow}`);
}
