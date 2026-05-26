import { createFileRoute } from "@tanstack/react-router";
import HomeHeroBanner from "../components/home/HomeHeroBanner/HomeHeroBanner";
import { useMemo, useContext } from "react";
import { GenreShowcaseSection } from "../components/genre-showcase/GenreShowcaseSection/GenreShowcaseSection";
import { AiringNowSection } from "../components/media-page/AiringNowSection/AiringNowSection";
import { TopRatedSection } from "../components/top-rated/TopRatedSection/TopRatedSection";
import { useAiringNowMedia } from "../utils/data-hooks/useAiringNowMedia";

import { PageWrapper } from "./__root";
import { useTopGenresMedia } from "../utils/data-hooks/useTopGenresMedia";
import { useTopRatedMedia } from "../utils/data-hooks/useTopRatedMedia";
import { GenreListContext } from "../utils/contexts/GenreListContext";
import type { ApiData } from "../utils/types";

export const Route = createFileRoute("/tv")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data, isLoading } = useAiringNowMedia("tv");
    const { data: topRatedData, isLoading: isTopRatedLoading } =
        useTopRatedMedia("tv");

    const airingNowMovies = data?.results || [];
    const topRatedMovies = topRatedData?.results?.slice(0, 5) || [];

    const genreList = useContext(GenreListContext).tv;

    const selectedGenres = useMemo(() => {
        if (!genreList || genreList.length === 0) return [];
        // eslint-disable-next-line react-hooks/purity
        const shuffled = [...genreList].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genreList.length]);

    const genreIds = useMemo(
        () => selectedGenres.map((genre) => genre?.id?.toString() ?? ""),
        [selectedGenres],
    );

    const topGenresMedia = useTopGenresMedia(genreIds, "tv") as {
        data: { results: ApiData[] } | null;
        isLoading: boolean;
    }[];

    return (
        <PageWrapper className="container">
            <HomeHeroBanner category="tv" />
            <AiringNowSection
                carouselData={airingNowMovies}
                isLoading={isLoading}
                mediaType="tv"
            />
            <TopRatedSection
                cardData={topRatedMovies}
                isLoading={isTopRatedLoading}
                mediaType="tv"
            />
            {selectedGenres.map((genre, index) => (
                <GenreShowcaseSection
                    key={genre?.id ?? index}
                    carouselData={topGenresMedia[index]?.data?.results || []}
                    isLoading={topGenresMedia[index]?.isLoading}
                    genreName={genre?.name}
                    mediaType="tv"
                />
            ))}
        </PageWrapper>
    );
}
