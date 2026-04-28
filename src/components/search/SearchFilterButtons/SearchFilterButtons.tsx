import { Button } from "../../Button/Button";
import { StyledButtonWrapper } from "./SearchFilterButtons.styles";
import type { FilterCategories } from "../../../utils/types";
export function SearchFilterButtons({
    selectedCategory,
    setSelectedCategory,
}: {
    selectedCategory: FilterCategories;
    setSelectedCategory: (category: FilterCategories) => void;
}) {
    const categories = ["Movies", "TV Shows", "Anime"] as FilterCategories[];

    return (
        <StyledButtonWrapper>
            {categories.map((category) => (
                <Button
                    key={category}
                    $secondary={category !== selectedCategory}
                    onClick={() => setSelectedCategory(category)}
                >
                    {category}
                </Button>
            ))}
        </StyledButtonWrapper>
    );
}
