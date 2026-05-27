import { ButtonGroup, Pagination } from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import type { SearchPaginationProps } from "../../../utils/types";
import { Button } from "../../Button/Button";
import { isMobile } from "../../../utils/helpers/isMobile";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
export function SearchPagination({
    count,
    pageSize,
    page,
}: SearchPaginationProps) {
    const [isMobileState, setIsMobileState] = useState(isMobile());

    useEffect(() => {
        const handleResize = () => {
            if (isMobile()) {
                setIsMobileState(true);
            } else {
                setIsMobileState(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
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
                        from={"/search"}
                        search={(old) => ({ ...old, page: page - 1 })}
                    >
                        <Button $secondary disabled={page === 1}>
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
                                from={"/search"}
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
                        from={"/search"}
                        search={(old) => ({ ...old, page: page + 1 })}
                    >
                        <Button $secondary disabled={page * pageSize >= count}>
                            <HiChevronRight />
                        </Button>
                    </Link>
                </Pagination.NextTrigger>
            </ButtonGroup>
        </Pagination.Root>
    );
}
