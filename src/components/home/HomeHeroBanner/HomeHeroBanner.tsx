import type { HomeHeroBannerType } from "../../../utils/types";
import { SearchInput } from "../../SearchInput/SearchInput";

import { StyledHeading, StyledHomeHeroBanner } from "./HomeHeroBanner.styles";

function HomeHeroBanner({ category }: HomeHeroBannerType) {
    return (
        <StyledHomeHeroBanner>
            {/* Animate the "watch" so that it typewrites out Movie, Anime, Show" */}
            <StyledHeading>
                <span>Discover </span>
                {category ?? "Your Next Watch"}
            </StyledHeading>
            <SearchInput category={category} />
        </StyledHomeHeroBanner>
    );
}

export default HomeHeroBanner;
