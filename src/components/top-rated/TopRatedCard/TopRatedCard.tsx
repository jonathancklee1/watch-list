import { Badge, Box, Card } from "@chakra-ui/react";
import { StyledBody, StyledCard, StyledImage } from "./TopRatedCard.styles";
import { BiPlus } from "react-icons/bi";
import { Button } from "../../Button/Button";
import { Tooltip } from "../../../components/ui/tooltip";
import type { CardType, MediaType } from "../../../utils/types";
import { mapToValidMedia } from "../../../utils/helpers/mapToValidMedia";
import { Link } from "@tanstack/react-router";
import { useWatchListController } from "../../../utils/controllers/useWatchListController";

export function TopRatedCard({
    data,
    ranking,
    isLoading,
    mediaType,
}: {
    data: CardType | null;
    ranking: number;
    isLoading?: boolean;
    mediaType: MediaType;
}) {
    // console.log(data, "data");
    const isFirst = ranking === 1;
    const { handleAddToWatchList } = useWatchListController();
    return (
        <StyledCard $isFirst={isFirst}>
            <Link
                to="/details/$mediaType/$id"
                params={{
                    mediaType: mapToValidMedia(mediaType),
                    id: data?.id,
                }}
                style={{
                    flexGrow: 1,
                }}
            >
                <StyledImage
                    src={data?.image?.src}
                    alt={data?.title}
                    loading="lazy"
                />
                <StyledBody $isFirst={isFirst}>
                    <Badge
                        variant={"solid"}
                        fontSize={isFirst ? "2rem" : "1.5rem"}
                        fontWeight="bold"
                        color={"var(--primary-color)"}
                        position={"absolute"}
                        top={".5em"}
                        p={".4em"}
                    >
                        #{ranking}
                    </Badge>
                    <Box
                        display={"flex"}
                        flexDirection={isFirst ? "column" : "row"}
                        justifyContent={"space-between"}
                        alignItems={!isFirst ? "end" : undefined}
                        gap={{ base: ".5rem", md: "1.5rem" }}
                    >
                        <Card.Title
                            fontSize={{
                                base: isFirst ? "1.5rem" : "1rem",
                                md: isFirst ? "2rem" : "1.5rem",
                            }}
                            lineClamp={3}
                            overflowX={"hidden"}
                        >
                            {data?.title}
                        </Card.Title>

                        <Card.Footer p={0} gap={".75em"}>
                            {isFirst && (
                                <Link
                                    to="/details/$mediaType/$id"
                                    params={{
                                        mediaType: mapToValidMedia(mediaType),
                                        id: data?.id,
                                    }}
                                >
                                    <Button
                                        label={
                                            isLoading
                                                ? "Loading..."
                                                : "View Details"
                                        }
                                        style={{
                                            flexGrow: 1,
                                        }}
                                    />
                                </Link>
                            )}
                            <Tooltip
                                content="Add to watchlist"
                                positioning={{ placement: "top" }}
                                showArrow
                            >
                                <Button
                                    label={"Add"}
                                    zIndex={10}
                                    disabled={isLoading}
                                    p={"1"}
                                    $secondary
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        handleAddToWatchList({
                                            ...data,
                                            mediaType,
                                        });
                                    }}
                                >
                                    <BiPlus
                                        color="var(--text--primary-color)"
                                        strokeWidth={"1.5"}
                                    />
                                </Button>
                            </Tooltip>
                        </Card.Footer>
                    </Box>
                </StyledBody>
            </Link>
        </StyledCard>
    );
}
