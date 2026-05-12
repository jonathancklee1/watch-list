import { Card, Image } from "@chakra-ui/react";
import styled from "styled-components";
export const StyledImage = styled(Image)`
    object-fit: cover;
    width: 100%;
    height: 100%;
    object-position: 50% 25%;
`;
export const StyledDescription = styled(Card.Description)`
    color: var(--text--secondary-color);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 0.875rem;
    @media (min-width: 768px) {
        font-size: 1rem;
    }
`;

export const StyledBody = styled(Card.Body)<{ $isFirst?: boolean }>`
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    cursor: pointer;
    padding: ${(props) => (props.$isFirst ? "1em" : ".5rem")};
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.8) 100%
    );
    &:hover {
        h3 {
            text-decoration: underline;
        }
        > img {
            transform: scale(1.1);
        }
    }
    @media (min-width: 768px) {
        padding: ${(props) => (props.$isFirst ? "2em" : "1em")};
    }
`;

export const StyledCard = styled(Card.Root)<{ $isFirst?: boolean }>`
    position: relative;
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
    color: var(--text--primary-color);
    border-radius: 15px;
    overflow: hidden;
    border: none;
    ${(props) =>
        props.$isFirst ? "grid-column: span 2;" : "grid-column-span: span 1;"}
    @media (min-width: 1023px) {
        ${(props) =>
            props.$isFirst ? " grid-row: span 2;" : "grid-row: span 1;"}
    }
`;
