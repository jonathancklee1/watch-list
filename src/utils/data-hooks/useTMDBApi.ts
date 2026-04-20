import { useQuery } from "@tanstack/react-query";

export function useTMDBApi({
    queryKey,
    param,
}: {
    queryKey: string;
    param?: string;
}) {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    // const url = `'https://api.themoviedb.org/3/${path}`;
    const url = `https://api.themoviedb.org/3/${param}?api_key=${apiKey}&language=en-US`;

    const fetchQuery = () => fetch(url).then((res) => res.json());

    const { data, isLoading, error } = useQuery({
        queryKey: [queryKey],
        queryFn: fetchQuery,
    });
    return { data, isLoading, error };
}
