import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "./__root";
import { Flex, Heading, Image, Separator, Text } from "@chakra-ui/react";
import { RatingTag } from "../components/RatingTag/RatingTag";
import { Button } from "../components/Button/Button";
import styled from "styled-components";

export const Route = createFileRoute("/details/$mediaType/$id")({
    // Load data using the params
    component: MediaDetailsComponent,
});

const StyledBackgroundImage = styled(Image)`
    z-index: -1;
    filter: brightness(50%);
    object-fit: cover;
    aspect-ratio: 3/4;
`;
const StyledInfoBox = styled(Flex)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    inset: 0;
    justify-content: flex-end;
    padding-inline: 1em;
    padding-bottom: 1.5em;
`;

function MediaDetailsComponent() {
    // Access params directly in the component
    const { mediaType, id } = Route.useParams();

    return (
        <PageWrapper>
            <Flex gap={4} direction={"column"}>
                <Flex gap={4} direction={"column"}>
                    <Flex
                        gap={4}
                        direction={"column"}
                        zIndex={10}
                        position={"relative"}
                    >
                        <StyledInfoBox>
                            <RatingTag rating={8.5} isLoading={false} />
                            <Heading as="h1" fontSize={"2rem"}>
                                Name
                            </Heading>
                            <Flex
                                gap={"4"}
                                color={"var(--text--secondary-color)"}
                            >
                                <Text>2h 14min</Text> |
                                <Text>Genre 1/Genre 2</Text>|<Text>2025</Text>
                            </Flex>
                            <Button label="Add to Watchlist" $secondary />
                        </StyledInfoBox>
                        <StyledBackgroundImage
                            src="https://images.pexels.com/photos/20329532/pexels-photo-20329532.jpeg"
                            alt="Media Image"
                        />
                    </Flex>
                    <Flex gap={6} direction={"column"} px={"1em"}>
                        <Text color={"var(--text--secondary-color)"}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Perspiciatis earum ratione laudantium ipsam
                            accusamus a architecto eius ea inventore officiis,
                            veritatis nam omnis, non nulla aperiam quisquam quia
                            sint unde.
                        </Text>
                        {/* Add Primary cast as carousel */}
                        <Flex
                            gap="4"
                            alignItems={"center"}
                            width={"100%"}
                            mb={"1em"}
                        >
                            <Heading
                                as={"h2"}
                                fontSize={"1.5rem"}
                                color={"var(--text--primary-color)"}
                                whiteSpace={"nowrap"}
                            >
                                Primary Cast
                            </Heading>
                            <Separator
                                variant="solid"
                                width={"100%"}
                                borderColor={"var(--secondary-color)"}
                            />
                        </Flex>
                    </Flex>
                    {/* Add Similar recommendation as carousel */}
                    <Flex
                        gap="4"
                        alignItems={"center"}
                        width={"100%"}
                        mb={"1em"}
                    >
                        <Heading
                            as={"h2"}
                            fontSize={"1.5rem"}
                            color={"var(--text--primary-color)"}
                            whiteSpace={"nowrap"}
                        >
                            Similar Recommendations
                        </Heading>
                        <Separator
                            variant="solid"
                            width={"100%"}
                            borderColor={"var(--secondary-color)"}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </PageWrapper>
    );
}
