import { BiCheck, BiPlus } from "react-icons/bi";
import { StyledCard, StyledImage } from "./RecommendationCard.styles";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Button } from "../../Button/Button";
import { Tooltip } from "../../ui/tooltip";
import { getPosterImage } from "../../../utils/helpers/getPosterImage";
import type {
    CardType,
    MediaType,
    RecommendationData,
} from "../../../utils/types";
import { useWatchListController } from "../../../utils/controllers/useWatchListController";
import { mapToCard } from "../../../utils/helpers/mapToCard";
import { Link } from "@tanstack/react-router";
import { enqueueToast } from "../../../utils/helpers/enqueueToast";
import { useIsInWatchList } from "../../../utils/hooks/useIsInWatchList";

export function RecommendationCard({
    data,
    mediaType,
}: {
    data: RecommendationData | CardType;
    mediaType: MediaType;
}) {
    const { handleAddToWatchList } = useWatchListController();
    const isInWatchList = useIsInWatchList(data);

    return (
        <Link
            to="/details/$mediaType/$id"
            params={{
                mediaType: mediaType,
                id: data?.id?.toString() ?? "",
            }}
        >
            <StyledCard
                className="glass"
                background={"var(--background--secondary-color)/80"}
                position={"relative"}
            >
                <StyledImage
                    src={
                        mediaType == "anime"
                            ? data?.images?.src
                            : getPosterImage(data?.images?.src ?? "")
                    }
                    alt={data.title}
                />
                <Flex
                    flexGrow={1}
                    h={"100%"}
                    position={"relative"}
                    alignItems={"center"}
                    width={"100%"}
                    overflow={"hidden"}
                >
                    <Flex flexDirection={"column"} gap={".5em"}>
                        <Text fontWeight={800} lineClamp={2}>
                            {data.title || "-"}
                        </Text>
                        <Text
                            lineClamp={2}
                            color={"var(--text--secondary-color)"}
                            fontSize={"1rem"}
                        >
                            {
                                (
                                    data.release_date || data.first_air_date
                                )?.split("-")[0]
                            }
                        </Text>
                    </Flex>
                </Flex>
                <Box position={"absolute"} bottom={"16px"} right={"16px"}>
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
                            p={"1"}
                            $secondary
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
                                    ...mapToCard(data),
                                    mediaType,
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
                </Box>
            </StyledCard>
        </Link>
    );
}
