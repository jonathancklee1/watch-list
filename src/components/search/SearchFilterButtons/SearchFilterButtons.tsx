import { Button } from "../../Button/Button";
import { StyledButtonWrapper } from "./SearchFilterButtons.styles";
export function SearchFilterButtons() {
    const categories = ["All", "TV Shows", "Movies", "Anime"];
    const selected = "All";
    return (
        <StyledButtonWrapper>
            {categories.map((category) => (
                <Button key={category} $secondary={category !== selected}>
                    {category}
                </Button>
            ))}
        </StyledButtonWrapper>
    );
}
