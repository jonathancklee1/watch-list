export type StyledLinkProps = {
    $isLogo?: boolean;
    isActive?: boolean;
};
export type MediaType = "Movies" | "TV Shows" | "Anime";
export type HomeHeroBannerType = {
    category: MediaType | null;
};
type Image = {
    src?: string;
    alt?: string;
};

export type CardProps = {
    data: CardType | null;
    isLoading?: boolean;
};

export interface ApiMovieData {
    id?: number;
    title?: string;
    name?: string;
    image?: string;
    overview?: string;
    release_date?: string;
    poster_path?: string;
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
    rating?: number;
    runTime?: string;
    genres?: string[];
}

export interface StyledButtonProps {
    $secondary?: boolean;
    $action?: boolean;
}
