import { BiPlus } from "react-icons/bi";
import { StyledCard, StyledImage } from "./RecommendationCard.styles";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Button } from "../../Button/Button";
import { Tooltip } from "../../ui/tooltip";
import { getPosterImage } from "../../../utils/helpers/getPosterImage";
import type { CardType } from "../../../utils/types";
import { useWatchListController } from "../../../utils/controllers/useWatchListController";
import { mapToCard } from "../../../utils/helpers/mapToCard";

export function RecommendationCard({ data, mediaType }: CardType) {
    const { handleAddToWatchList } = useWatchListController();
    console.log(data);
    return (
        <StyledCard
            className="glass"
            background={"var(--background--secondary-color)/80"}
        >
            <StyledImage
                src={
                    data?.images?.webp.large_image_url ??
                    getPosterImage(data?.poster_path)
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
                        {data.title || data.name}
                    </Text>
                    <Text
                        lineClamp={2}
                        color={"var(--text--secondary-color)"}
                        fontSize={"1rem"}
                    >
                        {
                            (data.release_date || data.first_air_date)?.split(
                                "-",
                            )[0]
                        }
                    </Text>
                </Flex>

                <Box position={"absolute"} bottom={1} right={1}>
                    <Tooltip
                        content="Add to watchlist"
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
                                handleAddToWatchList({
                                    ...mapToCard(data),
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
                </Box>
            </Flex>
        </StyledCard>
    );
}
