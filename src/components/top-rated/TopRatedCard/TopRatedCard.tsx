import { Badge, Box, Card } from "@chakra-ui/react";
import { StyledBody, StyledCard, StyledImage } from "./TopRatedCard.styles";
import { BiCheck, BiPlus } from "react-icons/bi";
import { Button } from "../../Button/Button";
import { Tooltip } from "../../../components/ui/tooltip";
import type { CardType, MediaType } from "../../../utils/types";
import { Link } from "@tanstack/react-router";
import { useWatchListController } from "../../../utils/controllers/useWatchListController";
import { useIsInWatchList } from "../../../utils/hooks/useIsInWatchList";
import { enqueueToast } from "../../../utils/helpers/enqueueToast";

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
    const isInWatchList = useIsInWatchList(data);
    return (
        <StyledCard $isFirst={isFirst}>
            <Link
                to="/details/$mediaType/$id"
                params={{
                    mediaType: mediaType,
                    id: data?.id?.toString() || "",
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
                        >
                            {data?.title}
                        </Card.Title>

                        <Card.Footer
                            p={0}
                            gap={".75em"}
                            justifyContent={"space-between"}
                        >
                            {isFirst && (
                                <Link
                                    to="/details/$mediaType/$id"
                                    params={{
                                        mediaType: mediaType,
                                        id: data?.id?.toString() || "",
                                    }}
                                >
                                    <Button
                                        $secondary
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
                                    zIndex={10}
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
                                            mediaType,
                                        });
                                    }}
                                >
                                    {isInWatchList ? (
                                        <BiCheck
                                            color="var(--success-color)"
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
                    </Box>
                </StyledBody>
            </Link>
        </StyledCard>
    );
}
