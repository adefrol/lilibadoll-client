import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { INewDiscount } from "@/interfaces/discount.interface";
import { IProduct } from "@/interfaces/product.interface";
import { categories } from "@/lib/utils";
import { DiscountService } from "@/service/discount.service";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export const DiscountCreate = ({ product }: { product?: IProduct }) => {
    const [newDiscount, setNewDiscount] = useState<INewDiscount | null>(
        product
            ? { target: product.id, name: product.name, type: "one" }
            : { type: "category" }
    );

    const [loading, setLoading] = useState(false);

    async function handleCreate(e: React.SyntheticEvent) {
        e.preventDefault();

        try {
            if (newDiscount) {
                setLoading(true);
                const data = await DiscountService.create(newDiscount);
                if (data == 404) {
                    setLoading(false);
                    toast("Нет товаров для скидки");
                } else {
                    localStorage.removeItem("cart");
                    window.location.reload();
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    function selectedCategory() {
        return (
            <div className="flex gap-2 items-center">
                <p>Категория</p>
                <Select
                    onValueChange={(value) => {
                        setNewDiscount({
                            ...newDiscount,
                            target: Number(value),
                        });
                    }}
                    required
                >
                    <SelectTrigger>
                        <SelectValue placeholder={"Категории"}></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {categories?.map((category) => (
                            <SelectItem value={category.id.toString()}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        );
    }

    return (
        <div className="m-10 mx-20">
            <div>
                <form onSubmit={(e) => handleCreate(e)}>
                    <Card className="p-4">
                        <h1 className="text-center py-5 max-w-[300px] mx-auto text-3xl font-extrabold">
                            {product
                                ? "Создание скидки для " + product.name
                                : "Создание скидки"}
                        </h1>

                        <div className="flex flex-col gap-5 p-5  w-full flex-grow">
                            {product ? <></> : <>{selectedCategory()}</>}
                            <div className="flex gap-2 items-center flex-grow">
                                <p className="">Название</p>
                                <Input
                                    className="flex-grow"
                                    type="text"
                                    defaultValue={product ? product.name : ""}
                                    onChange={(e) => {
                                        setNewDiscount({
                                            ...newDiscount,
                                            name: e.target.value,
                                        });
                                    }}
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <p>Размер скидки(в процентах)</p>
                                <Input
                                    type="number"
                                    onChange={(e) => {
                                        setNewDiscount({
                                            ...newDiscount,
                                            discount_value: Number(
                                                e.target.value
                                            ),
                                        });
                                    }}
                                    max={100}
                                    min={0}
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <p>Когда истекает</p>
                                <Input
                                    type="datetime-local"
                                    onChange={(e) => {
                                        setNewDiscount({
                                            ...newDiscount,
                                            expired_at: e.target.value,
                                        });
                                    }}
                                    required
                                    min={new Date().toISOString().slice(0, -8)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Button type="submit">Создать</Button>
                            {loading ? (
                                <Loader className="animate-spin" />
                            ) : (
                                <></>
                            )}
                        </div>
                    </Card>
                </form>
            </div>
        </div>
    );
};
