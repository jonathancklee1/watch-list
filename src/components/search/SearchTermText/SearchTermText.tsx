import { Text } from "@chakra-ui/react";
import { StyledDiv, StyledSearchHeading } from "./SearchTermText.styles";
export function SearchTermText({
    term,
    resultsNumber,
}: {
    term?: string;
    resultsNumber?: number;
}) {
    return (
        <StyledDiv>
            <Text fontSize=".75rem" color="var(--text--tertiary-color)">
                FOUND{" "}
                <span
                    style={{
                        color: "var(--text--secondary-color)",
                        fontWeight: "bold",
                    }}
                >
                    {resultsNumber ?? 0}
                </span>{" "}
                SEARCH RESULTS FOR
            </Text>
            <StyledSearchHeading>
                {term && <Text>'{term}'</Text>}
            </StyledSearchHeading>
        </StyledDiv>
    );
}
