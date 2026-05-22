import { Flex, Heading, Separator, Skeleton, Text } from "@chakra-ui/react";

import { RatingTag } from "../../RatingTag/RatingTag";
import {
    StyledBackgroundImage,
    StyledBanner,
    StyledInfoBox,
} from "./DetailsBanner.styles";
import { Button } from "../../Button/Button";
import type { CardType, MediaType } from "../../../utils/types";
import { useWatchListController } from "../../../utils/controllers/useWatchListController";
import { useIsInWatchList } from "../../../utils/hooks/useIsInWatchList";
import { enqueueToast } from "../../../utils/helpers/enqueueToast";
export function DetailsBanner({
    detailsData,
    mediaType,
    isLoading,
}: {
    detailsData: CardType | null;
    mediaType: MediaType;
    isLoading: boolean;
}) {
    const { handleAddToWatchList } = useWatchListController();
    console.log(detailsData, "detailsData");
    const isInWatchList = useIsInWatchList(detailsData);

    return (
        <StyledBanner>
            <StyledInfoBox>
                <RatingTag
                    rating={Number(detailsData?.rating)}
                    isLoading={isLoading}
                />
                {isLoading ? (
                    <Skeleton width="100%" />
                ) : (
                    <Heading as="h1" fontSize={"2rem"}>
                        {detailsData?.title}
                    </Heading>
                )}
                <Flex gap={"4"} color={"var(--text--secondary-color)"}>
                    {isLoading ? (
                        <Skeleton width="100%" />
                    ) : (
                        <>
                            <Text>
                                {detailsData?.runTime
                                    ? `${detailsData?.runTime} mins`
                                    : null}
                                {detailsData?.episodes
                                    ? `${detailsData?.episodes} Episodes`
                                    : null}
                                {detailsData?.seasons
                                    ? ` | ${detailsData?.seasons} Seasons`
                                    : null}
                            </Text>{" "}
                            <Separator
                                orientation={"vertical"}
                                borderColor={"var(--primary-color)"}
                            />
                            <Text>
                                {detailsData?.releaseDate
                                    ? detailsData?.releaseDate
                                    : "N/A"}
                            </Text>
                        </>
                    )}
                </Flex>

                <Button
                    label={
                        isInWatchList
                            ? "✓ Already in Watchlist"
                            : "Add to Watchlist"
                    }
                    $secondary
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (isInWatchList) {
                            enqueueToast("Already in watchlist", "info");
                            return;
                        }
                        handleAddToWatchList({
                            ...detailsData,
                            mediaType: mediaType,
                        });
                    }}
                />
            </StyledInfoBox>
            {isLoading ? (
                <Skeleton height="100%" width="100%" />
            ) : (
                <StyledBackgroundImage
                    src={detailsData?.image?.src}
                    alt="Media Image"
                />
            )}
        </StyledBanner>
    );
}
