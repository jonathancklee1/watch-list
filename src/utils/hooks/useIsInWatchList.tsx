import { useContext, useMemo } from "react";
import { WatchListContext } from "../contexts/WatchListContext";
import type { CardType } from "../types";

export function useIsInWatchList(data: CardType): boolean {
    const { watchListState } = useContext(WatchListContext);

    const isInWatchList = useMemo(() => {
        if (!data) return false;
        return Object.values(watchListState)?.some((list) =>
            list.some((item) => item?.id === data?.id),
        );
    }, [data, watchListState]);
    console.log(isInWatchList, data, watchListState);

    return isInWatchList;
}
