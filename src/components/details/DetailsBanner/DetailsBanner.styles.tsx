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
    z-index: -1;
    object-fit: cover;
    aspect-ratio: 3/4;
    position: relative;

    filter: brightness(0.6);
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
        z-index: 1; /* Add a higher z-index value to ensure the pseudo-element is on top */
        border: 1px solid red; /* Add a border to the pseudo-element for visibility */
    }
`;
export const StyledBanner = styled(Flex)`
    gap: 4em;
    flex-direction: column;
    z-index: 10;
    position: relative;
    max-height: 60vh;
    overflow: hidden;
    @media (min-width: 768px) {
        flex-order: 1;
        flex-basis: 60%;
    }
`;
