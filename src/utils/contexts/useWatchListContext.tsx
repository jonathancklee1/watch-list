import { useEffect, useReducer } from "react";
import { WatchListContext } from "./WatchListContext";
import type { WatchListStatusType } from "../types";
import { move } from "@dnd-kit/helpers";

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
                case "MOVE":
                    const [, item, sourceKey, targetKey, insertIndex] = action;

                    // 1. Remove the item from the source list
                    const updatedSourceList = state[sourceKey].filter(
                        (i) => i.id !== item.id,
                    );

                    // 2. IMPORTANT: Remove it from the target list FIRST to prevent double rendering
                    const cleanTargetList = state[targetKey].filter(
                        (i) => i.id !== item.id,
                    );

                    // 3. Slice and insert into the cleaned list
                    const updatedTargetList =
                        insertIndex !== undefined
                            ? [
                                  ...cleanTargetList.slice(0, insertIndex),
                                  item,
                                  ...cleanTargetList.slice(insertIndex),
                              ]
                            : [...cleanTargetList, item];

                    return {
                        ...state,
                        [sourceKey]: updatedSourceList,
                        [targetKey]: updatedTargetList,
                    };
                case "DRAG": {
                    const event = action[1];
                    if (!event) return state;

                    return {
                        ...state,
                        ...move(state, event),
                    };
                }
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
