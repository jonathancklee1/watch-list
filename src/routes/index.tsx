import { createFileRoute } from "@tanstack/react-router";
import HomeHeroBanner from "../components/home/HomeHeroBanner/HomeHeroBanner";
import { HomeBannerPicks } from "../components/home/HomeBannerPicks/HomeBannerPicks";
import { PopularMediaRow } from "../components/home/PopularMediaRow/PopularMediaRow";
import { usePopularMedia } from "../utils/data-hooks/usePopularMedia";
import { MediaCard } from "../components/MediaCard/MediaCard";
import { mapToCard } from "../utils/helpers/mapToCard";
import { useJikan } from "../utils/data-hooks/useJikan";

import { TMDB_IMAGE_URL } from "../utils/constants";
import { PageWrapper } from "./__root";
import type { ApiAnimeData } from "../utils/types";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data: popularMovies } = usePopularMedia("movie");
    const { data: popularTVShows } = usePopularMedia("tv");
    const { data: popularAnime } = useJikan<ApiAnimeData>("top/anime", {
        page: "1",
    });
    type MovieType = (typeof popularMovies.results)[0];
    type ShowType = (typeof popularTVShows.results)[0];
    type AnimeType = (typeof popularAnime.data)[0];
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
                    <MediaCard
                        key={movie?.id}
                        data={mapToCard(movie)}
                        mediaType={"movie"}
                    />
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
                    <MediaCard
                        key={show?.id}
                        data={mapToCard(show)}
                        mediaType={"tv"}
                    />
                ))) ||
        [];
    const popularAnimeArray =
        popularAnime?.data
            ?.slice(0, 14)
            .map((anime: AnimeType) => (
                <MediaCard
                    key={anime?.id}
                    data={mapToCard(anime)}
                    mediaType={"anime"}
                />
            )) || [];

    return (
        <PageWrapper className="container">
            <HomeHeroBanner />
            <HomeBannerPicks />
            <PopularMediaRow mediaType="movie" items={popularMoviesArray} />
            <PopularMediaRow mediaType="tv" items={popularTVShowsArray} />
            <PopularMediaRow mediaType="anime" items={popularAnimeArray} />
        </PageWrapper>
    );
}
