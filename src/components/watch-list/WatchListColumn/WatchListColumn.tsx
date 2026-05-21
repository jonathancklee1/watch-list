import { StyledTabContainer } from "./WatchListColumn.styles";
import { EmptyState, Flex, Text } from "@chakra-ui/react";
import { BiCheck, BiNotepad, BiSolidBinoculars } from "react-icons/bi";
import { WatchListCard } from "../WatchListCard/WatchListCard";
import { useDroppable } from "@dnd-kit/react";
import type { CardType, WatchStatus } from "../../../utils/types";

export function WatchListColumn({
    columnData,
    name,
    id,
}: {
    columnData: CardType[] | undefined;
    name: string;
    id: WatchStatus;
}) {
    const { ref } = useDroppable({
        id,
        type: "column",
        accept: "item",
    });

    return (
        <StyledTabContainer ref={ref}>
            {/* Header section remains identical */}
            <Flex alignItems={"center"} gap={".5em"} mb="1em">
                {id === "completed" ? (
                    <BiCheck size={20} />
                ) : id === "toWatch" ? (
                    <BiSolidBinoculars size={20} />
                ) : (
                    <BiNotepad size={20} />
                )}

                <Text fontWeight={"bold"} textTransform={"uppercase"}>
                    {name}
                </Text>
            </Flex>

            <Flex
                flexDirection="column"
                gap="12px"
                flexGrow={1}
                minHeight="300px"
            >
                {columnData && columnData.length > 0 ? (
                    columnData.map((item, index) => (
                        <WatchListCard
                            key={item.id}
                            data={item}
                            watchStatus={id}
                            index={index}
                            column={id}
                            id={item.id}
                        />
                    ))
                ) : (
                    <EmptyWatchList />
                )}
            </Flex>
        </StyledTabContainer>
    );
}

function EmptyWatchList() {
    return (
        <EmptyState.Root style={{ margin: "auto", padding: "20px 0" }}>
            <EmptyState.Content>
                <EmptyState.Title textAlign={"center"} color="gray.500">
                    Nothing here
                </EmptyState.Title>
            </EmptyState.Content>
        </EmptyState.Root>
    );
}
