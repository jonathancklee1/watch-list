import { useJikan } from "./useJikan";

export function useTopRatedAnime() {
    const jikanData = useJikan("top/anime?sfw=true");

    return jikanData;
}
