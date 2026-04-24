import { Text } from "@chakra-ui/react";
import styled from "styled-components";

export const StyledSearchHeading = styled(Text)`
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-color);
    span {
        color: var(--text-color);
    }
`;
export const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
