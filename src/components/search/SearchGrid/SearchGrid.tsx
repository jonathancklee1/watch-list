import { EmptyState } from "@chakra-ui/react";
import { mapToCard } from "../../../utils/helpers/mapToCard";
import type { ApiMovieData, CardType, MediaType } from "../../../utils/types";
import { SearchCards } from "../SearchCards/SearchCards";
import { StyledResultsGrid } from "./SearchGrid.styles";
export function SearchGrid({
    searchResults,
    isLoading,
    searchTerm,
    selectedCategory,
}: {
    searchResults?: ApiMovieData[];
    isLoading?: boolean;
    searchTerm: string;
    selectedCategory: MediaType;
}) {
    const mappedResults: CardType[] = searchResults
        ? searchResults.map((item) => mapToCard(item) as CardType)
        : [];
    return (
        <>
            {isLoading ? (
                <StyledResultsGrid>
                    {Array.from({ length: 20 }).map((_, index) => (
                        <SearchCards
                            key={index}
                            data={null}
                            isLoading
                            selectedCategory={selectedCategory}
                            mediaType={selectedCategory}
                        />
                    ))}
                </StyledResultsGrid>
            ) : mappedResults?.length === 0 ? (
                <EmptyState.Root>
                    <EmptyState.Content>
                        <EmptyState.Title>
                            No results found for '{searchTerm}'
                        </EmptyState.Title>
                    </EmptyState.Content>
                </EmptyState.Root>
            ) : (
                <StyledResultsGrid>
                    {searchResults?.map((item, index) => (
                        <SearchCards
                            key={index}
                            data={mapToCard(item)}
                            selectedCategory={selectedCategory}
                            mediaType={selectedCategory}
                        />
                    ))}
                </StyledResultsGrid>
            )}
        </>
    );
}
