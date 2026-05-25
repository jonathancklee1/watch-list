import {
    Flex,
    Badge,
    Text,
    Skeleton,
    Spinner,
    Box,
    Image,
} from "@chakra-ui/react";
import type { DetailsDataType } from "../../../utils/types";
import { getPosterImage } from "../../../utils/helpers/getPosterImage";

export function DetailsContent({
    detailsData,
    isLoading,
}: {
    detailsData: DetailsDataType | null;
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
                    {detailsData?.genres && detailsData?.genres?.length > 0 ? (
                        detailsData?.genres?.map((genre) => {
                            if (typeof genre === "number") return null;
                            return (
                                <Badge
                                    key={genre.id}
                                    width={"fit-content"}
                                    fontWeight={"bold"}
                                    p={".5em"}
                                    background={"var(--secondary-color)"}
                                >
                                    {genre.name}
                                </Badge>
                            );
                        })
                    ) : (
                        <Text color={"var(--text--secondary-color)"}>
                            No Genres
                        </Text>
                    )}
                </Flex>
            )}
            <Text as="h2" fontSize={"1.3rem"} fontWeight={"bold"} mt={"1em"}>
                Watch On
            </Text>
            {isLoading ? (
                <Skeleton width="60%" height={"6rem"} />
            ) : (
                <Flex gap={4} alignItems={"center"} flexWrap={"wrap"}>
                    {detailsData?.networks &&
                    detailsData?.networks?.length > 0 ? (
                        detailsData?.networks?.map((network) => (
                            <Badge
                                key={network.name}
                                width={"fit-content"}
                                fontWeight={"bold"}
                                p={".5em"}
                                background={
                                    "var(--background--secondary-color)"
                                }
                                color={"var(--text--primary-color)"}
                                display={"flex"}
                                alignItems={"center"}
                                gap={2}
                                paddingInline={"1em"}
                            >
                                {network.logo_path && (
                                    <Image
                                        src={getPosterImage(
                                            network.logo_path ?? "",
                                        )}
                                        alt={network.name}
                                        width={"3rem"}
                                    />
                                )}
                                {network.name}
                            </Badge>
                        ))
                    ) : (
                        <Text color={"var(--text--secondary-color)"}>
                            No Streams
                        </Text>
                    )}
                </Flex>
            )}
            <Text as="h2" fontSize={"1.3rem"} fontWeight={"bold"} mt={"1em"}>
                Producers
            </Text>
            {isLoading ? (
                <Skeleton width="60%" height={"6rem"} />
            ) : (
                <Flex gap={4} alignItems={"center"} flexWrap={"wrap"}>
                    {detailsData?.producers &&
                    detailsData?.producers?.length > 0 ? (
                        detailsData?.producers?.map((producer) => (
                            <Badge
                                key={producer.name}
                                width={"fit-content"}
                                fontWeight={"bold"}
                                p={".5em"}
                                background={"white"}
                                display={"flex"}
                                alignItems={"center"}
                                gap={2}
                                paddingInline={"1em"}
                            >
                                {producer.logo_path && (
                                    <Image
                                        src={getPosterImage(
                                            producer.logo_path ?? "",
                                        )}
                                        alt={producer.name}
                                        maxHeight={"1.3rem"}
                                    />
                                )}
                                {producer.name}
                            </Badge>
                        ))
                    ) : (
                        <Text color={"var(--text--secondary-color)"}>
                            No Producers
                        </Text>
                    )}
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
                        {detailsData?.description ?? "No Overview"}
                    </Text>
                </Box>
            )}
        </Flex>
    );
}
