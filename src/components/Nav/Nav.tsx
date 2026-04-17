import { Route as homeRoute } from "../../routes/index.tsx";
import { Route as moviesRoute } from "../../routes/movies.tsx";
import { Route as tvShowsRoute } from "../../routes/tvShows.tsx";
import { Route as animeRoute } from "../../routes/anime.tsx";
import { Route as watchListRoute } from "../../routes/watchList.tsx";
import { LinkWrapper, NavWrapper, StyledLink } from "./Nav.styles.tsx";
function Nav() {
    return (
        <NavWrapper>
            <StyledLink to={homeRoute.to} $isLogo>
                MyWatchList
            </StyledLink>
            <LinkWrapper>
                <StyledLink to={moviesRoute.to}>Movies</StyledLink>
                <StyledLink to={tvShowsRoute.to}>TV Shows</StyledLink>
                <StyledLink to={animeRoute.to}>Anime</StyledLink>
                <StyledLink to={watchListRoute.to}>My Board</StyledLink>
            </LinkWrapper>
        </NavWrapper>
    );
}

export default Nav;
