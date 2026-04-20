import { Carousel } from "@chakra-ui/react";
import type { JSX } from "react";

export function CardCarousel({ items, ...props }: { items: JSX.Element[] }) {
    return (
        <Carousel.Root
            slideCount={items.length}
            mx="auto"
            allowMouseDrag
            w={"100%"}
            {...props}
        >
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
        </Carousel.Root>
    );
}
