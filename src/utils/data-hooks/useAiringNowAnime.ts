import type { ApiAnimeData } from "../types";
import { useJikan } from "./useJikan";

export function useAiringNowAnime() {
    const { data, isLoading } = useJikan("seasons/now?sfw=true");

    return { data, isLoading } as { data: ApiAnimeData; isLoading: boolean };
}
