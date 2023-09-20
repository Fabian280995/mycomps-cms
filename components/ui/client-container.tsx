import React from "react";

interface Props {
  children: React.ReactNode;
}
const ClientContainer: React.FC<Props> = ({ children }) => {
  return (
    <section
      className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-8
      overflow-y-auto overflow-x-hidden pb-24
    "
    >
      {children}
    </section>
  );
};

export default ClientContainer;
