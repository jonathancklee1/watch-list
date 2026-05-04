import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/details/$mediaType/$id")({
    // Load data using the params

    component: MediaDetailsComponent,
});

function MediaDetailsComponent() {
    // Access params directly in the component
    const { mediaType, id } = Route.useParams();

    return (
        <div>
            <h1>{mediaType.toUpperCase()} Details</h1>
            <p>Displaying info for ID: {id}</p>
        </div>
    );
}
