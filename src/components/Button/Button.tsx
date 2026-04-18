import { StyledButton } from "./Button.styles";
import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

type ButtonProps = {
    label: string;
} & ChakraButtonProps;
export function Button({ label, ...props }: ButtonProps) {
    return <StyledButton {...props}>{label}</StyledButton>;
}
