import { createRootRoute, Outlet } from "@tanstack/react-router";
import Nav from "../components/navigation/Nav/Nav";
import { MobileNav } from "../components/navigation/MobileNav/MobileNav";
import styled from "styled-components";
import { Toaster } from "../components/ui/toaster";
export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    @media (min-width: 768px) {
        gap: 4rem;
    }
`;
export const Route = createRootRoute({
    component: () => (
        <>
            <Nav />
            <Outlet /> {/* This is where child routes render */}
            <MobileNav />
            <Toaster />
        </>
    ),
});
