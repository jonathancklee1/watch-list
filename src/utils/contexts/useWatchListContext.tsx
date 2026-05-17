import { useEffect, useReducer } from "react";
import { WatchListContext } from "./WatchListContext";
import type { WatchListStatusType } from "../types";

export function WatchListProvider({ children }: { children: React.ReactNode }) {
    const initialValue = JSON.parse(
        window.localStorage.getItem("watchList") ||
            '{"toWatch":[],"watching":[],"completed":[]}',
    );

    const [watchListState, dispatch] = useReducer(
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
        initialValue,
    );
    useEffect(() => {
        window.localStorage.setItem(
            "watchList",
            JSON.stringify(watchListState),
        );
    }, [watchListState]);
    return (
        <WatchListContext.Provider value={{ watchListState, dispatch }}>
            {children}
        </WatchListContext.Provider>
    );
}
