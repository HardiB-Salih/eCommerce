"use client";
import { formatter } from "@/lib/utils";
import React from "react";

interface CurrencyProps {
  value: string;
}

const Currency: React.FC<CurrencyProps> = ({ value }) => {
  const [isMounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return <div className="font-semibold">{formatter.format(Number(value))}</div>;
};

export default Currency;
