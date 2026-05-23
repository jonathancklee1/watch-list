import { Suspense, useState } from "react";
import { useTrendingMedia } from "../../../utils/data-hooks/useTrendingMedia";
import { CardCarousel } from "../../CardCarousel/CardCarousel";
import { MediaCard } from "../../MediaCard/MediaCard";
import { isMobile } from "../../../utils/helpers/isMobile";
import { Grid } from "@chakra-ui/react";
import { mapToCard } from "../../../utils/helpers/mapToCard";
import { useTrendingAnime } from "../../../utils/data-hooks/useTrendingAnime";

export function HomeBannerPicks() {
    const [isMobileState, setIsMobileState] = useState(isMobile());
    const { data: trendingMovies, isLoading } = useTrendingMedia("movie");
    const { data: trendingShows } = useTrendingMedia("tv");
    const { data: trendingAnime } = useTrendingAnime();
    const trendingArray = [
        trendingMovies?.results[0],
        trendingShows?.results[0],
        trendingAnime?.data[0],
    ].map((item) => mapToCard(item));
    const mobileSlidesNumber = 1;
    window.addEventListener("resize", () => {
        if (isMobile()) {
            setIsMobileState(true);
        } else {
            setIsMobileState(false);
        }
    });
    return (
        <>
            {isMobileState ? (
                <CardCarousel
                    slidesPerPage={mobileSlidesNumber}
                    items={trendingArray.map((item) => (
                        <Suspense
                            key={item?.id}
                            fallback={<div>Loading...</div>}
                        >
                            <MediaCard
                                key={item?.id}
                                data={item}
                                isLoading={isLoading}
                                tagText="Trending"
                                mediaType="movie"
                            />
                        </Suspense>
                    ))}
                />
            ) : (
                <Grid templateColumns="repeat(3, 1fr)" gap="6">
                    {trendingArray.map((item) => (
                        <Suspense
                            key={item?.id}
                            fallback={<div>Loading...</div>}
                        >
                            <MediaCard
                                key={item?.id}
                                data={item}
                                isLoading={isLoading}
                                tagText="Trending"
                                mediaType="movie"
                            />
                        </Suspense>
                    ))}
                </Grid>
            )}
        </>
    );
}
