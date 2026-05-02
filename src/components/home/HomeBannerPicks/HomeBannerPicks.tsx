import { Suspense, useState } from "react";
import { useTrendingMedia } from "../../../utils/data-hooks/useTrendingMedia";
import { CardCarousel } from "../../CardCarousel/CardCarousel";
import { MediaCard } from "../../MediaCard/MediaCard";
import { isMobile } from "../../../utils/helpers/isMobile";
import { Grid } from "@chakra-ui/react";
import { TMDB_IMAGE_URL } from "../../../utils/constants";
import { mapToCard } from "../../../utils/helpers/mapToCard";

export function HomeBannerPicks() {
    const [isMobileState, setIsMobileState] = useState(isMobile());
    const { data: trendingMovies, isLoading } = useTrendingMedia("movie");
    // console.log(trendingMovies);
    const trendingArray = [
        trendingMovies?.results[0],
        trendingMovies?.results[1],
        trendingMovies?.results[2],
    ].map((item) => {
        return {
            ...item,
            poster_path: `${TMDB_IMAGE_URL}${item?.poster_path} `,
        };
    });
    const mobileSlidesNumber = 1;
    window.addEventListener("resize", () => {
        if (isMobile()) {
            setIsMobileState(true);
        } else {
            setIsMobileState(false);
        }
    });
    console.log(trendingArray);
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
                                data={mapToCard(item)}
                                isLoading={isLoading}
                                tagText="Trending"
                                mediaType="Movies"
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
                                data={mapToCard(item)}
                                isLoading={isLoading}
                                tagText="Trending"
                                mediaType="Movies"
                            />
                        </Suspense>
                    ))}
                </Grid>
            )}
        </>
    );
}
