import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "./__root";
import {
    Badge,
    Box,
    Flex,
    Heading,
    Image,
    Separator,
    Text,
} from "@chakra-ui/react";
import { RatingTag } from "../components/RatingTag/RatingTag";
import { Button } from "../components/Button/Button";
import styled from "styled-components";
import { CardCarousel } from "../components/CardCarousel/CardCarousel";
import { MediaCard } from "../components/MediaCard/MediaCard";
import { mapToCard } from "../utils/helpers/mapToCard";
import { isMobile } from "../utils/helpers/isMobile";
import { useMediaDetails } from "../utils/data-hooks/useMediaDetails";
import { getPosterImage } from "../utils/helpers/getPosterImage";

export const Route = createFileRoute("/details/$mediaType/$id")({
    // Load data using the params
    component: MediaDetailsComponent,
});

const StyledBackgroundImage = styled(Image)`
    z-index: -1;
    object-fit: cover;
    aspect-ratio: 3/4;
    position: relative;

    filter: brightness(0.6);
    &::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 0.5) 50%,
            rgba(0, 0, 0, 0) 100%
        );
        z-index: 1; /* Add a higher z-index value to ensure the pseudo-element is on top */
        border: 1px solid red; /* Add a border to the pseudo-element for visibility */
    }
`;
const StyledInfoBox = styled(Flex)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    inset: 0;
    justify-content: flex-end;
    padding-inline: 1em;
    padding-bottom: 1.5em;
`;

function MediaDetailsComponent() {
    // Access params directly in the component
    const { mediaType, id } = Route.useParams();
    const { data } = useMediaDetails(mediaType, id);
    console.log(data);
    const genres = (data && data?.genres?.map((genre) => genre?.name)) ?? [];
    return (
        <PageWrapper>
            <Flex gap={4} direction={"column"}>
                <Flex gap={6} direction={"column"}>
                    <Flex
                        gap={4}
                        direction={"column"}
                        zIndex={10}
                        position={"relative"}
                        maxHeight={"60vh"}
                        overflow={"hidden"}
                    >
                        <StyledInfoBox>
                            <RatingTag
                                rating={data && data?.vote_average?.toFixed(1)}
                                isLoading={false}
                            />
                            <Heading as="h1" fontSize={"2rem"}>
                                {data && data?.title}
                            </Heading>
                            <Flex
                                gap={"4"}
                                color={"var(--text--secondary-color)"}
                            >
                                <Text>{data && data?.runtime} mins</Text>{" "}
                                <Separator
                                    orientation={"vertical"}
                                    borderColor={"var(--primary-color)"}
                                />
                                <Text>{data && data?.release_date}</Text>
                            </Flex>
                            <Button label="Add to Watchlist" $secondary />
                        </StyledInfoBox>
                        <StyledBackgroundImage
                            src={`${getPosterImage(data && data?.poster_path)}`}
                            alt="Media Image"
                        />
                    </Flex>
                    <Flex gap={6} direction={"column"} px={"1em"}>
                        <Flex gap={4} alignItems={"center"}>
                            {genres?.map((genre) => (
                                <Badge
                                    key={genre}
                                    width={"fit-content"}
                                    fontWeight={"bold"}
                                    p={".5em"}
                                    background={"var(--secondary-color)"}
                                >
                                    {genre}
                                </Badge>
                            ))}
                        </Flex>
                        <Text color={"var(--text--secondary-color)"}>
                            {data && data?.overview}
                        </Text>
                    </Flex>
                    {/* Add Similar recommendation as carousel */}
                    <Box>
                        <Flex
                            gap="4"
                            alignItems={"center"}
                            width={"100%"}
                            my={"1em"}
                            px={"1em"}
                        >
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
                        </Flex>

                        {isMobile() && (
                            <CardCarousel
                                slidesPerPage={3}
                                items={[]?.map((item) => {
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
                        )}
                    </Box>
                </Flex>
            </Flex>
        </PageWrapper>
    );
}
