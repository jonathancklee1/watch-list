import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Provider } from "./components/ui/provider";

// Set up a Router instance
const router = createRouter({ routeTree });

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GenreListProvider } from "./utils/context/useGenreListContext";

// Register things for typesafety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider>
            <QueryClientProvider client={queryClient}>
                <GenreListProvider>
                    <RouterProvider router={router} />
                </GenreListProvider>
            </QueryClientProvider>
        </Provider>
    </StrictMode>,
);
