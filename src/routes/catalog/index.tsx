import { createFileRoute } from "@tanstack/react-router";
import { Catalog } from "../../components/pages/Catalog";

export type FilterType = {
    category?: string;
    nameSearch?: string;
    max?: number;
};

export const Route = createFileRoute("/catalog/")({
    validateSearch: (search: Record<string, unknown>): FilterType => {
        return {
            category: (search.category as string) || "Все",
            nameSearch: search.nameSearch as string,
            max: search.max as number
        };
    },
    component: Catalog,
});
