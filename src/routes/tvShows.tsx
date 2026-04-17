import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tvShows")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/TVShowsRoute"!</div>;
}
