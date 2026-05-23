import { useJikan } from "./useJikan";

export function useGenreListAnime() {
    const animeGenres = useJikan("genres/anime?sfw=true");
    return animeGenres;
}
