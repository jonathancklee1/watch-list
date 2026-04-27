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
import { Tooltip } from "../../ui/tooltip";
import { BiPlus } from "react-icons/bi";

export function HomeBannerPicksCard({ data, isLoading }: CardProps) {
    // console.log(data, "data");
    return (
        <StyledCard>
            <StyledImage src={data?.image?.src} alt={data?.title} />
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
                    <Tooltip
                        content="Add to watchlist"
                        positioning={{ placement: "top" }}
                        showArrow
                    >
                        <Button
                            label={"Add"}
                            zIndex={2}
                            disabled={isLoading}
                            p={"1"}
                            $secondary
                        >
                            <BiPlus
                                color="var(--text--primary-color)"
                                strokeWidth={"1.5"}
                            />
                        </Button>
                    </Tooltip>
                </Card.Footer>
            </StyledInfoWrapper>
        </StyledCard>
    );
}
