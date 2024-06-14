import { Card } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { IProduct } from "@/interfaces/product.interface";
import { API_URL } from "@/lib/api_url";
import { toCurrency } from "@/lib/utils";

export function ProductCarousel({ products }: { products: IProduct[] | [] }) {
    return (
        <Carousel className="w-full max-w-none">
            <CarouselContent>
                {products?.map((product) => (
                    <CarouselItem className="h-[500px] w-full flex items-center justify-center">
                        <Card className="flex w-full h-full items-center justify-between text-5xl">
                            <div
                                className="w-[50%] rounded-[2rem] p-10 h-full bg-no-repeat bg-cover"
                                style={{
                                    backgroundImage: `url(${API_URL}/gradient-bg.webp)`,
                                }}
                            >
                                <div
                                    className={`flex flex-col items-start justify-start h-full bg-cover bg-center rounded-2xl`}
                                    style={{
                                        backgroundImage: `url(${API_URL}/${product.image})`,
                                    }}
                                ></div>
                            </div>
                            <div className="flex items-center h-full w-[50%] justify-center">
                                <div className="flex flex-col  justify-around h-full">
                                    <h1 className="text-center text-4xl font-extrabold">
                                        НОВИНКА!
                                    </h1>

                                    <div className="">
                                        <h1 className="text-center text-4xl font-extrabold">
                                            {product.name}
                                        </h1>
                                        <p className="text-2xl text-center">
                                            {product.description}
                                        </p>
                                    </div>
                                    <div className="">
                                        <div className="flex flex-col gap-1">
                                            <p className="font-bold text-center text-5xl">
                                                {product.discount ? (
                                                    <p className="line-through text-lg font-normal">
                                                        {toCurrency(
                                                            Number(
                                                                product.price
                                                            )
                                                        )}
                                                    </p>
                                                ) : (
                                                    toCurrency(
                                                        Number(product.price)
                                                    )
                                                )}
                                            </p>
                                            {product.discount ? (
                                                <p className="font-bold text-center text-5xl">
                                                    {toCurrency(
                                                        Math.round(
                                                            Number(
                                                                product.price
                                                            ) -
                                                                Number(
                                                                    product.price
                                                                ) *
                                                                    (product
                                                                        .discount
                                                                        .discount_value /
                                                                        100)
                                                        )
                                                    )}
                                                </p>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
