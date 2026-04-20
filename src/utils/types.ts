export type StyledLinkProps = {
    $isLogo?: boolean;
    isActive?: boolean;
};

export type HomeHeroBannerType = {
    category: "Movies" | "TV Shows" | "Anime" | null;
};
type Image = {
    src: string;
    alt: string;
};

export type CardProps = {
    data: ApiMovieData | null;
    isLoading?: boolean;
};

export interface ApiMovieData {
    id: number;
    title: string;
    image: string;
    overview: string;
    release_date: string;
    poster_path: string;
}
export interface StyledButtonProps {
    $secondary?: boolean;
}
