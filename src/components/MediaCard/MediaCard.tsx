import type { CardProps } from "../../utils/types";
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
import { BiPlus } from "react-icons/bi";

import { EmptyImage } from "../EmptyImage/EmptyImage";
import { useContext } from "react";
import { GenreListContext } from "../../utils/context/GenreListContext";
import { mapToValidMedia } from "../../utils/helpers/mapToValidMedia";

export function MediaCard({ data, isLoading, tagText, mediaType }: CardProps) {
    const genreList = useContext(GenreListContext)[mapToValidMedia(mediaType)];
    console.log(genreList, mediaType, data);
    const mainGenre =
        mediaType === "Anime"
            ? data?.genres[0]?.name
            : genreList
                  .filter((genre) => data?.genres?.includes(genre.id))
                  .map((genre) => genre.name)[0];
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
                >
                    {tagText && (
                        <StyledTag>
                            <Tag.Label>{tagText}</Tag.Label>
                        </StyledTag>
                    )}
                    <StyledTitle lineClamp={3} overflow={"hidden"}>
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
                <Card.Footer gap="2" zIndex={10} mt={"1rem"}>
                    <Button
                        label={isLoading ? "Loading..." : "View Details"}
                        href={data?.id ? `/movie/${data?.id}` : ""}
                        style={{
                            flexGrow: 1,
                        }}
                    />
                    <Tooltip
                        content="Add to watchlist"
                        positioning={{ placement: "top" }}
                        showArrow
                    >
                        <Button
                            label={"Add"}
                            zIndex={2}
                            disabled={isLoading}
                            p={"1"}
                            $secondary
                        >
                            <BiPlus
                                color="var(--text--primary-color)"
                                strokeWidth={"1.5"}
                            />
                        </Button>
                    </Tooltip>
                </Card.Footer>
            </StyledInfoWrapper>
        </StyledCard>
    );
}
