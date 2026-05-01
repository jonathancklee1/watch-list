import type { HomeHeroBannerType } from "../../../utils/types";
import { SearchInput } from "../../search/SearchInput/SearchInput";
import { useState } from "react";

import { StyledHeading, StyledHomeHeroBanner } from "./HomeHeroBanner.styles";

function HomeHeroBanner({ category }: HomeHeroBannerType) {
    const [searchValue, setSearchValue] = useState("");
    return (
        <StyledHomeHeroBanner>
            {/* Animate the "watch" so that it typewrites out Movie, Anime, Show" */}
            <StyledHeading>
                <span>Discover </span>
                {category ?? "Your Next Watch"}
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
