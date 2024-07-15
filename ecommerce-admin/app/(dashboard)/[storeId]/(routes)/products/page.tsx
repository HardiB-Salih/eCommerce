import { format } from "date-fns";
import React from "react";
import ProductClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { ProductColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

interface ProductsProps {
  params: { storeId: string };
}

const ProductsPage: React.FC<ProductsProps> = async ({ params }) => {
  const produncts = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = produncts.map((item) => {
    return {
      id: item.id,
      name: item.name,
      isFeatured: item.isFeatured,
      isArchived: item.isArchived,
      price: formatter.format(item.price.toNumber()),
      category: item.category.name,
      size: item.size.name,
      color: item.color.value,
      createAt: format(item.createAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
