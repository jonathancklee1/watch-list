import { Tag } from "@chakra-ui/react";
import styled from "styled-components";
export const StyledTag = styled(Tag.Root)`
    background-color: var(--background--primary-color-80);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    color: var(--text-color);
    padding: 0.25rem;
    padding-inline: 0.75rem;
    width: fit-content;
    border: none;

    border-radius: 15px;
    z-index: 1;
    gap: 0.5rem;
    font-weight: bold;
    font-size: 0.875rem;
    @media (min-width: 768px) {
        top: 0.75rem;
        right: 0.75rem;
    }
`;
