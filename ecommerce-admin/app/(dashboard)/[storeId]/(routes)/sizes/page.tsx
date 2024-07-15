import { format } from "date-fns";
import React from "react";
import SizeClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { SizeColumn } from "./components/columns";

interface SizesProps {
  params: { storeId: string };
}

const SizesPage: React.FC<SizesProps> = async ({ params }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => {
    return {
      id: item.id,
      name: item.name,
      value: item.value,
      createAt: format(item.createAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
