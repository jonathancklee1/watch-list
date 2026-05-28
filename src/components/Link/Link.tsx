import type { CSSProperties, ReactNode } from "react";
import { StyledLink } from "./Link.styles";
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
            {label} {icon}
        </StyledLink>
    );
}
