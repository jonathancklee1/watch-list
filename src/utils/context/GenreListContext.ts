import { createContext } from "react";

export const GenreListContext = createContext({
    movie: [],
    tv: [],
    anime: [],
});
