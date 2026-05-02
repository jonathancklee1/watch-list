import { useJikan } from "./useJikan";

export function useTopRatedAnime() {
    const jikanData = useJikan("top/anime");

    return jikanData;
}
