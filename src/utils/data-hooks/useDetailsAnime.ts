import { useJikan } from "./useJikan";

export function useDetailsAnime(id: string) {
    const jikanData = useJikan(`anime/${id}/full`);

    return jikanData;
}
