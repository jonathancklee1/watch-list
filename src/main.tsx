import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Provider } from "./components/ui/provider";

// Set up a Router instance
const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    defaultStaleTime: 5000,
});

import {
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { GenreListProvider } from "./utils/contexts/useGenreListContext";
import { WatchListProvider } from "./utils/contexts/useWatchListContext";
import { AuthProvider } from "./utils/contexts/useAuthContext";
import { enqueueToast } from "./utils/helpers/enqueueToast";

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error, query) => {
            if (query.meta?.errorMessage) {
                enqueueToast(`${query.meta.errorMessage}`, "error");
            } else {
                enqueueToast(`Something went wrong: ${error.message}`, "error");
            }
        },
    }),
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <WatchListProvider>
                        <GenreListProvider>
                            <RouterProvider router={router} />
                        </GenreListProvider>
                    </WatchListProvider>
                </AuthProvider>
            </QueryClientProvider>
        </Provider>
    </StrictMode>,
);
