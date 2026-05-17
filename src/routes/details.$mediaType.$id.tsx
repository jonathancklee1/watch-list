import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "./__root";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { useMediaDetails } from "../utils/data-hooks/useDetailsMedia";
import { useDetailsAnime } from "../utils/data-hooks/useDetailsAnime";
import { useMediaRecommendations } from "../utils/data-hooks/useRecommendationsMedia";
import { useRecommendationsAnime } from "../utils/data-hooks/useRecommendationsAnime";
import { DetailsBanner } from "../components/details/DetailsBanner/DetailsBanner";
import { DetailsContent } from "../components/details/DetailsContent/DetailsContent";
import { SimilarRecommendations } from "../components/details/SimilarRecommendations/SimilarRecommendations";
import { mapToValidMedia } from "../utils/helpers/mapToValidMedia";
import type { MediaType } from "../utils/types";

export const Route = createFileRoute("/details/$mediaType/$id")({
    // Load data using the params
    component: MediaDetailsComponent,
});

function MediaDetailsComponent() {
    const { mediaType, id } = Route.useParams();
    const { data } = useMediaDetails(mediaType, id);
    const { data: animeDetail } = useDetailsAnime(id);
    const { data: animeRecommendations } = useRecommendationsAnime(id);
    const { data: recommendations } = useMediaRecommendations(mediaType, id);
    // console.log(mediaType, id, "mediaType, id");

    const recommendationData =
        mediaType == "anime"
            ? animeRecommendations?.data
                  ?.map((rec) => {
                      return {
                          id: rec.entry.mal_id,
                          title: rec.entry.title,
                          images: rec.entry.images,
                      };
                  })
                  .slice(0, 8)
            : recommendations?.results.slice(0, 8);
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
        <PageWrapper
            style={{
                paddingBottom: "8rem",
                maxWidth: "1200px",
                marginInline: "auto",
            }}
        >
            <Flex gap={4} direction={"column"}>
                <Grid
                    gap={6}
                    templateColumns={{
                        base: "1fr",
                        md: "3fr 2fr",
                    }}
                    alignContent={"start"}
                >
                    <DetailsBanner
                        detailsData={detailsData}
                        mediaType={mediaType.toLowerCase() as MediaType}
                    />
                    <DetailsContent detailsData={detailsData} />
                    <SimilarRecommendations
                        recommendationData={recommendationData}
                        mediaType={mediaType}
                    />
                </Grid>
            </Flex>
        </PageWrapper>
    );
}
