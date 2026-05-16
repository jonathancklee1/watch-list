import type { Route } from "@tanstack/react-router";
import type { Dispatch, SetStateAction } from "react";

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
    mediaType: MediaType | string;
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
    backdrop_path?: string;
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
    releaseDate?: string | null;
    posterPath?: string;
    backdrop?: string;
    description?: string;
    link?: string;
    rating?: number | string;
    runTime?: string;
    genres?: string | number[] | { id: number; name: string }[] | null;
    watchStatus?: WatchStatus;
    mediaType?: MediaType | string;
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

export interface RecommendationData {
    id: string;
    title: string;
    images: Image;
}

export type DetailDataType = {
    rating?: number | string;
    poster?: string;
    title?: string;
    overview?: string;
    releaseDate?: string;
    genres?: string[];
    episodes?: number;
    seasons?: number;
    runtime?: number;
    backdrop?: string;
} & (
    | {
          rating: number;
          poster: string;
          title: string;
          overview: string;
          releaseDate: string;
          genres: string[];
          episodes: number | undefined;
          seasons: undefined;
          runtime: undefined;
          backdrop: undefined;
      }
    | {
          poster: string;
          releaseDate: string;
          genres: string[];
          episodes: number;
          seasons: number;
          runtime: number;
          backdrop: string;
          title: string;
          overview: string;
          rating: number | string;
      }
);

export type WatchStatus = "to-watch" | "watching" | "completed";

export interface WatchListStatusType {
    toWatch: CardType[];
    watching: CardType[];
    completed: CardType[];
}

export type WatchListContextType = {
    watchList?: WatchListStatusType;
    setWatchList?: Dispatch<SetStateAction<WatchListStatusType>>;
};
