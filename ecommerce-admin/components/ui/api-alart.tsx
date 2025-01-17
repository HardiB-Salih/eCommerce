"use client";

import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";

interface ApiAlartProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlartProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlartProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export default function ApiAlart({
  title,
  description,
  variant = "public",
}: ApiAlartProps) {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API Route copird to the clipboard");
  };

  return (
    <Alert>
      <Server className="h-4 w-4 mt-[3px]" />
      <AlertTitle className="flex items-center gap-x-2">
        {title} <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
