import { createFileRoute } from "@tanstack/react-router";
import HomeHeroBanner from "../components/home/HomeHeroBanner/HomeHeroBanner";
import { AiringNowSection } from "../components/media-page/AiringNowSection/AiringNowSection";
import { PageWrapper } from "./__root";
import { useAiringNowMovies } from "../utils/data-hooks/useAiringNowMovies";

export const Route = createFileRoute("/movies")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data, isLoading } = useAiringNowMovies();
    const airingNowMovies = data?.results || [];
    return (
        <PageWrapper className="container">
            <HomeHeroBanner category="Movies" />
            <AiringNowSection
                carouselData={airingNowMovies}
                isLoading={isLoading}
            />
        </PageWrapper>
    );
}
