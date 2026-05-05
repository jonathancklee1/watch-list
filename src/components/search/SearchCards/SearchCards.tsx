import type { CardProps } from "../../../utils/types";
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
import { BiPlus } from "react-icons/bi";

import { EmptyImage } from "../../EmptyImage/EmptyImage";
import { useContext } from "react";
import { GenreListContext } from "../../../utils/context/GenreListContext";
import { mapToValidMedia } from "../../../utils/helpers/mapToValidMedia";
import { RatingTag } from "../../RatingTag/RatingTag";

export function SearchCards({ data, isLoading, selectedCategory }: CardProps) {
    const genreList =
        useContext(GenreListContext)[mapToValidMedia(selectedCategory)];
    const mainGenre = genreList
        ?.filter((genre) => data?.genres?.includes(genre.id))
        .map((genre) => genre.name)[0];
    return (
        <StyledCard>
            <StyledImageWrapper>
                <Tooltip
                    content="Add to watchlist"
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
                    >
                        <BiPlus
                            color="var(--text--primary-color)"
                            strokeWidth={"1.5"}
                        />
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
                            (data?.releaseDate ?? "null") +
                            " " +
                            "|" +
                            " " +
                            (mainGenre ?? data?.genres?.[0]?.name ?? "Unknown")
                        )}
                    </StyledDescription>
                </Box>
            </StyledCardFooter>
        </StyledCard>
    );
}
