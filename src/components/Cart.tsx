import { useEffect, useState } from "react";

import { API_URL } from "../lib/api_url";
import { Button } from "./ui/button";
import { ICartProduct } from "@/interfaces/purchase.interface";
import { CartService } from "@/service/cart.service";
import { Route } from "@/routes/catalog";
import { toCurrency } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

export const Cart = () => {
    const [cart, setCart] = useState<ICartProduct[]>();

    const navigate = Route.useNavigate();

    useEffect(() => {
        setCart(CartService.getCart());
    }, []);

    function priceSum() {
        const sum = cart?.reduce((accumulator, object) => {
            if (object.product.discount) {
                return (
                    accumulator +
                    Math.round(
                        Number(object.product.price) -
                            Number(object.product.price) *
                                (object.product.discount.discount_value / 100)
                    ) *
                        object.count
                );
            } else {
                return (
                    accumulator + Number(object.product.price) * object.count
                );
            }
        }, 0);
        return sum;
    }

    return (
        <>
            <>
                <div className="bg-background rounded-xl  border-primarytext">
                    <div className="p-5">
                        <h1 className="text-3xl font-extrabold pb-6 pt-2 px-1">
                            Корзина
                        </h1>
                        <ScrollArea
                            className={
                                cart?.length != 0 ? "h-[550px]" : "h-[50px]"
                            }
                        >
                            {cart?.length! > 0 ? (
                                <div className="flex flex-col gap-5">
                                    {cart?.map((product) => (
                                        <div className="flex h-40 gap-5">
                                            <div
                                                className="w-40 h-40 bg-contain rounded-xl"
                                                style={{
                                                    backgroundImage: `url(${API_URL}/${product.product.image})`,
                                                }}
                                            ></div>
                                            <div className="flex flex-col w-52 justify-center gap-2">
                                                <p className="font-bold text-xl">
                                                    {product.product.name}
                                                </p>
                                                <div className="flex flex-col gap-1">
                                                    <p className="font-bold text-start text-2xl roboto">
                                                        {product.product
                                                            .discount ? (
                                                            <p className="line-through text-lg font-normal">
                                                                {toCurrency(
                                                                    Number(
                                                                        product
                                                                            .product
                                                                            .price
                                                                    ) *
                                                                        product.count
                                                                )}
                                                            </p>
                                                        ) : (
                                                            toCurrency(
                                                                Number(
                                                                    product
                                                                        .product
                                                                        .price
                                                                ) *
                                                                    product.count
                                                            )
                                                        )}
                                                    </p>
                                                    {product.product
                                                        .discount ? (
                                                        <p className="font-bold text-start text-2xl roboto">
                                                            {toCurrency(
                                                                Math.round(
                                                                    Number(
                                                                        product
                                                                            .product
                                                                            .price
                                                                    ) -
                                                                        Number(
                                                                            product
                                                                                .product
                                                                                .price
                                                                        ) *
                                                                            (product
                                                                                .product
                                                                                .discount
                                                                                .discount_value /
                                                                                100)
                                                                ) *
                                                                    product.count
                                                            )}
                                                        </p>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Button
                                                    variant={"destructive"}
                                                    onClick={() => {
                                                        CartService.removePiece(
                                                            product
                                                        );
                                                        setCart(
                                                            CartService.getCart()
                                                        );
                                                    }}
                                                >
                                                    x
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex justify-between items-center">
                                        <div className="flex text-3xl font-black items-center">
                                            <span>Итого:</span>{" "}
                                            <span className="roboto font-normal">
                                                {toCurrency(priceSum()!)}
                                            </span>
                                        </div>
                                        <Button
                                            /* className="rounded-xl border-[1px] border-primarytext p-2 font-bold" */ variant={
                                                "outline"
                                            }
                                            onClick={() =>
                                                navigate({ to: "/checkout" })
                                            }
                                        >
                                            Оформить покупку
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-center text-xl">
                                    Корзина пуста!
                                </p>
                            )}
                        </ScrollArea>
                    </div>
                </div>
            </>
        </>
    );
};
