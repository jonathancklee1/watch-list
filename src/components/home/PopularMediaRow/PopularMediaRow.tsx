import { BiChevronRight } from "react-icons/bi";
import type { MediaType } from "../../../utils/types";
import { Link } from "../../Link/Link";
import {
    StyledRowHeaderWrapper,
    StyledRowWrapper,
} from "./PopularMediaRow.styles";
import { Text } from "@chakra-ui/react";
import { CardCarousel } from "../../CardCarousel/CardCarousel";
import { useState, type JSX } from "react";
import { isMobile } from "../../../utils/helpers/isMobile";

export function PopularMediaRow({
    mediaType,
    items,
}: {
    mediaType: MediaType;
    items: JSX.Element[];
}) {
    const [visibleSlidesNumber, setVisibleSlidesNumber] = useState(
        isMobile() ? 1.5 : 3.5,
    );
    window.addEventListener("resize", () => {
        if (isMobile()) {
            setVisibleSlidesNumber(1.5);
        } else {
            setVisibleSlidesNumber(3.5);
        }
    });
    return (
        <StyledRowWrapper>
            <StyledRowHeaderWrapper>
                <Text fontSize="1.5rem" fontWeight={"bold"}>
                    Popular {mediaType}
                </Text>
                <Link
                    label="View all"
                    href={`/${mediaType}`}
                    icon={<BiChevronRight />}
                />
            </StyledRowHeaderWrapper>
            <CardCarousel
                items={items}
                slidesPerPage={visibleSlidesNumber}
                enableControls
            />
        </StyledRowWrapper>
    );
}
