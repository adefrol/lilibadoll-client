import { Link } from "@tanstack/react-router";
import { SheetContent, SheetDescription, SheetHeader } from "./ui/sheet";
import { API_URL } from "@/lib/api_url";

export const SideMenu = () => {
    return (
        <>
            <SheetContent side={"left"}>
                <SheetHeader>
                    <Link to="/">
                        <div className="w-[185px] h-[100px]">
                            {/* <Logo /> */}
                            <img src={`${API_URL}/logo.png`} alt="" />
                        </div>
                    </Link>
                </SheetHeader>

                <SheetDescription className="px-4 py-10 flex flex-col gap-2">
                    <Link to="/" className="text-2xl text-primary">
                        Главная страница
                    </Link>
                    <Link to="/catalog" className="text-2xl text-primary">
                        Каталог
                    </Link>
                    <Link to="/profile" className="text-2xl text-primary">
                        Профиль
                    </Link>
                </SheetDescription>
            </SheetContent>
        </>
    );
};
