import { Flex, Badge, Text } from "@chakra-ui/react";
import type { DetailDataType } from "../../../utils/types";

export function DetailsContent({
    detailsData,
}: {
    detailsData: DetailDataType;
}) {
    return (
        <Flex
            gap={2}
            direction={"column"}
            px={"1em"}
            order={{ md: 3 }}
            gridColumn={{ md: "span 2" }}
        >
            <Text as="h2" fontSize={"1.3rem"} fontWeight={"bold"}>
                Genres
            </Text>
            <Flex gap={4} alignItems={"center"} flexWrap={"wrap"}>
                {detailsData?.genres?.map((genre) => (
                    <Badge
                        key={genre}
                        width={"fit-content"}
                        fontWeight={"bold"}
                        p={".5em"}
                        background={"var(--secondary-color)"}
                    >
                        {genre}
                    </Badge>
                ))}
            </Flex>
            <Text as="h2" fontSize={"1.3rem"} fontWeight={"bold"} mt={"1em"}>
                Overview
            </Text>
            <Text color={"var(--text--secondary-color)"}>
                {detailsData?.overview}
            </Text>
        </Flex>
    );
}
