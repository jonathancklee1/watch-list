import { useJikan } from "./useJikan";

export function useRecommendationsAnime(id: string) {
    const animeRecommendations = useJikan("anime/" + id + "/recommendations");
    return animeRecommendations;
}
