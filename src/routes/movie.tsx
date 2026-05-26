import { createFileRoute } from "@tanstack/react-router";
import { useContext, useMemo } from "react";
import HomeHeroBanner from "../components/home/HomeHeroBanner/HomeHeroBanner";
import { AiringNowSection } from "../components/media-page/AiringNowSection/AiringNowSection";
import { PageWrapper } from "./__root";
import { useAiringNowMedia } from "../utils/data-hooks/useAiringNowMedia";
import { TopRatedSection } from "../components/top-rated/TopRatedSection/TopRatedSection";
import { GenreShowcaseSection } from "../components/genre-showcase/GenreShowcaseSection/GenreShowcaseSection";
import { useTopRatedMedia } from "../utils/data-hooks/useTopRatedMedia";
import { useTopGenresMedia } from "../utils/data-hooks/useTopGenresMedia";
import { GenreListContext } from "../utils/contexts/GenreListContext";
import type { ApiData } from "../utils/types";

export const Route = createFileRoute("/movie")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data, isLoading } = useAiringNowMedia("movie");
    const { data: topRatedData, isLoading: isTopRatedLoading } =
        useTopRatedMedia("movie");

    const airingNowMovies = data?.results || [];
    const topRatedMovies = topRatedData?.results?.slice(0, 5) || [];

    const genreList = useContext(GenreListContext).movie;

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
    const topGenresMedia = useTopGenresMedia(genreIds, "movie") as {
        data: { results: ApiData[] } | null;
        isLoading: boolean;
    }[];

    return (
        <PageWrapper className="container">
            <HomeHeroBanner category="movie" />
            <AiringNowSection
                carouselData={airingNowMovies}
                isLoading={isLoading}
                mediaType="movie"
            />
            <TopRatedSection
                cardData={topRatedMovies}
                isLoading={isTopRatedLoading}
                mediaType="movie"
            />
            {selectedGenres.map((genre, index) => (
                <GenreShowcaseSection
                    key={genre?.id ?? index}
                    carouselData={topGenresMedia[index]?.data?.results || []}
                    isLoading={topGenresMedia[index]?.isLoading}
                    genreName={genre?.name}
                    mediaType="movie"
                />
            ))}
        </PageWrapper>
    );
}
