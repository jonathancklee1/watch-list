import type { CardProps } from "../../../utils/types";
import { Box, Card, Skeleton, Tag } from "@chakra-ui/react";
import { Button } from "../../Button/Button";
import {
    StyledCard,
    StyledImage,
    StyledTag,
    StyledTitle,
    StyledDescription,
    StyledImageWrapper,
} from "./SearchCards.styles";
import { BiStar } from "react-icons/bi";

export function SearchCards({ data, isLoading }: CardProps) {
    return (
        <StyledCard>
            <StyledImageWrapper>
                <Button
                    label={"Add"}
                    $secondary
                    position={"absolute"}
                    right={"4"}
                    bottom={"4"}
                    zIndex={2}
                    disabled={isLoading}
                />
                <StyledImage
                    src={
                        data?.image?.src ??
                        "https://image.tmdb.org/t/p/w500/9iuGBLJBRuGKR6nRL4SxUV1tIdt.jpg "
                    }
                    alt={data?.title}
                />
                <StyledTag>
                    <BiStar />{" "}
                    {isLoading ? (
                        <Skeleton height="5" />
                    ) : (
                        (data?.rating ?? "null")
                    )}
                </StyledTag>
            </StyledImageWrapper>
            <Card.Footer
                gap=".5rem"
                zIndex={10}
                pb="0"
                flexDir={"column"}
                alignItems={"start"}
            >
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
                        |{" "}
                        {isLoading ? (
                            <Skeleton height="5" />
                        ) : (
                            (data?.runTime ?? "null")
                        )}
                    </StyledDescription>
                </Box>
            </Card.Footer>
        </StyledCard>
    );
}
