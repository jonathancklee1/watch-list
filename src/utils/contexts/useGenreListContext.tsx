import { useGenreList } from "../data-hooks/useGenreList";
import { useGenreListAnime } from "../data-hooks/useGenreListAnime";
import type { GenreContextType } from "../types";
import { GenreListContext } from "./GenreListContext";

export function GenreListProvider({ children }: { children: React.ReactNode }) {
    const { data } = useGenreList("movie");
    const { data: tvShowGenres } = useGenreList("tv");
    const { data: animeGenres } = useGenreListAnime() as {
        data: { data: GenreContextType["anime"] } | null;
    };
    const genres = {
        movie: data?.genres || [],
        tv: tvShowGenres?.genres || [],
        anime: animeGenres?.data || [],
    };

    return (
        <GenreListContext.Provider value={genres}>
            {children}
        </GenreListContext.Provider>
    );
}
