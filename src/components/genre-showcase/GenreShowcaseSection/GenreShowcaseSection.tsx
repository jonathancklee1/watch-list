import { Flex, Heading, Separator, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { isMobile } from "../../../utils/helpers/isMobile";
import { mapToCard } from "../../../utils/helpers/mapToCard";
import { CardCarousel } from "../../CardCarousel/CardCarousel";
import { MediaCard } from "../../MediaCard/MediaCard";
import { StyledDiv } from "./GenreShowcaseSection.styles";
import type { ApiMovieData, MediaType } from "../../../utils/types";
import FadeInUpComponent from "../../FadeInUpComponent";
export function GenreShowcaseSection({
    carouselData,
    isLoading,
    genreName = "Genre Name",
    mediaType,
}: {
    carouselData: ApiMovieData[];
    isLoading?: boolean;
    genreName?: string;
    mediaType: MediaType;
}) {
    const [mobileSlidesNumber, setMobileSlidesNumber] = useState(
        isMobile() ? 1.75 : 4,
    );

    useEffect(() => {
        const handleResize = () => {
            if (isMobile()) {
                setMobileSlidesNumber(1.75);
            } else {
                setMobileSlidesNumber(4);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <FadeInUpComponent>
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
                {isLoading ? (
                    <Spinner size="sm" mx={"auto"} />
                ) : (
                    <CardCarousel
                        slidesPerPage={mobileSlidesNumber}
                        items={carouselData?.map((item) => {
                            return (
                                <MediaCard
                                    key={item?.id}
                                    data={mapToCard(item)}
                                    isLoading={isLoading}
                                    mediaType={mediaType}
                                />
                            );
                        })}
                        enableControls
                    />
                )}
            </StyledDiv>
        </FadeInUpComponent>
    );
}

export default GenreShowcaseSection;
