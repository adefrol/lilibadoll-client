import  { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { BadgeRussianRuble, Check, ShoppingCart, Truck } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
    ICartProduct,
    INewPurchase,
    IPurchaseProducts,
} from "@/interfaces/purchase.interface";
import { PurchaseService } from "@/service/purchase.service";
import { UserService } from "@/service/user.service";
import { CartService, setCount } from "@/service/cart.service";
import { toCurrency } from "@/lib/utils";
import { API_URL } from "@/lib/api_url";
import { Input } from "../ui/input";

export const Checkout = () => {
    const [cart, setCart] = useState<ICartProduct[]>(CartService.getCart());

    const [activePath, setActivePath] = useState<string>("cart");

    const [newPurchase, setNewPurchase] = useState<INewPurchase>({
        status: "В обработке",
        sum: priceSum() + 1000,
        products: getId(),
        payType: "Карта",
    });

    const [counterChange, setCounterChange] = useState<number>(0);

    useEffect(() => {
        setCart(CartService.getCart());
    }, [counterChange]);

    const [city, setCity] = useState<string>();
    const [address, setAddress] = useState<string>();
    const [index, setIndex] = useState<string>("");

    const [payCard, setPayCard] = useState<string>("");

    function compareAddress(
        city: string | undefined,
        address: string | undefined,
        index: string | undefined
    ) {
        setNewPurchase({
            ...newPurchase,
            address: `${city ? city : "..."}, ${address ? address : "..."}, ${index ? index : "..."}`,
        });
    }

    function getId() {
        const products: IPurchaseProducts[] = [];

        cart.forEach((product) => {
            if (product) {
                products.push({
                    product: product.product.id,
                    count: product.count,
                });
            }
        });

        return products;
    }

    useEffect(() => {
        compareAddress(city, address, index);
    }, [city, address, index]);

    async function getUserId() {
        const data = await UserService.getProfile();
        setNewPurchase({ ...newPurchase, user: data.id as number });
    }

    useEffect(() => {
        getUserId();
    }, []);

    useEffect(() => {
        setNewPurchase({
            ...newPurchase,
            products: getId(),
            sum: priceSum() + 1000,
        });
    }, [cart]);

    function returnCheck(): JSX.Element {
        if (activePath == "cart") {
            return returnCart();
        }
        if (activePath == "delivery") {
            return returnDelivery();
        }
        if (activePath == "pay") {
            return returnPayType();
        }
        if (activePath == "accept") {
            return returnAccept();
        } else {
            return returnCart();
        }
    }

    function returnCart() {
        return (
            <Card>
                <CardHeader className="text-center font-bold text-3xl">
                    Ваши товары
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                    {cart?.map((product, idx) => (
                        <div className="flex h-40 gap-5">
                            <div
                                className="w-40 h-40 bg-contain rounded-xl"
                                style={{
                                    backgroundImage: `url(${API_URL}/${product.product.image})`,
                                }}
                            ></div>
                            <div className="flex flex-col justify-center gap-2">
                                <p className="font-bold text-xl">
                                    {product.product.name}
                                </p>
                                <div className="flex flex-col gap-1">
                                    <p className="font-bold text-start text-2xl roboto">
                                        {product.product.discount ? (
                                            <p className="line-through text-lg font-normal">
                                                {toCurrency(
                                                    Number(
                                                        product.product.price
                                                    ) * product.count
                                                )}
                                            </p>
                                        ) : (
                                            toCurrency(
                                                Number(product.product.price) * product.count
                                            )
                                        )}
                                    </p>
                                    {product.product.discount ? (
                                        <p className="font-bold text-start text-2xl roboto">
                                            {toCurrency(
                                                Number(
                                                    Math.round(
                                                        Number(
                                                            product.product
                                                                .price
                                                        ) /
                                                            (product.product
                                                                .discount
                                                                .discount_value /
                                                                100 +
                                                                1)
                                                    ) * product.count
                                                )
                                            )}
                                        </p>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button
                                    variant={"outline"}
                                    disabled={product.count == 1}
                                    onClick={() => handleCount("-", product)}
                                >
                                    -
                                </Button>
                                <p key={cart[idx].count}>{product.count}</p>
                                <Button
                                    variant={"outline"}
                                    onClick={() => handleCount("+", product)}
                                >
                                    +
                                </Button>
                            </div>
                            <div className="flex items-center">
                                <Button
                                    variant={"destructive"}
                                    onClick={() => {
                                        CartService.removePiece(product);
                                        setCart(CartService.getCart());
                                    }}
                                >
                                    x
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }

    function returnDelivery() {
        return (
            <Card>
                <CardHeader className="font-bold text-3xl text-center">
                    Адрес доставки
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-5">
                        <div className="mx-4 px-5 w-full border-primary flex flex-col gap-5">
                            <div className="flex gap-2 items-center">
                                <p className="w-40 text-end">Город</p>
                                <Input
                                    value={city}
                                    required
                                    placeholder="г. Иркутск"
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 items-center">
                                <p className="w-40 text-end">Улица</p>
                                <Input
                                    value={address}
                                    required
                                    placeholder="ул. Ленина, 1"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 items-center ">
                                <p className="w-40 text-end">Почтовый индекс</p>
                                <Input
                                    value={index}
                                    required
                                    placeholder="664001"
                                    onChange={(e) => setIndex(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    function returnPayType() {
        return (
            <Card>
                <CardHeader className="font-bold text-3xl text-center">
                    Оплата
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-5">
                        <div className="mx-4 px-5 w-full border-primary flex flex-col gap-5">
                            <div className="flex gap-2 items-center">
                                <p className="w-40 text-end">Карта</p>
                                <Input
                                    required
                                    value={payCard}
                                    placeholder="2345 2345 5123 1451"
                                    onChange={(e) => setPayCard(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    function returnAccept() {
        return (
            <Card>
                <CardHeader className="text-center font-bold text-3xl">
                    Подтверждение
                </CardHeader>
                <CardContent>
                    <div className="text-xl">
                        <div className="p-2">
                            <h1 className="font-bold">Адрес доставки</h1>
                            <p>
                                {newPurchase.address
                                    ? newPurchase.address
                                    : "..."}
                            </p>
                        </div>

                        <div className="p-2">
                            <h1 className="font-bold">Способ оплаты</h1>
                            <p>
                                {newPurchase.payType
                                    ? newPurchase.payType
                                    : "..."}
                            </p>
                        </div>

                        <div className="p-2">
                            <div className="py-4">
                                <p>
                                    <span className="font-bold">
                                        {countSum()} товара:{" "}
                                    </span>
                                    {toCurrency(newPurchase.sum - 1000)}
                                </p>
                            </div>
                            <p>
                                <span className="font-bold">Доставка:</span>{" "}
                                {toCurrency(1000)}
                            </p>
                            <p>
                                <span className="font-bold">К оплате:</span>{" "}
                                {toCurrency(newPurchase.sum)}
                            </p>
                        </div>
                    </div>
                    <Button className="w-40" onClick={() => handleSubmit()}>
                        Оформить заказ
                    </Button>
                </CardContent>
            </Card>
        );
    }

    function handleCount(crement: setCount, cartItem: ICartProduct) {
        if (crement == "-") {
            if (cartItem.count != 1) {
                CartService.setCount(crement, cartItem.product);
                setCounterChange(counterChange + 1);
            }
        } else {
            CartService.setCount(crement, cartItem.product);
            setCounterChange(counterChange + 1);
        }
    }

    function priceSum() {
        const sum = cart?.reduce((accumulator, object) => {
            if (object.product.discount) {
                return (
                    accumulator +
                    Math.round(
                        (Number(object.product.price) /
                            (object.product.discount.discount_value / 100 +
                                1)) *
                            object.count
                    )
                );
            } else {
                return (
                    accumulator + Number(object.product.price) * object.count
                );
            }
        }, 0);
        return sum;
    }

    async function handleSubmit() {
        const data = await PurchaseService.create(newPurchase);

        console.log(data);
    }

    function countSum() {
        return cart?.reduce((accumulator, object) => {
            return accumulator + object.count;
        }, 0);
    }

    return (
        <div className="max-w-[1400px] mx-auto relative bg-background w-full h-full">
            <h1>Оформление заказа</h1>
            <div className="p-5">
                <div className="flex h-10 gap-3 justify-around">
                    <Button
                        className="flex gap-1"
                        size={"lg"}
                        onClick={() => setActivePath("cart")}
                    >
                        <ShoppingCart /> Ваши товары
                    </Button>
                    <div className="flex items-end h-full flex-grow">
                        <div className="border-t-2 border-dashed flex-grow h-1/2 border-primary"></div>
                    </div>
                    <Button
                        className="flex gap-1"
                        size={"lg"}
                        onClick={() => setActivePath("delivery")}
                    >
                        <Truck /> Доставка
                    </Button>
                    <div className="flex items-end h-full flex-grow">
                        <div className="border-t-2 border-dashed h-1/2 border-primary flex-grow"></div>
                    </div>
                    <Button
                        className="flex gap-1"
                        size={"lg"}
                        onClick={() => setActivePath("pay")}
                    >
                        <BadgeRussianRuble /> Оплата
                    </Button>
                    <div className="flex items-end h-full flex-grow">
                        <div className="border-t-2 border-dashed h-1/2 border-primary flex-grow"></div>
                    </div>
                    <Button
                        className="flex gap-1"
                        size={"lg"}
                        onClick={() => setActivePath("accept")}
                    >
                        <Check /> Подтверждение
                    </Button>
                </div>
            </div>
            {returnCheck()}
        </div>
    );
};
