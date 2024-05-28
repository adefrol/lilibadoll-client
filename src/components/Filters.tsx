import { useState } from "react";
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

export const Filters = () => {
    const navigate = useNavigate({ from: Route.fullPath });
    const max = Number(localStorage.getItem("max"));

    const [filters, setFilters] = useState<FilterType>();

    function handleParams() {
        navigate({
            search: { max: filters?.max, category: filters?.category },
        });
    }

    return (
        <div>
            <h1 className="text-2xl p-3 pl-0">Фильтры</h1>
            <div className="flex flex-col gap-2">
                <Input
                    type="number"
                    max={max}
                    placeholder="Максимальная цена"
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            max: Number(e.target.value),
                        })
                    }
                />
                <Select
                    onValueChange={(value) =>
                        setFilters({ ...filters, category: value })
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder={"Категория"}></SelectValue>
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
                        onClick={() =>
                            navigate({
                                search: () => ({
                                    category: "Все",
                                    max: undefined,
                                }),
                            })
                        }
                    >
                        Очистить
                    </Button>
                </div>
            </div>
        </div>
    );
};
