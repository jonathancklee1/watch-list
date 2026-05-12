import { Route as homeRoute } from "../../../routes/index.tsx";
import { Route as moviesRoute } from "../../../routes/movies.tsx";
import { Route as tvShowsRoute } from "../../../routes/tvShows.tsx";
import { Route as animeRoute } from "../../../routes/anime.tsx";
import { Route as watchListRoute } from "../../../routes/watchList.tsx";
import { LinkWrapper, NavWrapper, StyledLink } from "./Nav.styles.tsx";
import UserButton from "../../UserButton/UserButton.tsx";
function Nav() {
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
        <NavWrapper className="container glass">
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                <StyledLink to={homeRoute.to} $isLogo>
                    MyWatchList
                </StyledLink>
                <LinkWrapper>
                    {navLinks.map((link) => (
                        <StyledLink key={link.label} to={link.route.to}>
                            {link.label}
                        </StyledLink>
                    ))}
                </LinkWrapper>
            </div>
            <UserButton />
        </NavWrapper>
    );
}

export default Nav;
