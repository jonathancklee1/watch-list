import { Link } from "@chakra-ui/react";
import styled from "styled-components";
export const StyledLink = styled(Link)`
    text-decoration: none;
    color: var(--text--secondary-color);
    font-weight: 600;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
        text-decoration: underline;
    }
`;
