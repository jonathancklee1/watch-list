import { useQueries, type UseQueryResult } from "@tanstack/react-query";
import type { MediaType } from "../types";

export function useTopGenresMedia(
    genreIds: string[],
    mediaType: Omit<MediaType, "Anime">,
): UseQueryResult[] {
    const apikey = import.meta.env.VITE_TMDB_API_KEY;
    const queries = genreIds.map((genreId) => {
        return {
            queryKey: ["tmdb", genreId],
            queryFn: () => {
                const url = new URL(
                    `https://api.themoviedb.org/3/discover/${mediaType}`,
                );
                url.searchParams.set("with_genres", genreId);
                url.searchParams.set("api_key", apikey);
                return fetch(url).then((res) => res.json());
            },
        };
    });

    return useQueries({ queries });
}
