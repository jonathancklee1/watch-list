import { EmptyState, Flex, Grid, Tabs, Text } from "@chakra-ui/react";
import { isMobile } from "../../../utils/helpers/isMobile";

import { WATCH_LIST_STATE } from "../../../utils/constants";
import { WatchListCard } from "../WatchListCard/WatchListCard";
import { BiCheck, BiNotepad, BiSolidBinoculars } from "react-icons/bi";
import { useContext, useState } from "react";
import { WatchListContext } from "../../../utils/contexts/WatchListContext";
import { StyledTabContainer } from "./WatchListTabContainer.styles";
export function WatchListTabContainer() {
    const { watchListState } = useContext(WatchListContext);
    const [isMobileState, setIsMobileState] = useState(isMobile());
    window.addEventListener("resize", () => {
        if (isMobile(1024)) {
            setIsMobileState(true);
        } else {
            setIsMobileState(false);
        }
    });
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

            <Tabs.Content value="toWatch">
                <StyledTabContainer>
                    {watchListState?.toWatch &&
                    watchListState?.toWatch?.length <= 0 ? (
                        <EmptyWatchList />
                    ) : (
                        watchListState?.toWatch.map((item, index) => (
                            <WatchListCard
                                key={JSON.stringify(item) + index}
                                data={item}
                                watchStatus={"toWatch"}
                            />
                        ))
                    )}
                </StyledTabContainer>
            </Tabs.Content>
            <Tabs.Content value="watching">
                <StyledTabContainer>
                    {watchListState?.watching &&
                    watchListState?.watching?.length <= 0 ? (
                        <EmptyWatchList />
                    ) : (
                        watchListState?.watching.map((item, index) => (
                            <WatchListCard
                                key={JSON.stringify(item) + index}
                                data={item}
                                watchStatus={"watching"}
                            />
                        ))
                    )}
                </StyledTabContainer>
            </Tabs.Content>
            <Tabs.Content value="completed">
                <StyledTabContainer>
                    {watchListState?.completed &&
                    watchListState?.completed?.length <= 0 ? (
                        <EmptyWatchList />
                    ) : (
                        watchListState?.completed.map((item, index) => (
                            <WatchListCard
                                key={JSON.stringify(item) + index}
                                data={item}
                                watchStatus={"completed"}
                            />
                        ))
                    )}
                </StyledTabContainer>
            </Tabs.Content>
        </Tabs.Root>
    ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap="6">
            <StyledTabContainer>
                <Flex alignItems={"center"} gap={".5em"}>
                    <BiNotepad size={20} />
                    <Text fontWeight={"bold"} textTransform={"uppercase"}>
                        To Watch
                    </Text>
                </Flex>
                {watchListState?.toWatch &&
                watchListState?.toWatch?.length <= 0 ? (
                    <EmptyWatchList />
                ) : (
                    watchListState?.toWatch.map((item, index) => (
                        <WatchListCard
                            key={JSON.stringify(item) + index}
                            data={item}
                            watchStatus={"toWatch"}
                        />
                    ))
                )}
            </StyledTabContainer>
            <StyledTabContainer>
                <Flex alignItems={"center"} gap={".5em"}>
                    <BiSolidBinoculars size={20} />
                    <Text fontWeight={"bold"} textTransform={"uppercase"}>
                        Watching
                    </Text>
                </Flex>
                {watchListState?.watching &&
                watchListState?.watching?.length <= 0 ? (
                    <EmptyWatchList />
                ) : (
                    watchListState?.watching.map((item, index) => (
                        <WatchListCard
                            key={JSON.stringify(item) + index}
                            data={item}
                            watchStatus={"watching"}
                        />
                    ))
                )}
            </StyledTabContainer>
            <StyledTabContainer>
                <Flex alignItems={"center"} gap={".5em"}>
                    <BiCheck size={20} />
                    <Text fontWeight={"bold"} textTransform={"uppercase"}>
                        Completed
                    </Text>
                </Flex>
                {watchListState?.completed &&
                watchListState?.completed?.length <= 0 ? (
                    <EmptyWatchList />
                ) : (
                    watchListState?.completed.map((item, index) => (
                        <WatchListCard
                            key={JSON.stringify(item) + index}
                            data={item}
                            watchStatus={"completed"}
                        />
                    ))
                )}
            </StyledTabContainer>
        </Grid>
    );
}

function EmptyWatchList() {
    return (
        <EmptyState.Root style={{ gridColumn: "span 2" }}>
            <EmptyState.Content>
                <EmptyState.Title textAlign={"center"}>
                    Nothing here
                </EmptyState.Title>
            </EmptyState.Content>
        </EmptyState.Root>
    );
}
