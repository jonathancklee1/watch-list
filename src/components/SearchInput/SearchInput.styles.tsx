import styled from "styled-components";
import { Input, InputGroup } from "@chakra-ui/react";
export const StyledSearchField = styled(InputGroup)`
    height: 2rem;
`;
export const StyledInput = styled(Input)`
    background: var(--background--secondary-color);
    border: none;
    padding: 1.5rem;
    font-size: 1rem;
    @media (min-width: 768px) {
        padding: 2rem;
        font-size: 1.25rem;
    }
`;
