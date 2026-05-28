import { Suspense, useEffect, useState } from "react";
import { useTrendingMedia } from "../../../utils/data-hooks/useTrendingMedia";
import { CardCarousel } from "../../CardCarousel/CardCarousel";
import { MediaCard } from "../../MediaCard/MediaCard";
import { isMobile } from "../../../utils/helpers/isMobile";
import { Grid } from "@chakra-ui/react";
import { mapToCard } from "../../../utils/helpers/mapToCard";
import { useTrendingAnime } from "../../../utils/data-hooks/useTrendingAnime";
import type { ApiAnimeData, MediaType } from "../../../utils/types";
import FadeInUpComponent from "../../FadeInUpComponent";

export function HomeBannerPicks() {
    const [isMobileState, setIsMobileState] = useState(isMobile());
    const { data: trendingMovies, isLoading } = useTrendingMedia("movie");
    const { data: trendingShows } = useTrendingMedia("tv");
    const { data: trendingAnime } = useTrendingAnime() as {
        data: ApiAnimeData;
        isLoading: boolean;
    };
    const trendingArray = [
        { ...trendingMovies?.results[0], mediaType: "movie" },
        { ...trendingShows?.results[0], mediaType: "tv" },
        { ...trendingAnime?.data[0], mediaType: "anime" },
    ]
        .map((item) => mapToCard(item, item.mediaType as MediaType))
        .filter((item) => item !== null && item.title);
    const mobileSlidesNumber = 1;

    useEffect(() => {
        const handleResize = () => {
            setIsMobileState(isMobile());
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <FadeInUpComponent>
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
                                tagText={`Trending ${item?.mediaType === "anime" ? "Anime" : item?.mediaType === "movie" ? "Movie" : "TV Show"}`}
                                mediaType={item?.mediaType ?? "movie"}
                            />
                        </Suspense>
                    ))}
                    enableControls
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
                                tagText={`Trending ${item?.mediaType === "anime" ? "Anime" : item?.mediaType === "movie" ? "Movie" : "TV Show"}`}
                                mediaType={item?.mediaType ?? "movie"}
                            />
                        </Suspense>
                    ))}
                </Grid>
            )}
        </FadeInUpComponent>
    );
}
