import { IUser } from "@/interfaces/user.interface";
import { AuthLogged } from "@/providers/auth";
import { Route } from "@/routes/login";
import { UserService } from "@/service/user.service";
import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { Header } from "../Header";

export const Login = () => {
    const [loginData, setLoginData] = useState<IUser>({
        email: "",
        password: "",
    });

    const searchParams = Route.useSearch();

    const navigate = Route.useNavigate();

    const [error, setError] = useState<string>();

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        const data = await UserService.login(loginData);
        console.log(data);

        if (data?.status == 200) {
            console.log("ok");

            if (searchParams?.redirect) {
                navigate({ to: searchParams.redirect });
            } else {
                navigate({ to: "/" });
            }
        }
        if (data?.status == 401) {
            setError("Неправильный логин или пароль");
        }
    }

    return (
        <AuthLogged deAuth>
            <Header />
            <div className="flex justify-center items-center h-[90svh]">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Card className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl">Вход</CardTitle>
                            <CardDescription>
                                Введите данные для входа в профиль
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="flex items-center  gap-2">
                                <p className="w-20">E-mail</p>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    onChange={(e) =>
                                        setLoginData({
                                            ...loginData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="w-20">Пароль</p>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    onChange={(e) =>
                                        setLoginData({
                                            ...loginData,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            {error ? (
                                <p className="text-destructive">{error}</p>
                            ) : (
                                <></>
                            )}
                        </CardContent>
                        <CardFooter className="flex flex-col">
                            <Button className="w-full" type="submit">
                                Войти
                            </Button>
                            <div className="mt-4 text-center text-sm">
                                Нет аккаунта?{" "}
                                <Link
                                    to="/register"
                                    className="text-primary underline"
                                >
                                    Зарегистрироваться
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthLogged>
    );
};
