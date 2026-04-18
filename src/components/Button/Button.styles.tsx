import { Button } from "@chakra-ui/react";
import styled from "styled-components";
export const StyledButton = styled(Button)`
    background-color: var(--primary-color);
    font-weight: bold;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: var(--secondary-color);
    }
`;
