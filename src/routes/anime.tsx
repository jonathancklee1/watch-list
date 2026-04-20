import { createFileRoute } from "@tanstack/react-router";
import HomeHeroBanner from "../components/home/HomeHeroBanner/HomeHeroBanner";

export const Route = createFileRoute("/anime")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <HomeHeroBanner category="Anime" />
        </div>
    );
}
