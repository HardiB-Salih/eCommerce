import { format } from "date-fns";
import React from "react";
import BillboardClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { OrderColumn } from "./components/columns";

interface OrdersProps {
  params: { storeId: string };
}

const OrdersPage: React.FC<OrdersProps> = async ({ params }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItem: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => {
    return {
      id: item.id,
      phone: item.phone,
      address: item.adress,
      products: item.orderItem
        .map((orderItem) => orderItem.product.name)
        .join(", "),
      totalPrice: formatter.format(
        item.orderItem.reduce((total, item) => {
          return total + Number(item.product.price);
        }, 0)
      ),
      isPaid: item.isPaid,
      createAt: format(item.createAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
