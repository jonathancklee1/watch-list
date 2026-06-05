import {
    StyledCardWrapper,
    StyledTabContainer,
} from "./WatchListColumn.styles";
import { EmptyState, Field, Flex, Input, Text } from "@chakra-ui/react";
import { BiCheck, BiNotepad, BiSolidBinoculars } from "react-icons/bi";
import { WatchListCard } from "../WatchListCard/WatchListCard";
import { useDroppable } from "@dnd-kit/react";
import type { CardType, WatchStatus } from "../../../utils/types";
import { CollisionPriority } from "@dnd-kit/abstract";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

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
        accept: "card",
        collisionPriority: CollisionPriority.Low,
    });
    const [filterValue, setFilterValue] = useState("");
    const [filteredData, setFilteredData] = useState<CardType[] | undefined>(
        columnData,
    );
    const debounceTimer = useRef<number | undefined>(undefined);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFilteredData(columnData);
    }, [columnData]);

    useEffect(() => {
        window.clearTimeout(debounceTimer.current);
        debounceTimer.current = window.setTimeout(() => {
            if (!filterValue.trim()) {
                setFilteredData(columnData);
                return;
            }

            const filtered = columnData?.filter(
                (item) =>
                    item.title &&
                    item.title
                        .toLowerCase()
                        .includes(filterValue.toLowerCase()),
            );
            setFilteredData(filtered);
        }, 250);

        return () => window.clearTimeout(debounceTimer.current);
    }, [filterValue, columnData]);

    function handleFilter(e: ChangeEvent<HTMLInputElement>) {
        setFilterValue(e.target.value);
    }

    return (
        <StyledTabContainer ref={ref}>
            {/* Header Content */}
            <Flex alignItems={"center"} gap={".5em"}>
                {id === "completed" ? (
                    <BiCheck size={20} color="var(--primary-color)" />
                ) : id === "toWatch" ? (
                    <BiSolidBinoculars size={20} color="var(--primary-color)" />
                ) : (
                    <BiNotepad size={20} color="var(--primary-color)" />
                )}

                <Text fontWeight={"bold"} textTransform={"uppercase"}>
                    {name}
                </Text>
            </Flex>
            <Field.Root>
                <Input
                    borderRadius={"20px"}
                    placeholder={`Filter ${name}`}
                    onChange={handleFilter}
                    my={"12px"}
                    borderColor={"var(--text--tertiary-color)"}
                />
            </Field.Root>

            <StyledCardWrapper>
                {filteredData && filteredData.length > 0 ? (
                    filteredData.map((item) => {
                        const itemIndex =
                            columnData?.findIndex((d) => d.id === item.id) ?? 0;
                        return (
                            <WatchListCard
                                key={item.id}
                                data={item}
                                watchStatus={id}
                                index={itemIndex}
                                column={id}
                                id={item.id}
                            />
                        );
                    })
                ) : (
                    <EmptyWatchList />
                )}
            </StyledCardWrapper>
        </StyledTabContainer>
    );
}

function EmptyWatchList() {
    return (
        <EmptyState.Root
            style={{ margin: "auto", padding: "24px 0", pointerEvents: "none" }}
        >
            <EmptyState.Content>
                <EmptyState.Title textAlign={"center"} color="gray.400">
                    Nothing here
                </EmptyState.Title>
            </EmptyState.Content>
        </EmptyState.Root>
    );
}
