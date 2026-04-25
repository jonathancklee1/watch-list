import { Button } from "@chakra-ui/react";
import styled, { css } from "styled-components";
import type { StyledButtonProps } from "../../utils/types";

export const StyledButton = styled(Button)<StyledButtonProps>`
    background-color: ${(props) =>
        props.$secondary
            ? "var(--button--secondary-color)"
            : "var(--button--primary-color)"};
    font-weight: bold;
    transition: background-color 0.3s ease;
    border-radius: ${(props) => (props.$secondary ? "10px" : "5px")};
    &:hover {
        background-color: var(--secondary-color);
    }

    ${(props) =>
        props.$action &&
        css`
            background-color: var(--background--primary-color);
            opacity: 0.5;
            border: 2px solid black;
            border-radius: 100%;
            font-weight: bold;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            height: 3rem;
            width: 3rem;
            transition: opacity 0.3s ease;
            &:hover {
                opacity: 0.8;
                background-color: var(--background--primary-color);
            }
        `}
`;
