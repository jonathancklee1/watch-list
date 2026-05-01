import { Group, InputGroup, Text } from "@chakra-ui/react";

import { LuSearch } from "react-icons/lu";
import { Button } from "../../Button/Button";
import { StyledInput } from "./SearchInput.styles";
import { useNavigate } from "@tanstack/react-router";
import type { FilterCategories } from "../../../utils/types";
import { useState } from "react";
export function SearchInput({
    category,
    subText,
    searchValue,
    setSearchValue,
}: {
    category?: FilterCategories;
    subText?: string;
    searchValue: string;
    setSearchValue: (value: string) => void;
}) {
    const navigate = useNavigate();
    const [value, setValue] = useState(searchValue ?? "");
    console.log(value);

    const handleSearch = () => {
        if (value.trim()) {
            setSearchValue(value.trim());
            navigate({
                to: "/search",
                search: {
                    search: value.trim(),
                    page: 1,
                    category: category ?? "Movies",
                },
            });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

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
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </InputGroup>
            <Button
                paddingBlock={{ base: "1.5rem", md: "2rem" }}
                label={"Search"}
                onClick={handleSearch}
            />
            {subText && <Text>{subText}</Text>}
        </Group>
    );
}
