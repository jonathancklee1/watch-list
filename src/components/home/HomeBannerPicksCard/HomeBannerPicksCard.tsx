import type { CardProps } from "../../../utils/types";
import { Card, Tag } from "@chakra-ui/react";
import { Button } from "../../Button/Button";
import {
    StyledCard,
    StyledImage,
    StyledTag,
    StyledTitle,
    StyledDescription,
    StyledInfoWrapper,
} from "./HomeBannerPicksCard.styles";
import { useGetPosterImage } from "../../../utils/data-hooks/useGetPosterImage";
export function HomeBannerPicksCard({ data, isLoading }: CardProps) {
    console.log(data, "data");
    return (
        <StyledCard>
            <StyledImage
                src={useGetPosterImage({
                    posterPath: data?.image?.src,
                })}
                alt={data?.title}
            />
            <StyledInfoWrapper>
                <Card.Body gap="2" zIndex={10} justifyContent={"end"} pb="0">
                    <StyledTag>
                        <Tag.Label>Trending</Tag.Label>
                    </StyledTag>
                    <StyledTitle>
                        {isLoading ? "Loading..." : data?.title}
                    </StyledTitle>
                    <StyledDescription>
                        {isLoading ? "Loading..." : data?.description}
                    </StyledDescription>
                </Card.Body>
                <Card.Footer gap="2" zIndex={10} mt={"1rem"}>
                    <Button
                        label={isLoading ? "Loading..." : "View Details"}
                        href={data?.id ? `/movie/${data?.id}` : ""}
                        style={{
                            flexGrow: 1,
                        }}
                    />
                    <Button
                        label={isLoading ? "Loading..." : "Add"}
                        $secondary
                    />
                </Card.Footer>
            </StyledInfoWrapper>
        </StyledCard>
    );
}
