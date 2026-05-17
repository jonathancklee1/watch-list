import { createContext } from "react";
import type { WatchListContextType } from "../types";

export const WatchListContext = createContext<WatchListContextType>({
    watchList: {
        toWatch: [],
        watching: [],
        completed: [],
    },
    dispatch: () => {},
});
