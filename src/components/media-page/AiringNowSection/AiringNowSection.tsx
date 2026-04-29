import { Flex, Heading } from "@chakra-ui/react";
import { StyledDiv } from "./AiringNowSection.styles";
import { CardCarousel } from "../../CardCarousel/CardCarousel";
import { mapToCard } from "../../../utils/helpers/mapToCard";
import { MediaCard } from "../../MediaCard/MediaCard";
import { isMobile } from "../../../utils/helpers/isMobile";
import { useState } from "react";
export function AiringNowSection({
    carouselData,
    isLoading,
}: {
    carouselData: [];
    isLoading?: boolean;
}) {
    console.log(carouselData);
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
                    color={"var(--text--secondary-color)"}
                >
                    FEATURED
                </Heading>
                <Heading
                    as={"h2"}
                    fontSize={"1.5rem"}
                    color={"var(--text--primary-color)"}
                >
                    Airing Now
                </Heading>
            </Flex>
            <CardCarousel
                slidesPerPage={mobileSlidesNumber}
                items={carouselData?.map((item) => (
                    <MediaCard
                        key={item?.id}
                        data={mapToCard(item)}
                        isLoading={isLoading}
                    />
                ))}
            />
        </StyledDiv>
    );
}
