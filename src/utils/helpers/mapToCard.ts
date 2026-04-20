import type { ApiMovieData, CardProps } from "../../utils/types";
export function mapToCard<TData extends ApiMovieData>(
    data: TData,
): CardProps | null {
    if (!data) return null;
    return {
        id: data.id,
        title: data.title,
        image: {
            src: data.image,
            alt: data.title,
        },
        description: data.overview,
        // Optional chaining added in case release_date is empty
        year: data.release_date?.split("-")[0] || "Unknown",
        link: `/movie/${data.id}`,
    };
}
