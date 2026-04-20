export function useGetPosterImage({ posterPath }: { posterPath?: string }) {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
}
