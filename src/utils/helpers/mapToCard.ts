import type { ApiMovieData, CardType } from "../../utils/types";
export function mapToCard<TData extends ApiMovieData>(
    data: TData,
): CardType | null {
    if (!data) return null;
    return {
        id: data.id,
        title: data.title_english || data.title || data.name,
        image: {
            src: data.poster_path || data?.images?.webp.large_image_url,
            alt: data.title,
        },
        description: data.overview || data.synopsis,
        releaseDate: data.release_date?.split("-")[0] || "Unknown",
        link: `/movie/${data.id}`,
    };
}
