import { Link } from "@tanstack/react-router";
import { API_URL } from "../lib/api_url";

export const DealHeadling = () => {
    return (
        <div className="w-[80%] bg-black/20 rounded-[50px] my-5 h-[150px] mx-auto">
            <div className="flex justify-around items-center h-full">
                <div className="w-[185px] h-[100px]">
                    {/* <Logo /> */}
                    <img src={`${API_URL}/logo.png`} alt="" />
                </div>
                <p className="text-xl">Создание индивидуального дизайна</p>
                <a href="#order">
                    <div className="w-60 text-center p-2 rounded-3xl bg-white transition-all  hover:scale-105 active:scale-95">
                        оформить заявку
                    </div>
                </a>
                <Link to='/catalog'>
                    <div className="w-60 text-center p-2 rounded-3xl bg-white transition-all  hover:scale-105 active:scale-95">
                        каталог
                    </div>
                </Link>
            </div>
        </div>
    );
};
