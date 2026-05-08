import type { MediaType } from "../types";

export function mapToValidMedia(
    mediaType: MediaType | Omit<MediaType, "Anime">,
): "movie" | "tv" | "anime" {
    if (mediaType === "movie" || mediaType === "tv" || mediaType === "anime") {
        return mediaType as "movie" | "tv" | "anime";
    }
    let validMediaType = "";
    switch (mediaType) {
        case "Movies":
        case "Movie":
            validMediaType = "movie";
            break;
        case "TV Shows":
        case "tvShow":
            validMediaType = "tv";
            break;
        case "Anime":
            validMediaType = "anime";
            break;
    }

    return validMediaType as "movie" | "tv" | "anime";
}
