import type { MediaType } from "../types";
import { useTMDBQuery } from "./useTMDBApi";

export function useMediaRecommendations(
    mediaType: Omit<MediaType, "anime">,
    id: string,
) {
    return useTMDBQuery(`${mediaType}/${id}/recommendations`);
}
