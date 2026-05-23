import { useJikan } from "./useJikan";

export function useAiringNowAnime() {
    const jikanData = useJikan("seasons/now?sfw=true");

    return jikanData;
}
