import { useTMDBQuery } from "./useTMDBApi";

export function useTopGenreMedia(genreId: string, mediaType: "movie" | "tv") {
    return useTMDBQuery(`discover/${mediaType}`, {
        with_genres: genreId,
        sort_by: "popularity.desc",
    });
}
