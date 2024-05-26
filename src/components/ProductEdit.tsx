import { ProductService } from "@/service/product.service";
import  { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { IProduct } from "@/interfaces/product.interface";
import { Textarea } from "./ui/textarea";
import { Loader } from 'lucide-react'
import { categories } from '@/lib/utils'



export const ProductEdit = ({ product }: { product: IProduct }) => {
    const [productEdit, setProductEdit] = useState<IProduct>(product);
    const [file, setFile] = useState<File>();
    const [loading, setLoading] = useState<boolean>();

    async function editProduct() {
        if (productEdit) {
            if (file) {
                setLoading(true);
                await ProductService.update(productEdit, "products", file);
                window.location.reload();
            } else {
                setLoading(true);
                await ProductService.update(productEdit);
                window.location.reload();
            }
        }
    }

    return (
        <Card className="w-fit p-4 m-10 mx-20">
            <h1 className="text-center py-5 text-3xl font-extrabold">
                Изменение товара
            </h1>
            <div className="flex flex-col gap-5 p-5 items-center w-full">
                <div className="flex gap-2 items-center w-full flex-grow">
                    <p>Название</p>
                    <Input
                        defaultValue={productEdit.name}
                        type="text"
                        onChange={(e) =>
                            setProductEdit({
                                ...productEdit,
                                name: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="flex gap-2 w-full items-center">
                    Описание
                    <Textarea
                        defaultValue={productEdit.description}
                        onChange={(e) =>
                            setProductEdit({
                                ...productEdit,
                                description: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="flex gap-2 w-full items-center">
                    Стоимость
                    <Input
                        defaultValue={productEdit.price}
                        type="number"
                        onChange={(e) =>
                            setProductEdit({
                                ...productEdit,
                                price: Number(e.target.value),
                            })
                        }
                    />
                </div>
                <div className="flex gap-2 w-full items-center">
                    Категория
                    <Select
                        name=""
                        onValueChange={(e) =>
                            setProductEdit({
                                ...productEdit,
                                category: categories.find(
                                    (category) => category.id == Number(e)
                                )!,
                            })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue
                                className="flex-grow w-full"
                                placeholder={product.category.name}
                            ></SelectValue>
                        </SelectTrigger>
                        <SelectContent className="flex-grow">
                            <SelectItem value={"1"}>игрушка</SelectItem>
                            <SelectItem value={"2"}>капсула</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-2 items-center">
                    Картинка
                    <Input
                        type="file"
                        className="flex-grow"
                        onChange={(e) =>
                            e.target.files ? setFile(e.target.files[0]) : ""
                        }
                    />
                </div>
                <div className="flex items-center">
                    <Button onClick={() => editProduct()}>Изменить</Button>
                    {loading ? <Loader className='animate-spin'/> : <></>}
                </div>
            </div>
        </Card>
    );
};
