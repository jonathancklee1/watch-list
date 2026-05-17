import { createContext } from "react";
import type { GenreContextType } from "../types";

export const GenreListContext = createContext<GenreContextType>({
    movie: [],
    tv: [],
    anime: [],
});
