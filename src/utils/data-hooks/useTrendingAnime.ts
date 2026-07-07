import { useJikan } from "./useJikan";

export function useTrendingAnime() {
    const jikanData = useJikan("top/anime?filter=airing");

    return jikanData;
}
