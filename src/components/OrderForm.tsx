import { Loader } from "lucide-react";
import { useState } from "react";
import { IOrder, IOrderPost } from "../interfaces/order.interface";
import { OrderService } from "../service/order.service";
import { API_URL } from "@/lib/api_url";

export const OrderForm = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    const [loading, setLoading] = useState(false);

    const [okData, setOkData] = useState<IOrderPost>();
    const orderData: IOrder = {
        name: name,
        last_name: lastName,
        email: email,
        phone: phone,
        address: address,
        message: message,
        type_order: type,
    };
    const [file, setFile] = useState<File>();

    const create = async () => {
        setLoading(true);
        if (file) {
            setOkData(await OrderService.create(orderData, "orders", file));
        } else {
            setOkData(await OrderService.create(orderData));
        }
        setLoading(false);
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        await create();
    }

    return (
        <>
            <form action="" onSubmit={(e) => handleSubmit(e)}>
                <div className="py-9" id="order">
                    <h1 className="text-primarytext text-center font-extrabold py-5 text-4xl">
                        Оформление заявки по индивидуальному дизайну
                    </h1>
                    <h1 className="text-primarytext text-center py-3 text-3xl">
                        Пожалуйста,выберите категорию изделия
                    </h1>
                    <div className="flex justify-around px-40 py-6">
                        <a href="#contact">
                            <div
                                style={{
                                    backgroundImage: `url(${API_URL}/select-2.png)`,
                                }}
                                onClick={() => setType("игрушки")}
                                className={`${
                                    type === "игрушки"
                                        ? "border-4 rounded-[50px] border-slate-500"
                                        : ""
                                } bg-select-2 transition-all  hover:scale-105 active:scale-95 bg-cover w-[337px] h-[391px] flex items-center justify-center`}
                            >
                                <p className="text-5xl text-primarytext font-extrabold">
                                    игрушки
                                </p>
                            </div>
                        </a>
                        <a href="#contact">
                            <div
                                style={{
                                    backgroundImage: `url(${API_URL}/select-1.png)`,
                                }}
                                onClick={() => setType("капсулы")}
                                className={`${
                                    type === "капсулы"
                                        ? "border-4 rounded-[50px] border-slate-500"
                                        : ""
                                } bg-select-1 transition-all hover:scale-105 active:scale-95 bg-cover w-[337px] h-[391px] flex items-center justify-center`}
                            >
                                <p className="text-5xl text-primarytext font-extrabold">
                                    капсулы
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="py-9 mx-auto bg-gradient-30  bg-bottom bg-[length:1400px_1050px] rounded-t-[80px]" style={{backgroundImage: `url(${API_URL}/gradient-bg-30.jpg)`,}}>
                    {okData?.status == 200 ? (
                        <div className="py-40 flex justify-center items-center font-extrabold text-4xl text-primarytext">
                            Заявка оформлена
                        </div>
                    ) : (
                        <>
                            <h1
                                className="text-primarytext text-center font-extrabold py-5 text-3xl w-[500px] mx-auto"
                                id="contact"
                            >
                                Оставьте заявку и наш специалист свяжется с вами
                                в ближайшее время
                            </h1>
                            <div className="py-10">
                                <div className="flex items-center justify-center py-2">
                                    <p className=" w-[150px]">Имя</p>
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                        className="rounded-3xl py-3 px-8 w-[500px] border-[1px] bg-gradient-to-br from-white to-[#efeded9b]"
                                        placeholder="Имя"
                                    />
                                </div>
                                <div className="flex items-center justify-center py-2">
                                    <p className=" w-[150px]">Фамилия</p>
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        required
                                        className="rounded-3xl py-3 px-8 w-[500px] border-[1px] bg-gradient-to-br from-white to-[#efeded9b]"
                                        placeholder="Фамилия"
                                    />
                                </div>
                                <div className="flex items-center justify-center py-2">
                                    <p className="w-[150px]">E-mail</p>
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                        className="rounded-3xl py-3 px-8 w-[500px] border-[1px] bg-gradient-to-br from-white to-[#efeded9b]"
                                        placeholder="Электронная почта"
                                    />
                                </div>
                                <div className="flex items-center justify-center py-2">
                                    <p className="w-[150px]">Номер телефона</p>
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                        required
                                        className="rounded-3xl py-3 px-8 w-[500px] border-[1px] bg-gradient-to-br from-white to-[#efeded9b]"
                                        placeholder="+7 999 999 99 99"
                                    />
                                </div>
                                <div className="flex items-center justify-center py-2">
                                    <p className="w-[150px]">Адрес</p>
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                        required
                                        className="rounded-3xl py-3 px-8 w-[500px] border-[1px] bg-gradient-to-br from-white to-[#efeded9b]"
                                        placeholder="Адрес"
                                    />
                                </div>
                                <div className="flex items-center justify-center py-2">
                                    <p className="w-[150px]">Описание</p>
                                    <textarea
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                        required
                                        rows={10}
                                        className="resize-none rounded-3xl py-3 px-8 w-[500px] border-[1px] bg-gradient-to-br from-white to-[#efeded9b]"
                                        placeholder="Опишите свой дизайн изделия и/или прикрепите изображение"
                                    />
                                </div>
                                <div className="flex items-center justify-center py-2">
                                    <p className="text-center px-6 w-[250px]">
                                        Прикрепить файл
                                    </p>
                                    <input
                                        type="file"
                                        className=" rounded-3xl py-3 px-8 w-[500px] border-[1px] bg-gradient-to-br from-white to-[#efeded9b]"
                                        placeholder="Опишите свой дизайн изделия и/или прикрепите изображение"
                                        onChange={(e) => {
                                            e.target.files
                                                ? setFile(e.target.files[0])
                                                : "";
                                        }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="text-center font-extrabold px-8 rounded-3xl py-3 border-[1px] transition-all hover:scale-105 active:scale-95 bg-[#f5f5f5] block mx-auto my-6"
                                >
                                    отправить
                                </button>
                                {loading ? (
                                    <Loader className="animate-spin mx-auto" />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </form>
        </>
    );
};
