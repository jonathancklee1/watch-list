import { Route as moviesRoute } from "../../../routes/movies.tsx";
import { Route as tvShowsRoute } from "../../../routes/tvShows.tsx";
import { Route as animeRoute } from "../../../routes/anime.tsx";
import { Route as watchListRoute } from "../../../routes/watchList.tsx";
import { MobileNavWrapper, StyledMobileLink } from "./MobileNav.styles.tsx";
export function MobileNav() {
    const navLinks = [
        {
            label: "Movies",
            route: moviesRoute,
        },
        {
            label: "TV Shows",
            route: tvShowsRoute,
        },
        {
            label: "Anime",
            route: animeRoute,
        },
        {
            label: "My Board",
            route: watchListRoute,
        },
    ];
    return (
        <MobileNavWrapper className="container">
            {navLinks.map((link) => (
                <StyledMobileLink key={link.label} to={link.route.to}>
                    {link.label}
                </StyledMobileLink>
            ))}
        </MobileNavWrapper>
    );
}
