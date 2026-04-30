import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { isMobile } from "../../../utils/helpers/isMobile";
import { mapToCard } from "../../../utils/helpers/mapToCard";
import { TopRatedCard } from "../TopRatedCard/TopRatedCard";
import { StyledDiv } from "./TopRatedSection.styles";
import type { CardType } from "../../../utils/types";
export function TopRatedSection({
    cardData,
    isLoading,
}: {
    cardData: CardType[];
    isLoading?: boolean;
}) {
    console.log(cardData);
    const [mobileSlidesNumber, setMobileSlidesNumber] = useState(1.5);
    window.addEventListener("resize", () => {
        if (isMobile()) {
            setMobileSlidesNumber(1.5);
        } else {
            setMobileSlidesNumber(3);
        }
    });
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
                    // <GridItem key={item?.id}>
                    <TopRatedCard
                        key={item?.id}
                        data={mapToCard(item)}
                        isLoading={isLoading}
                        ranking={index + 1}
                    />
                    // </GridItem>
                ))}
            </Grid>
        </StyledDiv>
    );
}
