import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import {
    IUser,
    IUserChangePass,

} from "@/interfaces/user.interface";

import { Loading } from "./Loading";

import { changePassword } from "@/service/pass.service";
import { useToast } from "./ui/use-toast";
import { toast } from "sonner";
import { UserService } from "@/service/user.service";
import { AxiosError } from "axios";
import { InputMask } from "@react-input/mask";

export const ProfileEdit = ({ user }: { user: IUser }) => {
    const [loading, setLoading] = useState<boolean>();

    const [changePass, setChangePass] = useState<IUserChangePass>({
        id: Number(user.id),
    });
    const [profileEdit, setProfileEdit] = useState<IUser>(user);

    const { toast: toaster } = useToast();

    async function handleEdit() {
        const data = await UserService.update(profileEdit).catch((e) => {
            const error = e as AxiosError;
            if (error.response?.status == 500) {
                toast("Произошла ошибка на сервере");
                return;
            }
        });
        if (data == 201) {
            window.location.reload();
        }
    }

    async function handleChange() {
        if (changePass.newPass) {
            if (changePass.newPass?.length < 8) {
                toaster({
                    variant: "destructive",
                    title: "Ошибка валидации",
                    description: "Пароль должен содержать минимум 8 символов",
                });
                return;
            }
        }
        setLoading(true);
        const data = await changePassword(changePass);
        if (data == 201) {
            setLoading(false);
        }
        if (data == 400) {
            setLoading(false);
            toaster({
                variant: "destructive",
                title: "Ошибка валидации",
                description: "Старый пароль несоответствует",
            });
        }
    }

    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Профиль</TabsTrigger>
                <TabsTrigger value="password">Пароль</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <Card>
                    <CardHeader>
                        <CardTitle>Профиль</CardTitle>
                        <CardDescription>
                            Вы можете изменить свой профиль. Изменения нужно
                            сохранить
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label>Имя</Label>
                            <Input
                                placeholder=""
                                defaultValue={user.name}
                                onChange={(e) =>
                                    setProfileEdit({
                                        ...profileEdit,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>E-mail</Label>
                            <Input
                                placeholder="example@example.com"
                                defaultValue={user.email}
                                onChange={(e) =>
                                    setProfileEdit({
                                        ...profileEdit,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Номер телефона</Label>
                            <InputMask
                                mask="+7 (___) ___-__-__"
                                replacement={{ _: /\d/ }}
                                className="flex h-10 w-full rounded-md border border-primary bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="+7 (111) 111-11-11"
                                defaultValue={user.phone}
                                onChange={(e) =>
                                    setProfileEdit({
                                        ...profileEdit,
                                        phone: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={() => handleEdit()}>Сохранить</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>Пароль</CardTitle>
                        <CardDescription>
                            Вы можете изменить свой пароль. Изменения нужно
                            сохранить.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Текущий пароль</Label>
                            <Input
                                onChange={(e) =>
                                    setChangePass({
                                        ...changePass,
                                        oldPass: e.target.value,
                                    })
                                }
                                id="current"
                                type="password"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">Новый пароль</Label>
                            <Input
                                onChange={(e) =>
                                    setChangePass({
                                        ...changePass,
                                        newPass: e.target.value,
                                    })
                                }
                                id="new"
                                type="password"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                        <Button onClick={() => handleChange()}>
                            Сохранить
                        </Button>
                        {loading ? <Loading /> : <></>}
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
};
