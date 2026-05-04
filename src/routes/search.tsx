import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import { SearchInput } from "../components/search/SearchInput/SearchInput";
import { SearchTermText } from "../components/search/SearchTermText/SearchTermText";
import { SearchFilterButtons } from "../components/search/SearchFilterButtons/SearchFilterButtons";
import { SearchGrid } from "../components/search/SearchGrid/SearchGrid";
import { useEffect, useState } from "react";
import { useSearchMedia } from "../utils/data-hooks/useSearchMedia";
import { SearchPagination } from "../components/search/SearchPagination/SearchPagination";
import type { FilterCategories } from "../utils/types";

export const Route = createFileRoute("/search")({
    component: RouteComponent,
    validateSearch: (search: Record<string, unknown>) => ({
        search: (search.search as string) || "",
        page: Number(search.page as string) || 1,
        category: (search.category as FilterCategories) || "Movies",
    }),
});
const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

function RouteComponent() {
    const {
        search,
        page: pageParam,
        category: categoryParam,
    } = Route.useSearch();
    const navigate = Route.useNavigate();
    const [searchTerm, setSearchTerm] = useState(search || "");
    const [page, setPage] = useState(pageParam);
    const [selectedCategory, setSelectedCategory] =
        useState<FilterCategories>(categoryParam);
    const { data, isLoading } = useSearchMedia(
        selectedCategory,
        searchTerm,
        page,
    );
    // console.log(data, "movies data");
    const count = data?.total_results ?? 0;
    const pageSize = data?.results.length ?? 0;
    const startRange = (page - 1) * pageSize;
    const endRange = startRange + pageSize;
    // const visibleItems = items.slice(startRange, endRange);
    // console.log(count, "count");
    // console.log(pageSize, "pageSize");
    // console.log(startRange, "startRange");
    // console.log(endRange, "endRange");

    // console.log(page, "current page");
    useEffect(() => {
        setPage(pageParam);
    }, [pageParam]);

    useEffect(() => {
        setPage(1);
        navigate({
            search: (prev) => ({ ...prev, page: 1 }),
            replace: true,
        });
    }, [selectedCategory, navigate]);
    return (
        <PageWrapper className="container">
            <SearchInput
                searchValue={searchTerm}
                setSearchValue={setSearchTerm}
            />
            <SearchTermText term={search} resultsNumber={data?.total_results} />
            <SearchFilterButtons
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <SearchGrid
                searchResults={data?.results}
                isLoading={isLoading}
                searchTerm={search}
                selectedCategory={selectedCategory}
            />
            {count > 0 && (
                <SearchPagination
                    count={count}
                    pageSize={pageSize}
                    page={page}
                    setPage={setPage}
                    route={Route}
                />
            )}
        </PageWrapper>
    );
}
