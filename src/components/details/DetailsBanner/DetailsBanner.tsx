import { Flex, Heading, Separator, Text } from "@chakra-ui/react";
import { getPosterImage } from "../../../utils/helpers/getPosterImage";
import { RatingTag } from "../../RatingTag/RatingTag";
import {
    StyledBackgroundImage,
    StyledBanner,
    StyledInfoBox,
} from "./DetailsBanner.styles";
import { Button } from "../../Button/Button";
import type { CardType, DetailDataType, MediaType } from "../../../utils/types";
import { useWatchListController } from "../../../utils/controllers/useWatchListController";
export function DetailsBanner({
    detailsData,
    mediaType,
}: {
    detailsData: CardType;
    mediaType: MediaType;
}) {
    const { handleAddToWatchList } = useWatchListController();

    return (
        <StyledBanner>
            <StyledInfoBox>
                <RatingTag
                    rating={
                        // detailsData?.rating && detailsData?.rating?.toFixed(1)
                        detailsData?.rating
                    }
                    isLoading={false}
                />
                <Heading as="h1" fontSize={"2rem"}>
                    {detailsData?.title}
                </Heading>
                <Flex gap={"4"} color={"var(--text--secondary-color)"}>
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
                </Flex>
                <Button
                    label="Add to Watchlist"
                    $secondary
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleAddToWatchList({
                            ...detailsData,
                            mediaType: mediaType,
                        });
                    }}
                />
            </StyledInfoBox>
            <StyledBackgroundImage
                src={detailsData?.image?.src}
                alt="Media Image"
            />
        </StyledBanner>
    );
}
