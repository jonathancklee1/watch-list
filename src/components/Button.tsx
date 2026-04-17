import { styled } from "styled-components";

function Button() {
    const StyledButton = styled.button`
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
    `;
    return <StyledButton>Button</StyledButton>;
}

export default Button;
