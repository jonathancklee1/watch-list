import { Carousel } from "@chakra-ui/react";
import type { JSX } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { Button } from "../Button/Button";

export function CardCarousel({
    items,
    enableControls,
    slidesPerPage = 1,
    ...props
}: {
    items: JSX.Element[];
    enableControls?: boolean;
    slidesPerPage?: number;
}) {
    return (
        <Carousel.Root
            slideCount={items.length}
            mx="auto"
            allowMouseDrag
            w={"100%"}
            slidesPerPage={slidesPerPage}
            {...props}
        >
            <Carousel.Control gap="4" width="full" position="relative">
                {enableControls && (
                    <Carousel.PrevTrigger asChild>
                        <Button
                            position={"absolute"}
                            left="0"
                            top={"40%"}
                            zIndex={2}
                            ml="2"
                            $action
                        >
                            <LuArrowLeft />
                        </Button>
                    </Carousel.PrevTrigger>
                )}
                <Carousel.ItemGroup>
                    {items.map((item, index: number) => (
                        <Carousel.Item
                            key={index}
                            index={index}
                            mx={"auto"}
                            display={"flex"}
                            justifyContent={"center"}
                        >
                            {item}
                        </Carousel.Item>
                    ))}
                </Carousel.ItemGroup>
                {enableControls && (
                    <Carousel.NextTrigger asChild>
                        <Button
                            position={"absolute"}
                            right="0"
                            top={"40%"}
                            zIndex={2}
                            mr="2"
                            $action
                        >
                            <LuArrowRight />
                        </Button>
                    </Carousel.NextTrigger>
                )}
            </Carousel.Control>
        </Carousel.Root>
    );
}
