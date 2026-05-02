import { mapToValidMedia } from "../helpers/mapToValidMedia";
import type { MediaType } from "../types";
import { useTMDBQuery } from "./useTMDBApi";

export function useTopRatedMedia(mediaType: Omit<MediaType, "Anime">) {
    return useTMDBQuery(`${mapToValidMedia(mediaType)}/top_rated`);
}
