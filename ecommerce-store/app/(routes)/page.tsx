import React from "react";
import { Billboard as BillboardType } from "@/types";

import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import getBillboard from "@/actions/get-billboard";
import ProductList from "@/components/product-list";
import getProducts from "@/actions/get-products";

interface HomeProps {}

export const revalidate = 0;

const HomePage: React.FC<HomeProps> = async ({}) => {
  const products = await getProducts({ isFeatured: true });
  const billboard: BillboardType = await getBillboard(
    "0f4a5692-9693-4f1a-b073-61722a3d3aa4"
  );
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
