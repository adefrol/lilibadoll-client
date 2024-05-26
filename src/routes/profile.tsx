import { Profile } from "@/components/pages/Profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
    /* beforeLoad: ({ location }) => {
        if (UserService.getToken() == null) {
            throw redirect({
                to: "/login",
                search: {
                    redirect: location.href,
                },
            });
        }
    }, */
    component: Profile,
});
