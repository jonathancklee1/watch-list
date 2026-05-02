import { useJikan } from "./useJikan";

export function useGenreListAnime() {
    const animeGenres = useJikan("genres/anime");
    return animeGenres;
}
