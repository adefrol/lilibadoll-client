import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { UserService } from "@/service/user.service";
import { IUser, IUserErrors } from "@/interfaces/user.interface";
import { Route } from "@/routes/register";
import { InputMask } from "@react-input/mask";
import { Header } from "../Header";

const ValidateInput = ({
    htmlFor,
    placeholder,
    name,
    error,
    type,
    mask,
    onChange,
}: {
    htmlFor: string;
    placeholder: string;
    name: string;
    error: any;
    mask?: boolean;
    type: React.HTMLInputTypeAttribute;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
    if (mask) {
        return (
            <div className="flex items-center gap-2">
                <p className={`${error ? "text-red-500 w-32" : "w-32"} `}>
                    {error ? error : name}
                </p>
                <InputMask
                    type={type}
                    id={htmlFor}
                    placeholder={placeholder}
                    required
                    mask="+7 (___) ___-__-__"
                    replacement={{ _: /\d/ }}
                    onChange={onChange}
                    className={`${error ? "border-[1px] border-red-500" : ""} flex h-10 w-full rounded-md border border-primary bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                />
            </div>
        );
    } else {
        return (
            <div className="flex items-center gap-2">
                <p className={`${error ? "text-red-500 w-32" : "w-32"}`}>
                    {error ? error : name}
                </p>
                <Input
                    type={type}
                    id={htmlFor}
                    placeholder={placeholder}
                    required
                    onChange={onChange}
                    className={`${error ? "border-[1px] border-red-500" : ""}`}
                />
            </div>
        );
    }
};

export const Register = () => {
    const validEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    const navigate = Route.useNavigate();

    const [newUser, setNewUser] = useState<IUser>({
        email: "",
        name: "",
        password: "",
        phone: "",
    });

    const [errors, setErrors] = useState<IUserErrors>();
    const [emailError, setEmailError] = useState<string | undefined>();
    function validateEmail() {
        if (!validEmail.test(newUser.email)) {
            console.log(123);

            setEmailError("Email несоответствует");
            return false;
        }
        return true;
    }
    function validatePassword() {
        if (newUser.password.length < 8) {
            setErrors({
                ...errors,
                password: "Мин. 8 символов",
            });
            return false;
        }
        return true;
    }

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        setErrors({});
        setEmailError("");
        if (validateEmail() && validatePassword()) {
            const data = await UserService.register(newUser);
            if (data == 200) {
                navigate({ to: "/login" });
            }
            if (data == 409) {
                console.log("conflict", data);
            }
        } else {
            return;
        }
    }

    return (
        <>
            <Header />
            <div className="flex justify-center items-center h-[90svh]">
                {/* <Link to="/catalog" className="text-center w-full">На главную</Link> */}
                <form onSubmit={async (e) => await handleSubmit(e)}>
                    <Card className="mx-auto min-w-3xl w-[600px]">
                        <CardHeader>
                            <CardTitle className="text-xl">
                                Регистрация
                            </CardTitle>
                            <CardDescription>
                                Введите данные для создания профиля
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid col-span-2">
                                        <ValidateInput
                                            htmlFor="name"
                                            name="ФИО"
                                            type="text"
                                            error={undefined}
                                            placeholder="Иванов Иван"
                                            onChange={(e) =>
                                                setNewUser({
                                                    ...newUser,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <ValidateInput
                                        htmlFor="email"
                                        name="E-mail"
                                        error={
                                            emailError ? emailError : undefined
                                        }
                                        type="email"
                                        placeholder="example@example.ru"
                                        onChange={(e) =>
                                            setNewUser({
                                                ...newUser,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <ValidateInput
                                        htmlFor="phone"
                                        name="Номер телефона"
                                        error={undefined}
                                        type="tel"
                                        mask={true}
                                        placeholder="+79999999999"
                                        onChange={(e) =>
                                            setNewUser({
                                                ...newUser,
                                                phone: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <ValidateInput
                                        htmlFor="phone"
                                        name="Пароль"
                                        error={
                                            errors?.password
                                                ? errors.password
                                                : undefined
                                        }
                                        type="password"
                                        placeholder=""
                                        onChange={(e) =>
                                            setNewUser({
                                                ...newUser,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Зарегистрироваться
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Уже зарегистрированы?{" "}
                                <Link to="/login" className="underline">
                                    Войти
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </>
    );
};
