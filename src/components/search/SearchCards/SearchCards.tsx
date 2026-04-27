import type { CardProps } from "../../../utils/types";
import { Box, Skeleton } from "@chakra-ui/react";
import { Button } from "../../Button/Button";
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
    return (
        <StyledCard>
            <StyledImageWrapper>
                <Button
                    label={"Add"}
                    position={"absolute"}
                    right={"4"}
                    bottom={"4"}
                    zIndex={2}
                    disabled={isLoading}
                >
                    <BiPlus
                        color="var(--text--primary-color)"
                        strokeWidth={"1.5"}
                    />
                </Button>
                {data?.image?.src ? (
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
                        <Skeleton height="5" />
                    ) : (
                        (data?.rating ?? "null")
                    )}
                </StyledTag>
            </StyledImageWrapper>
            <StyledCardFooter>
                <StyledTitle>
                    {isLoading ? (
                        <Skeleton height="5" />
                    ) : (
                        (data?.title ?? "null")
                    )}
                </StyledTitle>
                <Box>
                    <StyledDescription>
                        {isLoading ? (
                            <Skeleton height="5" />
                        ) : (
                            (data?.releaseDate ?? "null")
                        )}{" "}
                        | {isLoading ? <Skeleton height="5" /> : mainGenre}
                    </StyledDescription>
                </Box>
            </StyledCardFooter>
        </StyledCard>
    );
}
