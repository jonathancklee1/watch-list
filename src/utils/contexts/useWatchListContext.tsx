import { useContext, useEffect, useReducer } from "react";
import { WatchListContext } from "./WatchListContext";
import type { WatchListAction, WatchListStatusType } from "../types";
import type { UniqueIdentifier } from "@dnd-kit/abstract";
import { move } from "@dnd-kit/helpers";
import { AuthContext } from "./AuthContext";
import { supabase } from "../helpers/supabase";
import { enqueueToast } from "../helpers/enqueueToast";

// Clean fallback schema
const emptyDefaultState: WatchListStatusType = {
    toWatch: [],
    watching: [],
    completed: [],
};

export function WatchListProvider({ children }: { children: React.ReactNode }) {
    const { user } = useContext(AuthContext);

    const [watchListState, dispatch] = useReducer(
        (state: WatchListStatusType, action: WatchListAction) => {
            switch (action[0]) {
                case "SET_LIST":
                    return action[1] || emptyDefaultState;

                case "ADD":
                    return {
                        ...state,
                        [action[1]]: [...(state[action[1]] || []), action[2]],
                    };

                case "REMOVE":
                    return {
                        ...state,
                        [action[2]]: state[action[2]]?.filter(
                            (item) => item !== action[1],
                        ),
                    };

                case "MOVE": {
                    const [, item, sourceKey, targetKey, insertIndex] = action;
                    const updatedSourceList = state[sourceKey]?.filter(
                        (i) => i.id !== item.id,
                    );
                    const cleanTargetList = state[targetKey]?.filter(
                        (i) => i.id !== item.id,
                    );
                    const updatedTargetList =
                        insertIndex !== undefined
                            ? [
                                  cleanTargetList && {
                                      ...cleanTargetList?.slice(0, insertIndex),
                                  },
                                  item,
                                  cleanTargetList && {
                                      ...cleanTargetList?.slice(insertIndex),
                                  },
                              ]
                            : [...(cleanTargetList || []), item];

                    return {
                        ...state,
                        [sourceKey]: updatedSourceList,
                        [targetKey]: updatedTargetList,
                    };
                }
                case "DRAG": {
                    const event = action[1];
                    if (!event) return state;
                    return {
                        ...state,
                        ...move(
                            state as Record<
                                UniqueIdentifier,
                                { id: UniqueIdentifier }[]
                            >,
                            event,
                        ),
                    };
                }

                default:
                    console.error("Invalid action");
                    return state;
            }
        },
        emptyDefaultState,
    );

    useEffect(() => {
        async function loadInitialData() {
            if (user) {
                try {
                    const { data } = await supabase
                        .from("User Watch List")
                        .select("watch_list")
                        .eq("user_id", user.id)
                        .maybeSingle();

                    if (data?.watch_list) {
                        dispatch(["SET_LIST", data.watch_list]);
                    } else {
                        dispatch(["SET_LIST", emptyDefaultState]);
                    }
                } catch (err) {
                    console.error(
                        "Error loading watch list from database:",
                        err,
                    );
                    enqueueToast("Failed to load watch list", "error");
                }
            } else {
                const localData = window.localStorage.getItem("watchList");
                dispatch([
                    "SET_LIST",
                    localData ? JSON.parse(localData) : emptyDefaultState,
                ]);
            }
        }

        loadInitialData();
    }, [user]);

    useEffect(() => {
        if (watchListState === emptyDefaultState) return;
        async function syncData() {
            try {
                if (user) {
                    const { error } = await supabase
                        .from("User Watch List")
                        .upsert(
                            { user_id: user.id, watch_list: watchListState },
                            { onConflict: "user_id" },
                        );

                    if (error) {
                        throw error;
                    }
                } else {
                    window.localStorage.setItem(
                        "watchList",
                        JSON.stringify(watchListState),
                    );
                }
            } catch (error) {
                console.error(error);
                enqueueToast("Failed to sync watch list", "error");
            }
        }

        syncData();
    }, [watchListState]);

    return (
        <WatchListContext.Provider value={{ watchListState, dispatch }}>
            {children}
        </WatchListContext.Provider>
    );
}
