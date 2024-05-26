import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { IDiscount } from "@/interfaces/discount.interface";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { DiscountService } from "@/service/discount.service";
import { DiscountCreate } from "./DiscountCreate";

export const DiscountControl = ({
    discounts,
}: {
    discounts: IDiscount[] | null;
}) => {
    /* const [loading, setLoading] = useState<boolean>(false); */

    async function deleteDiscount(id: number) {
        await DiscountService.delete(id);
        window.location.reload();
    }

    return (
        <>
            <div className="w-[50svw] max-w-[50svw]">
                <DiscountCreate />
            </div>
            <h1 className="text-center py-5 text-3xl font-extrabold">Скидки</h1>
            <div className="mx-20 border-2 border-zinc-200">
                <ScrollArea className="h-[700px]">
                    <Table>
                        <TableCaption>Все скидки</TableCaption>
                        <TableHeader>
                            <TableRow className="text-center">
                                <TableHead className="text-center">
                                    Название
                                </TableHead>
                                <TableHead className="text-center">
                                    Истечёт
                                </TableHead>

                                <TableHead className="text-center ">
                                    Размер скидки
                                </TableHead>
                                <TableHead className="text-center ">
                                    Управление
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {discounts?.map((discount) => (
                                <TableRow key={discount.id} className="">
                                    <TableCell className="font-medium text-center h-full">
                                        <p>{discount.name}</p>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {new Date(
                                            discount.expired_at
                                        ).toLocaleDateString() +
                                            " " +
                                            new Date(
                                                discount.expired_at
                                            ).toLocaleTimeString()}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {discount.discount_value}%
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Dialog>
                                            <DialogTrigger>
                                                <Button variant={"destructive"}>
                                                    Удалить
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogHeader>
                                                        Подтвердить удаление
                                                    </DialogHeader>
                                                    <DialogDescription>
                                                        Вы действительно хотите
                                                        баннер?
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <DialogClose>
                                                        Отмена
                                                    </DialogClose>
                                                    <Button
                                                        variant={"default"}
                                                        onClick={() =>
                                                            deleteDiscount(
                                                                discount.id
                                                            )
                                                        }
                                                    >
                                                        Подтвердить
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </div>
        </>
    );
};
