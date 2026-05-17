import { Button } from "../../Button/Button";
import { StyledButtonWrapper } from "./SearchFilterButtons.styles";
import type { MediaType } from "../../../utils/types";
import { mapMediaTypeToText } from "../../../utils/helpers/mapMediaTypeToText";
export function SearchFilterButtons({
    selectedCategory,
    setSelectedCategory,
}: {
    selectedCategory: MediaType;
    setSelectedCategory: (category: MediaType) => void;
}) {
    const categories = ["movie", "tv", "anime"] as MediaType[];

    return (
        <StyledButtonWrapper>
            {categories.map((category) => (
                <Button
                    key={category}
                    $secondary={category !== selectedCategory}
                    onClick={() => setSelectedCategory(category)}
                >
                    {mapMediaTypeToText(category)}
                </Button>
            ))}
        </StyledButtonWrapper>
    );
}
