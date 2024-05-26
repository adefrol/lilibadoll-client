import { Login } from "@/components/pages/Login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
    /* beforeLoad: async () => {
        if (await UserService.isLogged()) {
            throw redirect({ to: "/" });
        }
    }, */
    validateSearch: (
        search: Record<string, unknown>
    ): { redirect?: string } => {
        return {
            redirect: search.redirect as string,
        };
    },
    component: Login,
});
