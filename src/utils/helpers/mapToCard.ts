import type { ApiMovieData, CardType } from "../../utils/types";
import { getPosterImage } from "./getPosterImage";
export function mapToCard<TData extends ApiMovieData>(
    data: TData,
): CardType | null {
    if (!data) return null;
    return {
        id: data.id || data.mal_id,
        title: data.title_english || data.title || data.name,
        image: {
            src: data.poster_path
                ? getPosterImage(data.poster_path)
                : data?.images?.webp.large_image_url,
            alt: data.title,
        },
        description: data.overview,
        releaseDate:
            data.release_date?.split("-")[0] ||
            data.first_air_date?.split("-")[0] ||
            data?.aired?.from?.split("-")[0] ||
            "Unknown",
        link: `/movie/${data.id || data.mal_id}`,
        rating:
            Number(data?.vote_average?.toFixed(1)) ||
            data.score?.toFixed(1) ||
            0,
        genres: data.genre_ids || data.genres || "Unknown",
    };
}
