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
import type { MediaType } from "../utils/types";
import { mapToCard } from "../utils/helpers/mapToCard";

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
            : recommendations?.results?.slice(0, 8);
    const detailsData =
        mediaType === "anime" ? mapToCard(animeDetail?.data) : mapToCard(data);
    console.log(data, animeDetail, mapToCard(data), mapToCard(animeDetail));
    return (
        <PageWrapper
            style={{
                paddingBottom: "8em",
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
