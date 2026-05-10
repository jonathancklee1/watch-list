import { Flex, Heading, Separator, Text } from "@chakra-ui/react";
import { getPosterImage } from "../../../utils/helpers/getPosterImage";
import { RatingTag } from "../../RatingTag/RatingTag";
import {
    StyledBackgroundImage,
    StyledBanner,
    StyledInfoBox,
} from "./DetailsBanner.styles";
import { Button } from "../../Button/Button";
import type { DetailDataType } from "../../../utils/types";
export function DetailsBanner({
    detailsData,
    mediaType,
}: {
    detailsData: DetailDataType;
    mediaType: string;
}) {
    return (
        <StyledBanner>
            <StyledInfoBox>
                <RatingTag
                    rating={detailsData?.rating?.toFixed(1)}
                    isLoading={false}
                />
                <Heading as="h1" fontSize={"2rem"}>
                    {detailsData?.title}
                </Heading>
                <Flex gap={"4"} color={"var(--text--secondary-color)"}>
                    <Text>
                        {detailsData?.runtime
                            ? `${detailsData?.runtime} mins`
                            : null}
                        {detailsData?.episodes
                            ? `${detailsData?.episodes} Episodes`
                            : null}
                        {detailsData?.seasons
                            ? `| ${detailsData?.seasons} Seasons`
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
                <Button label="Add to Watchlist" $secondary />
            </StyledInfoBox>
            <StyledBackgroundImage
                src={`${mediaType === "anime" ? detailsData.poster : getPosterImage(detailsData.poster)}`}
                alt="Media Image"
            />
        </StyledBanner>
    );
}
