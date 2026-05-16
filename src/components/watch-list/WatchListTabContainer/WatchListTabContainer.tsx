import { Flex, Tabs } from "@chakra-ui/react";

import { WATCH_LIST_STATE } from "../../../utils/constants";
import { WatchListCard } from "../WatchListCard/WatchListCard";
import { BiCheck, BiNotepad, BiSolidBinoculars } from "react-icons/bi";
export function WatchListTabContainer() {
    const data = {
        title: "Avatar: The Way of Water",
        posterImage: "",
        genres: [{ name: "Drama" }],
        rating: "6.777",
        releaseDate: "2019",
        watchStatus: "to-watch",
    };
    return (
        <Tabs.Root
            defaultValue="to-watch"
            fitted
            variant="plain"
            width={"100%"}
        >
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
                    >
                        {state.value === "to-watch" && <BiNotepad size={20} />}
                        {state.value === "watching" && (
                            <BiSolidBinoculars size={20} />
                        )}
                        {state.value === "completed" && <BiCheck size={20} />}
                        {state.name}
                    </Tabs.Trigger>
                ))}
                <Tabs.Indicator rounded="l2" />
            </Tabs.List>

            <Tabs.Content value="to-watch">
                <Flex
                    direction={"column"}
                    gap={"1em"}
                    borderRadius={"20px"}
                    background={"var(--background--secondary-color)"}
                    p={"1em"}
                >
                    {/* Empty state */}
                    <WatchListCard data={data} />
                    <WatchListCard data={data} />
                </Flex>
            </Tabs.Content>
        </Tabs.Root>
    );
}
