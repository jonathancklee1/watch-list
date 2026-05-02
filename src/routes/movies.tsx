import { createFileRoute } from "@tanstack/react-router";
import HomeHeroBanner from "../components/home/HomeHeroBanner/HomeHeroBanner";
import { AiringNowSection } from "../components/media-page/AiringNowSection/AiringNowSection";
import { PageWrapper } from "./__root";
import { useAiringNowMedia } from "../utils/data-hooks/useAiringNowMedia";
import { TopRatedSection } from "../components/top-rated/TopRatedSection/TopRatedSection";
import { useTopRatedMedia } from "../utils/data-hooks/useTopRatedMedia";
import { GenreShowcaseSection } from "../components/genre-showcase/GenreShowcaseSection/GenreShowcaseSection";
import { useGenreList } from "../utils/data-hooks/useGenreList";
import { useTopGenresMedia } from "../utils/data-hooks/useTopGenresMedia";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/movies")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data, isLoading } = useAiringNowMedia("Movies");
    const { data: topRatedData, isLoading: isTopRatedLoading } =
        useTopRatedMedia("Movies");

    const airingNowMovies = data?.results || [];
    const topRatedMovies = topRatedData?.results?.slice(0, 5) || [];

    const { data: genreData } = useGenreList("Movies");
    const genreList = useMemo(() => {
        return genreData?.genres || [];
    }, [genreData?.genres]);

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
        "Movies",
    );
    console.log(genreListState, "genreListState");
    return (
        <PageWrapper className="container">
            <HomeHeroBanner category="Movies" />
            <AiringNowSection
                carouselData={airingNowMovies}
                isLoading={isLoading}
                mediaType="Movies"
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
                    mediaType="Movies"
                />
            ))}
        </PageWrapper>
    );
}
