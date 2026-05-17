import { useGenreList } from "../data-hooks/useGenreList";
import { useGenreListAnime } from "../data-hooks/useGenreListAnime";
import { GenreListContext } from "./GenreListContext";

export function GenreListProvider({ children }: { children: React.ReactNode }) {
    const { data } = useGenreList("movie");
    const { data: tvShowGenres } = useGenreList("tv");
    const { data: animeGenres } = useGenreListAnime();
    const genres = {
        movie: data?.genres || [],
        tv: tvShowGenres?.genres || [],
        anime: animeGenres?.data || [],
    };
    // console.log(genres, data, tvShowGenres, animeGenres, "genres in provider");
    return (
        <GenreListContext.Provider value={genres}>
            {children}
        </GenreListContext.Provider>
    );
}
