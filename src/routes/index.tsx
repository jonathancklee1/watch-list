import { createFileRoute } from "@tanstack/react-router";
import HomeHeroBanner from "../components/home/HomeHeroBanner/HomeHeroBanner";
import styled from "styled-components";
import { HomeBannerPicks } from "../components/home/HomeBannerPicks/HomeBannerPicks";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});
const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;
function RouteComponent() {
    return (
        <PageWrapper className="container">
            <HomeHeroBanner category={null} />
            <HomeBannerPicks />
        </PageWrapper>
    );
}
