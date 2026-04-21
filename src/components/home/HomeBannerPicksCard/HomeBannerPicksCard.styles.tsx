import { Card, Tag, Image } from "@chakra-ui/react";
import styled from "styled-components";
export const StyledDiv = styled.div`
    display: flex;
`;
export const StyledImage = styled(Image)`
    position: absolute;
    inset: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
    object-position: 50% 25%;
`;
export const StyledTitle = styled(Card.Title)`
    font-weight: bold;
    color: var(--text-color);
    font-size: 1.75rem;
`;
export const StyledDescription = styled(Card.Description)`
    color: var(--text--secondary-color);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;
export const StyledCard = styled(Card.Root)`
    color: var(--text-color);
    overflow: hidden;
    position: relative;
    background-color: var(--background--secondary-color);
    max-height: 500px;
    width: 100%;
    aspect-ratio: 5/8;
    gap: 1rem;
    justify-content: flex-end;
    border: none;
    border-radius: 20px;
    @media (min-width: 768px) {
        aspect-ratio: 9/16;
    }
`;
export const StyledTag = styled(Tag.Root)`
    background-color: var(--primary-color);
    color: var(--text-color);
    padding: 0.25rem;
    padding-inline: 1.5rem;
    width: fit-content;
    border: none;
`;
export const StyledInfoWrapper = styled.div`
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.6) 20%,
        rgba(0, 0, 0, 0.9) 100%
    );
    z-index: 1;
`;
