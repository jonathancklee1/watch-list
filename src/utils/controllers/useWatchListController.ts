import { useContext, useEffect, useReducer } from "react";
import { WatchListContext } from "../contexts/WatchListContext";
import type { CardType, WatchListStatusType, WatchStatus } from "../types";
import { enqueueToast } from "../helpers/enqueueToast";

export function useWatchListController() {
    const { watchList, setWatchList } = useContext(WatchListContext);
    const initialState = watchList;
    const [state, dispatch] = useReducer(
        (state: WatchListStatusType, action) => {
            switch (action[0]) {
                case "ADD": //[ADD, "toWatch", data]
                    return {
                        ...state,
                        [action[1]]: [...state[action[1]], action[2]],
                    };
                case "REMOVE": //[REMOVE, data, "toWatch"]
                    return {
                        ...state,
                        [action[2]]: state[action[2]]?.filter(
                            (item) => item !== action[1],
                        ),
                    };
                case "MOVE": //[MOVE, data, "toWatch", "watching"]
                    return {
                        ...state,
                        [action[2]]: state[action[2]]?.filter(
                            (item) => item !== action[1],
                        ),
                        [action[3]]: [...state[action[3]], action[1]],
                    };
                default:
                    console.error("Invalid action");
                    return state;
            }
        },
        initialState,
    );

    useEffect(() => {
        setWatchList(state);
    }, [setWatchList, state]);

    function handleAddToWatchList(data: CardType) {
        try {
            dispatch(["ADD", "toWatch", data]);
            enqueueToast("Added to To Watch", "success");
        } catch (_) {
            enqueueToast("Failed to add to watch list", "error");
        }
    }
    function handleDeleteFromWatchList(data: CardType, from: WatchStatus) {
        try {
            dispatch(["REMOVE", data, from]);
            enqueueToast("Removed from watch list", "success");
        } catch (_) {
            enqueueToast("Failed to remove from watch list", "error");
        }
    }

    function handleMoveWatchList(
        data: CardType,
        from: WatchStatus,
        to: WatchStatus,
    ) {
        try {
            dispatch(["MOVE", data, from, to]);
            enqueueToast(`Moved from ${from} to ${to}`, "success");
        } catch (_) {
            enqueueToast(`Failed to move from ${from} to ${to}`, "error");
        }
    }

    return {
        state,
        handleAddToWatchList,
        handleDeleteFromWatchList,
        handleMoveWatchList,
    };
}
