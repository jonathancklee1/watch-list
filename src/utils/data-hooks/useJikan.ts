import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export function useJikan<TData = unknown>(
    endpoint: string,
    params: Record<string, string> = {},
    options?: Omit<
        UseQueryOptions<unknown, Error & { status?: number }, TData>,
        "queryKey" | "queryFn"
    >,
) {
    const url = new URL(`https://api.jikan.moe/v4/${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
    });

    return useQuery<unknown, Error & { status?: number }, TData>({
        queryKey: [endpoint, params],
        queryFn: () => fetchJikan(url.toString()),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: (error) => {
            if (error === 504) {
                return true;
            }
            return false;
        },
        ...options,
    });
}

const fetchJikan = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
        // Create an error and append the status code for React Query to read
        const error = new Error(
            `Something went wrong with the Jikan API: ${res.statusText}. Please try again later.`,
        ) as Error & { status: number };
        error.status = res.status;
        throw error;
    }

    return res.json();
};
