import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IProduct } from "@/interfaces/product.interface";
import { API_URL } from "@/lib/api_url";
import { ProductService } from "@/service/product.service";
import { ProductCreate } from "./ProductCreate";
import { ProductEdit } from "./ProductEdit";
import { useState } from "react";
import { DiscountCreate } from "./DiscountCreate";

export const ProductList = ({ products }: { products: IProduct[] }) => {
    const [selected, setSelected] = useState<IProduct>();

    async function deleteProduct(id: number) {
        await ProductService.delete(id);
        window.location.reload();
    }

    function returnEdit() {
        if (selected) {
            return <ProductEdit product={selected} />;
        }
    }

    function returnDiscount() {
        if (selected) {
            return <DiscountCreate product={selected} />;
        }
    }

    return (
        <>
            <div className="flex gap5">
                <ProductCreate />
                {returnEdit()}
                {returnDiscount()}
            </div>
            <h1 className="text-center py-5 text-3xl font-extrabold">
                Товары
            </h1>
            <div className="mx-20 border-zinc-200 border-2">
                <ScrollArea className="h-[800px]">
                    <Table>
                        <TableHeader>
                            <TableRow className="text-center">
                                <TableHead className="text-center">
                                    Картинка
                                </TableHead>
                                <TableHead className="text-center">
                                    Название
                                </TableHead>
                                <TableHead className="text-center">
                                    Описание
                                </TableHead>
                                <TableHead className="text-center">
                                    Стоимость
                                </TableHead>
                                <TableHead className="text-center ">
                                    Управление
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {products
                                .sort((a, b) => a.id - b.id)
                                ?.map((product) => (
                                    <TableRow className="h-[300px]">
                                        <TableCell className="font-medium h-full p-0">
                                            <div
                                                className="w-full h-[200px] bg-contain bg-no-repeat bg-center rounded-lg"
                                                style={{
                                                    backgroundImage: `url(${API_URL}/${product.image})`,
                                                }}
                                            ></div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {product.name}
                                        </TableCell>
                                        <TableCell className="text-center w-52">
                                            {product.description}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {product.discount ? (
                                                <>
                                                    <p>
                                                        {
                                                            product.discount
                                                                .discount_value
                                                        }
                                                        %
                                                    </p>
                                                    <p className="line-through">
                                                        {product.price}
                                                    </p>
                                                </>
                                            ) : (
                                                <></>
                                            )}{" "}
                                            <p>
                                                {product.discount
                                                    ? Math.round(
                                                          Number(
                                                              product.price
                                                          ) /
                                                              (product.discount
                                                                  .discount_value /
                                                                  100 +
                                                                  1)
                                                      )
                                                    : product.price}{" "}
                                                {"р. "}
                                            </p>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Popover>
                                                <PopoverTrigger>
                                                    <Button variant={"default"}>
                                                        ...
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <div className="flex flex-col justify-center items-center gap-3">
                                                        <Button
                                                            variant={"outline"}
                                                            className="w-full"
                                                            onClick={() => {
                                                                setSelected(
                                                                    product
                                                                );
                                                            }}
                                                        >
                                                            НАСТРОИТЬ
                                                        </Button>
                                                        <Dialog>
                                                            <DialogTrigger>
                                                                <Button
                                                                    variant={
                                                                        "destructive"
                                                                    }
                                                                >
                                                                    Удалить
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>
                                                                        Подтвердить
                                                                        удаление
                                                                    </DialogTitle>
                                                                    <DialogDescription>
                                                                        Вы
                                                                        действительно
                                                                        хотите
                                                                        удалить
                                                                        товар{" "}
                                                                        {
                                                                            product.name
                                                                        }
                                                                        ?
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <DialogFooter>
                                                                    <DialogClose>
                                                                        Отмена
                                                                    </DialogClose>
                                                                    <Button
                                                                        variant={
                                                                            "default"
                                                                        }
                                                                        onClick={() =>
                                                                            deleteProduct(
                                                                                product.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Подтвердить
                                                                    </Button>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </div>
        </>
    );
};
