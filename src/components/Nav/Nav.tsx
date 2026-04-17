import { Link } from "@tanstack/react-router";
import { Route as homeRoute } from "../../routes/index.tsx";
import { LinkWrapper, NavWrapper } from "./Nav.styles.tsx";
function Nav() {
    return (
        <NavWrapper>
            <Link to={homeRoute.to}>Home</Link>
            <LinkWrapper>
                <Link to={homeRoute.to}>Movies</Link>
                <Link to={homeRoute.to}>TV Shows</Link>
                <Link to={homeRoute.to}>Anime</Link>
                <Link to={homeRoute.to}>My Board</Link>
            </LinkWrapper>
        </NavWrapper>
    );
}

export default Nav;
