import { useContext } from "react";
import { WatchListContext } from "../contexts/WatchListContext";
import type { CardType, WatchStatus } from "../types";
import { enqueueToast } from "../helpers/enqueueToast";

export function useWatchListController() {
    const { watchListState, dispatch } = useContext(WatchListContext);
    // const initialState = watchList;

    function handleAddToWatchList(data: CardType) {
        console.log("Add", data);
        try {
            dispatch(["ADD", "toWatch", data]);
            enqueueToast("Added to To Watch", "success");
        } catch {
            enqueueToast("Failed to add to watch list", "error");
        }
    }
    function handleDeleteFromWatchList(data: CardType, from: WatchStatus) {
        console.log("Delete", data);
        try {
            dispatch(["REMOVE", data, from]);
            enqueueToast("Removed from watch list", "success");
        } catch {
            enqueueToast("Failed to remove from watch list", "error");
        }
    }

    function handleMoveWatchList(
        data: CardType,
        from: WatchStatus,
        to: WatchStatus,
    ) {
        console.log("Move", data);
        try {
            dispatch(["MOVE", data, from, to]);
            enqueueToast(`Moved from ${from} to ${to}`, "success");
        } catch {
            enqueueToast(`Failed to move from ${from} to ${to}`, "error");
        }
    }

    return {
        watchListState,
        handleAddToWatchList,
        handleDeleteFromWatchList,
        handleMoveWatchList,
    };
}
