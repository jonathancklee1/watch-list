import { StyledCard, StyledImage } from "./WatchListCard.styles";
import { Flex, Box, Text, Separator, Popover, Portal } from "@chakra-ui/react";
import {
    BiCheck,
    BiCross,
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
import { mapToValidMedia } from "../../../utils/helpers/mapToValidMedia";
import { useWatchListController } from "../../../utils/controllers/useWatchListController";
export function WatchListCard({
    data,
    watchStatus,
}: {
    data: CardType;
    watchStatus: WatchStatus;
}) {
    console.log(data.mediaType);
    const genreList =
        useContext(GenreListContext)[mapToValidMedia(data.mediaType)];
    console.log(genreList, data.genres?.[0]);
    const mainGenre =
        genreList?.find((genre) => genre.id == data.genres?.[0])?.name ??
        data.genres?.[0].name;

    console.log(data);
    const { handleMoveWatchList, handleDeleteFromWatchList } =
        useWatchListController();
    return (
        <StyledCard
            className="glass"
            background={"var(--background--secondary-color)/80"}
        >
            <StyledImage
                src={data?.image?.src ?? getPosterImage(data?.image?.src ?? "")}
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
                    <Text fontWeight={800} lineClamp={2} fontSize={"1.2rem"}>
                        {data.title}
                    </Text>
                    <Flex
                        color={"var(--text--secondary-color)"}
                        gap={2}
                        marginTop={".5em"}
                    >
                        <Text fontWeight={800} lineClamp={2} maxW={"10ch"}>
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
                    rating={Number(data?.rating).toFixed(1).toString()}
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
                                                    {/* Add icon here */}
                                                </Button>
                                            )}
                                            {watchStatus !== "watching" && (
                                                <Button
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
