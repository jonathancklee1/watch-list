import { Link } from "@tanstack/react-router";
import styled from "styled-components";
import type { StyledLinkProps } from "../../utils/types";

export const MobileNavWrapper = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.2rem;
    background-color: var(--background--secondary-color);
    padding: 0.5rem;
    padding-block: 0.5em;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 20px 20px 0 0;

    @media (min-width: 768px) {
        display: none;
    }
`;

export const StyledMobileLink = styled(Link)<StyledLinkProps>`
    text-decoration: none;
    color: ${({ $isLogo }) =>
        $isLogo ? "var(--primary-color)" : "var(--text--tertiary-color)"};
    font-weight: bold;
    font-size: 0.7rem;
    text-transform: uppercase;
    padding: 1rem;
    border-radius: 20px;
    text-align: center;
    height: 100%;
    width: 100%;
    &.active {
        color: var(--text-color);
        font-weight: bold;
        background-color: var(--primary-color);
    }
`;
