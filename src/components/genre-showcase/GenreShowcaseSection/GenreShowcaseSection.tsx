import { Flex, Heading, Separator } from "@chakra-ui/react";
import { useState } from "react";
import { isMobile } from "../../../utils/helpers/isMobile";
import { mapToCard } from "../../../utils/helpers/mapToCard";
import { CardCarousel } from "../../CardCarousel/CardCarousel";
import { MediaCard } from "../../MediaCard/MediaCard";
import { StyledDiv } from "./GenreShowcaseSection.styles";
import type { ApiMovieData, MediaType } from "../../../utils/types";
export function GenreShowcaseSection({
    carouselData,
    isLoading,
    genreName = "Genre Name",
    mediaType,
}: {
    carouselData: ApiMovieData[];
    isLoading?: boolean;
    genreName: string;
    mediaType: MediaType;
}) {
    console.log(carouselData);
    const [mobileSlidesNumber, setMobileSlidesNumber] = useState(2);

    window.addEventListener("resize", () => {
        if (isMobile()) {
            setMobileSlidesNumber(2);
        } else {
            setMobileSlidesNumber(3);
        }
    });
    return (
        <StyledDiv>
            <Flex gap="4" alignItems={"center"} width={"100%"} mb={"1em"}>
                <Heading
                    as={"h2"}
                    fontSize={"1.5rem"}
                    color={"var(--text--primary-color)"}
                    whiteSpace={"nowrap"}
                >
                    {genreName}
                </Heading>
                <Separator
                    variant="solid"
                    width={"100%"}
                    borderColor={"var(--secondary-color)"}
                />
            </Flex>
            <CardCarousel
                slidesPerPage={mobileSlidesNumber}
                items={carouselData?.map((item) => {
                    const { overview, ...newItem } = item;
                    return (
                        <MediaCard
                            key={item?.id}
                            data={mapToCard(newItem)}
                            isLoading={isLoading}
                            mediaType={mediaType}
                        />
                    );
                })}
                enableControls
            />
        </StyledDiv>
    );
}
