import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <>
      <div
        className="
    flex justify-between items-end"
      >
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-gray-500 font-semibold">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
      <hr className="my-4" />
    </>
  );
};

export default PageHeader;
