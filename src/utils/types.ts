import type { Route } from "@tanstack/react-router";
import type { Dispatch, SetStateAction } from "react";

export type StyledLinkProps = {
    $isLogo?: boolean;
    isActive?: boolean;
};
export type MediaType = "movie" | "tv" | "anime";
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
    number_of_episodes?: number;
    number_of_seasons?: number;
    runtime?: number;
    synopsis?: string;
    episodes?: number;
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
    genres?: number[] | { id: number; name: string }[] | null;
    watchStatus?: WatchStatus;
    mediaType?: MediaType | string;
    episodes?: number | null;
    seasons?: number | null;
    runTime?: number | null;
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

export type WatchStatus = "toWatch" | "watching" | "completed";

export interface WatchListStatusType {
    toWatch: CardType[];
    watching: CardType[];
    completed: CardType[];
}

export type WatchListContextType = {
    watchListState: WatchListStatusType;
    dispatch: Dispatch<SetStateAction<WatchListAction>>;
};

// Strict tuple definitions for each action type
export type AddAction = ["ADD", "toWatch", CardType];
export type RemoveAction = ["REMOVE", CardType, WatchStatus];
export type MoveAction = ["MOVE", CardType, WatchStatus, WatchStatus, number?];

// Unified Discriminated Union type for your dispatch function
export type WatchListAction = AddAction | RemoveAction | MoveAction;
