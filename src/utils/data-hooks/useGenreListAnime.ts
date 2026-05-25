import type { GenreContextType } from "../types";
import { useJikan } from "./useJikan";

export function useGenreListAnime() {
    const animeGenres = useJikan<{ data: GenreContextType }>(
        "genres/anime?sfw=true",
    );
    return animeGenres;
}
