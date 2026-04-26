import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import { SearchInput } from "../components/SearchInput/SearchInput";
import { SearchTermText } from "../components/search/SearchTermText/SearchTermText";
import { SearchFilterButtons } from "../components/search/SearchFilterButtons/SearchFilterButtons";
import { SearchGrid } from "../components/search/SearchGrid/SearchGrid";
import { useState } from "react";
import { useSearchMovies } from "../utils/data-hooks/useSearchMovies";

export const Route = createFileRoute("/search")({
    component: RouteComponent,
    validateSearch: (search: Record<string, unknown>) => ({
        search: (search.search as string) || "",
    }),
});
const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

function RouteComponent() {
    const { search } = Route.useSearch();
    const [searchTerm, setSearchTerm] = useState(search || "");

    console.log(searchTerm, " url");
    const { data } = useSearchMovies(searchTerm, 1);
    console.log(data, "movies data");
    return (
        <PageWrapper className="container">
            <SearchInput
                searchValue={searchTerm}
                setSearchValue={setSearchTerm}
            />
            <SearchTermText term={search} resultsNumber={data?.total_results} />
            <SearchFilterButtons />
            <SearchGrid searchResults={data?.results} />
        </PageWrapper>
    );
}
