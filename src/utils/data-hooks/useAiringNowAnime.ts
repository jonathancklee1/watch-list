import { useJikan } from "./useJikan";

export function useAiringNowAnime() {
    const jikanData = useJikan("seasons/now");

    return jikanData;
}
