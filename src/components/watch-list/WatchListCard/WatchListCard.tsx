import { StyledCard, StyledImage } from "./WatchListCard.styles";
import { Flex, Box, Text, Separator, Popover, Portal } from "@chakra-ui/react";
import {
    BiCheck,
    BiGridVertical,
    BiNotepad,
    BiSolidBinoculars,
    BiX,
} from "react-icons/bi";
import { getPosterImage } from "../../../utils/helpers/getPosterImage";

import { RatingTag } from "../../RatingTag/RatingTag";
import { Button } from "../../Button/Button";
import type { CardType, WatchStatus } from "../../../utils/types";
import { useContext } from "react";
import { GenreListContext } from "../../../utils/contexts/GenreListContext";
import { useWatchListController } from "../../../utils/controllers/useWatchListController";
import { useSortable } from "@dnd-kit/react/sortable";
import { Link } from "@tanstack/react-router";

export function WatchListCard({
    data,
    watchStatus,
    index,
    column,
    id,
}: {
    data: CardType;
    watchStatus: WatchStatus;
    index: number;
    column: string;
    id?: number;
}) {
    const genreList = useContext(GenreListContext)[data.mediaType ?? "movie"];
    console.log(data, "data in card");
    const mainGenre =
        genreList?.find((genre) => genre.id == data.genres?.[0])?.name ??
        data.genres?.filter(
            (genre): genre is { id: number; name: string } =>
                typeof genre !== "number",
        )?.[0]?.name;

    const { handleMoveWatchList, handleDeleteFromWatchList } =
        useWatchListController();
    const { ref, isDragging } = useSortable({
        id: id ?? 0,
        index,
        type: "card",
        group: column,
    });

    return (
        <StyledCard
            ref={ref}
            className="glass"
            background={"var(--background--primary-color)"}
            data-dragging={isDragging}
        >
            <StyledImage
                src={
                    data.mediaType == "anime"
                        ? data.image?.src
                        : getPosterImage(data?.image?.src ?? "")
                }
                alt={data.title}
            />
            <Flex
                flexDir={"column"}
                position={"relative"}
                width={"100%"}
                overflow={"hidden"}
                justifyContent={"space-between"}
            >
                <Box>
                    <Link
                        to="/details/$mediaType/$id"
                        params={{
                            mediaType: data.mediaType ?? "movie",
                            id: data.id?.toString() ?? "",
                        }}
                    >
                        <Text
                            fontWeight={800}
                            lineClamp={2}
                            fontSize={"1.2rem"}
                            _hover={{
                                textDecoration: "underline",
                            }}
                        >
                            {data.title}
                        </Text>
                    </Link>
                    <Flex
                        color={"var(--text--secondary-color)"}
                        gap={2}
                        marginTop={".5em"}
                        fontSize={".9rem"}
                    >
                        <Text fontWeight={800} lineClamp={2} w={"fit-content"}>
                            {mainGenre ?? "-"}
                        </Text>
                        <Separator
                            orientation="vertical"
                            border={"1px solid var(--text--secondary-color)"}
                        />
                        <Text
                            fontWeight={800}
                            lineClamp={2}
                            display={"grid"}
                            placeItems={"center"}
                        >
                            {data.releaseDate?.split("-")[0]}
                        </Text>
                    </Flex>
                </Box>
                <RatingTag
                    rating={Number(data?.rating)}
                    isLoading={false}
                    style={{}}
                />

                <Box position={"absolute"} bottom={1} right={1}>
                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <BiGridVertical
                                color="var(--text--primary-color)"
                                size={"1.5em"}
                            />
                        </Popover.Trigger>
                        <Portal>
                            <Popover.Positioner>
                                <Popover.Content
                                    w={"fit-content"}
                                    css={{
                                        "--popover-bg":
                                            "var(--background--secondary-color)",
                                    }}
                                >
                                    <Popover.Arrow />
                                    <Popover.Body p={".5em"} w={"fit-content"}>
                                        <Flex
                                            gap={".5em"}
                                            direction={"column"}
                                            w={"fit-content"}
                                        >
                                            {watchStatus !== "toWatch" && (
                                                <Button
                                                    $secondary
                                                    onClick={() =>
                                                        handleMoveWatchList(
                                                            data,
                                                            watchStatus,
                                                            "toWatch",
                                                        )
                                                    }
                                                >
                                                    <BiNotepad size={20} />
                                                    Move to To Watch
                                                </Button>
                                            )}
                                            {watchStatus !== "watching" && (
                                                <Button
                                                    $secondary
                                                    onClick={() =>
                                                        handleMoveWatchList(
                                                            data,
                                                            watchStatus,
                                                            "watching",
                                                        )
                                                    }
                                                >
                                                    <BiSolidBinoculars
                                                        size={20}
                                                    />
                                                    Move to Watching
                                                </Button>
                                            )}
                                            {watchStatus !== "completed" && (
                                                <Button
                                                    $secondary
                                                    onClick={() =>
                                                        handleMoveWatchList(
                                                            data,
                                                            watchStatus,
                                                            "completed",
                                                        )
                                                    }
                                                >
                                                    <BiCheck size={20} />
                                                    Move to Completed
                                                </Button>
                                            )}
                                            <Button
                                                onClick={() =>
                                                    handleDeleteFromWatchList(
                                                        data,
                                                        watchStatus,
                                                    )
                                                }
                                            >
                                                <BiX size={20} />
                                                Remove from List
                                            </Button>
                                        </Flex>
                                    </Popover.Body>
                                </Popover.Content>
                            </Popover.Positioner>
                        </Portal>
                    </Popover.Root>
                </Box>
            </Flex>
        </StyledCard>
    );
}
