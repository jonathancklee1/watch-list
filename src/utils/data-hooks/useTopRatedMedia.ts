import type { MediaType } from "../types";
import { useTMDBQuery } from "./useTMDBApi";

export function useTopRatedMedia(mediaType: Omit<MediaType, "anime">) {
    return useTMDBQuery(`${mediaType}/top_rated`);
}
