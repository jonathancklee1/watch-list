import { Group, Input, Button, InputGroup } from "@chakra-ui/react";

import { LuSearch } from "react-icons/lu";
export function SearchInput() {
    return (
        <Group attached maxW="sm" w={"fit-content"}>
            <InputGroup startElement={<LuSearch />}>
                <Input placeholder="Search contacts" w={"fit-content"} />
            </InputGroup>
            <Button bg="bg.subtle" variant="outline">
                Submit
            </Button>
        </Group>
    );
}
