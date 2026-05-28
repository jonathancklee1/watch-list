import type { CSSProperties, ReactNode } from "react";
import { StyledLink } from "./Link.styles";
import { Link as TanstackLink } from "@tanstack/react-router";
export function Link({
    label,
    href,
    icon,
    style,
}: {
    label?: string;
    href: string;
    icon?: ReactNode;
    style?: CSSProperties;
}) {
    return (
        <StyledLink href={href} style={style}>
            <TanstackLink to={href}>{label}</TanstackLink>
            {icon}
        </StyledLink>
    );
}
