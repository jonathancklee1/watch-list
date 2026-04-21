import type { ApiMovieData, CardType } from "../../utils/types";
export function mapToCard<TData extends ApiMovieData>(
    data: TData,
): CardType | null {
    if (!data) return null;
    return {
        id: data.id,
        title: data.title || data.name,
        image: {
            src: data.poster_path,
            alt: data.title,
        },
        description: data.overview,
        releaseDate: data.release_date?.split("-")[0] || "Unknown",
        link: `/movie/${data.id}`,
    };
}
