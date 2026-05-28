import { createRootRoute, Outlet } from "@tanstack/react-router";
import Nav from "../components/navigation/Nav/Nav";
import { MobileNav } from "../components/navigation/MobileNav/MobileNav";
import styled from "styled-components";
import { Toaster } from "../components/ui/toaster";
import NotFound from "../components/NotFound";
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
            <Outlet />
            <MobileNav />
            <Toaster />
        </>
    ),
    notFoundComponent: () => (
        <PageWrapper
            style={{
                alignItems: "center",
                justifyContent: "center",
                height: "calc(100vh - 90px)",
            }}
        >
            <NotFound />
        </PageWrapper>
    ),
});
