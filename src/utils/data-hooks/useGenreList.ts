import { mapToValidMedia } from "../helpers/mapToValidMedia";
import type { MediaType } from "../types";
import { useTMDBQuery } from "./useTMDBApi";

export function useGenreList(media: Omit<MediaType, "Anime">) {
    return useTMDBQuery(`genre/${mapToValidMedia(media)}/list`);
}
