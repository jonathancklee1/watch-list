import type { MediaType } from "../types";
import { useTMDBQuery } from "./useTMDBApi";

export function useDetailsMedia(
    mediaType: Omit<MediaType, "anime">,
    id: string,
) {
    return useTMDBQuery(`${mediaType}/${id}`);
}
