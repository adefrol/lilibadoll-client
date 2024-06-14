import { AlignLeft } from "lucide-react";
import { Sheet, SheetTrigger } from "./ui/sheet";

import { SideMenu } from "./SideMenu";

export const Header = ({ minWithFalse }: { minWithFalse?: boolean }) => {
    return (
        <div
            className={` ${minWithFalse ? "max-w-[1800px]" : "max-w-[1400px]"}  mx-auto relative bg-background w-full h-full`}
        >
            <div
                className={` ${minWithFalse ? "max-w-[1800px]" : "max-w-[1400px]"} p-2 fixed z-10 top-0 bg-white w-full`}
            >
                <div className="flex justify-between">
                    <div className="p-4">
                        <Sheet>
                            <SheetTrigger>
                                <AlignLeft className="hover:scale-105 active:scale-95 hover:text-red-950" />
                            </SheetTrigger>

                            <SideMenu />
                        </Sheet>
                    </div>
                </div>
            </div>
        </div>
    );
};
