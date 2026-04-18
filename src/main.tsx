import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Provider } from "./components/ui/provider";

// Set up a Router instance
const router = createRouter({ routeTree });
import {
    ChakraProvider,
    createSystem,
    defaultConfig,
    defineConfig,
} from "@chakra-ui/react";

const config = defineConfig({
    theme: {
        tokens: {
            colors: {
                primary: {},
            },
        },
    },
});

const system = createSystem(defaultConfig, config);
// Register things for typesafety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider>
            <ChakraProvider value={system}>
                <RouterProvider router={router} />
            </ChakraProvider>
        </Provider>
    </StrictMode>,
);
