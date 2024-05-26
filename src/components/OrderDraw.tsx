import { DialogTrigger } from "@radix-ui/react-dialog";
import { IOrder } from "../interfaces/order.interface";
import { Dialog, DialogContent } from "./ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { API_URL } from '@/lib/api_url'

export const OrderDraw = ({ data }: { data: IOrder[] }) => {

    return (
        <>
            <div className="">
                <h1 className="text-center py-5 text-3xl font-extrabold">
                    Оформленные заявки
                </h1>
                <div className="mx-20 border border-zinc-200">
                    <ScrollArea className="h-96">
                        <Table className="">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Имя</TableHead>
                                    <TableHead>EMail</TableHead>
                                    <TableHead>Телефон</TableHead>
                                    <TableHead>Описание</TableHead>
                                    <TableHead>Категория</TableHead>
                                    <TableHead>Дата</TableHead>
                                    <TableHead>Картинка</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {data.map((order) => (
                                    <TableRow>
                                        <TableCell>
                                            {order.name + " " + order.last_name}
                                        </TableCell>
                                        <TableCell>{order.email}</TableCell>
                                        <TableCell>{order.phone}</TableCell>
                                        <TableCell>
                                            {
                                                <Dialog>
                                                    <DialogTrigger>
                                                        <Button
                                                            variant={"outline"}
                                                        >
                                                            Показать описание
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <div className="flex justify-center">
                                                            <p>
                                                                {order.message}
                                                            </p>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {order.type_order}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                order.created_at!
                                            ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            {order.image ? (
                                                <Dialog>
                                                    <DialogTrigger>
                                                        <Button
                                                            variant={"outline"}
                                                        >
                                                            Показать пример
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <div className="flex justify-center">
                                                            <img
                                                                src={`${API_URL}/${order.image}`}
                                                                alt=""
                                                                className="w-[300px]"
                                                            />
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            ) : (
                                                <>-</>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </div>
            </div>
        </>
    );
};
