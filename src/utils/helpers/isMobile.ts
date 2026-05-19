export function isMobile(width?: number) {
    return (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
        ) || window.innerWidth < (width || 768)
    );
}
