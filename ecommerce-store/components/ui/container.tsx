import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="mx-auto max-w-7xl transition-all duration-300 ease-in-out">
      {children}
    </div>
  );
};

export default Container;
