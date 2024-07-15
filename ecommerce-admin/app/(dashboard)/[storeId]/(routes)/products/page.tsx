import { format } from "date-fns";
import React from "react";
import BillboardClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { BillboardColumn } from "./components/columns";

interface BillboardsProps {
  params: { storeId: string };
}

const BillboardsPage: React.FC<BillboardsProps> = async ({ params }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => {
    return {
      id: item.id,
      label: item.label,
      createAt: format(item.createAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
