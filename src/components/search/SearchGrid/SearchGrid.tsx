import { SearchCards } from "../SearchCards/SearchCards";
import { StyledResultsGrid } from "./SearchGrid.styles";
export function SearchGrid() {
    return (
        <StyledResultsGrid>
            {Array.from({ length: 10 }).map((_, index) => (
                <SearchCards key={index} />
            ))}
        </StyledResultsGrid>
    );
}
