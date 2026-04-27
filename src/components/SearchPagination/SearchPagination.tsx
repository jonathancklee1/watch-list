import { ButtonGroup, Pagination } from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import type { SearchPaginationProps } from "../../utils/types";
import { Button } from "../Button/Button";
import { isMobile } from "../../utils/helpers/isMobile";
import { useState } from "react";
export function SearchPagination({
    count,
    pageSize,
    page,
    setPage,
}: SearchPaginationProps) {
    const [isMobileState, setIsMobileState] = useState(isMobile());
    window.addEventListener("resize", () => {
        if (isMobile()) {
            setIsMobileState(true);
        } else {
            setIsMobileState(false);
        }
    });
    return (
        <Pagination.Root
            count={count}
            pageSize={pageSize}
            page={page}
            onPageChange={(e) => setPage(e.page)}
            mx={"auto"}
            mt={isMobileState ? ".5rem" : "2rem"}
        >
            <ButtonGroup size="sm">
                <Pagination.PrevTrigger asChild>
                    <Button $secondary>
                        <HiChevronLeft />
                    </Button>
                </Pagination.PrevTrigger>
                {isMobileState ? (
                    <Pagination.PageText />
                ) : (
                    <Pagination.Items
                        render={(page) => <Button>{page.value}</Button>}
                    />
                )}

                <Pagination.NextTrigger asChild>
                    <Button $secondary>
                        <HiChevronRight />
                    </Button>
                </Pagination.NextTrigger>
            </ButtonGroup>
        </Pagination.Root>
    );
}
