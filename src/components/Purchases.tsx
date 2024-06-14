import { Card, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IUserPurchases } from "@/interfaces/user.interface";

export const Purchase = ({ profile }: { profile: IUserPurchases }) => {

    return (
        <Card className="">
            <CardHeader className="text-3xl font-bold flex flex-row items-center justify-center gap-4">
                <p>Мои заказы</p>
                
            </CardHeader>
            <ScrollArea className="h-[390px] pb-10">
                <Table>
                    <TableHeader>
                        <TableRow className="">
                            <TableHead className="">Номер заказа</TableHead>
                            <TableHead>Состав</TableHead>
                            <TableHead>Доставка на адрес</TableHead>
                            <TableHead>Тип оплаты</TableHead>
                            <TableHead>Статус заказа</TableHead>
                            <TableHead>Создан</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {profile.purchases?.map((purchase) => (
                            <TableRow className="">
                                <TableCell>{purchase.id}</TableCell>
                                <TableCell>
                                    {purchase.purchaseDetails.map((detail) => (
                                        <p>
                                            {detail.product?.name} -{" "}
                                            {detail.count} шт.
                                        </p>
                                    ))}
                                </TableCell>
                                <TableCell>{purchase.address}</TableCell>
                                <TableCell>{purchase.payType}</TableCell>
                                <TableCell>{purchase.status}</TableCell>
                                <TableCell>
                                    {new Date(
                                        purchase.created_at
                                    ).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </Card>
    );
};
