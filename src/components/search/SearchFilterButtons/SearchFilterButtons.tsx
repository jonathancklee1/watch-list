import { useState } from "react";
import { Button } from "../../Button/Button";
import { StyledButtonWrapper } from "./SearchFilterButtons.styles";
import type { FilterCategories } from "../../../utils/types";
export function SearchFilterButtons() {
    const categories = [
        "All",
        "TV Shows",
        "Movies",
        "Anime",
    ] as FilterCategories[];
    const [selectedCategory, setSelectedCategory] =
        useState<FilterCategories>("All");
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
