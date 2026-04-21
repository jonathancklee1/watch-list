import { createFileRoute } from "@tanstack/react-router";
import HomeHeroBanner from "../components/home/HomeHeroBanner/HomeHeroBanner";
import styled from "styled-components";
import { HomeBannerPicks } from "../components/home/HomeBannerPicks/HomeBannerPicks";
import { PopularMediaRow } from "../components/home/PopularMediaRow/PopularMediaRow";
import { useTMDBApi } from "../utils/data-hooks/useTMDBApi";
import { HomeBannerPicksCard } from "../components/home/HomeBannerPicksCard/HomeBannerPicksCard";
import { mapToCard } from "../utils/helpers/mapToCard";
import { useJikan } from "../utils/data-hooks/useJikan";

import { TMDB_IMAGE_URL } from "../utils/constants";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});
const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;
function RouteComponent() {
    const { data: popularMovies } = useTMDBApi({
        queryKey: `popular-movies`,
        param: `movie/popular`,
    });
    const { data: popularTVShows } = useTMDBApi({
        queryKey: `popular-tv-shows`,
        param: `tv/popular`,
    });
    const { data: popularAnime } = useJikan({
        queryKey: `anime`,
        param: `tv/popular`,
    });
    const popularMoviesArray =
        (popularMovies?.results &&
            popularMovies?.results
                .slice(0, 10)
                .map((movie) => {
                    return {
                        ...movie,
                        poster_path: `${TMDB_IMAGE_URL}${movie?.poster_path} `,
                    };
                })
                .map((movie) => (
                    <HomeBannerPicksCard
                        key={movie?.id}
                        data={mapToCard(movie)}
                    />
                ))) ||
        [];
    const popularTVShowsArray =
        (popularTVShows?.results &&
            popularTVShows?.results
                .slice(0, 10)
                .map((show) => {
                    return {
                        ...show,
                        poster_path: `${TMDB_IMAGE_URL}${show?.poster_path} `,
                    };
                })
                .map((show) => (
                    <HomeBannerPicksCard
                        key={show?.id}
                        data={mapToCard(show)}
                    />
                ))) ||
        [];
    const popularAnimeArray =
        popularAnime?.data
            .slice(0, 10)
            .map((anime) => (
                <HomeBannerPicksCard key={anime?.id} data={mapToCard(anime)} />
            )) || [];
    // console.log(popularMovies);
    // console.log(popularTVShows);
    // console.log(popularAnime, "popularAnime");

    return (
        <PageWrapper className="container">
            <HomeHeroBanner category={null} />
            <HomeBannerPicks />
            <PopularMediaRow mediaType="Movies" items={popularMoviesArray} />
            <PopularMediaRow mediaType="TV Shows" items={popularTVShowsArray} />
            <PopularMediaRow mediaType="Anime" items={popularAnimeArray} />
        </PageWrapper>
    );
}
