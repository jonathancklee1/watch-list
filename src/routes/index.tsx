import { createFileRoute } from "@tanstack/react-router";
import HomeHeroBanner from "../components/home/HomeHeroBanner/HomeHeroBanner";
import styled from "styled-components";
import { HomeBannerPicks } from "../components/home/HomeBannerPicks/HomeBannerPicks";
import { PopularMediaRow } from "../components/home/PopularMediaRow/PopularMediaRow";
import { usePopularMovies } from "../utils/data-hooks/usePopularMovies";
import { usePopularTVShows } from "../utils/data-hooks/usePopularTVShows";
import { MediaCard } from "../components/MediaCard/MediaCard";
import { mapToCard } from "../utils/helpers/mapToCard";
import { useJikan } from "../utils/data-hooks/useJikan";

import { TMDB_IMAGE_URL } from "../utils/constants";
import { PageWrapper } from "./__root";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data: popularMovies } = usePopularMovies();
    const { data: popularTVShows } = usePopularTVShows();
    const { data: popularAnime } = useJikan("top/anime", { page: "1" });
    type MovieType = (typeof popularMovies.results)[0];
    type ShowType = (typeof popularTVShows.results)[0];
    type AnimeType = (typeof popularAnime.results)[0];
    const popularMoviesArray =
        (popularMovies?.results &&
            popularMovies?.results
                .slice(0, 14)
                .map((movie: MovieType) => {
                    return {
                        ...movie,
                        poster_path: `${TMDB_IMAGE_URL}${movie?.poster_path} `,
                    };
                })
                .map((movie: MovieType) => (
                    <MediaCard key={movie?.id} data={mapToCard(movie)} />
                ))) ||
        [];
    const popularTVShowsArray =
        (popularTVShows?.results &&
            popularTVShows?.results
                .slice(0, 14)
                .map((show: ShowType) => {
                    return {
                        ...show,
                        poster_path: `${TMDB_IMAGE_URL}${show?.poster_path} `,
                    };
                })
                .map((show: ShowType) => (
                    <MediaCard key={show?.id} data={mapToCard(show)} />
                ))) ||
        [];
    const popularAnimeArray =
        popularAnime?.data
            .slice(0, 14)
            .map((anime: AnimeType) => (
                <MediaCard key={anime?.id} data={mapToCard(anime)} />
            )) || [];
    // console.log(popularMovies);
    // console.log(popularTVShows);
    // console.log(popularAnime, "popularAnime");

    return (
        <PageWrapper className="container">
            <HomeHeroBanner />
            <HomeBannerPicks />
            <PopularMediaRow mediaType="Movies" items={popularMoviesArray} />
            <PopularMediaRow mediaType="TV Shows" items={popularTVShowsArray} />
            <PopularMediaRow mediaType="Anime" items={popularAnimeArray} />
        </PageWrapper>
    );
}
