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
            enqueueToast("Added to 'To Watch'", "success");
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

    function handleDragWatchList(event: any) {
        try {
            dispatch(["DRAG", event]);
        } catch (error) {
            console.error("Failed to drag watch list" + error);
        }
    }

    return {
        watchListState,
        handleAddToWatchList,
        handleDeleteFromWatchList,
        handleDragWatchList,
    };
}
