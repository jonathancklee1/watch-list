import { createFileRoute } from "@tanstack/react-router";
import HomeHeroBanner from "../components/home/HomeHeroBanner/HomeHeroBanner";
import { useMemo, useState, useEffect } from "react";
import { GenreShowcaseSection } from "../components/genre-showcase/GenreShowcaseSection/GenreShowcaseSection";
import { AiringNowSection } from "../components/media-page/AiringNowSection/AiringNowSection";
import { TopRatedSection } from "../components/top-rated/TopRatedSection/TopRatedSection";
import { useAiringNowMedia } from "../utils/data-hooks/useAiringNowMedia";
import { useGenreList } from "../utils/data-hooks/useGenreList";
import { useTopGenresMedia } from "../utils/data-hooks/useTopGenresMedia";
import { useTopRatedMedia } from "../utils/data-hooks/useTopRatedMedia";
import { PageWrapper } from "./__root";

export const Route = createFileRoute("/anime")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data, isLoading } = useAiringNowMedia("Anime");
    const { data: topRatedData, isLoading: isTopRatedLoading } =
        useTopRatedMedia("Anime");

    const airingNowAnime = data?.data;
    const topRatedAnime = topRatedData?.data?.slice(0, 5) || [];

    const { data: genreData } = useGenreList("Anime");
    const genreList = useMemo(() => {
        return genreData?.data || [];
    }, [genreData?.data]);

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
        genreListState.map((genre) => genre?.id?.toString() ?? ""),
        "Anime",
    );
    console.log(genreListState, "genreListState");
    return (
        <PageWrapper className="container">
            <HomeHeroBanner category="Anime" />
            <AiringNowSection
                carouselData={airingNowAnime}
                isLoading={isLoading}
                mediaType="Anime"
            />
            <TopRatedSection
                cardData={topRatedAnime}
                isLoading={isTopRatedLoading}
            />
            {genreListState.map((genre, index) => (
                <GenreShowcaseSection
                    key={genre?.id ?? index}
                    carouselData={topGenresMedia[index]?.data?.data || []}
                    isLoading={topGenresMedia[index]?.isLoading}
                    genreName={genre?.name}
                    mediaType="Anime"
                />
            ))}
        </PageWrapper>
    );
}
