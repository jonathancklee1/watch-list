import { createFileRoute } from "@tanstack/react-router";
import HomeHeroBanner from "../components/home/HomeHeroBanner/HomeHeroBanner";
import { AiringNowSection } from "../components/media-page/AiringNowSection/AiringNowSection";
import { PageWrapper } from "./__root";
import { useAiringNowMovies } from "../utils/data-hooks/useAiringNowMovies";
import { TopRatedSection } from "../components/top-rated/TopRatedSection/TopRatedSection";
import { useTopRatedMovies } from "../utils/data-hooks/useTopRatedMovies";

export const Route = createFileRoute("/movies")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data, isLoading } = useAiringNowMovies();
    const { data: topRatedData, isLoading: isTopRatedLoading } =
        useTopRatedMovies();

    const airingNowMovies = data?.results || [];
    const topRatedMovies = topRatedData?.results.slice(0, 5) || [];
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
        </PageWrapper>
    );
}
