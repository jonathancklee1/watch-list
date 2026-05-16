import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "./__root";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { WatchListTabContainer } from "../components/watch-list/WatchListTabContainer/WatchListTabContainer";

export const Route = createFileRoute("/watchList")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <PageWrapper className="container">
            <Flex direction={"column"} gap={".75em"}>
                <Heading as="h1" fontSize={"3xl"}>
                    My Watch List
                </Heading>
                <Text color={"var(--text--secondary-color)"}>
                    Add media to your watch list
                </Text>
            </Flex>
            <WatchListTabContainer />
        </PageWrapper>
    );
}
