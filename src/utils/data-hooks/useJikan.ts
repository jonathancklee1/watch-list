import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export function useJikan<TData = unknown>(
    endpoint: string,
    params: Record<string, string> = {},
    options?: Omit<
        UseQueryOptions<unknown, unknown, TData>,
        "queryKey" | "queryFn"
    >,
) {
    const url = new URL(`https://api.jikan.moe/v4/${endpoint}`);

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
    });

    return useQuery<unknown, unknown, TData>({
        queryKey: [endpoint, params],
        queryFn: () => fetch(url).then((res) => res.json()),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        ...options,
    });
}
