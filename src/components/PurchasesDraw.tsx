import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IPurchase, IStatusUpdate } from "@/interfaces/purchase.interface";
import { PurchaseService } from "@/service/purchase.service";
import { Loader } from "lucide-react";
import { useState } from "react";

export const PurchaseControl = ({ purchases }: { purchases: IPurchase[] }) => {
    const [statusUpdate, setStatusUpdate] = useState<IStatusUpdate>();

    const [loading, setLoading] = useState(false);

    async function updateStatus() {
        if (statusUpdate) {
            setLoading(true);
            await PurchaseService.updateStatus(statusUpdate);
            window.location.reload();
        }
    }

    return (
        <>
            <h1 className="text-center py-5 text-3xl font-extrabold">
                Оформленные заказы
            </h1>
            <div className="mx-20 border-2 border-zinc-200">
                <ScrollArea className="h-[700px]">
                    <Table>
                        <TableHeader>
                            <TableRow className="text-center">
                                <TableHead className="text-center">
                                    Номер заказа
                                </TableHead>
                                <TableHead className="text-center">
                                    Состав
                                </TableHead>
                                <TableHead className="text-center ">
                                    Доставка на адрес
                                </TableHead>
                                <TableHead className="text-center ">
                                    Тип оплаты
                                </TableHead>
                                <TableHead className="text-center ">
                                    Статус заказа
                                </TableHead>
                                <TableHead className="text-center ">
                                    Создан
                                </TableHead>
                                <TableHead className="text-center ">
                                    Управление
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {purchases?.map((purchase) => (
                                <TableRow className="text-center">
                                    <TableCell>{purchase.id}</TableCell>
                                    <TableCell>
                                        {purchase.purchaseDetails.map(
                                            (detail) => (
                                                <p>
                                                    {detail.product?.name} -
                                                    {detail.count}
                                                </p>
                                            )
                                        )}
                                    </TableCell>
                                    <TableCell>{purchase.address}</TableCell>
                                    <TableCell>{purchase.payType}</TableCell>
                                    <TableCell>{purchase.status}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            purchase.created_at
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger>
                                                <Button>Изменить статус</Button>
                                            </DialogTrigger>
                                            <DialogContent className="h-fit">
                                                <Select
                                                    onValueChange={(value) =>
                                                        setStatusUpdate({
                                                            id: purchase.id,
                                                            status: value,
                                                        })
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder={
                                                                purchase.status
                                                            }
                                                        ></SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="В обработке">
                                                            В обработке
                                                        </SelectItem>
                                                        <SelectItem value="Собирается">
                                                            Собирается
                                                        </SelectItem>
                                                        <SelectItem value="Передан в доставку">
                                                            Передан в доставку
                                                        </SelectItem>
                                                        <SelectItem value="Доставлен">
                                                            Доставлен
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <div className="flex items-center">
                                                    <Button
                                                        onClick={() =>
                                                            updateStatus()
                                                        }
                                                    >
                                                        Изменить
                                                    </Button>
                                                    {loading ? (
                                                        <Loader className="animate-spin" />
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
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
