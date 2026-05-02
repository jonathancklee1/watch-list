import { useQueries, type UseQueryResult } from "@tanstack/react-query";

export function useTopGenresAnime(genreIds: string[]): UseQueryResult[] {
    const queries = genreIds.map((genreId) => {
        return {
            queryKey: ["jikan", "anime", genreId],
            queryFn: () => {
                const url = new URL("https://api.jikan.moe/v4/anime");
                url.searchParams.set("genres", genreId);
                return fetch(url).then((res) => res.json());
            },
        };
    });

    return useQueries({ queries });
}
