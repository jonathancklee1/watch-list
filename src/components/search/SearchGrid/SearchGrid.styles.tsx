import styled from "styled-components";
export const StyledResultsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    gap: 2rem;
    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1024px) {
        grid-template-columns: repeat(5, 1fr);
    }
`;
