import type { MediaType } from "../types";

export function mapMediaTypeToText(mediaType: MediaType) {
    let validTextType;
    switch (mediaType) {
        case "movie":
            validTextType = "Movies";
            break;
        case "tv":
            validTextType = "TV Shows";
            break;
        case "anime":
            validTextType = "Anime";
            break;
    }

    return validTextType;
}
