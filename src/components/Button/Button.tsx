import type { StyledButtonProps } from "../../utils/types";
import { StyledButton } from "./Button.styles";
import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

type ButtonProps = {
    label?: string;
    href?: string | null;
} & ChakraButtonProps &
    StyledButtonProps;
export function Button({
    label,
    href,
    children,
    style,
    ...props
}: ButtonProps) {
    if (href)
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", ...style }}
            >
                <StyledButton
                    aria-label={label}
                    {...props}
                    style={{ ...style }}
                >
                    {children ? children : label}
                </StyledButton>
            </a>
        );
    return (
        <StyledButton aria-label={label} {...props}>
            {children ? children : label}
        </StyledButton>
    );
}
