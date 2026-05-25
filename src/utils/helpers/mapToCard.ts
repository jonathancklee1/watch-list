import type { ApiMovieData, CardType, MediaType } from "../../utils/types";
import { getPosterImage } from "./getPosterImage";
export function mapToCard<TData extends ApiMovieData>(
    data: Partial<TData>,
    mediaType?: MediaType,
): CardType | null {
    if (!data) return null;
    return {
        id: data.id || data.mal_id || 0,
        title: data.title_english || data.title || data.name,
        image: {
            src: data.poster_path
                ? getPosterImage(data.poster_path)
                : data?.images?.webp?.large_image_url
                  ? data.images.webp.large_image_url
                  : data?.images?.src || "",

            alt: data.title,
        },
        backdrop: getPosterImage(data.backdrop_path || ""),
        description: data.overview || data.synopsis,
        releaseDate:
            data.release_date?.split("-")[0] ||
            data.first_air_date?.split("-")[0] ||
            data?.aired?.from?.split("-")[0] ||
            null,
        link: `/movie/${data.id || data.mal_id}`,
        rating:
            Number(data?.vote_average?.toFixed(1)) ||
            data.score?.toFixed(1) ||
            0,
        genres: data.genre_ids || data.genres || null,
        episodes: data.number_of_episodes || data.episodes || null,
        seasons: data.number_of_seasons || null,
        runTime: data.runtime || null,
        mediaType: mediaType,
        externalLink: data.trailer?.embed_url || data.homepage || null,
    };
}
