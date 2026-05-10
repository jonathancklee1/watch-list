import { Flex, Heading, Separator, Box, Stack } from "@chakra-ui/react";
import { isMobile } from "../../../utils/helpers/isMobile";
import { mapToCard } from "../../../utils/helpers/mapToCard";
import { CardCarousel } from "../../CardCarousel/CardCarousel";
import { MediaCard } from "../../MediaCard/MediaCard";
import type { RecommendationData } from "../../../utils/types";
import { StyledHeadingWrapper } from "./SimilarRecommendations.styles";
import { useState } from "react";
export function SimilarRecommendations({
    recommendationData,
    mediaType,
}: {
    recommendationData: RecommendationData[];
    mediaType: string;
}) {
    const [isMobileState, setIsMobileState] = useState(isMobile());
    window.addEventListener("resize", () => {
        if (isMobile()) {
            setIsMobileState(true);
        } else {
            setIsMobileState(false);
        }
    });
    return (
        <>
            {isMobileState ? (
                <>
                    <StyledHeadingWrapper>
                        <Heading
                            as={"h2"}
                            fontSize={"1.5rem"}
                            color={"var(--text--primary-color)"}
                        >
                            Similar Recommendations
                        </Heading>
                        <Separator
                            variant="solid"
                            width={"100%"}
                            borderColor={"var(--secondary-color)"}
                        />
                    </StyledHeadingWrapper>
                    <Box px={"1em"}>
                        <CardCarousel
                            slidesPerPage={1.5}
                            items={recommendationData?.map((item) => {
                                const { overview, ...newItem } = item;
                                return (
                                    <MediaCard
                                        key={item?.id}
                                        data={mapToCard(newItem)}
                                        isLoading={false}
                                        mediaType={mediaType}
                                    />
                                );
                            })}
                            enableControls
                        />
                    </Box>
                </>
            ) : (
                <Flex
                    flexDirection={"column"}
                    gap={"1em"}
                    p={"1em"}
                    borderRadius={"16px"}
                    background={"gray"}
                    alignItems={"stretch"}
                    justifyItems={"stretch"}
                >
                    <Heading
                        as={"h2"}
                        fontSize={"1rem"}
                        color={"var(--text--primary-color)"}
                    >
                        Similar Recommendations
                    </Heading>
                    <Flex
                        flexDirection={"column"}
                        gap="1em"
                        height={"40em"}
                        maxHeight={"50em"}
                        overflowY={"auto"}
                    >
                        {recommendationData?.map((item) => {
                            const { overview, ...newItem } = item;
                            return (
                                <MediaCard
                                    key={item?.id}
                                    data={mapToCard(newItem)}
                                    isLoading={false}
                                    mediaType={mediaType}
                                />
                            );
                        })}
                    </Flex>
                </Flex>
            )}
        </>
    );
}
