import { Card, Image } from "@chakra-ui/react";
import styled from "styled-components";

export const StyledImage = styled(Image)`
    position: absolute;
    inset: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
    object-position: center;
    transition: all 0.3s ease;
`;
export const StyledTitle = styled(Card.Title)`
    font-weight: bold;
    color: var(--text-color);
    line-clamp: 2;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 1.5rem;
    @media (min-width: 768px) {
        font-size: 1.2rem;
    }
`;
export const StyledDescription = styled(Card.Description)`
    color: var(--text--secondary-color);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 1rem;
    @media (min-width: 768px) {
        font-size: 1rem;
    }
`;
export const StyledCard = styled(Card.Root)`
    color: var(--text-color);
    overflow: hidden;
    position: relative;
    background-color: transparent;
    width: 100%;
    gap: 1rem;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
`;
export const StyledCardFooter = styled(Card.Footer)`
    gap: 0.5rem;
    z-index: 10;
    padding-bottom: 0;
    padding-left: 1rem;
    padding-right: 1rem;
    flex-direction: column;
    align-items: flex-start;
    height: 5.5rem;
    margin-top: 1em;
`;

export const StyledImageWrapper = styled(Card.Body)`
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    flex-shrink: 0;
    aspect-ratio: 2/3;

    &:hover ${StyledImage} {
        transform: scale(1.025);
    }
`;
