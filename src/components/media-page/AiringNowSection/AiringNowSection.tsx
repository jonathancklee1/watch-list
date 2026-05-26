import { Flex, Heading, Spinner } from "@chakra-ui/react";
import { StyledDiv } from "./AiringNowSection.styles";
import { CardCarousel } from "../../CardCarousel/CardCarousel";
import { mapToCard } from "../../../utils/helpers/mapToCard";
import { MediaCard } from "../../MediaCard/MediaCard";
import { isMobile } from "../../../utils/helpers/isMobile";
import { useState } from "react";
import type { ApiData, ApiMovieData, MediaType } from "../../../utils/types";
export function AiringNowSection({
    carouselData,
    isLoading,
    mediaType,
}: {
    carouselData: ApiMovieData[] | ApiData[];
    isLoading?: boolean;
    mediaType: MediaType;
}) {
    const [mobileSlidesNumber, setMobileSlidesNumber] = useState(
        isMobile() ? 1.5 : 3,
    );
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
            {isLoading ? (
                <Spinner size="sm" mx={"auto"} />
            ) : (
                <CardCarousel
                    slidesPerPage={mobileSlidesNumber}
                    items={carouselData?.map((item) => (
                        <MediaCard
                            key={item?.id}
                            data={mapToCard(item)}
                            isLoading={isLoading}
                            mediaType={mediaType}
                        />
                    ))}
                />
            )}
        </StyledDiv>
    );
}
