import styled from "styled-components";

export const StyledUserButton = styled.button`
    color: white;
    border: none;
    border-radius: 100%;
    cursor: pointer;
    border: 2px solid var(--primary-color);
    width: 3em;
    height: 3em;
    overflow: hidden;
    @media (min-width: 768px) {
        width: 3.5em;
        height: 3.5em;
    }
`;
