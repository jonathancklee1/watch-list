import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import { SearchInput } from "../components/SearchInput/SearchInput";
import { SearchTermText } from "../components/search/SearchTermText/SearchTermText";
import { SearchFilterButtons } from "../components/search/SearchFilterButtons/SearchFilterButtons";
import { SearchGrid } from "../components/search/SearchGrid/SearchGrid";
import { useState } from "react";
import { useSearchMovies } from "../utils/data-hooks/useSearchMovies";
import { SearchPagination } from "../components/SearchPagination/SearchPagination";

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
    const [page, setPage] = useState(1);

    const { data } = useSearchMovies(searchTerm, page);
    console.log(searchTerm, " url");
    console.log(data, "movies data");
    const count = data?.total_results ?? 0;
    const pageSize = data?.results.length ?? 0;
    const startRange = (page - 1) * pageSize;
    const endRange = startRange + pageSize;
    // const visibleItems = items.slice(startRange, endRange);
    console.log(count, "count");
    console.log(pageSize, "pageSize");
    console.log(startRange, "startRange");
    console.log(endRange, "endRange");

    console.log(page, "current page");
    return (
        <PageWrapper className="container">
            <SearchInput
                searchValue={searchTerm}
                setSearchValue={setSearchTerm}
            />
            <SearchTermText term={search} resultsNumber={data?.total_results} />
            <SearchFilterButtons />
            <SearchGrid searchResults={data?.results} />
            <SearchPagination
                count={count}
                pageSize={pageSize}
                page={page}
                setPage={setPage}
            />
        </PageWrapper>
    );
}
