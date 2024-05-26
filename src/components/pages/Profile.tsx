import  { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Purchase } from "../Purchases";
import { Input } from "../ui/input";
import { UserService } from "@/service/user.service";
import { IUserPurchases } from "@/interfaces/user.interface";

import { Loading } from "../Loading";
import { Route } from '@/routes/profile'
import { Button } from '../ui/button'

export const Profile = () => {
    const [profile, setProfile] = useState<IUserPurchases>();
    const [loading, setLoading] = useState(false);

    const navigate = Route.useNavigate()

    async function getProfileAndPurchases() {
        setLoading(true);
        const data = await UserService.getPurchases();
        setProfile(data);
        setLoading(false);
    }

    useEffect(() => {
        if(UserService.getToken() == null) {
            navigate({to: '/login'})
        } 
        getProfileAndPurchases();
    }, []);

    return (
        <>
            <div className="max-w-[1500px] py-10 w-full mx-auto">
                {loading ? (
                    <Loading />
                ) : (
                    <   >
                        <Card>
                            <CardHeader className='flex  gap-2'>
                                <h1 className="font-bold text-3xl">
                                    Ваш профиль
                                </h1>
                                <Button onClick={() => {
                                    UserService.deleteToken()
                                    navigate({ to: '/catalog'})
                                }}>Выйти</Button>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-4">
                                    <div className="flex gap-2">
                                        <p>Имя</p>
                                        <Input
                                            defaultValue={profile?.name}
                                            readOnly
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <p>Email</p>
                                        <Input
                                            defaultValue={profile?.email}
                                            readOnly
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <p>Пароль</p>
                                        <Input
                                            type="password"
                                            defaultValue={profile?.password}
                                            readOnly
                                        />
                                    </div>
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
