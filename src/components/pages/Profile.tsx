import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Purchase } from "../Purchases";

import { UserService } from "@/service/user.service";
import { IUserPurchases } from "@/interfaces/user.interface";

import { Loading } from "../Loading";
import { Route } from "@/routes/profile";
import { Button } from "../ui/button";

import { ProfileEdit } from "../ProfileEdit";
import { Header } from "../Header";

export const Profile = () => {
    const [profile, setProfile] = useState<IUserPurchases>();
    const [loading, setLoading] = useState(false);

    const navigate = Route.useNavigate();

    async function getProfileAndPurchases() {
        setLoading(true);
        const data = await UserService.getPurchases();
        setProfile(data);
        setLoading(false);
    }

    useEffect(() => {
        if (UserService.getToken() == null) {
            navigate({ to: "/login" });
        }
        getProfileAndPurchases();
    }, []);

    if (profile)
        return (
            <>
                <Header />
                <div className="max-w-[1500px] py-20 w-full mx-auto">
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <Card>
                                <CardHeader className="flex flex-row justify-center items-center  gap-2">
                                    <h1 className="font-bold text-center text-3xl">
                                        Ваш профиль
                                    </h1>
                                    <Button
                                        onClick={() => {
                                            UserService.deleteToken();
                                            navigate({ to: "/catalog" });
                                        }}
                                    >
                                        Выйти
                                    </Button>
                                </CardHeader>
                                <CardContent className="flex gap-2">
                                    <ProfileEdit user={profile!} />
                                    <div className="flex flex-col gap-4">
                                        {profile ? (
                                            <Purchase profile={profile} />
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>
            </>
        );
};
