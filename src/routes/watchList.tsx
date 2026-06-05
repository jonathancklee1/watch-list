import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "./__root";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { WatchListTabContainer } from "../components/watch-list/WatchListTabContainer/WatchListTabContainer";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/contexts/AuthContext";
import { isMobile } from "../utils/helpers/isMobile";

export const Route = createFileRoute("/watchList")({
    component: RouteComponent,
});

function RouteComponent() {
    const { user } = useContext(AuthContext);
    const [isMobileState, setIsMobileState] = useState(isMobile());
    useEffect(() => {
        const handleResize = () => {
            setIsMobileState(isMobile());
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <PageWrapper className="container">
            {!isMobileState && (
                <Flex direction={"column"} gap={".75em"}>
                    <Heading as="h1" fontSize={"3xl"}>
                        {user ? ` ${user.user_metadata.full_name}'s` : "Your"}{" "}
                        Watch List
                    </Heading>
                    <Text color={"var(--text--secondary-color)"}>
                        Manage your watch list here. Add, remove, and organize
                        your movies, tv shows and anime.
                    </Text>
                </Flex>
            )}
            <WatchListTabContainer />
        </PageWrapper>
    );
}
