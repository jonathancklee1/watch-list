import { useQuery } from "@tanstack/react-query";

// Generic base hook for common TMDB logic
export function useTMDBQuery(
    endpoint: string,
    params: Record<string, string> = {},
) {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const url = new URL(`https://api.themoviedb.org/3/${endpoint}`);
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("language", "en-US");

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
    });

    return useQuery({
        queryKey: [endpoint, params],
        queryFn: () => fetch(url).then((res) => res.json()),
    });
}
