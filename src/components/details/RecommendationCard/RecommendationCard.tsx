import { BiPlus } from "react-icons/bi";
import { StyledCard, StyledImage } from "./RecommendationCard.styles";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Button } from "../../Button/Button";
import { Tooltip } from "../../ui/tooltip";
import { getPosterImage } from "../../../utils/helpers/getPosterImage";
import type { CardType } from "../../../utils/types";
import { useWatchListController } from "../../../utils/controllers/useWatchListController";

export function RecommendationCard({ data, mediaType }: CardType) {
    const { handleAddToWatchList } = useWatchListController();

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
                <Text fontWeight={800} lineClamp={2}>
                    {data.title}
                </Text>

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
                </Box>
            </Flex>
        </StyledCard>
    );
}
