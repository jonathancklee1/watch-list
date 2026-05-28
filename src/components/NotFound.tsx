import { Flex, Text } from "@chakra-ui/react";

import { Link } from "./Link/Link";

function NotFound() {
    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            fontSize="1.25rem"
            fontWeight="bold"
        >
            <Text>404 - Page Not Found</Text>
            <Text>The page you are looking for does not exist.</Text>
            <Link
                href="/"
                label="Go Home"
                style={{ marginTop: "1rem", fontSize: "1.25rem" }}
            ></Link>
        </Flex>
    );
}

export default NotFound;
