import React from "react";

interface Props {
  children: React.ReactNode;
}
const ClientContainer: React.FC<Props> = ({ children }) => {
  return <section className="w-full px-10 py-4">{children}</section>;
};

export default ClientContainer;
