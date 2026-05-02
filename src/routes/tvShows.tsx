import { createFileRoute } from "@tanstack/react-router";
import HomeHeroBanner from "../components/home/HomeHeroBanner/HomeHeroBanner";
import { useMemo, useState, useEffect, useContext } from "react";
import { GenreShowcaseSection } from "../components/genre-showcase/GenreShowcaseSection/GenreShowcaseSection";
import { AiringNowSection } from "../components/media-page/AiringNowSection/AiringNowSection";
import { TopRatedSection } from "../components/top-rated/TopRatedSection/TopRatedSection";
import { useAiringNowMedia } from "../utils/data-hooks/useAiringNowMedia";

import { PageWrapper } from "./__root";
import { useTopGenresMedia } from "../utils/data-hooks/useTopGenresMedia";
import { useTopRatedMedia } from "../utils/data-hooks/useTopRatedMedia";
import { GenreListContext } from "../utils/context/GenreListContext";

export const Route = createFileRoute("/tvShows")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data, isLoading } = useAiringNowMedia("TV Shows");
    const { data: topRatedData, isLoading: isTopRatedLoading } =
        useTopRatedMedia("TV Shows");

    const airingNowMovies = data?.results || [];
    const topRatedMovies = topRatedData?.results?.slice(0, 5) || [];

    const genreList = useContext(GenreListContext).tv;

    const [genreListState, setGenreListState] = useState(genreList);
    const getRandomGenres = useMemo(() => {
        return (count: number) => {
            if (genreList.length === 0) return [];
            const shuffled = [...genreList].sort(() => Math.random() - 0.5);
            return shuffled.slice(0, count);
        };
    }, [genreList]);
    useEffect(() => {
        setGenreListState(getRandomGenres(3));
    }, [getRandomGenres]);
    const topGenresMedia = useTopGenresMedia(
        genreListState.map((genre) => genre?.id.toString() ?? ""),
        "TV Shows",
    );
    console.log(genreListState, "genreListState");
    return (
        <PageWrapper className="container">
            <HomeHeroBanner category="TV Shows" />
            <AiringNowSection
                carouselData={airingNowMovies}
                isLoading={isLoading}
                mediaType="TV Shows"
            />
            <TopRatedSection
                cardData={topRatedMovies}
                isLoading={isTopRatedLoading}
            />
            {genreListState.map((genre, index) => (
                <GenreShowcaseSection
                    key={genre?.id ?? index}
                    carouselData={topGenresMedia[index]?.data?.results || []}
                    isLoading={topGenresMedia[index]?.isLoading}
                    genreName={genre?.name}
                    mediaType="TV Shows"
                />
            ))}
        </PageWrapper>
    );
}
