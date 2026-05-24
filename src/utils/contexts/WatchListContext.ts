import { createContext } from "react";
import type { WatchListContextType } from "../types";

export const WatchListContext = createContext<WatchListContextType>({
    watchListState: {
        toWatch: [],
        watching: [],
        completed: [],
    },
    dispatch: () => {},
});
