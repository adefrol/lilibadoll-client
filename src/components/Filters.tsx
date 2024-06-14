import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { FilterType, Route } from "@/routes/catalog";
import { useNavigate } from "@tanstack/react-router";
import { useToast } from "./ui/use-toast";
import { DialogClose } from "./ui/dialog";

export const Filters = () => {
    const { toast: toaster } = useToast();

    const navigate = useNavigate({ from: Route.fullPath });
    const max = Number(localStorage.getItem("max"));
    const searchParams = Route.useSearch();
    const [filters, setFilters] = useState<FilterType>(searchParams);

    const [selectedMax, setSelectedMax] = useState<number>();

    const ref = useRef(null);

    useEffect(() => {
        setSelectedMax(Number(localStorage.getItem("selected-max")));
    }, [filters?.max]);

    function handleParams() {
        if (filters?.min && filters?.max) {
            if (filters?.min > filters?.max) {
                toaster({
                    variant: "destructive",
                    title: "Произошла ошибка!",
                    description:
                        "Минимальная цена не может превышать максимальную цену!",
                });
                return;
            }
        }
        if (searchParams.max && filters?.min) {
            if (filters?.min > searchParams.max) {
                toaster({
                    variant: "destructive",
                    title: "Произошла ошибка!",
                    description:
                        "Минимальная цена не может превышать максимальную цену!",
                });
                return;
            }
        }

        if (searchParams.min && filters?.max) {
            if (filters?.max < searchParams.min) {
                toaster({
                    variant: "destructive",
                    title: "Произошла ошибка!",
                    description:
                        "Максимальная цена не может быть меньше минимальной!",
                });
                return;
            }
        }

        navigate({
            search: {
                max: filters?.max,
                category: filters?.category,
                min: filters?.min,
            },
        });
        //@ts-ignore
        ref.current.click();
    }

    return (
        <div>
            <h1 className="text-2xl p-3 pl-0">Фильтры</h1>
            <div className="flex flex-col gap-4">
                <Input
                    type="number"
                    max={max}
                    defaultValue={
                        searchParams.max ? searchParams.max : undefined
                    }
                    placeholder="Максимальная цена"
                    onChange={(e) => {
                        localStorage.setItem("selected-max", e.target.value);
                        setFilters({
                            ...filters,
                            max: Number(e.target.value),
                        });
                    }}
                />
                <Input
                    type="number"
                    max={selectedMax}
                    defaultValue={
                        searchParams.min ? searchParams.min : undefined
                    }
                    placeholder="Минимальная цена"
                    onChange={(e) => {
                        localStorage.setItem("selected-min", e.target.value);
                        setFilters({
                            ...filters,
                            min: Number(e.target.value),
                        });
                    }}
                />
                <Select
                    onValueChange={(value) =>
                        setFilters({ ...filters, category: value })
                    }
                >
                    <SelectTrigger>
                        <SelectValue
                            placeholder={
                                searchParams.category
                                    ? searchParams.category
                                    : "Категория"
                            }
                        ></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Все">все</SelectItem>
                        <SelectItem value="Игрушка">игрушки</SelectItem>
                        <SelectItem value="Капсула">капсулы</SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex justify-between gap-4">
                    <Button
                        className="flex-grow"
                        onClick={() => handleParams()}
                    >
                        Применить
                    </Button>
                    <Button
                        className="flex-grow"
                        variant={"outline"}
                        onClick={() => {
                            navigate({
                                search: () => ({
                                    category: "Все",
                                    max: undefined,
                                }),
                            });
                            //@ts-ignore
                            ref.current.click();
                        }}
                    >
                        Очистить
                    </Button>
                    <DialogClose ref={ref}></DialogClose>
                </div>
            </div>
        </div>
    );
};
