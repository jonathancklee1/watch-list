import { useContext, useMemo } from "react";
import { WatchListContext } from "../contexts/WatchListContext";
import type { CardType, RecommendationData } from "../types";

export function useIsInWatchList(
    data: CardType | RecommendationData | null,
): boolean {
    if (!data) return false;
    const { watchListState } = useContext(WatchListContext);

    const isInWatchList = useMemo(() => {
        if (!data) return false;
        return Object.values(watchListState)?.some((list) =>
            list?.some((item: CardType) => item?.id === data?.id),
        );
    }, [data, watchListState]);

    return isInWatchList;
}
