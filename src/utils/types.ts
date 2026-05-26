import type { DragOverEvent } from "@dnd-kit/react";
import type { Dispatch } from "react";

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
    mediaType: MediaType | Omit<MediaType, "anime"> | string;
};

export type ApiMovieData = ApiData;
export interface ApiAnimeData {
    data: ApiData[];
}

export interface ApiData {
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
    images?:
        | {
              webp: {
                  large_image_url?: string;
              };
          }
        | Image;
    aired?: {
        from?: string;
    };
    genres?: { id: number; name: string }[];
    score: number;
    homepage?: string;
    trailer?: {
        embed_url?: string;
    };
    networks?: Partial<Networks>[];
    producers?: { name: string }[];
    production_companies?: { name: string; logo_path?: string }[];
}
export interface AnimeRecommendationItem {
    mal_id: number;
    title: string;
    url: string;
    votes: number;
    images?: {
        webp: {
            image_url?: string;
        };
    };
}

interface Networks {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
    url: string;
}
export type DetailsDataType = CardType & {
    networks: Partial<Networks>[];
    producers: {
        name: string;
        logo_path?: string;
    }[];
};
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
    genres?: ({ id: number; name: string } | number)[] | null;
    watchStatus?: WatchStatus;
    mediaType?: MediaType;
    episodes?: number | null;
    seasons?: number | null;
    runTime?: number | null;
    externalLink?: string | null;
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
};

export interface JikanSearchResponse {
    data?: unknown[];
    pagination?: {
        items?: {
            total?: number;
        };
    };
}

export type GenreContextType = Record<
    MediaType,
    {
        id?: number;
        mal_id?: number;
        name?: string;
        count?: number;
        url?: string;
    }[]
>;

export interface RecommendationData {
    id?: number;
    title: string;
    images: Image;
    airDate?: string;
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

export type WatchListStatusType = Record<WatchStatus, CardType[]>;

export type WatchListContextType = {
    watchListState: WatchListStatusType;
    dispatch: Dispatch<WatchListAction>;
};

// Strict tuple definitions for each action type
export type AddAction = ["ADD", "toWatch", CardType];
export type RemoveAction = ["REMOVE", CardType, WatchStatus];
export type MoveAction = ["MOVE", CardType, WatchStatus, WatchStatus, number?];
export type DragAction = ["DRAG", DragOverEvent];
export type SetListAction = ["SET_LIST", WatchListStatusType];

// Unified Discriminated Union type for your dispatch function
export type WatchListAction =
    | AddAction
    | RemoveAction
    | MoveAction
    | DragAction
    | SetListAction;
