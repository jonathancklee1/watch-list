import type { MediaType } from "../types";
import { useTMDBQuery } from "./useTMDBApi";

export function useMediaDetails(
    mediaType: Omit<MediaType, "anime">,
    id: string,
) {
    return useTMDBQuery(`${mediaType}/${id}`);
}
