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
import { useMediaDetails } from "../utils/data-hooks/useDetailsMedia";
import { useDetailsAnime } from "../utils/data-hooks/useDetailsAnime";
import { getPosterImage } from "../utils/helpers/getPosterImage";
import { useMediaRecommendations } from "../utils/data-hooks/useMediaRecommendations";

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
    const { data: animeDetail } = useDetailsAnime(id);
    const { data: recommendations } = useMediaRecommendations(mediaType, id);
    console.log(data, animeDetail);
    console.log(recommendations);
    const genres =
        mediaType === "anime"
            ? animeDetail?.data?.genres.map((genre) => genre.name)
            : ((data && data?.genres?.map((genre) => genre?.name)) ?? []);
    const recommendationData = recommendations && recommendations?.results;
    const detailsData =
        mediaType === "anime"
            ? {
                  rating: animeDetail?.data?.score,
                  poster: animeDetail?.data?.images?.webp.large_image_url,
                  title:
                      animeDetail?.data?.title_english ||
                      animeDetail?.data?.title,
                  overview: animeDetail?.data?.synopsis,
                  releaseDate: animeDetail?.data?.aired?.from?.split("-")[0],
                  genres: animeDetail?.data?.genres.map((genre) => genre.name),
                  episodes: animeDetail?.data?.episodes,
              }
            : {
                  poster: data?.poster_path,
                  releaseDate:
                      data?.release_date?.split("-")[0] ||
                      data?.first_air_date?.split("-")[0],
                  genres: data?.genres.map((genre) => genre.name),
                  episodes: data?.number_of_episodes,
                  seasons: data?.number_of_seasons,
                  runtime: data?.runtime,
                  backdrop: data?.backdrop_path,
                  overview: data?.overview,
                  title: data?.title || data?.name,
                  rating: data?.vote_average,
              };
    return (
        <PageWrapper style={{ paddingBottom: "8rem" }}>
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
                                rating={detailsData?.rating?.toFixed(1)}
                                isLoading={false}
                            />
                            <Heading as="h1" fontSize={"2rem"}>
                                {detailsData?.title}
                            </Heading>
                            <Flex
                                gap={"4"}
                                color={"var(--text--secondary-color)"}
                            >
                                <Text>
                                    {detailsData?.runtime
                                        ? `${detailsData?.runtime} mins`
                                        : null}
                                    {detailsData?.episodes
                                        ? `${detailsData?.episodes} Episodes`
                                        : null}
                                    {detailsData?.seasons
                                        ? `| ${detailsData?.seasons} Seasons`
                                        : null}
                                </Text>{" "}
                                <Separator
                                    orientation={"vertical"}
                                    borderColor={"var(--primary-color)"}
                                />
                                <Text>
                                    {detailsData?.releaseDate
                                        ? detailsData?.releaseDate
                                        : "N/A"}
                                </Text>
                            </Flex>
                            <Button label="Add to Watchlist" $secondary />
                        </StyledInfoBox>
                        <StyledBackgroundImage
                            src={`${mediaType === "anime" ? detailsData.poster : getPosterImage(detailsData.poster)}`}
                            alt="Media Image"
                        />
                    </Flex>
                    <Flex gap={6} direction={"column"} px={"1em"}>
                        <Flex gap={4} alignItems={"center"} flexWrap={"wrap"}>
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
                            {detailsData?.overview}
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
                        )}
                    </Box>
                </Flex>
            </Flex>
        </PageWrapper>
    );
}
