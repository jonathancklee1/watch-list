import { Flex, Grid, Heading } from "@chakra-ui/react";
import { mapToCard } from "../../../utils/helpers/mapToCard";
import { TopRatedCard } from "../TopRatedCard/TopRatedCard";
import { StyledDiv } from "./TopRatedSection.styles";
import type { ApiMovieData, MediaType } from "../../../utils/types";
export function TopRatedSection({
    cardData,
    isLoading,
    mediaType,
}: {
    cardData: ApiMovieData[];
    isLoading?: boolean;
    mediaType: MediaType;
}) {
    return (
        <StyledDiv>
            <Flex gap="1" direction="column">
                <Heading
                    as={"h2"}
                    fontSize={".75rem"}
                    color={"var(--primary-color)"}
                >
                    ALL TIME
                </Heading>
                <Heading
                    as={"h2"}
                    fontSize={"1.5rem"}
                    color={"var(--text--primary-color)"}
                >
                    Top Rated
                </Heading>
            </Flex>
            <Grid
                templateColumns={{
                    base: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                }}
                templateRows={{
                    lg: "repeat(2, auto)",
                }}
                gap={4}
            >
                {cardData?.map((item, index) => (
                    <TopRatedCard
                        key={item?.id}
                        data={mapToCard(item)}
                        isLoading={isLoading}
                        ranking={index + 1}
                        mediaType={mediaType}
                    />
                ))}
            </Grid>
        </StyledDiv>
    );
}
