import { ButtonGroup, Pagination } from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import type { SearchPaginationProps } from "../../utils/types";
import { Button } from "../Button/Button";
import { isMobile } from "../../utils/helpers/isMobile";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
export function SearchPagination({
    count,
    pageSize,
    page,
    route,
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
            mx={"auto"}
            mt={isMobileState ? ".5rem" : "2rem"}
        >
            <ButtonGroup size="sm">
                <Pagination.PrevTrigger asChild>
                    <Link
                        from={route.fullPath}
                        search={(old) => ({ ...old, page: page - 1 })}
                    >
                        <Button $secondary>
                            <HiChevronLeft />
                        </Button>
                    </Link>
                </Pagination.PrevTrigger>
                {isMobileState ? (
                    <Pagination.PageText />
                ) : (
                    <Pagination.Items
                        render={(pageItem) => (
                            <Link
                                from={route.fullPath}
                                search={(old) => ({
                                    ...old,
                                    page: pageItem.value,
                                })}
                            >
                                <Button $secondary={pageItem.value !== page}>
                                    {pageItem.value}
                                </Button>
                            </Link>
                        )}
                    />
                )}

                <Pagination.NextTrigger asChild>
                    <Link
                        from={route.fullPath}
                        search={(old) => ({ ...old, page: page + 1 })}
                    >
                        <Button $secondary>
                            <HiChevronRight />
                        </Button>
                    </Link>
                </Pagination.NextTrigger>
            </ButtonGroup>
        </Pagination.Root>
    );
}
