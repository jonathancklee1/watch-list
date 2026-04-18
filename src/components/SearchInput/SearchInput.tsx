import { Group, InputGroup } from "@chakra-ui/react";

import { LuSearch } from "react-icons/lu";
import { Button } from "../Button/Button";
import { StyledInput } from "./SearchInput.styles";
export function SearchInput({
    category,
}: {
    category: "Movies" | "TV Shows" | "Anime" | null;
}) {
    return (
        <Group attached w={"100%"} maxW={"600px"}>
            <InputGroup
                startElement={
                    <LuSearch color={"var(--secondary-color"} size={"18px"} />
                }
            >
                <StyledInput
                    placeholder={`Search ${category ?? ""}`}
                    w={"full"}
                />
            </InputGroup>
            <Button
                paddingBlock={{ base: "1.5rem", md: "2rem" }}
                label={"Search"}
            />
        </Group>
    );
}
