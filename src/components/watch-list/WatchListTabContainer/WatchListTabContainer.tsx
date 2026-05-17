import { EmptyState, Flex, Tabs } from "@chakra-ui/react";

import { WATCH_LIST_STATE } from "../../../utils/constants";
import { WatchListCard } from "../WatchListCard/WatchListCard";
import { BiCheck, BiNotepad, BiSolidBinoculars } from "react-icons/bi";
import { useContext } from "react";
import { WatchListContext } from "../../../utils/contexts/WatchListContext";
export function WatchListTabContainer() {
    const { watchList } = useContext(WatchListContext);
    return (
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

            <Tabs.Content value="toWatch">
                <Flex
                    direction={"column"}
                    gap={"1em"}
                    borderRadius={"20px"}
                    background={"var(--background--secondary-color)"}
                    p={"1em"}
                >
                    {watchList?.toWatch && watchList?.toWatch?.length <= 0 ? (
                        <EmptyState.Root>
                            <EmptyState.Content>
                                <EmptyState.Title textAlign={"center"}>
                                    Nothing here
                                </EmptyState.Title>
                            </EmptyState.Content>
                        </EmptyState.Root>
                    ) : (
                        watchList?.toWatch.map((item, index) => (
                            <WatchListCard
                                key={index}
                                data={item}
                                watchStatus={"toWatch"}
                            />
                        ))
                    )}
                </Flex>
            </Tabs.Content>
            <Tabs.Content value="watching">
                <Flex
                    direction={"column"}
                    gap={"1em"}
                    borderRadius={"20px"}
                    background={"var(--background--secondary-color)"}
                    p={"1em"}
                >
                    {watchList?.watching && watchList?.watching?.length <= 0 ? (
                        <EmptyState.Root>
                            <EmptyState.Content>
                                <EmptyState.Title textAlign={"center"}>
                                    Nothing here
                                </EmptyState.Title>
                            </EmptyState.Content>
                        </EmptyState.Root>
                    ) : (
                        watchList?.watching.map((item, index) => (
                            <WatchListCard
                                key={index}
                                data={item}
                                watchStatus={"watching"}
                            />
                        ))
                    )}
                </Flex>
            </Tabs.Content>
            <Tabs.Content value="completed">
                <Flex
                    direction={"column"}
                    gap={"1em"}
                    borderRadius={"20px"}
                    background={"var(--background--secondary-color)"}
                    p={"1em"}
                >
                    {watchList?.completed &&
                    watchList?.completed?.length <= 0 ? (
                        <EmptyState.Root>
                            <EmptyState.Content>
                                <EmptyState.Title textAlign={"center"}>
                                    Nothing here
                                </EmptyState.Title>
                            </EmptyState.Content>
                        </EmptyState.Root>
                    ) : (
                        watchList?.completed.map((item, index) => (
                            <WatchListCard
                                key={index}
                                data={item}
                                watchStatus={"completed"}
                            />
                        ))
                    )}
                </Flex>
            </Tabs.Content>
        </Tabs.Root>
    );
}
