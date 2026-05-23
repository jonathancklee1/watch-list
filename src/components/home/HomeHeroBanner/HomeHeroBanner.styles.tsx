import { Heading } from "@chakra-ui/react";
import { styled } from "styled-components";

export const StyledHomeHeroBanner = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: var(--background-color);
    padding-block: 2rem;
    justify-content: center;
    align-items: center;
    @media (min-width: 768px) {
        height: 40vh;
        gap: 2rem;
    }
`;
export const StyledHeading = styled(Heading)`
    font-size: 1.75rem;
    font-weight: bold;
    text-align: center;
    color: var(--primary-color);
    span {
        color: var(--text--primary-color);
    }
    @media (min-width: 768px) {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
`;
