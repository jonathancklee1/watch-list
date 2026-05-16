import { Flex, Heading, Separator, Box, EmptyState } from "@chakra-ui/react";
import { isMobile } from "../../../utils/helpers/isMobile";
import { mapToCard } from "../../../utils/helpers/mapToCard";
import { CardCarousel } from "../../CardCarousel/CardCarousel";
import { MediaCard } from "../../MediaCard/MediaCard";
import type { RecommendationData } from "../../../utils/types";
import { StyledHeadingWrapper } from "./SimilarRecommendations.styles";
import { useState } from "react";
import { RecommendationCard } from "../RecommendationCard/RecommendationCard";
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
                    className="glass"
                    mr={"1em"}
                >
                    <Heading
                        as={"h2"}
                        fontSize={"1.25rem"}
                        color={"var(--secondary-color)"}
                        fontWeight={"bold"}
                    >
                        Similar Recommendations
                    </Heading>
                    <Flex
                        flexDirection={"column"}
                        gap="1em"
                        overflowY={"auto"}
                        h={"550px"}
                    >
                        {recommendationData?.length === 0 && (
                            <EmptyState.Root>
                                <EmptyState.Content>
                                    <EmptyState.Title textAlign={"center"}>
                                        No Recommendations
                                    </EmptyState.Title>
                                </EmptyState.Content>
                            </EmptyState.Root>
                        )}
                        {recommendationData?.map((item) => {
                            return (
                                // <MediaCard
                                //     key={item?.id}
                                //     data={mapToCard(newItem)}
                                //     isLoading={false}
                                //     mediaType={mediaType}
                                // />
                                <RecommendationCard
                                    key={item?.id}
                                    data={item}
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
