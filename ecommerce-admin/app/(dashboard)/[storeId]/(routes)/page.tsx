import prismadb from "@/lib/prismadb";
import React from "react";

interface dashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<dashboardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return <div>This is Dashboard Page {store?.name}</div>;
};

export default DashboardPage;
