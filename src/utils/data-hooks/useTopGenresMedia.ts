import { useQueries, type UseQueryResult } from "@tanstack/react-query";
import type { MediaType } from "../types";
import { mapToValidMedia } from "../helpers/mapToValidMedia";

export function useTopGenresMedia(
    genreIds: string[],
    mediaType: MediaType,
): UseQueryResult[] {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    const queries = genreIds.map((genreId) => {
        if (mediaType === "Anime") {
            return {
                queryKey: ["jikan", "anime", genreId],
                queryFn: () => {
                    const url = new URL("https://api.jikan.moe/v4/anime");
                    url.searchParams.set("genres", genreId);
                    return fetch(url).then((res) => res.json());
                },
            };
        } else {
            return {
                queryKey: ["discover", mediaType, genreId],
                queryFn: () => {
                    const url = new URL(
                        `https://api.themoviedb.org/3/discover/${mapToValidMedia(mediaType)}`,
                    );
                    url.searchParams.set("api_key", apiKey);
                    url.searchParams.set("language", "en-US");
                    url.searchParams.set("with_genres", genreId);
                    url.searchParams.set("sort_by", "popularity.desc");
                    return fetch(url).then((res) => res.json());
                },
            };
        }
    });

    return useQueries({ queries });
}
