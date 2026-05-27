import type { HomeHeroBannerType } from "../../../utils/types";
import { SearchInput } from "../../search/SearchInput/SearchInput";
import { useState } from "react";

import { StyledHeading, StyledHomeHeroBanner } from "./HomeHeroBanner.styles";
import { mapMediaTypeToText } from "../../../utils/helpers/mapMediaTypeToText";

function HomeHeroBanner({ category }: HomeHeroBannerType) {
    const [searchValue, setSearchValue] = useState("");
    return (
        <StyledHomeHeroBanner>
            {/* Animate the "watch" so that it typewrites out Movie, Anime, Show" */}
            <StyledHeading>
                <span>Discover </span>
                <span>
                    {category
                        ? mapMediaTypeToText(category)
                        : "Your Next Watch"}
                </span>
            </StyledHeading>
            <SearchInput
                category={category}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
        </StyledHomeHeroBanner>
    );
}

export default HomeHeroBanner;
