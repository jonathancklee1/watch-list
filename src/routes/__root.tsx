import { createRootRoute, Outlet } from "@tanstack/react-router";
import Nav from "../components/Nav/Nav";
import { MobileNav } from "../components/MobileNav/MobileNav";
export const Route = createRootRoute({
    component: () => (
        <>
            <Nav />
            <hr />
            <Outlet /> {/* This is where child routes render */}
            <MobileNav />
        </>
    ),
});
