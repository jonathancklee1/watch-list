import { createFileRoute } from "@tanstack/react-router";
import HomeHeroBanner from "../components/home/HomeHeroBanner/HomeHeroBanner";
import { useState, useEffect, useContext, useCallback } from "react";
import { GenreShowcaseSection } from "../components/genre-showcase/GenreShowcaseSection/GenreShowcaseSection";
import { AiringNowSection } from "../components/media-page/AiringNowSection/AiringNowSection";
import { TopRatedSection } from "../components/top-rated/TopRatedSection/TopRatedSection";

import { useTopGenresAnime } from "../utils/data-hooks/useTopGenresAnime";
import { useTopRatedAnime } from "../utils/data-hooks/useTopRatedAnime";
import { PageWrapper } from "./__root";

import { useAiringNowAnime } from "../utils/data-hooks/useAiringNowAnime";
import { GenreListContext } from "../utils/context/GenreListContext";
export const Route = createFileRoute("/anime")({
    component: RouteComponent,
});
function RouteComponent() {
    const { data, isLoading } = useAiringNowAnime();
    const { data: topRatedData, isLoading: isTopRatedLoading } =
        useTopRatedAnime();

    const airingNowAnime = data?.data;
    const topRatedAnime = topRatedData?.data?.slice(0, 5) || [];

    const genreList = useContext(GenreListContext).anime;

    const [genresLoading, setGenresLoading] = useState(true);
    const [debouncedGenreIds, setDebouncedGenreIds] = useState<string[]>([]);

    const getRandomGenres = useCallback(
        (count: number) => {
            if (genreList.length === 0) return [];
            const shuffled = [...genreList].sort(() => Math.random() - 0.5);
            return shuffled.slice(0, count);
        },
        [genreList],
    );

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedGenreIds(
                getRandomGenres(3).map(
                    (genre) => genre?.mal_id?.toString() ?? "",
                ),
            );

            setGenresLoading(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [getRandomGenres]);

    const topGenresMedia = useTopGenresAnime(debouncedGenreIds);

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
            {getRandomGenres(3).map((genre, index) => (
                <GenreShowcaseSection
                    key={genre?.mal_id ?? index}
                    carouselData={topGenresMedia[index]?.data?.data || []}
                    isLoading={
                        topGenresMedia[index]?.isLoading || genresLoading
                    }
                    genreName={genre?.name}
                    mediaType="Anime"
                />
            ))}
        </PageWrapper>
    );
}
