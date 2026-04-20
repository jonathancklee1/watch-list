import { BiChevronRight } from "react-icons/bi";
import type { MediaType } from "../../../utils/types";
import { Link } from "../../Link/Link";
import {
    StyledRowHeaderWrapper,
    StyledRowWrapper,
} from "./PopularMediaRow.styles";
import { Text } from "@chakra-ui/react";
import { CardCarousel } from "../../CardCarousel/CardCarousel";
import type { JSX } from "react";

export function PopularMediaRow({
    mediaType,
    items,
}: {
    mediaType: MediaType;
    items: JSX.Element[];
}) {
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
            <CardCarousel items={items} slidesPerPage={1.5} />
        </StyledRowWrapper>
    );
}
