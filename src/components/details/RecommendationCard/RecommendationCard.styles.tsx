import styled from "styled-components";
import { Box, Image } from "@chakra-ui/react";

export const StyledCard = styled(Box)`
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0.75rem;
    background-color: var(--background--primary-color-80);
    border-radius: 15px;
    transition: all 0.3s ease;
    &:hover {
        transform: scale(1.025);
        p {
            text-decoration: underline;
        }
    }
`;
export const StyledImage = styled(Image)`
    object-fit: cover;
    width: 100%;
    height: 100%;
    object-position: 50% 25%;
    aspect-ratio: 2/3;
    max-width: 100px;
`;
