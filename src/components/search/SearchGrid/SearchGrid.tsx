import { mapToCard } from "../../../utils/helpers/mapToCard";
import type { ApiMovieData, CardType } from "../../../utils/types";
import { SearchCards } from "../SearchCards/SearchCards";
import { StyledResultsGrid } from "./SearchGrid.styles";
export function SearchGrid({
    searchResults,
    isLoading,
}: {
    searchResults?: ApiMovieData[];
    isLoading?: boolean;
}) {
    const mappedResults: CardType[] = searchResults
        ? searchResults.map((item) => mapToCard(item) as CardType)
        : [];
    console.log(mappedResults, "mapped results");
    return (
        <>
            {isLoading ? (
                <StyledResultsGrid>
                    {Array.from({ length: 20 }).map((_, index) => (
                        <SearchCards key={index} data={null} isLoading />
                    ))}
                </StyledResultsGrid>
            ) : (
                <StyledResultsGrid>
                    {searchResults?.map((item, index) => (
                        <SearchCards key={index} data={mapToCard(item)} />
                    ))}
                </StyledResultsGrid>
            )}
        </>
    );
}
