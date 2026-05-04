import type { UseQueryResult } from "@tanstack/react-query";
import type { ApiMovieData } from "../types";
import { useJikan } from "./useJikan";

export function useAiringNowAnime(): UseQueryResult<ApiMovieData[]> {
    const jikanData = useJikan("seasons/now");

    return jikanData;
}
