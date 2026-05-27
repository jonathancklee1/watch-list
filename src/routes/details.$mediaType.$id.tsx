import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "./__root";
import { Flex, Grid } from "@chakra-ui/react";
import { useMediaDetails } from "../utils/data-hooks/useDetailsMedia";
import { useDetailsAnime } from "../utils/data-hooks/useDetailsAnime";
import { useMediaRecommendations } from "../utils/data-hooks/useRecommendationsMedia";
import { useRecommendationsAnime } from "../utils/data-hooks/useRecommendationsAnime";
import { DetailsBanner } from "../components/details/DetailsBanner/DetailsBanner";
import { DetailsContent } from "../components/details/DetailsContent/DetailsContent";
import { SimilarRecommendations } from "../components/details/SimilarRecommendations/SimilarRecommendations";
import type {
    AnimeRecommendationItem,
    ApiData,
    ApiMovieData,
    MediaType,
} from "../utils/types";
import { mapToCard } from "../utils/helpers/mapToCard";

export const Route = createFileRoute("/details/$mediaType/$id")({
    // Load data using the params
    component: MediaDetailsComponent,
});

function MediaDetailsComponent() {
    const { mediaType, id } = Route.useParams() as {
        mediaType: Omit<MediaType, "anime">;
        id: string;
    };
    const { data, isLoading } = useMediaDetails(mediaType, id);
    const { data: animeDetail, isLoading: isAnimeLoading } = useDetailsAnime(
        id,
    ) as {
        data: {
            data: ApiData;
        };

        isLoading: boolean;
    };
    const { data: animeRecommendations, isLoading: isAnimeRecLoading } =
        useRecommendationsAnime(id) as {
            data: { data: { entry: AnimeRecommendationItem }[] } | null;
            isLoading: boolean;
        };
    const { data: recommendations, isLoading: isRecMediaLoading } =
        useMediaRecommendations(mediaType, id) as {
            data: { results: ApiMovieData[] } | null;
            isLoading: boolean;
        };
    const recommendationData =
        mediaType == "anime"
            ? animeRecommendations?.data
                  ?.map((rec) => {
                      return {
                          id: rec.entry.mal_id,
                          title: rec.entry.title,
                          images: {
                              src: rec.entry.images?.webp.image_url,
                          },
                      };
                  })
                  .slice(0, 8)
            : recommendations?.results?.slice(0, 8).map((rec) => {
                  return {
                      id: rec?.id,
                      title: rec?.title ?? rec?.name ?? "",
                      images: {
                          src: rec?.poster_path,
                      },
                      airDate: rec?.first_air_date,
                  };
              });
    const detailsData =
        mediaType === "anime"
            ? {
                  ...mapToCard(animeDetail?.data),
                  networks: animeDetail?.data?.networks,
                  producers: animeDetail?.data?.producers,
              }
            : {
                  ...mapToCard(data),
                  networks: data?.networks,
                  producers: data?.production_companies,
              };

    const contentLoading = mediaType === "anime" ? isAnimeLoading : isLoading;
    const recLoading =
        mediaType === "anime" ? isRecMediaLoading : isAnimeRecLoading;
    return (
        <PageWrapper
            style={{
                paddingBottom: "5em",
                maxWidth: "1200px",
                marginInline: "auto",
                paddingTop: "2em",
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
                        isLoading={contentLoading}
                    />
                    <DetailsContent
                        detailsData={detailsData}
                        isLoading={contentLoading}
                    />
                    <SimilarRecommendations
                        recommendationData={recommendationData}
                        mediaType={mediaType}
                        isLoading={recLoading}
                    />
                </Grid>
            </Flex>
        </PageWrapper>
    );
}
