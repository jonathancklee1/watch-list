import { Heading } from "@chakra-ui/react";
import { styled } from "styled-components";

export const StyledHomeHeroBanner = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: var(--background-color);
    padding-block: 2rem;
    justify-content: center;
    align-items: center;
    @media (min-width: 768px) {
    }
`;
export const StyledHeading = styled(Heading)`
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    color: var(--primary-color);
    span {
        color: var(--text-color);
    }
`;
