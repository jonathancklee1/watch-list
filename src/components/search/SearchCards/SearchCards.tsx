import type { CardProps } from "../../../utils/types";
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
import { useGenreList } from "../../../utils/data-hooks/useGenreList";
import { EmptyImage } from "../../EmptyImage/EmptyImage";

export function SearchCards({ data, isLoading }: CardProps) {
    const { data: genreList } = useGenreList();
    const mainGenre =
        genreList?.genres
            ?.filter((genre) => data?.genres?.includes(genre.id))
            .map((genre) => genre.name)[0] ?? "Unknown";
    console.log(mainGenre);
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
                            mainGenre
                        )}
                    </StyledDescription>
                </Box>
            </StyledCardFooter>
        </StyledCard>
    );
}
