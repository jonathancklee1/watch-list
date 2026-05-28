import { Button } from "@chakra-ui/react";
import styled, { css } from "styled-components";
import type { StyledButtonProps } from "../../utils/types";

export const StyledButton = styled(Button)<StyledButtonProps>`
    background: ${(props) =>
        props.$secondary
            ? "var(--button--secondary-color)"
            : "var(--button--primary-color)"};
    font-weight: bold;
    transition: all 0.3s ease;
    border-radius: 5px;
    color: ${(props) =>
        props.$secondary
            ? "var(--text--primary-color)"
            : "var(--background--primary-color)"};
    &:hover {
        background-color: var(--secondary-color);
        transform: scale(1.025);
        color: var(--background--primary-color);
    }

    &:hover svg,
    &:hover svg * {
        stroke: var(--background--primary-color) !important;
        fill: var(--background--primary-color) !important;
    }

    max-width: 200px;
    ${(props) =>
        props.$action &&
        css`
            background-color: var(--background--primary-color);
            opacity: 0.7;
            border: 2px solid black;
            border-radius: 100%;
            font-weight: bold;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            height: 3rem;
            width: 3rem;
            transition: all 0.3s ease;
            color: #ffffff;
            &:hover {
                opacity: 1;
                background-color: var(--background--primary-color);
                border: 2px solid var(--primary-color);
            }

            &:hover svg,
            &:hover svg * {
                stroke: var(--secondary-color) !important;
                fill: var(--secondary-color) !important;
            }
        `}
`;
