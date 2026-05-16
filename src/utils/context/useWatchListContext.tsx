import { useEffect, useState } from "react";
import { WatchListContext } from "./WatchListContext";
import type { WatchListStatusType } from "../types";

export function WatchListProvider({ children }: { children: React.ReactNode }) {
    // console.log(genres, data, tvShowGenres, animeGenres, "genres in provider");
    const initialValue = JSON.parse(
        window.localStorage.getItem("watchList") ||
            '{"toWatch":[],"watching":[],"completed":[]}',
    );
    const [watchList, setWatchList] =
        useState<WatchListStatusType>(initialValue);
    useEffect(() => {
        window.localStorage.setItem("watchList", JSON.stringify(watchList));
    }, [watchList]);
    console.log(watchList, initialValue, setWatchList);
    return (
        <WatchListContext.Provider value={{ watchList, setWatchList }}>
            {children}
        </WatchListContext.Provider>
    );
}
