import type { ApiAnimeData } from "../types";
import { useJikan } from "./useJikan";

export function useTopRatedAnime() {
    const { data, isLoading } = useJikan("top/anime");

    return { data, isLoading } as { data: ApiAnimeData; isLoading: boolean };
}
