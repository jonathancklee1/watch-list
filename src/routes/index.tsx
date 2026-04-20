import { createFileRoute } from "@tanstack/react-router";
import HomeHeroBanner from "../components/home/HomeHeroBanner/HomeHeroBanner";
import styled from "styled-components";
import { HomeBannerPicks } from "../components/home/HomeBannerPicks/HomeBannerPicks";
import { PopularMediaRow } from "../components/home/PopularMediaRow/PopularMediaRow";
import { useTMDBApi } from "../utils/data-hooks/useTMDBApi";
import { HomeBannerPicksCard } from "../components/home/HomeBannerPicksCard/HomeBannerPicksCard";

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
    const popularMoviesArray =
        popularMovies?.results
            .slice(0, 5)
            .map((movie) => (
                <HomeBannerPicksCard key={movie?.id} data={movie} />
            )) || [];
    const popularTVShowsArray =
        popularTVShows?.results
            .slice(0, 5)
            .map((movie) => (
                <HomeBannerPicksCard key={movie?.id} data={movie} />
            )) || [];
    console.log(popularMovies);
    console.log(popularTVShows);
    return (
        <PageWrapper className="container">
            <HomeHeroBanner category={null} />
            <HomeBannerPicks />
            <PopularMediaRow mediaType="Movies" items={popularMoviesArray} />
            <PopularMediaRow mediaType="TV Shows" items={popularTVShowsArray} />
            <PopularMediaRow mediaType="Anime" items={popularMoviesArray} />
        </PageWrapper>
    );
}
