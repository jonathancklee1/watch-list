import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import { SearchInput } from "../components/SearchInput/SearchInput";
import { SearchTermText } from "../components/search/SearchTermText/SearchTermText";

export const Route = createFileRoute("/search")({
    component: RouteComponent,
});
const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-block: 2rem;
`;
function RouteComponent() {
    const searchTerm = "Neon"; //Get search term from params
    const searchResultsNumber = 10;
    return (
        <PageWrapper className="container">
            <SearchInput />
            <SearchTermText
                term={searchTerm}
                resultsNumber={searchResultsNumber}
            />
        </PageWrapper>
    );
}
