import type { MediaType } from "../types";

export function mapToValidMedia(mediaType: MediaType) {
    let validMediaType = "";
    switch (mediaType) {
        case "Movies":
            validMediaType = "movie";
            break;
        case "TV Shows":
            validMediaType = "tv";
            break;
        case "Anime":
            validMediaType = "anime";
            break;
    }

    return validMediaType as "movie" | "tv" | "anime";
}
