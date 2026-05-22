import { Grid, Tabs } from "@chakra-ui/react";
import { isMobile } from "../../../utils/helpers/isMobile";

import { WATCH_LIST_STATE } from "../../../utils/constants";
import { BiCheck, BiNotepad, BiSolidBinoculars } from "react-icons/bi";
import { useContext, useState } from "react";
import { WatchListContext } from "../../../utils/contexts/WatchListContext";
import { WatchListColumn } from "../WatchListColumn/WatchListColumn";
import { DragDropProvider } from "@dnd-kit/react";

import { move } from "@dnd-kit/helpers";
import { useWatchListController } from "../../../utils/controllers/useWatchListController";

export function WatchListTabContainer() {
    const { watchListState, dispatch } = useContext(WatchListContext);
    const { handleDragWatchList } = useWatchListController();
    console.log(watchListState);
    const [isMobileState, setIsMobileState] = useState(isMobile());
    window.addEventListener("resize", () => {
        if (isMobile(1024)) {
            setIsMobileState(true);
        } else {
            setIsMobileState(false);
        }
    });

    const WATCHLIST_COLUMNS = [
        {
            name: "To Watch",
            id: "toWatch",
        },
        {
            name: "Watching",
            id: "watching",
        },
        {
            name: "Completed",
            id: "completed",
        },
    ];
    return isMobileState ? (
        <Tabs.Root defaultValue="toWatch" fitted variant="plain" width={"100%"}>
            <Tabs.List
                bg="var(--background--secondary-color)"
                rounded="l3"
                p="1"
                width={"100%"}
            >
                {WATCH_LIST_STATE.map((state) => (
                    <Tabs.Trigger
                        key={state.value}
                        value={state.value}
                        justifyContent={"center"}
                        textWrap={"nowrap"}
                    >
                        {state.value === "toWatch" && (
                            <BiNotepad size={20} style={{ flexShrink: 0 }} />
                        )}
                        {state.value === "watching" && (
                            <BiSolidBinoculars
                                size={20}
                                style={{ flexShrink: 0 }}
                            />
                        )}
                        {state.value === "completed" && (
                            <BiCheck size={20} style={{ flexShrink: 0 }} />
                        )}
                        {state.name}
                    </Tabs.Trigger>
                ))}
                <Tabs.Indicator rounded="l2" />
            </Tabs.List>
            {WATCHLIST_COLUMNS.map((column) => (
                <Tabs.Content key={column.id} value={column.id}>
                    <WatchListColumn
                        columnData={watchListState[column.id]}
                        name={column.name}
                        id={column.id}
                    />
                </Tabs.Content>
            ))}
        </Tabs.Root>
    ) : (
        <DragDropProvider
            onDragOver={(event) => {
                const { source, target } = event.operation;
                // Triggers the state move array recalculations during transit flight
                if (target && source?.group !== target.group) {
                    handleDragWatchList(event);
                }
            }}
            onDragEnd={(event) => {
                if (event.canceled || event.operation.canceled) return;
                event.nativeEvent?.preventDefault();

                window.localStorage.setItem(
                    "watchList",
                    JSON.stringify(move(watchListState, event)),
                );
            }}
        >
            <Grid templateColumns="repeat(3, 1fr)" gap="6">
                {WATCHLIST_COLUMNS.map((column) => (
                    <WatchListColumn
                        columnData={watchListState[column.id]}
                        name={column.name}
                        id={column.id}
                        key={column.id}
                    />
                ))}
            </Grid>
        </DragDropProvider>
    );
}
