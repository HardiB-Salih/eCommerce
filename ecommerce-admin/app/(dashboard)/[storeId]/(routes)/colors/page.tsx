import { format } from "date-fns";
import React from "react";
import ColorClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { ColorColumn } from "./components/columns";

interface ColorsProps {
  params: { storeId: string };
}

const ColorsPage: React.FC<ColorsProps> = async ({ params }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => {
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
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
