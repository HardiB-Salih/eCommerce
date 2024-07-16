"use client";

import React from "react";

import PreviewModal from "@/components/preview-modal";

const ModalProvider = () => {
  const [isMounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <PreviewModal />
    </>
  );
};

export default ModalProvider;
