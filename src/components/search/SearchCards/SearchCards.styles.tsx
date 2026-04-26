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
    object-position: center;
    transition: all 0.3s ease;
    cursor: pointer;
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
    border-radius: 20px;
    transition: all 0.3s ease;
    @media (min-width: 768px) {
        aspect-ratio: 9/16;
    }
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
`;
export const StyledTag = styled(Tag.Root)`
    background-color: var(--background--primary-color-80);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    color: var(--text-color);
    padding: 0.5rem;
    padding-inline: 1rem;
    width: fit-content;
    border: none;
    position: absolute;
    top: 1rem;
    border-radius: 15px;
    right: 1rem;
    z-index: 1;
    gap: 0.5rem;
    font-weight: bold;
`;
export const StyledImageWrapper = styled(Card.Body)`
    position: relative;
    aspect-ratio: 5/6;
    overflow: hidden;
    border-radius: 20px;
    flex-shrink: 0;
    &:hover ${StyledImage} {
        transform: scale(1.025);
    }
`;
