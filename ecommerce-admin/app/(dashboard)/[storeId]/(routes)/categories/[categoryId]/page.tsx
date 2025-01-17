import prismadb from "@/lib/prismadb";
import React from "react";
import CatogeryForm from "./components/catogery-form";

interface CategoryPageProps {
  params: { categoryId: string; storeId: string };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CatogeryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
