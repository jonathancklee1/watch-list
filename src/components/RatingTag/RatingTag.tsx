import { StyledTag } from "./RatingTag.styles";
import { Skeleton } from "@chakra-ui/react";
import { BiSolidStar } from "react-icons/bi";
export function RatingTag({
    rating,
    isLoading,
    style,
}: {
    rating?: number;
    isLoading: boolean;
    style?: React.CSSProperties;
}) {
    return (
        <StyledTag style={style}>
            <BiSolidStar color="var(--secondary-color)" />
            {isLoading ? (
                <Skeleton height="5" width="30px" />
            ) : (
                (rating ?? "null")
            )}
        </StyledTag>
    );
}
