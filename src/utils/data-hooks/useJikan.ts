import { useQuery } from "@tanstack/react-query";

export function useJikan({
    queryKey,
    param,
}: {
    queryKey: string;
    param?: string;
}) {
    const url = `https://api.jikan.moe/v4/seasons/now`;

    const fetchQuery = () => fetch(url).then((res) => res.json());

    const { data, isLoading, error } = useQuery({
        queryKey: [queryKey],
        queryFn: fetchQuery,
    });
    return { data, isLoading, error };
}
