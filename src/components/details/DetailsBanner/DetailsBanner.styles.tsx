import { Flex, Image } from "@chakra-ui/react";
import styled from "styled-components";
export const StyledInfoBox = styled(Flex)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    inset: 0;
    justify-content: flex-end;
    padding-inline: 1em;
    padding-bottom: 1.5em;
`;
export const StyledBackgroundImage = styled(Image)`
    object-fit: cover;
    aspect-ratio: 3/4;
    position: relative;
    width: 100%;
    object-position: 60% 50%;
    @media (min-width: 768px) {
        aspect-ratio: 9/14;
    }
`;

export const StyledImageWrapper = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 3/4;
    z-index: -1;

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 0.5) 50%,
            rgba(0, 0, 0, 0) 100%
        );
        z-index: 2; /* Sits on top of the image */
        pointer-events: none; /* Allows clicking through the overlay */
    }
`;

export const StyledBanner = styled(Flex)`
    gap: 4em;
    flex-direction: column;
    z-index: 10;
    position: relative;
    overflow: hidden;
    max-height: 650px;
    @media (min-width: 768px) {
        flex-order: 1;
        flex-basis: 60%;
    }
`;
