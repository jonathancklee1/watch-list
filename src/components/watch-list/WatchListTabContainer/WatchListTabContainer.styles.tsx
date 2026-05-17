import { Box } from "@chakra-ui/react";
import styled from "styled-components";
export const StyledTabContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 1em;
    border-radius: 20px;
    background-color: var(--background--secondary-color);
    padding: 1em;
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1024px) {
        display: flex;
        padding: 1.5em;
    }
`;
