import type { CardProps, MediaType } from "../../utils/types";
import { Card, Tag, Text } from "@chakra-ui/react";
import { Button } from "../Button/Button";
import {
    StyledCard,
    StyledImage,
    StyledTag,
    StyledTitle,
    StyledDescription,
    StyledInfoWrapper,
} from "./MediaCard.styles";
import { Tooltip } from "../ui/tooltip";
import { BiCheck, BiPlus } from "react-icons/bi";

import { EmptyImage } from "../EmptyImage/EmptyImage";
import { useContext } from "react";
import { GenreListContext } from "../../utils/contexts/GenreListContext";
import { Link } from "@tanstack/react-router";
import { useWatchListController } from "../../utils/controllers/useWatchListController";
import { useIsInWatchList } from "../../utils/hooks/useIsInWatchList";
import { enqueueToast } from "../../utils/helpers/enqueueToast";

export function MediaCard({ data, isLoading, tagText, mediaType }: CardProps) {
    const genreContextData = useContext(GenreListContext);
    const genreList = genreContextData[mediaType as MediaType];
    const { handleAddToWatchList } = useWatchListController();

    const mainGenre =
        mediaType === "Anime"
            ? data?.genres?.filter(
                  (genre): genre is { id: number; name: string } =>
                      typeof genre !== "number",
              )?.[0]?.name
            : genreList
                  ?.filter((genre) => data?.genres?.includes(genre.id ?? 0))
                  .map((genre) => genre.name)[0];

    const isInWatchList = useIsInWatchList(data);

    return (
        <StyledCard>
            {data?.image?.src ? (
                <StyledImage
                    src={data?.image?.src}
                    alt={data?.title}
                    loading="lazy"
                />
            ) : (
                <EmptyImage />
            )}

            <StyledInfoWrapper>
                <Card.Body
                    gap={{ base: "1", md: "2" }}
                    zIndex={10}
                    justifyContent={"end"}
                    pb="0"
                    px={"1em"}
                >
                    {tagText && (
                        <StyledTag>
                            <Tag.Label fontSize={".75rem"}>{tagText}</Tag.Label>
                        </StyledTag>
                    )}
                    <StyledTitle>
                        {isLoading ? "Loading..." : data?.title}
                    </StyledTitle>
                    <Text fontSize={"0.75rem"} fontWeight={"500"}>
                        {!isLoading && data?.releaseDate && data?.releaseDate}
                        {!isLoading && mainGenre && " | " + mainGenre}
                        {!isLoading && data?.runTime && " | " + data?.runTime}
                    </Text>
                    {!isLoading && data?.description && (
                        <StyledDescription>
                            {isLoading ? "Loading..." : data?.description}
                        </StyledDescription>
                    )}
                </Card.Body>
                <Card.Footer
                    gap="2"
                    zIndex={10}
                    mt={"1rem"}
                    px={"1em"}
                    justifyContent={"space-between"}
                >
                    <Link
                        to="/details/$mediaType/$id"
                        params={{
                            mediaType: mediaType as string,
                            id: data?.id?.toString() ?? "",
                        }}
                    >
                        <Button
                            label={isLoading ? "Loading..." : "View Details"}
                            $secondary
                            style={{
                                flexGrow: 1,
                            }}
                        />
                    </Link>
                    <Tooltip
                        content={
                            isInWatchList
                                ? "Already in watchlist"
                                : "Add to watchlist"
                        }
                        positioning={{ placement: "top" }}
                        showArrow
                    >
                        <Button
                            label={"Add"}
                            zIndex={2}
                            disabled={isLoading}
                            p={"1"}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (isInWatchList) {
                                    enqueueToast(
                                        "Already in watchlist",
                                        "info",
                                    );
                                    return;
                                }
                                handleAddToWatchList({
                                    ...data,
                                    mediaType: mediaType as MediaType,
                                });
                            }}
                        >
                            {isInWatchList ? (
                                <BiCheck
                                    color="var(--text--primary-color)"
                                    strokeWidth={"1.5"}
                                />
                            ) : (
                                <BiPlus
                                    color="var(--text--primary-color)"
                                    strokeWidth={"1.5"}
                                />
                            )}
                        </Button>
                    </Tooltip>
                </Card.Footer>
            </StyledInfoWrapper>
        </StyledCard>
    );
}
