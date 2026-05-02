import type { CardProps, MediaType } from "../../../utils/types";
import { Box, Skeleton } from "@chakra-ui/react";
import { Button } from "../../Button/Button";
import { Tooltip } from "../../../components/ui/tooltip";

import {
    StyledCard,
    StyledImage,
    StyledTag,
    StyledTitle,
    StyledDescription,
    StyledImageWrapper,
    StyledCardFooter,
} from "./SearchCards.styles";
import { BiPlus, BiSolidStar } from "react-icons/bi";

import { EmptyImage } from "../../EmptyImage/EmptyImage";
import { useContext } from "react";
import { GenreListContext } from "../../../utils/context/GenreListContext";
import { mapToValidMedia } from "../../../utils/helpers/mapToValidMedia";

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
                <StyledTag>
                    <BiSolidStar color="var(--secondary-color)" />
                    {isLoading ? (
                        <Skeleton height="5" width="30px" />
                    ) : (
                        (data?.rating ?? "null")
                    )}
                </StyledTag>
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
