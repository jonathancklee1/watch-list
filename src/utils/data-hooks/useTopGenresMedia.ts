import { useQueries, type UseQueryResult } from "@tanstack/react-query";

export function useTopGenresMedia(
    genreIds: string[],
    mediaType: "movie" | "tv",
): UseQueryResult[] {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    const queries = genreIds.map((genreId) => ({
        queryKey: ["discover", mediaType, genreId],
        queryFn: () => {
            const url = new URL(
                `https://api.themoviedb.org/3/discover/${mediaType}`,
            );
            url.searchParams.set("api_key", apiKey);
            url.searchParams.set("language", "en-US");
            url.searchParams.set("with_genres", genreId);
            url.searchParams.set("sort_by", "popularity.desc");
            return fetch(url).then((res) => res.json());
        },
    }));

    return useQueries({ queries });
}
