import { createFileRoute } from "@tanstack/react-router";
import { Admin } from "../components/pages/Admin";

type AdminPath = {
    activePath?: string;
};

export const Route = createFileRoute("/admin")({
    validateSearch: (search: Record<string, unknown>): AdminPath => {
        return {
            activePath: search.activePath as string || "products",
        };
    },
    component: Admin,
});
