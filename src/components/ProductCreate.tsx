import { useState } from "react";
import { IProductCreate } from "../interfaces/product.interface";
import { ProductService } from "../service/product.service";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";

export const ProductCreate = () => {
    const [newProduct, setNewProduct] = useState<IProductCreate>();
    const [file, setFile] = useState<File>();
    const [loading, setLoading] = useState<boolean>();

    async function createProduct() {
        if (file && newProduct) {
            setLoading(true);
            await ProductService.create(newProduct, "products", file);
            window.location.reload();
        } else {
            toast("Выберите файл");
        }
    }

    return (
        <Card className="w-fit p-4 m-10 mx-20">
            <h1 className="text-center py-5 text-3xl font-extrabold">
                Создание товара
            </h1>
            <div className="flex flex-col gap-5 p-5 items-center w-full">
                <div className="flex gap-2 items-center w-full flex-grow">
                    <p>Название</p>
                    <Input
                        type="text"
                        onChange={(e) =>
                            setNewProduct({
                                ...newProduct,
                                name: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="flex gap-2 w-full items-center">
                    Описание
                    <Textarea
                        onChange={(e) =>
                            setNewProduct({
                                ...newProduct,
                                description: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="flex gap-2 w-full items-center">
                    Стоимость
                    <Input
                        type="number"
                        onChange={(e) =>
                            setNewProduct({
                                ...newProduct,
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
                            setNewProduct({
                                ...newProduct,
                                category: Number(e),
                            })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue
                                className="flex-grow w-full"
                                placeholder="категория"
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
                    <Button onClick={() => createProduct()}>Создать</Button>
                    {loading ? <Loader className="animate-spin" /> : <></>}
                </div>
            </div>
        </Card>
    );
};
