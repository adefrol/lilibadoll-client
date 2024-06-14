import { createFileRoute } from "@tanstack/react-router";
import {  Instagram, Twitter } from "lucide-react";
import { DealHeadling } from "../components/DealHeadling";
import { OrderForm } from "../components/OrderForm";
import { API_URL } from "../lib/api_url";
import { Header } from '@/components/Header'

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <>
        <Header/>
            <div className="max-w-[1400px] mx-auto  w-full h-full pt-14">
                <div
                    className="bg-gradient123 bg-cover bg-opacity-80 w-full py-9"
                    style={{
                        backgroundImage: `url(${API_URL}/gradient-bg.webp)`,
                    }}
                >
                    <DealHeadling />
                </div>
                <div
                    className="bg-gradient-30 bg-cover bg-right rounded-b-[80px] py-2"
                    style={{
                        backgroundImage: `url(${API_URL}/gradient-bg-30.jpg)`,
                    }}
                >
                    <div className="max-w-[1200px] mx-auto w-full h-full">
                        <h1 className="text-primarytext text-center font-extrabold py-5 text-4xl">
                            Почему стоит выбрать Lilibadoll
                        </h1>
                        <div className="flex gap-10 items-center justify-around px-10 py-4 ">
                            <div className="w-[500px]">
                                <p className="text-xl">
                                    Наши игрушки из плюша — нежный и безопасный
                                    материал. Используемая акриловая краска для
                                    3D моделей: обладает яркими цветами и
                                    безопасностью для детей.
                                </p>
                            </div>
                            <div className="w-[180px]">
                                <img
                                    src={`${API_URL}/about-image-1.png`}
                                    alt=""
                                />
                            </div>
                            <div className="w-[180px]">
                                <img
                                    src={`${API_URL}/about-image-2.png`}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="flex gap-10 items-center justify-around px-10 py-4 ">
                            <div className="w-[500px]">
                                <p className="text-xl">
                                    Ручные изделия могут быть отправлены в любой
                                    уголок мира,используемая нами оплата через
                                    мобильный банк удобна и безопасна.
                                </p>
                            </div>
                            <div className="w-[180px]">
                                <img
                                    src={`${API_URL}/about-image-3.png`}
                                    alt=""
                                />
                            </div>
                            <div className="w-[180px]">
                                <img
                                    src={`${API_URL}/about-image-4.png`}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="flex gap-10 items-center justify-around px-10 py-4 ">
                            <div className="w-[500px]">
                                <p className="text-xl">
                                    Вы имеете возможность создать уникальный
                                    дизайн для игрушек и капсул по своему вкусу
                                    и предпочтениям.
                                </p>
                            </div>
                            <div className="w-[180px]">
                                <img
                                    src={`${API_URL}/about-image-5.png`}
                                    alt=""
                                />
                            </div>
                            <div className="w-[180px]">
                                <img
                                    src={`${API_URL}/about-image-6.png`}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-9">
                    <div className="max-w-[1200px] mx-auto w-full h-full">
                        <h1 className="text-primarytext text-center font-extrabold py-5 text-4xl">
                            Примеры работ
                        </h1>
                        <div className="flex items-center justify-around">
                            
                            <img src={`${API_URL}/example-2.png`} alt="" />
                            <img src={`${API_URL}/example-1.png`} alt="" />
                            <img src={`${API_URL}/example-3.png`} alt="" />
                            
                        </div>
                        <p className="text-primarytext text-center text-xl py-1">
                            Примечание! Дизайн изделия создается по определенной
                            стилистике представленных работ
                        </p>
                    </div>
                </div>
                <OrderForm />

                <div className="py-9 w-full h-[50px] bg-[#4a394d] flex items-center justify-center gap-5 font-extrabold text-[#f5f5f5]">
                    <Instagram />
                    <Twitter />
                    LIlIbadoll &copy;
                </div>
            </div>
        </>
    );
}
