import { Suspense, useEffect, useState } from "react";
import { useTMDBApi } from "../../../utils/data-hooks/useTMDBApi";
import { CardCarousel } from "../../CardCarousel/CardCarousel";
import { HomeBannerPicksCard } from "../HomeBannerPicksCard/HomeBannerPicksCard";
import { isMobile } from "../../../utils/helpers/isMobile";
import { Grid } from "@chakra-ui/react";

export function HomeBannerPicks() {
    const [isMobileState, setIsMobileState] = useState(false);
    const { data: trendingMovies, isLoading } = useTMDBApi({
        queryKey: "trending-movies",
        param: "trending/movie/day",
    });
    console.log(trendingMovies);
    const trendingArray = [
        trendingMovies?.results[0],
        trendingMovies?.results[1],
        trendingMovies?.results[2],
    ];
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
                    slidesPerPage={1}
                    items={trendingArray.map((item) => (
                        <Suspense
                            key={item?.id}
                            fallback={<div>Loading...</div>}
                        >
                            <HomeBannerPicksCard
                                key={item?.id}
                                data={item}
                                isLoading={isLoading}
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
                            <HomeBannerPicksCard
                                key={item?.id}
                                data={item}
                                isLoading={isLoading}
                            />
                        </Suspense>
                    ))}
                </Grid>
            )}
        </>
    );
}
