import { createFileRoute } from "@tanstack/react-router";
import HomeHeroBanner from "../components/home/HomeHeroBanner/HomeHeroBanner";
import { useContext, useMemo, useState, useEffect } from "react";
import { GenreShowcaseSection } from "../components/genre-showcase/GenreShowcaseSection/GenreShowcaseSection";
import { AiringNowSection } from "../components/media-page/AiringNowSection/AiringNowSection";
import { TopRatedSection } from "../components/top-rated/TopRatedSection/TopRatedSection";

import { useTopGenresAnime } from "../utils/data-hooks/useTopGenresAnime";
import { useTopRatedAnime } from "../utils/data-hooks/useTopRatedAnime";
import { PageWrapper } from "./__root";

import { useAiringNowAnime } from "../utils/data-hooks/useAiringNowAnime";
import { GenreListContext } from "../utils/contexts/GenreListContext";

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

    const selectedGenres = useMemo(() => {
        if (!genreList || genreList.length === 0) return [];
        const shuffled = [...genreList].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genreList.length]);

    const [delayedIds, setDelayedIds] = useState<string[]>([]);
    const [isApiWaiting, setIsApiWaiting] = useState(true);

    useEffect(() => {
        if (selectedGenres.length === 0) return;

        const timeout = setTimeout(() => {
            const ids = selectedGenres.map(
                (genre) => genre?.mal_id?.toString() ?? "",
            );
            setDelayedIds(ids);
            setIsApiWaiting(false);
        }, 3000); // 3-second rate limit protection

        return () => clearTimeout(timeout);
    }, [selectedGenres]);

    const topGenresMedia = useTopGenresAnime(delayedIds);

    return (
        <PageWrapper className="container">
            <HomeHeroBanner category="anime" />
            <AiringNowSection
                carouselData={airingNowAnime}
                isLoading={isLoading}
                mediaType="anime"
            />
            <TopRatedSection
                cardData={topRatedAnime}
                isLoading={isTopRatedLoading}
                mediaType="anime"
            />
            {selectedGenres.map((genre, index) => {
                const isSectionLoading =
                    isApiWaiting || (topGenresMedia[index]?.isLoading ?? true);

                return (
                    <GenreShowcaseSection
                        key={genre?.mal_id ?? index}
                        carouselData={topGenresMedia[index]?.data?.data || []}
                        isLoading={isSectionLoading}
                        genreName={genre?.name}
                        mediaType="anime"
                    />
                );
            })}
        </PageWrapper>
    );
}
