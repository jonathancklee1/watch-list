import type { CardProps, MediaType } from "../../../utils/types";
import { Box, Skeleton } from "@chakra-ui/react";
import { Button } from "../../Button/Button";
import { Tooltip } from "../../../components/ui/tooltip";

import {
    StyledCard,
    StyledImage,
    StyledTitle,
    StyledDescription,
    StyledImageWrapper,
    StyledCardFooter,
} from "./SearchCards.styles";
import { BiCheck, BiPlus } from "react-icons/bi";

import { EmptyImage } from "../../EmptyImage/EmptyImage";
import { useContext } from "react";
import { GenreListContext } from "../../../utils/contexts/GenreListContext";
import { RatingTag } from "../../RatingTag/RatingTag";
import { Link } from "@tanstack/react-router";
import { useWatchListController } from "../../../utils/controllers/useWatchListController";
import { useIsInWatchList } from "../../../utils/hooks/useIsInWatchList";
import { enqueueToast } from "../../../utils/helpers/enqueueToast";

export function SearchCards({ data, isLoading, selectedCategory }: CardProps) {
    const genreContextData = useContext(GenreListContext);
    const genreList = genreContextData[selectedCategory as MediaType];
    const mainGenre = genreList
        ?.filter((genre) => data?.genres?.includes(genre.id))
        .map((genre) => genre.name)[0];
    const { handleAddToWatchList } = useWatchListController();
    const isInWatchList = useIsInWatchList(data);

    return (
        <StyledCard>
            <Link
                to="/details/$mediaType/$id"
                params={{
                    mediaType: selectedCategory ?? "movie",
                    id: data?.id?.toString() ?? "",
                }}
            >
                <StyledImageWrapper>
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
                            position={"absolute"}
                            right={".75rem"}
                            bottom={".75rem"}
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
                                    mediaType: selectedCategory,
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
                    {isLoading ? (
                        <Skeleton
                            height="100%"
                            width="100%"
                            position={"absolute"}
                            inset={"0"}
                        />
                    ) : data?.image?.src ? (
                        <StyledImage
                            src={data?.image?.src ?? ""}
                            alt={data?.title}
                            loading="lazy"
                        />
                    ) : (
                        <EmptyImage />
                    )}
                    <RatingTag
                        rating={Number(data?.rating)}
                        isLoading={!!isLoading}
                        style={{
                            position: "absolute",
                            top: "0.75rem",
                            right: "0.75rem",
                        }}
                    />
                </StyledImageWrapper>
                <StyledCardFooter>
                    <StyledTitle>
                        {isLoading ? (
                            <Skeleton height="5" width="200px" />
                        ) : (
                            (data?.title ?? "null")
                        )}
                    </StyledTitle>
                    <Box>
                        <StyledDescription>
                            {isLoading ? (
                                <Skeleton height="5" width="80px" />
                            ) : (
                                (data?.releaseDate ?? "Unknown") +
                                " " +
                                "|" +
                                " " +
                                (mainGenre ??
                                    data?.genres?.filter(
                                        (
                                            genre,
                                        ): genre is {
                                            id: number;
                                            name: string;
                                        } => typeof genre !== "number",
                                    )?.[0]?.name ??
                                    "Unknown")
                            )}
                        </StyledDescription>
                    </Box>
                </StyledCardFooter>
            </Link>
        </StyledCard>
    );
}
