import { useEffect, useState } from "react";
import { OrderDraw } from "../OrderDraw";
import { OrderService } from "../../service/order.service";
import { Loading } from "../Loading";
import { Button } from "../ui/button";
import { Handshake, Percent, RussianRuble, ShoppingCart } from "lucide-react";
import { IProduct } from "@/interfaces/product.interface";
import { ProductList } from "../ProductsDraw";
import { ProductService } from "@/service/product.service";
import { DiscountControl } from "../DiscountDraw";
import { DiscountService } from "@/service/discount.service";
import { IDiscount } from "@/interfaces/discount.interface";
import { PurchaseService } from "@/service/purchase.service";
import { IPurchase } from "@/interfaces/purchase.interface";
import { PurchaseControl } from "../PurchasesDraw";
import { Route } from "@/routes/admin";
import { Header } from "../Header";

export const Admin = () => {
    const { activePath } = Route.useSearch();

    const navigate = Route.useNavigate();

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [discounts, setDiscounts] = useState<IDiscount[]>([]);
    const [purchases, setPurchases] = useState<IPurchase[]>([]);

    async function getOrders() {
        const data = await OrderService.getOrders();
        setOrders(data);
    }

    async function getPurchases() {
        setLoading(true);
        const data = (await PurchaseService.getAll()).sort(
            (a, b) => b.id - a.id
        );
        setPurchases(data);
        setLoading(false);
    }

    async function getProducts() {
        setLoading(true);
        const data = await ProductService.getAll();
        setProducts(data);
        setLoading(false);
    }

    async function getDiscounts() {
        setLoading(true);
        const data = await DiscountService.getAll();
        setDiscounts(data);
    }

    function returnOrders() {
        return <OrderDraw data={orders} />;
    }

    function returnDiscounts() {
        return <DiscountControl discounts={discounts} />;
    }
    function returnPurchases() {
        return <PurchaseControl purchases={purchases} />;
    }

    function returnProducts() {
        return (
            <>
                <ProductList products={products} />
            </>
        );
    }

    function returnCheck() {
        if (activePath == "orders") {
            return returnOrders();
        }
        if (activePath == "products") {
            return returnProducts();
        }
        if (activePath == "discount") {
            return returnDiscounts();
        }
        if (activePath == "purchases") {
            return returnPurchases();
        }
    }

    useEffect(() => {
        getOrders();
        getProducts();
        getDiscounts();
        getPurchases();
    }, []);

    useEffect(() => {
        returnCheck();
    }, [activePath]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Header minWithFalse />
                    {/* <OrderDraw data={orders} />
                    <ProductCreate /> */}
                    <div className="p-5 max-w-[1800px] mx-auto pt-20">
                        <div className="flex max-sm:flex-col h-10 gap-3 justify-around">
                            <Button
                                className="flex gap-1"
                                size={"lg"}
                                variant={
                                    activePath == "products"
                                        ? "default"
                                        : "secondary"
                                }
                                onClick={() =>
                                    navigate({
                                        search: { activePath: "products" },
                                    })
                                }
                            >
                                <ShoppingCart /> Управление товарами
                            </Button>
                            <div className="flex items-end h-full flex-grow">
                                <div className="border-t-2 border-dashed flex-grow h-1/2 border-primary"></div>
                            </div>
                            <Button
                                className="flex gap-1"
                                size={"lg"}
                                variant={
                                    activePath == "discount"
                                        ? "default"
                                        : "secondary"
                                }
                                onClick={() =>
                                    navigate({
                                        search: { activePath: "discount" },
                                    })
                                }
                            >
                                <Percent /> Управление скидками
                            </Button>
                            <div className="flex items-end h-full flex-grow">
                                <div className="border-t-2 border-dashed h-1/2 border-primary flex-grow"></div>
                            </div>
                            <Button
                                className="flex gap-1"
                                size={"lg"}
                                variant={
                                    activePath == "orders"
                                        ? "default"
                                        : "secondary"
                                }
                                onClick={() =>
                                    navigate({
                                        search: { activePath: "orders" },
                                    })
                                }
                            >
                                <Handshake /> Заказы на ручную работу
                            </Button>
                            <div className="flex items-end h-full flex-grow">
                                <div className="border-t-2 border-dashed h-1/2 border-primary flex-grow"></div>
                            </div>
                            <Button
                                className="flex gap-1"
                                size={"lg"}
                                variant={
                                    activePath == "purchases"
                                        ? "default"
                                        : "secondary"
                                }
                                onClick={() =>
                                    navigate({
                                        search: { activePath: "purchases" },
                                    })
                                }
                            >
                                <RussianRuble /> Продажи
                            </Button>
                        </div>
                    </div>
                    <div className="max-w-[1800px] mx-auto">
                        {returnCheck()}
                    </div>
                </>
            )}
        </>
    );
};
