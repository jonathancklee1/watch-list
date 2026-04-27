import { StyledDiv } from "./EmptyImage.styles";
import { Text } from "@chakra-ui/react";
export function EmptyImage() {
    return (
        <StyledDiv>
            <Text fontWeight={"bold"}>No poster image</Text>
        </StyledDiv>
    );
}
