import { createFileRoute } from "@tanstack/react-router";
import HomeHeroBanner from "../components/home/HomeHeroBanner/HomeHeroBanner";
import { AiringNowSection } from "../components/media-page/AiringNowSection/AiringNowSection";
import { PageWrapper } from "./__root";
import { useAiringNowMovies } from "../utils/data-hooks/useAiringNowMovies";
import { TopRatedSection } from "../components/top-rated/TopRatedSection/TopRatedSection";
import { useTopRatedMovies } from "../utils/data-hooks/useTopRatedMovies";
import { GenreShowcaseSection } from "../components/genre-showcase/GenreShowcaseSection/GenreShowcaseSection";
import { useGenreList } from "../utils/data-hooks/useGenreList";
import { useTopGenresMedia } from "../utils/data-hooks/useTopGenresMedia";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/movies")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data, isLoading } = useAiringNowMovies();
    const { data: topRatedData, isLoading: isTopRatedLoading } =
        useTopRatedMovies();

    const airingNowMovies = data?.results || [];
    const topRatedMovies = topRatedData?.results?.slice(0, 5) || [];

    const { data: genreData } = useGenreList();
    const genreList = genreData?.genres || [];

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
        "movie",
    );
    console.log(genreListState, "genreListState");
    return (
        <PageWrapper className="container">
            <HomeHeroBanner category="Movies" />
            <AiringNowSection
                carouselData={airingNowMovies}
                isLoading={isLoading}
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
                />
            ))}
        </PageWrapper>
    );
}
