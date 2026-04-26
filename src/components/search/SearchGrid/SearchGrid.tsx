import { mapToCard } from "../../../utils/helpers/mapToCard";
import type { ApiMovieData, CardType } from "../../../utils/types";
import { SearchCards } from "../SearchCards/SearchCards";
import { StyledResultsGrid } from "./SearchGrid.styles";
export function SearchGrid({
    searchResults,
}: {
    searchResults?: ApiMovieData[];
}) {
    const mappedResults: CardType[] = searchResults
        ? searchResults.map((item) => mapToCard(item) as CardType)
        : [];
    console.log(mappedResults, "mapped results");
    return (
        <StyledResultsGrid>
            {searchResults?.map((item, index) => (
                <SearchCards key={index} data={mapToCard(item)} />
            ))}
        </StyledResultsGrid>
    );
}
