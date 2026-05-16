import { StyledCard, StyledImage } from "./WatchListCard.styles";
import {
    Flex,
    Box,
    Text,
    Separator,
    Input,
    Popover,
    Portal,
} from "@chakra-ui/react";
import {
    BiCheck,
    BiGridVertical,
    BiNotepad,
    BiSolidBinoculars,
} from "react-icons/bi";
import { getPosterImage } from "../../../utils/helpers/getPosterImage";

import { RatingTag } from "../../RatingTag/RatingTag";
import { Button } from "../../Button/Button";
import type { CardType } from "../../../utils/types";
import { useContext } from "react";
import { GenreListContext } from "../../../utils/context/GenreListContext";
import { mapToValidMedia } from "../../../utils/helpers/mapToValidMedia";
export function WatchListCard({ data }: { data: CardType }) {
    const genreList =
        useContext(GenreListContext)[mapToValidMedia(data.mediaType)];
    const mainGenre = genreList
        ?.filter((genre) => data?.genres?.includes(genre.id))
        .map((genre) => genre.name)[0];
    console.log(data);
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
                        <Text fontWeight={800} lineClamp={2}>
                            {mainGenre}
                        </Text>
                        <Separator
                            orientation="vertical"
                            border={"1px solid var(--text--secondary-color)"}
                        />
                        <Text fontWeight={800} lineClamp={2}>
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
                                            {data.watchStatus !==
                                                "to-watch" && (
                                                <Button>
                                                    <BiNotepad size={20} />
                                                    Move to To Watch
                                                    {/* Add icon here */}
                                                </Button>
                                            )}
                                            {data.watchStatus !==
                                                "watching" && (
                                                <Button>
                                                    <BiSolidBinoculars
                                                        size={20}
                                                    />
                                                    Move to Watching
                                                </Button>
                                            )}
                                            {data.watchStatus !==
                                                "completed" && (
                                                <Button>
                                                    <BiCheck size={20} />
                                                    Move to Completed
                                                </Button>
                                            )}
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
