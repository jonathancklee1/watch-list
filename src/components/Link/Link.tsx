import type { ReactNode } from "react";
import { StyledLink } from "./Link.styles";
export function Link({
    label,
    href,
    icon,
}: {
    label?: string;
    href: string;
    icon?: ReactNode;
}) {
    return (
        <StyledLink href={href}>
            {label} {icon}
        </StyledLink>
    );
}
