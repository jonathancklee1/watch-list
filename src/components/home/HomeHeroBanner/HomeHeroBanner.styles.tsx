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
    display: inline-block;
    font-size: 1.75rem;
    font-weight: bold;
    line-height: 1.2;
    padding: 0.25rem 0;
    text-align: center;
    font-weight: bold;
    font-size: 3rem;
    span {
        color: var(--text--primary-color);
    }
    & > span:not(:first-child) {
        background: linear-gradient(
            135deg,
            var(--primary-color),
            var(--secondary-color)
        );

        -webkit-background-clip: text;
        background-clip: text;

        -webkit-text-fill-color: transparent;
        text-fill-color: transparent;
    }
    @media (min-width: 768px) {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
`;
