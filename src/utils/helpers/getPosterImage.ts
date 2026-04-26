export function getPosterImage(posterPath: string) {
    // if (!posterPath) return "https://image.tmdb.org/t/p/w500";
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
}
