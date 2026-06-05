import { Box, Flex } from "@chakra-ui/react";
import styled from "styled-components";
export const StyledTabContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    border-radius: 20px;
    background-color: var(--background--secondary-color);
    padding: 1em;
    height: 100%;
    min-height: 250px;
`;
export const StyledCardWrapperContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex-grow: 1;
    min-height: 200px;
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1024px) {
        display: flex;
    }
`;
export const StyledCardWrapper = styled(Flex)`
    flex-direction: column;
    gap: 12px;
    flex-grow: 1;
    min-height: 150px;
    max-height: calc(100vh - 400px);
    overflow-y: auto;
    padding-right: 6px;
    width: 100%;
    @media (min-width: 768px) {
        max-height: 1000px;
    }
`;
