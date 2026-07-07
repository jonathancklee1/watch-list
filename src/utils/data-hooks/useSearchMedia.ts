import type { JikanSearchResponse, MediaType } from "../types";
import { useJikan } from "./useJikan";
import { useTMDBQuery } from "./useTMDBApi";

export function useSearchMedia(mediaType: MediaType, query: string, page = 1) {
    const validMediaType = mediaType;

    const animeSearch = useJikan(
        validMediaType,
        {
            q: query,
            page: page.toString(),
        },
        {
            select: (data) => {
                const typedData = data as JikanSearchResponse;
                return {
                    results: typedData?.data ?? [],
                    total_results: typedData?.pagination?.items?.total ?? 0,
                };
            },
        },
    );

    const tmdbSearch = useTMDBQuery(`search/${validMediaType}`, {
        query,
        page: page.toString(),
        include_adult: "false",
    });

    return mediaType === "anime" ? animeSearch : tmdbSearch;
}
