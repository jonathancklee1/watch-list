import type { Route } from "@tanstack/react-router";

export type StyledLinkProps = {
    $isLogo?: boolean;
    isActive?: boolean;
};
export type MediaType = "Movies" | "TV Shows" | "Anime";
export type HomeHeroBannerType = {
    category?: MediaType;
};
type Image = {
    src?: string;
    alt?: string;
};

export type CardProps = {
    data: CardType | null;
    isLoading?: boolean;
    tagText?: string;
    selectedCategory?: MediaType;
    mediaType: MediaType;
};

export interface ApiMovieData {
    id?: number;
    mal_id?: number;
    title?: string;
    name?: string;
    image?: string;
    overview?: string;
    release_date?: string;
    poster_path?: string;
    vote_average?: number;
    genre_ids?: number[];
    title_english?: string;
    first_air_date?: string;
    images?: {
        webp: {
            large_image_url?: string;
        };
    };
    aired?: {
        from?: string;
    };
    genres?: { id: number; name: string }[];
    score: number;
}

export interface CardType {
    id?: number;
    title?: string;
    name?: string;
    image?: Image;
    overview?: string;
    releaseDate?: string;
    posterPath?: string;
    description?: string;
    link?: string;
    rating?: number | string;
    runTime?: string;
    genres?: string | number[] | { id: number; name: string }[];
}

export interface StyledButtonProps {
    $secondary?: boolean;
    $action?: boolean;
}

export type FilterCategories = "TV Shows" | "Movies" | "Anime";

export type SearchPaginationProps = {
    count: number;
    pageSize: number;
    page: number;
    route: Route;
};

export interface JikanSearchResponse {
    data?: unknown[];
    pagination?: {
        items?: {
            total?: number;
        };
    };
}

export interface GenreContextType {
    movie: { id: number; name: string }[];
    tv: { id: number; name: string }[];
    anime: { mal_id: number; name: string; count: number; url: string }[];
}
