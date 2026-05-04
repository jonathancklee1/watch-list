import { Link } from "@tanstack/react-router";
import styled from "styled-components";
import type { StyledLinkProps } from "../../../utils/types";

export const NavWrapper = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    background-color: #0f0f0f;
    padding-block: 1rem;
    position: sticky;
    top: 0;
    z-index: 1000;
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
        $isLogo ? "var(--primary-color)" : "var(--text--tertiary-color)"};
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
