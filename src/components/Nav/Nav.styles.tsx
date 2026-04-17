import { Link } from "@tanstack/react-router";
import styled from "styled-components";

export const NavWrapper = styled.nav`
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background-color: #0f0f0f;
    align-items: center;
`;
export const LinkWrapper = styled.div`
    display: flex;
    gap: 1rem;
`;

export const StyledLink = styled(Link)<{ $isLogo?: boolean }>`
    text-decoration: none;
    color: ${(props) =>
        props.$isLogo ? "var(--text-color)" : "var(--text-tertiary-color)"};
    font-weight: ${(props) => (props.$isLogo ? "bold" : "semi-bold")};
    font-size: ${(props) => (props.$isLogo ? "1.5rem" : "1rem")};
    text-transform: uppercase;
`;
