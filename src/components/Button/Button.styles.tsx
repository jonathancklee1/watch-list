import { Button } from "@chakra-ui/react";
import styled from "styled-components";
import type { StyledButtonProps } from "../../utils/types";

export const StyledButton = styled(Button)<StyledButtonProps>`
    background-color: ${(props) =>
        props.$secondary
            ? "var(--button--secondary-color)"
            : "var(--button--primary-color)"};
    font-weight: bold;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: var(--secondary-color);
    }
`;
