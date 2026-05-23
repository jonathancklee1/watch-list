import {
    Flex,
    Separator,
    Box,
    EmptyState,
    Spinner,
    Text,
} from "@chakra-ui/react";
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
    isLoading,
}: {
    recommendationData: RecommendationData[];
    mediaType: string;
    isLoading: boolean;
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
                        <Text
                            fontSize={"1.5rem"}
                            color={"var(--text--primary-color)"}
                        >
                            Similar Recommendations
                        </Text>
                        <Separator
                            variant="solid"
                            width={"100%"}
                            borderColor={"var(--secondary-color)"}
                        />
                    </StyledHeadingWrapper>
                    <Box px={"1em"}>
                        {isLoading && (
                            <Flex
                                justifyContent={"center"}
                                alignItems={"center"}
                                h={"300px"}
                            >
                                <Spinner size="xl" />
                            </Flex>
                        )}
                        {recommendationData?.length === 0 && (
                            <EmptyRecommendations />
                        )}
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
                    <Text
                        fontSize={"1.25rem"}
                        color={"var(--text--primary-color)"}
                        fontWeight={"bold"}
                    >
                        Similar Recommendations
                    </Text>
                    <Flex
                        flexDirection={"column"}
                        gap="1em"
                        overflowY={"auto"}
                        h={"550px"}
                        overflowX={"hidden"}
                        paddingRight={"6px"}
                    >
                        {isLoading && (
                            <Flex
                                justifyContent={"center"}
                                alignItems={"center"}
                                h={"300px"}
                            >
                                <Spinner size="xl" />
                            </Flex>
                        )}
                        {recommendationData?.length === 0 && (
                            <EmptyRecommendations />
                        )}
                        {recommendationData?.map((item) => {
                            return (
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

function EmptyRecommendations() {
    return (
        <EmptyState.Root>
            <EmptyState.Content>
                <EmptyState.Title textAlign={"center"}>
                    No Recommendations
                </EmptyState.Title>
            </EmptyState.Content>
        </EmptyState.Root>
    );
}
