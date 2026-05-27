import { Link } from "@tanstack/react-router";
import styled from "styled-components";
import type { StyledLinkProps } from "../../../utils/types";

export const NavWrapper = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-block: 0.75rem;
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
    background-color: var(--background--secondary-color);
    border-radius: 0;
    background-opacity: 0;
    @media (min-width: 768px) {
        transform: translateY(0.5em);
        border-radius: 15px;
        background-color: var(--background--secondary-color);
        background-opacity: 1;
        width: 95%;
    }
`;

export const LinkWrapper = styled.div`
    display: none;
    gap: 1rem;
    @media (min-width: 768px) {
        display: flex;
    }
`;

export const StyledLink = styled(Link)<StyledLinkProps>`
    text-decoration: none;
    color: ${({ $isLogo }) =>
        $isLogo ? "var(--secondary-color)" : "var(--text--tertiary-color)"};
    font-weight: ${({ $isLogo }) => ($isLogo ? "bold" : "600")};
    font-size: ${({ $isLogo }) => ($isLogo ? "1.5rem" : "1rem")};
    text-transform: uppercase;
    &::after {
        content: "";
        display: block;
        width: 0%;
        height: 2px;
        background: var(--primary-color);
        transition: width 0.3s;
    }
    &.active,
    &:hover {
        color: var(--text--primary-color);
        &::after {
            width: 100%;
        }
    }
`;
