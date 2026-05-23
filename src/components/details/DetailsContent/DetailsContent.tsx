import { Flex, Badge, Text, Skeleton, Spinner, Box } from "@chakra-ui/react";
import type { CardType } from "../../../utils/types";

export function DetailsContent({
    detailsData,
    isLoading,
}: {
    detailsData: CardType | null;
    isLoading: boolean;
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
            {isLoading ? (
                <Spinner size="sm" mx={"auto"} />
            ) : (
                <Flex gap={4} alignItems={"center"} flexWrap={"wrap"}>
                    {detailsData?.genres?.map((genre) => (
                        <Badge
                            key={genre.id}
                            width={"fit-content"}
                            fontWeight={"bold"}
                            p={".5em"}
                            background={"var(--secondary-color)"}
                        >
                            {genre.name}
                        </Badge>
                    ))}
                </Flex>
            )}

            <Text as="h2" fontSize={"1.3rem"} fontWeight={"bold"} mt={"1em"}>
                Overview
            </Text>
            {isLoading ? (
                <Skeleton width="60%" height={"6rem"} />
            ) : (
                <Box
                    p={"1.5em"}
                    background={"var(--background--secondary-color)"}
                    borderRadius={"15px"}
                    border={"1px solid var( --text--tertiary-color)"}
                >
                    <Text color={"var(--text--secondary-color)"}>
                        {detailsData?.description}
                    </Text>
                </Box>
            )}
        </Flex>
    );
}
