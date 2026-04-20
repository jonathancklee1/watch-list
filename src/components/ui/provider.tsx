"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { createSystem, defaultConfig } from "@chakra-ui/react";

const customSystem = createSystem(defaultConfig, {
    theme: {
        tokens: {
            colors: {
                text: {
                    DEFAULT: { value: "#ffffff" },
                    muted: { value: "#ffffff" },
                    subtle: { value: "#ffffff" },
                },
                fg: {
                    DEFAULT: { value: "#ffffff" },
                    muted: { value: "#ffffff" },
                    subtle: { value: "#ffffff" },
                },
            },
        },
    },
    globalCss: {
        html: {
            fontFamily: "Segoe UI , Tahoma, Geneva, Verdana, sans-serif",
        },
        body: {
            backgroundColor: "var(--background--primary-color)",
            color: "var(--text-color)",
        },
    },
});

export function Provider(props: ColorModeProviderProps) {
    return (
        <ChakraProvider value={customSystem}>
            <ColorModeProvider {...props} />
        </ChakraProvider>
    );
}
