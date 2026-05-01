import { createRootRoute, Outlet } from "@tanstack/react-router";
import Nav from "../components/navigation/Nav/Nav";
import { MobileNav } from "../components/navigation/MobileNav/MobileNav";
import styled from "styled-components";
export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    @media (min-width: 768px) {
        gap: 6rem;
    }
`;
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
